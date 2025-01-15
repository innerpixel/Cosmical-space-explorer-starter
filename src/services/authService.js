class AuthService {
  constructor() {
    this.baseUrl = 'http://localhost:5000/api/v1';
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
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: this.credentials,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        return data.data.user;
      }
      throw new Error('No token received');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async signup(userData) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: this.credentials,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        return data.data.user;
      }
      throw new Error('No token received');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
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
