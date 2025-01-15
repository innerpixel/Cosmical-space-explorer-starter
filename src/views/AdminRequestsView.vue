<template>
  <div class="min-h-screen bg-space-black pt-16">
    <div class="w-full">
      <!-- Mission Control Header -->
      <div class="relative w-full mb-8">
        <div class="bg-space-darker border-y border-interface-border p-8">
          <h1 class="text-3xl font-bold text-interface-text-primary mb-4">Mission Control Center</h1>
          <p class="text-interface-text-muted max-w-3xl">Manage and process explorer profile requests and clearance levels.</p>
        </div>
      </div>

      <!-- Mission Control Content -->
      <div class="px-4 md:px-6 lg:px-8">
        <!-- Scan Lines Effect -->
        <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Control Panel Sidebar -->
            <div class="lg:col-span-1">
              <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6 sticky top-24">
                <h2 class="text-xl font-semibold text-interface-text-primary mb-4">Control Panel</h2>
                <nav class="space-y-4">
                  <div v-for="(stat, index) in requestStats" :key="index" 
                       class="p-4 bg-space-dark rounded-lg border border-interface-border">
                    <h3 class="text-interface-text-muted text-sm mb-1">{{ stat.label }}</h3>
                    <p class="text-2xl font-bold text-interface-text-primary">{{ stat.value }}</p>
                  </div>
                  
                  <div class="pt-4">
                    <h3 class="text-interface-text-primary mb-2">Quick Filters</h3>
                    <div class="space-y-2">
                      <button v-for="filter in filters" :key="filter.id"
                              :class="[
                                'w-full text-left px-3 py-2 rounded transition-colors duration-200',
                                activeFilter === filter.id 
                                  ? 'bg-primary-600 text-white' 
                                  : 'text-interface-text-muted hover:text-interface-text-primary'
                              ]"
                              @click="setFilter(filter.id)">
                        {{ filter.label }}
                      </button>
                    </div>
                  </div>
                </nav>
              </div>
            </div>

            <!-- Main Content Area -->
            <div class="lg:col-span-3 space-y-8">
              <!-- Search and Actions Bar -->
              <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6">
                <div class="flex flex-col sm:flex-row gap-4">
                  <div class="flex-1">
                    <input type="text" 
                           v-model="searchQuery"
                           placeholder="Search requests..." 
                           class="w-full bg-space-dark border border-interface-border rounded-lg px-4 py-2 text-interface-text-primary focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                  </div>
                  <div class="flex gap-2">
                    <button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                      Bulk Approve
                    </button>
                    <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                      Bulk Reject
                    </button>
                  </div>
                </div>
              </div>

              <!-- Requests List -->
              <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow">
                <div class="p-6" v-if="loading">
                  <div class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                  </div>
                </div>

                <div v-else-if="requests.length === 0" class="p-6 text-center text-interface-text-muted">
                  No requests found matching your criteria.
                </div>

                <div v-else class="divide-y divide-interface-border">
                  <div v-for="request in filteredRequests" 
                       :key="request.id" 
                       class="p-6 hover:bg-space-dark transition-colors duration-200">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <h3 class="text-lg font-semibold text-interface-text-primary mb-2">
                          {{ request.user.name }}
                        </h3>
                        <p class="text-interface-text-muted mb-2">
                          Requested Level: {{ request.requestedLevel }}
                        </p>
                        <p class="text-sm text-interface-text-muted">
                          Submitted: {{ formatDate(request.submittedAt) }}
                        </p>
                      </div>
                      <div class="flex gap-2">
                        <button @click="approveRequest(request.id)"
                                class="px-3 py-1 bg-green-600/20 text-green-400 border border-green-600/30 rounded hover:bg-green-600/30 transition-colors duration-200">
                          Approve
                        </button>
                        <button @click="rejectRequest(request.id)"
                                class="px-3 py-1 bg-red-600/20 text-red-400 border border-red-600/30 rounded hover:bg-red-600/30 transition-colors duration-200">
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMissionControlStore } from '../stores/missionControlStore'
import { storeToRefs } from 'pinia'

const missionControl = useMissionControlStore()
const { pendingRequests: requests, isLoading: loading } = storeToRefs(missionControl)
const { approveRequest, rejectRequest, fetchPendingRequests } = missionControl

const searchQuery = ref('')
const activeFilter = ref('all')

// Request statistics
const requestStats = computed(() => [
  { label: 'Pending Requests', value: requests.value.length },
  { label: 'Processed Today', value: missionControl.approvedToday },
  { label: 'Total Processed', value: missionControl.totalProcessed }
])

// Quick filters
const filters = [
  { id: 'all', label: 'All Requests' },
  { id: 'pending', label: 'Pending' },
  { id: 'high-priority', label: 'High Priority' },
  { id: 'low-priority', label: 'Low Priority' }
]

// Filtered and searched requests
const filteredRequests = computed(() => {
  let filtered = [...requests.value]
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(request => 
      request.user.name.toLowerCase().includes(query) ||
      request.requestedLevel.toString().includes(query)
    )
  }
  
  // Apply status filter
  switch (activeFilter.value) {
    case 'pending':
      filtered = filtered.filter(request => !request.processed)
      break
    case 'high-priority':
      filtered = filtered.filter(request => request.requestedLevel >= 3)
      break
    case 'low-priority':
      filtered = filtered.filter(request => request.requestedLevel < 3)
      break
  }
  
  return filtered
})

const setFilter = (filterId) => {
  activeFilter.value = filterId
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Fetch requests on component mount
fetchPendingRequests()
</script>

<style scoped>
.bg-scan-lines {
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.05) 0px,
    rgba(255, 255, 255, 0.05) 1px,
    transparent 1px,
    transparent 2px
  );
}
</style>
