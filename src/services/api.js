import axios from 'axios'
import { storageService, STORAGE_KEYS } from './localStorageService'

const API_URL = import.meta.env.VITE_API_URL || '/.netlify/functions'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = storageService.getItem(STORAGE_KEYS.AUTH)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle token refresh or logout on 401
api.interceptors.response.use(
  response => response,
  async error => {
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
      const response = await api.post('/auth', {
        ...credentials,
        path: 'login'
      })
      storageService.setItem(STORAGE_KEYS.AUTH, response.data.token)
      storageService.setItem(STORAGE_KEYS.USER, response.data.user)
      return response.data
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  },

  async signup(userData) {
    try {
      const response = await api.post('/auth', {
        ...userData,
        path: 'signup'
      })
      storageService.setItem(STORAGE_KEYS.AUTH, response.data.token)
      storageService.setItem(STORAGE_KEYS.USER, response.data.user)
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
