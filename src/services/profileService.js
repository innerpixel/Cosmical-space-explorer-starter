import api from './api';

class ProfileService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
  }

  async submitRequest(requestData) {
    try {
      // Log the request data in development
      if (import.meta.env.MODE === 'development') {
        console.log('Submitting profile request:', {
          type: requestData.type,
          descriptionLength: requestData.description?.length,
          skillsCount: requestData.skills?.length,
          hasCurrentProfile: !!requestData.currentProfile
        })
      }

      // Validate request data before sending
      if (!requestData.type || !requestData.description || !requestData.skills) {
        throw new Error('Missing required fields')
      }

      if (requestData.description.length < 50 || requestData.description.length > 1000) {
        throw new Error('Description must be between 50 and 1000 characters')
      }

      if (!requestData.skills.length) {
        throw new Error('At least one skill is required')
      }

      const validTypes = ['explorer', 'scientist', 'engineer', 'commander']
      if (!validTypes.includes(requestData.type)) {
        throw new Error('Invalid profile type')
      }

      // Make the API request
      const response = await api.post('/profiles/request', {
        type: requestData.type,
        description: requestData.description,
        skills: requestData.skills,
        currentProfile: requestData.currentProfile || null
      })

      return response.data
    } catch (error) {
      // Enhanced error logging
      const errorDetails = {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
        requestData: {
          type: requestData.type,
          descriptionLength: requestData.description?.length,
          skillsCount: requestData.skills?.length,
          hasCurrentProfile: !!requestData.currentProfile
        }
      }
      console.error('Profile request error:', errorDetails)

      // Handle specific error cases
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Invalid request data')
      }
      if (error.response?.status === 401) {
        throw error // Let the component handle auth errors
      }
      if (error.response?.status === 403) {
        throw new Error('You do not have permission to submit profile requests')
      }
      if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later or contact support.')
      }
      if (error.response?.status === 404) {
        throw new Error('Profile request endpoint not found. Please check server configuration.')
      }

      throw new Error(error.response?.data?.message || error.message || 'Failed to submit profile request')
    }
  }

  async getUserRequests() {
    try {
      const response = await api.get('/profiles/requests/user')
      return response.data
    } catch (error) {
      console.error('Get user requests error:', error)
      throw new Error(error.response?.data?.message || error.message || 'Failed to get user requests')
    }
  }

  async getRequestStatus(requestId) {
    try {
      const response = await api.get(`/profiles/request/${requestId}/status`)
      return response.data
    } catch (error) {
      console.error('Get request status error:', error)
      throw new Error(error.response?.data?.message || error.message || 'Failed to get request status')
    }
  }

  async getPendingRequests() {
    try {
      const token = api.defaults.headers.common['Authorization'];
      const response = await api.get('/admin/requests');

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
      const response = await api.put(`/admin/requests/${requestId}/approve`);

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
      const response = await api.put(`/admin/requests/${requestId}/reject`);

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
