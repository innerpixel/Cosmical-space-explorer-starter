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

  async login(email, password) {
    try {
      if (!this.users) {
        await this.initialize();
      }
      
      // Hash the provided password
      const hashedPassword = await this.hashPassword(password);
      console.log('Login attempt:', { email, hashedPassword }); // Debug log
      
      // Find matching user
      const user = this.users.find(u => {
        const match = u.email === email && u.passwordHash === hashedPassword;
        console.log('Comparing:', { 
          userEmail: u.email, 
          inputEmail: email,
          passwordMatch: u.passwordHash === hashedPassword 
        });
        return match;
      });
      
      if (user) {
        // Create sanitized user object (without password hash)
        this.currentUser = {
          id: user.id,
          email: user.email,
          profile: user.profile
        };
        
        // Store in localStorage
        this.saveToStorage(this.currentUser);
        return this.currentUser;
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please try again.');
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  }

  async hashPassword(password) {
    // Convert password string to bytes
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    // Generate hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert hash to hex string
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
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
