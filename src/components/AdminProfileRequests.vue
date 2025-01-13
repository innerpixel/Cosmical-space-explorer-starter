<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-2xl font-bold mb-6">Profile Requests</h2>

    <!-- Pending Requests -->
    <div class="space-y-6">
      <div v-for="request in userStore.pendingRequests" :key="request.id" 
           class="border rounded-lg p-4 space-y-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold">
              Profile Request: {{ request.type.charAt(0).toUpperCase() + request.type.slice(1) }}
            </h3>
            <p class="text-sm text-gray-500">
              Submitted: {{ new Date(request.created).toLocaleDateString() }}
            </p>
          </div>
          <span 
            class="px-3 py-1 rounded-full text-sm font-medium"
            :class="{
              'bg-yellow-100 text-yellow-800': request.status === 'pending',
              'bg-green-100 text-green-800': request.status === 'approved',
              'bg-red-100 text-red-800': request.status === 'rejected'
            }"
          >
            {{ request.status.charAt(0).toUpperCase() + request.status.slice(1) }}
          </span>
        </div>

        <div class="flex gap-4">
          <button
            @click="approveRequest(request.id)"
            :disabled="loading"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {{ loading ? 'Processing...' : 'Approve' }}
          </button>
          <button
            @click="rejectRequest(request.id)"
            :disabled="loading"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {{ loading ? 'Processing...' : 'Reject' }}
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="userStore.pendingRequests.length === 0" 
           class="text-center py-8 text-gray-500">
        No pending profile requests
      </div>
    </div>

    <!-- Error Message -->
    <div
      v-if="error"
      class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const loading = ref(false)
const error = ref(null)

async function approveRequest(requestId) {
  try {
    loading.value = true
    error.value = null
    await userStore.approveProfileRequest(requestId)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function rejectRequest(requestId) {
  try {
    loading.value = true
    error.value = null
    await userStore.rejectProfileRequest(requestId)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
