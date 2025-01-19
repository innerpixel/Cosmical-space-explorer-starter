import api from './api'
import { storageService, STORAGE_KEYS } from './localStorageService'

class AuthService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || '/api/v1';
  }

  async initialize() {
    try {
      const user = this.loadFromStorage();
      const token = this.getToken();
      if (user && token) {
        // Set the token in axios defaults
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to initialize auth service:', error);
      return false;
    }
  }

  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, data: { user } } = response.data;
      
      if (token) {
        // Store token and user data
        storageService.setItem(STORAGE_KEYS.AUTH, token);
        storageService.setItem(STORAGE_KEYS.USER, user);
        
        // Set the token in axios defaults
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return user;
      }
      throw new Error('No token received');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  }

  async signup(userData) {
    try {
      const response = await api.post('/auth/signup', userData);
      const { token, data: { user } } = response.data;
      
      if (token) {
        // Store token and user data
        storageService.setItem(STORAGE_KEYS.AUTH, token);
        storageService.setItem(STORAGE_KEYS.USER, user);
        
        // Set the token in axios defaults
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return user;
      }
      throw new Error('No token received');
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error(error.response?.data?.message || error.message || 'Signup failed');
    }
  }

  getToken() {
    return storageService.getItem(STORAGE_KEYS.AUTH);
  }

  loadFromStorage() {
    return storageService.getItem(STORAGE_KEYS.USER);
  }

  async logout() {
    try {
      // Clear auth header
      delete api.defaults.headers.common['Authorization'];
      
      // Clear storage
      storageService.removeItem(STORAGE_KEYS.AUTH);
      storageService.removeItem(STORAGE_KEYS.USER);
      
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
