import api from './api'

class AuthService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || '/api/v1';
    this.credentials = 'include';  // Add this to include cookies in requests
  }

  async initialize() {
    try {
      const user = this.loadFromStorage();
      if (user && this.getToken()) {
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
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
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
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
      throw new Error('No token received');
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error(error.response?.data?.message || error.message || 'Signup failed');
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loadFromStorage() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
