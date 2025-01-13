import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  // Initialize with a default admin user for development
  const defaultUser = {
    name: 'Admin User',
    isAdmin: true
  }

  const isAdmin = computed(() => user.value?.isAdmin ?? false)
  const userDisplayName = computed(() => user.value?.name ?? 'Guest')

  function setUser(userData) {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  function initializeFromStorage() {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('user')
      }
    } else {
      // Set default admin user if no user is stored
      setUser(defaultUser)
    }
  }

  // Initialize the store when it's created
  initializeFromStorage()

  return {
    user,
    isAdmin,
    userDisplayName,
    setUser,
    logout,
    initializeFromStorage
  }
})
