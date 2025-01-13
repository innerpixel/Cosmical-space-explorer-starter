import { defineStore } from 'pinia'
import { showNotification } from '../services/notifications'

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
    notificationHistory: []
  }),

  actions: {
    async sendNotification(title, options = {}) {
      try {
        await showNotification(title, options)
        
        // Add to history
        const notification = {
          id: Date.now(),
          title,
          options,
          timestamp: new Date().toISOString(),
          status: 'sent'
        }
        
        this.notificationHistory.unshift(notification)
        localStorage.setItem('notificationHistory', JSON.stringify(this.notificationHistory))
        
        return true
      } catch (error) {
        console.error('Failed to send notification:', error)
        return false
      }
    },

    clearHistory() {
      this.notificationHistory = []
      localStorage.removeItem('notificationHistory')
    },

    initializeFromStorage() {
      const storedHistory = localStorage.getItem('notificationHistory')
      if (storedHistory) {
        this.notificationHistory = JSON.parse(storedHistory)
      }
    }
  },

  getters: {
    recentNotifications: (state) => state.notificationHistory.slice(0, 10)
  }
})
