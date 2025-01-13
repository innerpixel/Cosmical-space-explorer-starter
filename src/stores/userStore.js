import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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

// Mock users for development
const MOCK_USERS = {
  admin: {
    username: 'admin',
    password: 'admin',
    id: 1,
    email: 'admin@example.com',
    profile: {
      id: 1,
      type: PROFILE_TYPES.ADMIN
    }
  },
  developer: {
    username: 'developer',
    password: 'dev123',
    id: 2,
    email: 'developer@example.com',
    profile: {
      id: 2,
      type: PROFILE_TYPES.DEVELOPER
    }
  },
  user: {
    username: 'user',
    password: 'user123',
    id: 3,
    email: 'user@example.com',
    profile: {
      id: 3,
      type: PROFILE_TYPES.MEMBER
    }
  }
}

// Mock API function - replace with real API calls
const mockAuthApi = {
  async login(credentials) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Find matching user
    const user = Object.values(MOCK_USERS).find(
      u => u.username === credentials.username && u.password === credentials.password
    )
    
    if (user) {
      return {
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token: `mock-jwt-token-${user.id}`,
        profile: user.profile
      }
    }
    
    throw new Error('Invalid credentials')
  }
}

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(null)
  const profiles = ref([])
  const currentProfile = ref(null)
  const pendingRequests = ref([])
  const isAuthenticated = ref(false)
  const error = ref('')
  const token = ref(null)

  // Getters
  const isAdmin = computed(() => {
    return currentProfile.value?.type === PROFILE_TYPES.ADMIN
  })

  const userDisplayName = computed(() => {
    return user.value?.username || 'Guest'
  })

  const availableProfileSlots = computed(() => {
    return 3 - profiles.value.length
  })

  // Actions
  async function login(credentials) {
    try {
      const response = await mockAuthApi.login(credentials)
      
      user.value = response.user
      token.value = response.token
      
      // Set initial profile
      profiles.value = [response.profile]
      currentProfile.value = response.profile
      
      isAuthenticated.value = true
      error.value = ''
      saveToLocalStorage()
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  function logout() {
    user.value = null
    profiles.value = []
    currentProfile.value = null
    pendingRequests.value = []
    isAuthenticated.value = false
    token.value = null
    clearLocalStorage()
  }

  async function requestNewProfile(profileData) {
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
    saveToLocalStorage()
    return request
  }

  async function approveProfileRequest(requestId) {
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
    saveToLocalStorage()
    return newProfile
  }

  // Local Storage Management
  function saveToLocalStorage() {
    localStorage.setItem('user', JSON.stringify({
      user: user.value,
      profiles: profiles.value,
      currentProfile: currentProfile.value,
      pendingRequests: pendingRequests.value,
      isAuthenticated: isAuthenticated.value,
      token: token.value
    }))
  }

  function loadFromLocalStorage() {
    const stored = localStorage.getItem('user')
    if (stored) {
      const data = JSON.parse(stored)
      user.value = data.user
      profiles.value = data.profiles
      currentProfile.value = data.currentProfile
      pendingRequests.value = data.pendingRequests
      isAuthenticated.value = data.isAuthenticated
      token.value = data.token
    }
  }

  function clearLocalStorage() {
    localStorage.removeItem('user')
  }

  // Initialize store
  loadFromLocalStorage()

  return {
    // State
    user,
    profiles,
    currentProfile,
    pendingRequests,
    isAuthenticated,
    error,
    token,
    PROFILE_TYPES,
    PROFILE_PRIVILEGES,

    // Getters
    isAdmin,
    userDisplayName,
    availableProfileSlots,

    // Actions
    login,
    logout,
    requestNewProfile,
    approveProfileRequest
  }
})
