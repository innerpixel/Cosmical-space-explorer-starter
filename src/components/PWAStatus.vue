<template>
  <footer class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
    <div class="max-w-7xl mx-auto px-4 py-3">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <!-- Online/Offline Status -->
        <div class="flex items-center gap-2">
          <div :class="[
            'w-3 h-3 rounded-full',
            isOnline ? 'bg-green-500' : 'bg-red-500'
          ]"></div>
          <span class="text-sm text-gray-600">
            {{ isOnline ? 'Online' : 'Offline' }}
          </span>
        </div>

        <!-- Update Button -->
        <div v-if="needRefresh" class="flex-shrink-0">
          <button
            @click="updateServiceWorker()"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
            Update Available
          </button>
        </div>

        <!-- Cache Status -->
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm text-gray-600">{{ offlineReady ? 'Ready for offline' : 'Caching...' }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { registerSW } from 'virtual:pwa-register'

// Online/Offline status
const isOnline = ref(navigator.onLine)
const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

// PWA Updates
const needRefresh = ref(false)
const offlineReady = ref(false)

const updateServiceWorker = registerSW({
  onNeedRefresh() {
    needRefresh.value = true
  },
  onOfflineReady() {
    offlineReady.value = true
  }
})
</script>
