import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { promisify } from 'util'
import AppError from '../utils/appError.js'

const signToken = id => {
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

export const signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      profile: { type: 'member' }
    })

    createSendToken(newUser, 201, res)
  } catch (err) {
    next(new AppError('Error creating user', 400))
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401))
    }

    createSendToken(user, 200, res)
  } catch (err) {
    next(new AppError('Error logging in', 400))
  }
}

export const protect = async (req, res, next) => {
  try {
    let token
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return next(new AppError('You are not logged in', 401))
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      return next(new AppError('User no longer exists', 401))
    }

    if (user.changedPasswordAfter(decoded.iat)) {
      return next(new AppError('Password recently changed', 401))
    }

    req.user = user
    next()
  } catch (err) {
    next(new AppError('Authentication failed', 401))
  }
}

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.profile.type)) {
      return next(new AppError('You do not have permission', 403))
    }
    next()
  }
}
