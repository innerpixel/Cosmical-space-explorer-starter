import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { profileService } from '../services/profileService'

export const useMissionControlStore = defineStore('missionControl', () => {
  // State
  const pendingRequests = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const selectedRequest = ref(null)

  // Getters
  const approvedToday = computed(() => {
    const today = new Date().toDateString()
    return pendingRequests.value.filter(req => 
      req.status === 'approved' && 
      new Date(req.updatedAt).toDateString() === today
    ).length
  })

  const totalProcessed = computed(() => 
    pendingRequests.value.filter(req => 
      req.status === 'approved' || req.status === 'rejected'
    ).length
  )

  const requestsByStatus = computed(() => {
    const grouped = {
      pending: [],
      approved: [],
      rejected: []
    }
    pendingRequests.value.forEach(req => {
      if (grouped[req.status]) {
        grouped[req.status].push(req)
      }
    })
    return grouped
  })

  // Actions
  async function fetchPendingRequests() {
    isLoading.value = true
    error.value = null
    try {
      const requests = await profileService.getPendingRequests()
      pendingRequests.value = requests
    } catch (err) {
      error.value = err.message || 'Failed to load requests'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function approveRequest(requestId) {
    isLoading.value = true
    error.value = null
    try {
      await profileService.approveRequest(requestId)
      await fetchPendingRequests() // Refresh the list
      if (selectedRequest.value?.id === requestId) {
        selectedRequest.value = null
      }
    } catch (err) {
      error.value = err.message || 'Failed to approve request'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function rejectRequest(requestId) {
    isLoading.value = true
    error.value = null
    try {
      await profileService.rejectRequest(requestId)
      await fetchPendingRequests() // Refresh the list
      if (selectedRequest.value?.id === requestId) {
        selectedRequest.value = null
      }
    } catch (err) {
      error.value = err.message || 'Failed to reject request'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function setSelectedRequest(request) {
    selectedRequest.value = request
  }

  return {
    // State
    pendingRequests,
    isLoading,
    error,
    selectedRequest,
    
    // Getters
    approvedToday,
    totalProcessed,
    requestsByStatus,
    
    // Actions
    fetchPendingRequests,
    approveRequest,
    rejectRequest,
    setSelectedRequest
  }
})
