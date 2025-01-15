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
      const response = await fetch(`${this.baseUrl}/admin/requests`, {
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

  async approveRequest(requestId) {
    try {
      const token = authService.getToken();
      const response = await fetch(`${this.baseUrl}/admin/requests/${requestId}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
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

  async rejectRequest(requestId) {
    try {
      const token = authService.getToken();
      const response = await fetch(`${this.baseUrl}/admin/requests/${requestId}/reject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
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
}

export const profileService = new ProfileService();
