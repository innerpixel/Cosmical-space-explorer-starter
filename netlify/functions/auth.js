import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// MongoDB connection
let cachedDb = null

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }

  const connection = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  cachedDb = connection
  return connection
}

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  profile: {
    type: { type: String, enum: ['admin', 'developer', 'member'] },
    id: mongoose.Schema.ObjectId
  }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

// Helper functions
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, profile: user.profile },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
}

exports.handler = async (event, context) => {
  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  try {
    await connectToDatabase()

    const path = event.path.replace('/api/', '')
    const body = JSON.parse(event.body || '{}')

    switch (path) {
      case 'login':
        const user = await User.findOne({ email: body.email })
        if (!user || !(await bcrypt.compare(body.password, user.password))) {
          throw new Error('Invalid credentials')
        }

        const token = generateToken(user)
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            token,
            user: {
              email: user.email,
              profile: user.profile
            }
          })
        }

      case 'signup':
        const hashedPassword = await bcrypt.hash(body.password, 12)
        const newUser = await User.create({
          email: body.email,
          password: hashedPassword,
          profile: { type: 'member' }
        })

        const newToken = generateToken(newUser)
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            token: newToken,
            user: {
              email: newUser.email,
              profile: newUser.profile
            }
          })
        }

      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Not found' })
        }
    }
  } catch (error) {
    console.error('Function error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    }
  }
}
