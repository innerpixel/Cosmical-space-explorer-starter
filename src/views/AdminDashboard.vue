<template>
  <div class="min-h-screen bg-space-black pt-16">
    <!-- Header Section -->
    <div class="relative w-full mb-8">
      <div class="bg-space-darker border-y border-interface-border p-8">
        <h1 class="text-3xl font-bold text-interface-text-primary mb-4">Mission Control Dashboard</h1>
        <p class="text-interface-text-muted max-w-3xl">
          Central command center for managing space exploration operations and crew profiles.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 md:px-6 lg:px-8">
      <!-- Scan Lines Effect -->
      <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto">
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-interface-text-secondary text-sm font-medium">Active Missions</h3>
              <div class="p-2 bg-cyan-500/10 rounded-full">
                <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-interface-text-primary mt-2">12</p>
          </div>

          <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-interface-text-secondary text-sm font-medium">Pending Requests</h3>
              <div class="p-2 bg-yellow-500/10 rounded-full">
                <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-interface-text-primary mt-2">{{ pendingRequests }}</p>
          </div>

          <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-interface-text-secondary text-sm font-medium">Active Crew</h3>
              <div class="p-2 bg-green-500/10 rounded-full">
                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-interface-text-primary mt-2">48</p>
          </div>

          <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-interface-text-secondary text-sm font-medium">System Status</h3>
              <div class="p-2 bg-purple-500/10 rounded-full">
                <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-interface-text-primary mt-2">100%</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <!-- Mission Control -->
          <router-link 
            to="/admin/mission-control"
            class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6 hover:border-cyan-600/50 transition-colors duration-300"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h2 class="text-xl font-semibold text-interface-text-primary mb-2">Mission Control Center</h2>
                <p class="text-interface-text-muted">Review and manage profile access requests</p>
              </div>
              <div class="p-3 bg-cyan-500/10 rounded-full">
                <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-interface-text-muted">{{ pendingRequests }} pending requests</span>
              <span class="text-cyan-400">View Center →</span>
            </div>
          </router-link>

          <!-- Notifications -->
          <router-link 
            to="/admin/notifications"
            class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6 hover:border-purple-600/50 transition-colors duration-300"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h2 class="text-xl font-semibold text-interface-text-primary mb-2">Notifications Center</h2>
                <p class="text-interface-text-muted">Manage and send system notifications</p>
              </div>
              <div class="p-3 bg-purple-500/10 rounded-full">
                <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-interface-text-muted">3 unread notifications</span>
              <span class="text-purple-400">View Center →</span>
            </div>
          </router-link>
        </div>

        <!-- Recent Activity -->
        <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6">
          <h2 class="text-xl font-semibold text-interface-text-primary mb-6">Recent Activity</h2>
          <div class="space-y-4">
            <div v-for="(activity, index) in recentActivity" :key="index" class="flex items-start space-x-4">
              <div :class="[
                'p-2 rounded-full',
                {
                  'bg-green-500/10': activity.type === 'approval',
                  'bg-red-500/10': activity.type === 'rejection',
                  'bg-blue-500/10': activity.type === 'notification',
                }
              ]">
                <svg class="w-5 h-5" :class="[
                  {
                    'text-green-400': activity.type === 'approval',
                    'text-red-400': activity.type === 'rejection',
                    'text-blue-400': activity.type === 'notification',
                  }
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="activity.type === 'approval'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path v-if="activity.type === 'rejection'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path v-if="activity.type === 'notification'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-interface-text-primary">{{ activity.message }}</p>
                <p class="text-sm text-interface-text-muted">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMissionControlStore } from '../stores/missionControlStore'

const missionStore = useMissionControlStore()
const pendingRequests = ref(0)

const recentActivity = ref([
  {
    type: 'approval',
    message: 'Approved Explorer profile request for John Doe',
    time: '5 minutes ago'
  },
  {
    type: 'notification',
    message: 'Sent system maintenance notification to all users',
    time: '1 hour ago'
  },
  {
    type: 'rejection',
    message: 'Rejected invalid profile request from Jane Smith',
    time: '2 hours ago'
  },
  {
    type: 'approval',
    message: 'Approved Scientist profile request for Mike Johnson',
    time: '3 hours ago'
  }
])

onMounted(async () => {
  try {
    await missionStore.fetchPendingRequests()
    pendingRequests.value = missionStore.pendingRequests.length
  } catch (error) {
    console.error('Failed to fetch pending requests:', error)
  }
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
</style>
