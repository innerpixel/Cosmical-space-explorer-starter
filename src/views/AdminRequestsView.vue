<template>
  <div class="min-h-screen bg-space-black pt-16">
    <!-- Scan Lines Effect -->
    <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-interface-text-primary animate-glow-pulse mb-4">
          Mission Control Center
        </h1>
        <p class="text-xl text-interface-text-muted">
          Review and manage profile access requests
        </p>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6">
          <h3 class="text-interface-text-secondary text-sm font-medium mb-2">Pending Requests</h3>
          <p class="text-3xl font-bold text-interface-text-primary">
            {{ pendingRequests.length }}
          </p>
        </div>
        
        <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6">
          <h3 class="text-interface-text-secondary text-sm font-medium mb-2">Approved Today</h3>
          <p class="text-3xl font-bold text-interface-text-primary">
            {{ approvedToday }}
          </p>
        </div>
        
        <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6">
          <h3 class="text-interface-text-secondary text-sm font-medium mb-2">Total Processed</h3>
          <p class="text-3xl font-bold text-interface-text-primary">
            {{ totalProcessed }}
          </p>
        </div>
      </div>

      <!-- Requests Table -->
      <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow overflow-hidden">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-interface-text-primary mb-4">Pending Clearance Requests</h2>
          
          <!-- Search and Filter -->
          <div class="flex flex-col md:flex-row gap-4 mb-6">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search requests..."
              class="flex-1 px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                     text-interface-text-primary placeholder-interface-text-muted/50
                     focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                     transition-all duration-200"
            >
            
            <select
              v-model="filterStatus"
              class="px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                     text-interface-text-primary
                     focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                     transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-interface-border">
                  <th class="text-left py-3 px-4 text-interface-text-secondary font-medium">User</th>
                  <th class="text-left py-3 px-4 text-interface-text-secondary font-medium">Type</th>
                  <th class="text-left py-3 px-4 text-interface-text-secondary font-medium">Status</th>
                  <th class="text-left py-3 px-4 text-interface-text-secondary font-medium">Date</th>
                  <th class="text-right py-3 px-4 text-interface-text-secondary font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="request in filteredRequests" 
                  :key="request.id"
                  class="border-b border-interface-border hover:bg-space-dark transition-colors duration-200"
                >
                  <td class="py-3 px-4">
                    <div class="text-interface-text-primary font-medium">{{ request.user.name }}</div>
                    <div class="text-interface-text-muted text-sm">{{ request.user.email }}</div>
                  </td>
                  <td class="py-3 px-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                               bg-space-accent-cyan-dark text-interface-text-primary">
                      {{ request.type }}
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <span 
                      :class="{
                        'bg-yellow-900/50 text-yellow-400': request.status === 'pending',
                        'bg-green-900/50 text-green-400': request.status === 'approved',
                        'bg-red-900/50 text-red-400': request.status === 'rejected'
                      }"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    >
                      {{ request.status }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-interface-text-muted">
                    {{ formatDate(request.date) }}
                  </td>
                  <td class="py-3 px-4 text-right space-x-2">
                    <button
                      @click="viewRequest(request)"
                      class="inline-flex items-center px-3 py-1 border border-interface-border rounded-md
                             text-interface-text-primary hover:text-interface-text-secondary
                             transition-colors duration-200"
                    >
                      View
                    </button>
                    <button
                      v-if="request.status === 'pending'"
                      @click="approveRequest(request.id)"
                      class="inline-flex items-center px-3 py-1 border border-green-600 rounded-md
                             text-green-400 hover:bg-green-900/30
                             transition-colors duration-200"
                    >
                      Approve
                    </button>
                    <button
                      v-if="request.status === 'pending'"
                      @click="rejectRequest(request.id)"
                      class="inline-flex items-center px-3 py-1 border border-red-600 rounded-md
                             text-red-400 hover:bg-red-900/30
                             transition-colors duration-200"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Request Details Modal -->
    <div
      v-if="selectedRequest"
      class="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow max-w-2xl w-full">
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-xl font-semibold text-interface-text-primary">Request Details</h3>
            <button
              @click="selectedRequest = null"
              class="text-interface-text-muted hover:text-interface-text-primary transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <h4 class="text-sm font-medium text-interface-text-secondary mb-1">User Information</h4>
              <p class="text-interface-text-primary">{{ selectedRequest.user.name }}</p>
              <p class="text-interface-text-muted">{{ selectedRequest.user.email }}</p>
            </div>

            <div>
              <h4 class="text-sm font-medium text-interface-text-secondary mb-1">Profile Type</h4>
              <p class="text-interface-text-primary">{{ selectedRequest.type }}</p>
            </div>

            <div>
              <h4 class="text-sm font-medium text-interface-text-secondary mb-1">Mission Statement</h4>
              <p class="text-interface-text-muted">{{ selectedRequest.description }}</p>
            </div>

            <div>
              <h4 class="text-sm font-medium text-interface-text-secondary mb-1">Specializations</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="skill in selectedRequest.skills"
                  :key="skill"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                         bg-space-accent-cyan-dark text-interface-text-primary"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <button
              @click="selectedRequest = null"
              class="px-4 py-2 border border-interface-border rounded-md
                     text-interface-text-muted hover:text-interface-text-primary
                     transition-colors duration-200"
            >
              Close
            </button>
            <button
              v-if="selectedRequest.status === 'pending'"
              @click="approveRequest(selectedRequest.id)"
              class="px-4 py-2 border border-green-600 rounded-md
                     text-green-400 hover:bg-green-900/30
                     transition-colors duration-200"
            >
              Approve
            </button>
            <button
              v-if="selectedRequest.status === 'pending'"
              @click="rejectRequest(selectedRequest.id)"
              class="px-4 py-2 border border-red-600 rounded-md
                     text-red-400 hover:bg-red-900/30
                     transition-colors duration-200"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { profileService } from '../services/profileService'

const searchQuery = ref('')
const selectedRequest = ref(null)
const pendingRequests = ref([])
const isLoading = ref(false)
const error = ref(null)

// Load pending requests
async function loadPendingRequests() {
  isLoading.value = true
  try {
    const requests = await profileService.getPendingRequests()
    pendingRequests.value = requests
  } catch (err) {
    error.value = err.message || 'Failed to load requests'
  } finally {
    isLoading.value = false
  }
}

// Computed properties for statistics
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

// Filter requests based on search query
const filteredRequests = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return pendingRequests.value.filter(req =>
    req.user.name.toLowerCase().includes(query) ||
    req.type.toLowerCase().includes(query) ||
    req.description.toLowerCase().includes(query)
  )
})

// Handle request actions
async function approveRequest(requestId) {
  try {
    await profileService.approveRequest(requestId)
    await loadPendingRequests()
    selectedRequest.value = null
  } catch (err) {
    error.value = err.message || 'Failed to approve request'
  }
}

async function rejectRequest(requestId) {
  try {
    await profileService.rejectRequest(requestId)
    await loadPendingRequests()
    selectedRequest.value = null
  } catch (err) {
    error.value = err.message || 'Failed to reject request'
  }
}

function viewRequest(request) {
  selectedRequest.value = request
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Load requests on component mount
onMounted(() => {
  loadPendingRequests()
})
</script>

<style scoped>
.bg-scan-lines {
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(6, 182, 212, 0.05) 50%,
    transparent 100%
  );
  background-size: 100% 4px;
  animation: scan 8s linear infinite;
}

@keyframes scan {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 100%;
  }
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: theme('colors.space.darker');
}

::-webkit-scrollbar-thumb {
  background: theme('colors.interface.border.DEFAULT');
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: theme('colors.interface.border.hover');
}
</style>
