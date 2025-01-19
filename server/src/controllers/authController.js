import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { promisify } from 'util'
import AppError from '../utils/appError.js'
import crypto from 'crypto'

const signToken = id => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    console.error('JWT_SECRET is not set')
    throw new Error('JWT configuration error')
  }
  console.log('Creating token for user:', id)
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  })
}

const createSendToken = (user, statusCode, res) => {
  try {
    const token = signToken(user._id)
    
    const cookieOptions = {
      expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 1) * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Cookie options:', cookieOptions)
    }

    res.cookie('jwt', token, cookieOptions)

    // Remove password from output
    user.password = undefined

    res.status(statusCode).json({
      status: 'success',
      token,
      data: { user }
    })
  } catch (error) {
    console.error('Error creating token:', error)
    throw error
  }
}

export const signup = async (req, res, next) => {
  try {
    const { email, password, isAdmin } = req.body

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email and password are required'
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password must be at least 8 characters long'
      })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email already in use'
      })
    }

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
    console.error('Signup error:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      code: err.code
    })
    
    if (err.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email already exists'
      })
    }

    res.status(400).json({
      status: 'fail',
      message: 'Error creating user',
      error: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
    })
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Login attempt:', { email })
    }

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      })
    }

    const user = await User.findOne({ email }).select('+password')
    
    if (!user) {
      console.log('No user found with email:', email)
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      })
    }

    const isPasswordCorrect = await user.correctPassword(password, user.password)
    
    if (!isPasswordCorrect) {
      console.log('Incorrect password for user:', email)
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      })
    }

    createSendToken(user, 200, res)
  } catch (err) {
    console.error('Login error:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
    res.status(500).json({
      status: 'error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Error logging in'
    })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide an email address'
      })
    }

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
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000 // 10 minutes

    await user.save({ validateBeforeSave: false })

    // In development, just return the token
    if (process.env.NODE_ENV === 'development') {
      return res.status(200).json({
        status: 'success',
        message: 'Token sent to email',
        resetToken
      })
    }

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email'
    })
  } catch (err) {
    console.error('Forgot password error:', err)
    res.status(500).json({
      status: 'error',
      message: 'Error sending reset token'
    })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body

    if (!token || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide reset token and new password'
      })
    }

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex')

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'Token is invalid or has expired'
      })
    }

    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    createSendToken(user, 200, res)
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
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt
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

    if (user.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: 'fail',
        message: 'Password was changed. Please log in again'
      })
    }

    req.user = user
    next()
  } catch (err) {
    console.error('Auth protection error:', err)
    res.status(401).json({
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

export const githubLogin = async (req, res) => {
  try {
    const { code } = req.body
    if (!code) {
      return res.status(400).json({
        status: 'fail',
        message: 'GitHub code is required'
      })
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      })
    })

    const tokenData = await tokenResponse.json()
    if (tokenData.error) {
      console.error('GitHub token error:', tokenData)
      return res.status(400).json({
        status: 'fail',
        message: 'Failed to authenticate with GitHub'
      })
    }

    // Get user data from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`
      }
    })

    const githubUser = await userResponse.json()
    if (!githubUser.email) {
      return res.status(400).json({
        status: 'fail',
        message: 'GitHub email is required. Please make your email public in GitHub settings.'
      })
    }

    // Find or create user
    let user = await User.findOne({ email: githubUser.email })
    if (!user) {
      user = await User.create({
        email: githubUser.email,
        password: crypto.randomBytes(32).toString('hex'),
        profile: {
          type: 'member',
          githubId: githubUser.id,
          avatarUrl: githubUser.avatar_url,
          name: githubUser.name || githubUser.login
        }
      })
    } else {
      // Update GitHub info
      user.profile.githubId = githubUser.id
      user.profile.avatarUrl = githubUser.avatar_url
      user.profile.name = githubUser.name || githubUser.login
      await user.save()
    }

    createSendToken(user, 200, res)
  } catch (err) {
    console.error('GitHub auth error:', err)
    res.status(500).json({
      status: 'error',
      message: 'Error authenticating with GitHub'
    })
  }
}
