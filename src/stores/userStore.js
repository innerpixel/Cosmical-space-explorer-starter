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

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(null)
  const profiles = ref([])
  const currentProfile = ref(null)
  const pendingRequests = ref([])
  const isAuthenticated = ref(false)
  const error = ref(null)

  // Getters
  const isAdmin = computed(() => {
    return currentProfile.value?.type === PROFILE_TYPES.ADMIN
  })

  const userDisplayName = computed(() => {
    return user.value?.username || 'Guest'
  })

  const availableProfileSlots = computed(() => {
    if (isAdmin.value) return 999 // Admins have unlimited slots
    if (!user.value) return 0
    
    const maxSlots = {
      [PROFILE_TYPES.DEVELOPER]: 3,
      [PROFILE_TYPES.CONTRIBUTOR]: 2,
      [PROFILE_TYPES.MEMBER]: 1
    }

    const currentSlots = profiles.value.length
    const maxAllowedSlots = Math.max(
      ...profiles.value.map(p => maxSlots[p.type] || 0)
    )

    return Math.max(0, maxAllowedSlots - currentSlots)
  })

  // Actions
  function login(credentials) {
    try {
      // For development, accept any credentials
      user.value = {
        id: 1,
        username: credentials.username,
        email: 'admin@example.com'
      }
      
      // Add admin profile for development
      if (credentials.username === 'admin') {
        profiles.value = [{
          id: 1,
          type: PROFILE_TYPES.ADMIN,
          userId: 1
        }]
        currentProfile.value = profiles.value[0]
      }
      
      isAuthenticated.value = true
      saveToLocalStorage()
    } catch (err) {
      error.value = 'Login failed'
      throw err
    }
  }

  function logout() {
    user.value = null
    profiles.value = []
    currentProfile.value = null
    pendingRequests.value = []
    isAuthenticated.value = false
    clearLocalStorage()
  }

  function requestNewProfile(profileData) {
    if (!isAuthenticated.value) throw new Error('Must be logged in')
    if (availableProfileSlots.value <= 0) throw new Error('No available profile slots')

    const request = {
      id: Date.now(),
      userId: user.value.id,
      type: profileData.type,
      description: profileData.description,
      skills: profileData.skills,
      status: 'pending',
      created: new Date().toISOString()
    }

    pendingRequests.value.push(request)
    saveToLocalStorage()
    return request
  }

  function approveProfileRequest(requestId) {
    if (!isAdmin.value) throw new Error('Must be admin')

    const request = pendingRequests.value.find(r => r.id === requestId)
    if (!request) throw new Error('Request not found')

    request.status = 'approved'
    
    const newProfile = {
      id: Date.now(),
      type: request.type,
      userId: request.userId,
      created: new Date().toISOString()
    }

    profiles.value.push(newProfile)
    saveToLocalStorage()
    return newProfile
  }

  function rejectProfileRequest(requestId) {
    if (!isAdmin.value) throw new Error('Must be admin')

    const request = pendingRequests.value.find(r => r.id === requestId)
    if (!request) throw new Error('Request not found')

    request.status = 'rejected'
    saveToLocalStorage()
    return request
  }

  // Local Storage Management
  function saveToLocalStorage() {
    const state = {
      user: user.value,
      profiles: profiles.value,
      currentProfile: currentProfile.value,
      pendingRequests: pendingRequests.value,
      isAuthenticated: isAuthenticated.value
    }
    localStorage.setItem('userStore', JSON.stringify(state))
  }

  function loadFromLocalStorage() {
    const state = localStorage.getItem('userStore')
    if (state) {
      const parsed = JSON.parse(state)
      user.value = parsed.user
      profiles.value = parsed.profiles
      currentProfile.value = parsed.currentProfile
      pendingRequests.value = parsed.pendingRequests
      isAuthenticated.value = parsed.isAuthenticated
    }
  }

  function clearLocalStorage() {
    localStorage.removeItem('userStore')
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
    approveProfileRequest,
    rejectProfileRequest
  }
})
