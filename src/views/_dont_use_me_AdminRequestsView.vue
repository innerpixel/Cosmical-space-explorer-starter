<template>
  <div class="min-h-screen bg-space-black pt-16">
    <!-- Scan Lines Effect -->
    <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

    <div class="container mx-auto px-4">
      <!-- Main Content Container -->
      <div class="max-w-6xl mx-auto space-y-8">
        <!-- Header Section -->
        <section class="relative w-full mb-8">
          <div class="bg-space-darker border-y border-interface-border p-8">
            <h1 class="text-3xl font-bold text-interface-text-primary mb-4">Mission Control Center</h1>
            <p class="text-interface-text-muted max-w-3xl">
              Review and manage profile access requests from our interstellar community
            </p>
          </div>
        </section>

        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-interface-text-secondary text-sm font-medium">Pending Requests</h3>
              <div class="p-2 bg-yellow-500/10 rounded-full">
                <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-interface-text-primary mt-2">
              {{ missionStore.pendingRequests.length }}
            </p>
          </div>
          
          <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-interface-text-secondary text-sm font-medium">Approved Today</h3>
              <div class="p-2 bg-green-500/10 rounded-full">
                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-interface-text-primary mt-2">
              {{ approvedToday }}
            </p>
          </div>
          
          <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-interface-text-secondary text-sm font-medium">Total Processed</h3>
              <div class="p-2 bg-purple-500/10 rounded-full">
                <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-interface-text-primary mt-2">
              {{ totalProcessed }}
            </p>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6 mb-8">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1 relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-interface-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search requests..."
                class="w-full pl-10 pr-4 py-2 bg-space-dark border border-interface-border rounded-md 
                       text-interface-text-primary placeholder-interface-text-muted/50
                       focus:outline-none focus:ring-2 focus:ring-cyan-600/50
                       transition-all duration-200"
              >
            </div>
            
            <select
              v-model="filterStatus"
              class="px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                     text-interface-text-primary
                     focus:outline-none focus:ring-2 focus:ring-cyan-600/50
                     transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <!-- Requests Table -->
        <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow overflow-hidden">
          <div class="p-6">
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
                    class="border-b border-interface-border hover:bg-space-dark/50 transition-colors duration-200"
                  >
                    <td class="py-4 px-4">
                      <div class="text-interface-text-primary font-medium">{{ request.user.name }}</div>
                      <div class="text-interface-text-muted text-sm">{{ request.user.email }}</div>
                    </td>
                    <td class="py-4 px-4">
                      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                                 bg-cyan-900/30 border border-cyan-700 text-cyan-200">
                        {{ request.type }}
                      </span>
                    </td>
                    <td class="py-4 px-4">
                      <span 
                        :class="{
                          'bg-yellow-900/30 border border-yellow-700 text-yellow-200': request.status === 'pending',
                          'bg-green-900/30 border border-green-700 text-green-200': request.status === 'approved',
                          'bg-red-900/30 border border-red-700 text-red-200': request.status === 'rejected'
                        }"
                        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                      >
                        {{ request.status }}
                      </span>
                    </td>
                    <td class="py-4 px-4 text-interface-text-muted">
                      {{ formatDate(request.date) }}
                    </td>
                    <td class="py-4 px-4 text-right space-x-2">
                      <button
                        @click="viewRequest(request)"
                        class="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium
                               bg-cyan-900/30 border border-cyan-700 hover:bg-cyan-900/50
                               text-cyan-200 transition-colors duration-200"
                      >
                        View
                      </button>
                      <button
                        v-if="request.status === 'pending'"
                        @click="approveRequest(request.id)"
                        class="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium
                               bg-green-900/30 border border-green-700 hover:bg-green-900/50
                               text-green-200 transition-colors duration-200"
                      >
                        Approve
                      </button>
                      <button
                        v-if="request.status === 'pending'"
                        @click="rejectRequest(request.id)"
                        class="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium
                               bg-red-900/30 border border-red-700 hover:bg-red-900/50
                               text-red-200 transition-colors duration-200"
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
    </div>

    <!-- Request Details Modal -->
    <div
      v-if="missionStore.selectedRequest"
      class="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow max-w-2xl w-full">
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-xl font-semibold text-interface-text-primary">Request Details</h3>
            <button
              @click="missionStore.setSelectedRequest(null)"
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
              <p class="text-interface-text-primary">{{ missionStore.selectedRequest.user.name }}</p>
              <p class="text-interface-text-muted">{{ missionStore.selectedRequest.user.email }}</p>
            </div>

            <div>
              <h4 class="text-sm font-medium text-interface-text-secondary mb-1">Profile Type</h4>
              <p class="text-interface-text-primary">{{ missionStore.selectedRequest.type }}</p>
            </div>

            <div>
              <h4 class="text-sm font-medium text-interface-text-secondary mb-1">Mission Statement</h4>
              <p class="text-interface-text-muted">{{ missionStore.selectedRequest.description }}</p>
            </div>

            <div>
              <h4 class="text-sm font-medium text-interface-text-secondary mb-1">Specializations</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="skill in missionStore.selectedRequest.skills"
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
              @click="missionStore.setSelectedRequest(null)"
              class="px-4 py-2 border border-interface-border rounded-md
                     text-interface-text-muted hover:text-interface-text-primary
                     transition-colors duration-200"
            >
              Close
            </button>
            <button
              v-if="missionStore.selectedRequest.status === 'pending'"
              @click="approveRequest(missionStore.selectedRequest.id)"
              class="px-4 py-2 border border-green-600 rounded-md
                     text-green-400 hover:bg-green-900/30
                     transition-colors duration-200"
            >
              Approve
            </button>
            <button
              v-if="missionStore.selectedRequest.status === 'pending'"
              @click="rejectRequest(missionStore.selectedRequest.id)"
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
import { useMissionControlStore } from '../stores/missionControlStore'

const missionStore = useMissionControlStore()
const searchQuery = ref('')
const filterStatus = ref('all')

// Filter requests based on search query and status
const filteredRequests = computed(() => {
  let filtered = missionStore.pendingRequests

  // Filter by status
  if (filterStatus.value !== 'all') {
    filtered = filtered.filter(req => req.status === filterStatus.value)
  }

  // Filter by search query
  const query = searchQuery.value.toLowerCase()
  return filtered.filter(req =>
    req.user?.name?.toLowerCase().includes(query) ||
    req.type?.toLowerCase().includes(query) ||
    req.description?.toLowerCase().includes(query)
  )
})

// Computed properties from store
const { approvedToday, totalProcessed, isLoading, error } = missionStore

function viewRequest(request) {
  missionStore.setSelectedRequest(request)
}

async function approveRequest(requestId) {
  try {
    await missionStore.approveRequest(requestId)
  } catch (err) {
    // Error is handled by the store
  }
}

async function rejectRequest(requestId) {
  try {
    await missionStore.rejectRequest(requestId)
  } catch (err) {
    // Error is handled by the store
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Load requests on component mount
onMounted(() => {
  missionStore.fetchPendingRequests()
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

.shadow-glow {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.1);
}

/* Add hover effect to table rows */
tr:hover .shadow-glow {
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
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
