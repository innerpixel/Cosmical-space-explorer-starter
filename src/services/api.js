import axios from 'axios'
import { storageService, STORAGE_KEYS } from './localStorageService'

const API_URL = import.meta.env.VITE_API_URL || '/api/v1'
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 5000

const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  withCredentials: true
})

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = storageService.getItem(STORAGE_KEYS.AUTH)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  console.error('API Request Error:', error)
  return Promise.reject(error)
})

// Handle token refresh or logout on 401
api.interceptors.response.use(
  response => response,
  async error => {
    console.error('API Response Error:', error.response?.data || error.message)
    if (error.response?.status === 401) {
      storageService.clear()
      window.location.href = '/login'
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
      console.error('Login failed:', error)
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
      console.error('Signup failed:', error)
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
