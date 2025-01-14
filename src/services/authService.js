class AuthService {
  constructor() {
    this.users = null;
    this.currentUser = null;
    // Get base URL from import.meta.env, ensuring it doesn't have a trailing slash
    this.baseUrl = (import.meta.env.VITE_APP_BASE_URL || '/Cosmical-space-explorer-starter').replace(/\/$/, '');
  }

  async initialize() {
    try {
      // Use the correct base URL for GitHub Pages
      const url = `${this.baseUrl}/data/users.json`;
      console.log('Fetching users from:', url); // Debug log
      
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Failed to fetch users:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Loaded users:', data); // Debug log
      
      if (!data || !Array.isArray(data.users)) {
        console.error('Invalid users data format:', data);
        throw new Error('Invalid users data format');
      }
      
      this.users = data.users;
      return true;
    } catch (error) {
      console.error('Failed to initialize auth service:', error);
      return false;
    }
  }

  async login(credentials) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('auth_token', data.token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  async hashPassword(password) {
    try {
      console.log('Starting password hashing...'); // Debug log
      
      // Convert password string to bytes
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      console.log('Password encoded to bytes, length:', data.length); // Debug log
      
      // Generate hash
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      console.log('Hash buffer generated, length:', hashBuffer.byteLength); // Debug log
      
      // Convert hash to hex string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      console.log('Final hash generated, length:', hashHex.length); // Debug log
      return hashHex;
    } catch (error) {
      console.error('Error during password hashing:', error);
      throw error;
    }
  }

  saveToStorage(user) {
    try {
      localStorage.setItem('user', JSON.stringify(user));
      // Generate a simple token (in real app, use JWT)
      const token = btoa(user.email + ':' + Date.now());
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  }

  loadFromStorage() {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
        return this.currentUser;
      }
    } catch (error) {
      console.error('Failed to load from storage:', error);
    }
    return null;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

export const authService = new AuthService();
