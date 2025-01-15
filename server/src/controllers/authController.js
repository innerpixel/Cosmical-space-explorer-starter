import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { promisify } from 'util'
import AppError from '../utils/appError.js'
import crypto from 'crypto'

const signToken = id => {
  console.log('JWT_SECRET:', process.env.JWT_SECRET)
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }

  res.cookie('jwt', token, cookieOptions)

  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user }
  })
}

// Store for reset tokens (in production, use Redis or database)
const resetTokens = new Map()

export const signup = async (req, res, next) => {
  try {
    const { email, password, isAdmin } = req.body
    const newUser = await User.create({
      email,
      password,
      isAdmin: isAdmin || false,
      profile: { 
        type: isAdmin ? 'admin' : 'member'
      }
    })

    createSendToken(newUser, 201, res)
  } catch (err) {
    console.error('Signup error:', err)
    res.status(400).json({
      status: 'fail',
      message: 'Error creating user',
      error: err.message
    })
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      })
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      })
    }

    createSendToken(user, 200, res)
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({
      status: 'error',
      message: 'Error logging in'
    })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that email address'
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')

    // Store token with expiry (1 hour)
    resetTokens.set(hashedToken, {
      userId: user._id,
      expiresAt: Date.now() + 60 * 60 * 1000 // 1 hour
    })

    res.status(200).json({
      status: 'success',
      resetToken
    })
  } catch (err) {
    console.error('Forgot password error:', err)
    res.status(500).json({
      status: 'error',
      message: 'Error processing password reset request'
    })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex')

    // Get stored token data
    const tokenData = resetTokens.get(hashedToken)
    if (!tokenData) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid or expired reset token'
      })
    }

    // Check if token is expired
    if (Date.now() > tokenData.expiresAt) {
      resetTokens.delete(hashedToken)
      return res.status(400).json({
        status: 'fail',
        message: 'Reset token has expired'
      })
    }

    // Find and update user
    const user = await User.findById(tokenData.userId)
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      })
    }

    user.password = newPassword
    await user.save()

    // Remove used token
    resetTokens.delete(hashedToken)

    res.status(200).json({
      status: 'success',
      message: 'Password reset successfully'
    })
  } catch (err) {
    console.error('Reset password error:', err)
    res.status(500).json({
      status: 'error',
      message: 'Error resetting password'
    })
  }
}

export const protect = async (req, res, next) => {
  try {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in'
      })
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'User no longer exists'
      })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token'
    })
  }
}

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.profile.type)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action'
      })
    }
    next()
  }
}
