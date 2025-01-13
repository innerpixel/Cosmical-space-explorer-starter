class AuthService {
  constructor() {
    this.users = null;
    this.currentUser = null;
  }

  async initialize() {
    try {
      // Load users data from JSON
      const response = await fetch('/data/users.json');
      const data = await response.json();
      this.users = data.users;
      return true;
    } catch (error) {
      console.error('Failed to initialize auth service:', error);
      return false;
    }
  }

  async login(email, password) {
    try {
      // Hash the provided password
      const hashedPassword = await this.hashPassword(password);
      
      // Find matching user
      const user = this.users.find(u => 
        u.email === email && u.passwordHash === hashedPassword
      );
      
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
