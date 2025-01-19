import axios from 'axios'
import { storageService, STORAGE_KEYS } from './localStorageService'

// Determine API URL based on environment and current origin
const getApiUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL
  if (apiUrl) return apiUrl

  // Default to port 5000 for local development
  const currentPort = window.location.port
  const apiPort = '5000'
  return `http://localhost:${apiPort}/api/v1`
}

const API_URL = getApiUrl()
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 5000

// Debug API configuration in non-production environments
if (import.meta.env.MODE !== 'production') {
  console.log('API Configuration:', {
    API_URL,
    API_TIMEOUT,
    NODE_ENV: import.meta.env.MODE,
    origin: window.location.origin,
    currentUrl: window.location.href
  })
}

const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor for API calls
api.interceptors.request.use(
  config => {
    const token = storageService.getItem(STORAGE_KEYS.AUTH)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    // Log outgoing requests in development
    if (import.meta.env.MODE === 'development') {
      console.log('API Request:', {
        method: config.method,
        url: config.url,
        baseURL: config.baseURL,
        data: config.data,
        headers: {
          ...config.headers,
          Authorization: config.headers.Authorization ? 'Bearer [hidden]' : undefined
        }
      })
    }
    return config
  },
  error => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for API calls
api.interceptors.response.use(
  response => {
    // Log successful responses in development
    if (import.meta.env.MODE === 'development') {
      console.log('API Response:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      })
    }
    return response
  },
  async error => {
    // Detailed error logging
    const errorDetails = {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      responseType: error.response?.headers?.['content-type'],
      url: error.config?.url,
      method: error.config?.method,
      requestData: error.config?.data
    }
    
    console.error('API Response Error:', errorDetails)

    // Handle authentication errors
    if (error.response?.status === 401) {
      // Clear stored auth data
      storageService.removeItem(STORAGE_KEYS.AUTH)
      storageService.removeItem(STORAGE_KEYS.USER)
      
      // Don't redirect if it's already a login request
      if (!error.config.url.includes('/auth/login')) {
        window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`
      }
    }

    // Enhance error object with detailed information
    if (error.response?.data) {
      error.message = error.response.data.message || error.message
      error.details = error.response.data.details || error.response.data
    }
    
    return Promise.reject(error)
  }
)

export const authAPI = {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      storageService.setItem(STORAGE_KEYS.AUTH, response.data.token)
      storageService.setItem(STORAGE_KEYS.USER, response.data.data.user)
      return response.data
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message)
      throw error
    }
  },

  async signup(userData) {
    try {
      const response = await api.post('/auth/signup', userData)
      storageService.setItem(STORAGE_KEYS.AUTH, response.data.token)
      storageService.setItem(STORAGE_KEYS.USER, response.data.data.user)
      return response.data
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message)
      throw error
    }
  },

  async logout() {
    storageService.clear()
  },

  async getCurrentUser() {
    return storageService.getItem(STORAGE_KEYS.USER)
  }
}

export default api
