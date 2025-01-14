import { authService } from './authService';

class ProfileService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
  }

  async submitRequest(requestData) {
    try {
      const token = authService.getToken();
      const response = await fetch(`${this.baseUrl}/profile/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit profile request');
      }

      return await response.json();
    } catch (error) {
      console.error('Profile request error:', error);
      throw error;
    }
  }

  async getPendingRequests() {
    try {
      const token = authService.getToken();
      const response = await fetch(`${this.baseUrl}/profile/requests/pending`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch pending requests');
      }

      return await response.json();
    } catch (error) {
      console.error('Get pending requests error:', error);
      throw error;
    }
  }

  async getUserRequests() {
    try {
      const token = authService.getToken();
      const response = await fetch(`${this.baseUrl}/profile/requests/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user requests');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user requests error:', error);
      throw error;
    }
  }

  async approveRequest(requestId, note) {
    try {
      const token = authService.getToken();
      const response = await fetch(`${this.baseUrl}/profile/request/${requestId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ note }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to approve request');
      }

      return await response.json();
    } catch (error) {
      console.error('Approve request error:', error);
      throw error;
    }
  }

  async rejectRequest(requestId, note) {
    try {
      const token = authService.getToken();
      const response = await fetch(`${this.baseUrl}/profile/request/${requestId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ note }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reject request');
      }

      return await response.json();
    } catch (error) {
      console.error('Reject request error:', error);
      throw error;
    }
  }

  async getRequestStatus(requestId) {
    try {
      const token = authService.getToken();
      const response = await fetch(`${this.baseUrl}/profile/request/${requestId}/status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch request status');
      }

      return await response.json();
    } catch (error) {
      console.error('Get request status error:', error);
      throw error;
    }
  }
}

export const profileService = new ProfileService();
