import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../services/authService'

// Define profile types and their privileges
const PROFILE_TYPES = {
  ADMIN: 'admin',
  DEVELOPER: 'developer',
  CONTRIBUTOR: 'contributor',
  MEMBER: 'member'
}

const PROFILE_PRIVILEGES = {
  admin: ['manage_users', 'manage_profiles', 'manage_content', 'view_admin'],
  developer: ['create_content', 'edit_content', 'view_content'],
  contributor: ['create_content', 'view_content'],
  member: ['view_content']
}

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const profiles = ref([])
  const currentProfile = ref(null)
  const pendingRequests = ref([])
  const token = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.profile?.type === PROFILE_TYPES.ADMIN)
  const userProfile = computed(() => user.value?.profile)
  const userDisplayName = computed(() => user.value?.username || 'Guest')
  const availableProfileSlots = computed(() => 3 - profiles.value.length)

  // Actions
  async function initialize() {
    loading.value = true
    try {
      await authService.initialize()
      const storedUser = authService.loadFromStorage()
      if (storedUser) {
        user.value = storedUser
      }
    } catch (err) {
      console.error('Failed to initialize user store:', err)
      error.value = 'Failed to initialize user data'
    } finally {
      loading.value = false
    }
  }

  async function login(credentials) {
    loading.value = true
    error.value = null
    try {
      const loggedInUser = await authService.login(credentials.email, credentials.password)
      user.value = loggedInUser
      token.value = loggedInUser.token
      profiles.value = [loggedInUser.profile]
      currentProfile.value = loggedInUser.profile
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await authService.logout()
      user.value = null
      profiles.value = []
      currentProfile.value = null
      pendingRequests.value = []
      token.value = null
      error.value = null
    } catch (err) {
      error.value = 'Logout failed'
      throw error.value
    }
  }

  const loadUserFromStorage = async () => {
    const storedUser = await authService.loadFromStorage()
    if (storedUser) {
      user.value = storedUser
    }
  }

  const requestNewProfile = async (profileData) => {
    if (!isAuthenticated.value) {
      throw new Error('Must be authenticated to request a profile')
    }

    const request = {
      id: Date.now(),
      userId: user.value.id,
      type: profileData.type,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    pendingRequests.value.push(request)
    await authService.saveToStorage(user.value)
    return request
  }

  const approveProfileRequest = async (requestId) => {
    if (!isAdmin.value) {
      throw new Error('Must be admin to approve requests')
    }

    const request = pendingRequests.value.find(r => r.id === requestId)
    if (!request) {
      throw new Error('Request not found')
    }

    const newProfile = {
      id: Date.now(),
      type: request.type,
      userId: request.userId
    }

    profiles.value.push(newProfile)
    pendingRequests.value = pendingRequests.value.filter(r => r.id !== requestId)
    await authService.saveToStorage(user.value)
    return newProfile
  }

  // Initialize store
  initialize()

  return {
    // State
    user,
    loading,
    error,
    profiles,
    currentProfile,
    pendingRequests,
    token,
    PROFILE_TYPES,
    PROFILE_PRIVILEGES,

    // Getters
    isAuthenticated,
    isAdmin,
    userProfile,
    userDisplayName,
    availableProfileSlots,

    // Actions
    login,
    logout,
    loadUserFromStorage,
    requestNewProfile,
    approveProfileRequest,
    initialize
  }
})
