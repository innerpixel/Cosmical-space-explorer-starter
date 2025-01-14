import api from './api'
import { storageService, STORAGE_KEYS } from './localStorageService'
import { useNotifications } from './notifications'

const notifications = useNotifications()

export const profileService = {
  async submitRequest(requestData) {
    try {
      const response = await api.post('/profile/request', requestData)
      notifications.success('Profile request submitted successfully')
      return response.data
    } catch (error) {
      notifications.error('Failed to submit profile request')
      throw error
    }
  },

  async getPendingRequests() {
    try {
      const response = await api.get('/profile/requests/pending')
      return response.data
    } catch (error) {
      notifications.error('Failed to fetch pending requests')
      throw error
    }
  },

  async approveRequest(requestId) {
    try {
      const response = await api.post(`/profile/request/${requestId}/approve`)
      notifications.success('Profile request approved')
      return response.data
    } catch (error) {
      notifications.error('Failed to approve request')
      throw error
    }
  },

  async rejectRequest(requestId, reason) {
    try {
      const response = await api.post(`/profile/request/${requestId}/reject`, { reason })
      notifications.success('Profile request rejected')
      return response.data
    } catch (error) {
      notifications.error('Failed to reject request')
      throw error
    }
  },

  async getRequestStatus(requestId) {
    try {
      const response = await api.get(`/profile/request/${requestId}/status`)
      return response.data
    } catch (error) {
      notifications.error('Failed to fetch request status')
      throw error
    }
  },

  async getUserRequests() {
    try {
      const response = await api.get('/profile/requests/user')
      return response.data
    } catch (error) {
      notifications.error('Failed to fetch user requests')
      throw error
    }
  }
}

export default profileService
