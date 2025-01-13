<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Bar -->
    <TopBar />
    
    <!-- Main Content (with padding for top bar) -->
    <main class="w-full px-4 py-4 sm:py-6 md:py-8 mt-16">
      <div class="max-w-7xl mx-auto">

        <!-- Welcome Card -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-emerald-100
                    transform hover:scale-[1.01] transition-all duration-300">
          <h2 class="text-2xl sm:text-3xl font-bold text-emerald-800 mb-2">CSMCL SPACE - Welcome</h2>
          <p class="text-lg text-gray-600">STARTER TEMPLATE FOR PWA - A modern Progressive Web App template built with Vue 3 and Vite</p>
        </div>
        
        <!-- Feature Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Mobile First Card -->
          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow
                      border-l-4 border-emerald-500">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800">Mobile First</h3>
            </div>
            <p class="text-gray-600">Optimized for all screen sizes with responsive design</p>
          </div>

          <!-- PWA Ready Card -->
          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow
                      border-l-4 border-emerald-500">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800">PWA Ready</h3>
            </div>
            <p class="text-gray-600">Install as a native app with offline capabilities</p>
          </div>

          <!-- Offline Support Card -->
          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow
                      border-l-4 border-emerald-500">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800">Offline Support</h3>
            </div>
            <p class="text-gray-600">Works without internet connection</p>
          </div>
        </div>
      </div>
      <div class="mt-8 flex justify-center" >
                <NotificationDemo />
      </div>
      <!-- Update Notification -->
      <div v-if="updateAvailable" 
           class="fixed bottom-4 right-4 z-50">
        <button 
          @click="updateServiceWorker" 
          class="bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg
                 flex items-center gap-2 transform hover:scale-105 transition-all
                 hover:bg-emerald-700 active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
          </svg>
          Update Available
        </button>
      </div>
    </main>
  
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import TopBar from './components/TopBar.vue'
import NotificationDemo from './components/NotificationDemo.vue'
import { initializePushNotifications } from './services/notifications'

const updateAvailable = ref(false)
let updateSW = null

// FAQ state management
const openFaqs = ref({
  what: false,
  install: false,
  offline: false,
  updates: false
})

const toggleFaq = (key) => {
  openFaqs.value[key] = !openFaqs.value[key]
}

onMounted(async () => {
  // Register service worker
  const { updateServiceWorker } = registerSW({
    onNeedRefresh() {
      updateAvailable.value = true
    },
    onOfflineReady() {
      console.log('App ready to work offline')
    },
  })
  updateSW = updateServiceWorker

  // Initialize push notifications
  try {
    const subscription = await initializePushNotifications()
    if (subscription) {
      console.log('Push notifications initialized successfully')
    }
  } catch (error) {
    console.error('Failed to initialize push notifications:', error)
  }
})

const updateServiceWorker = () => {
  updateSW?.()
}
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

:root {
  --emerald-50: #ecfdf5;
  --emerald-100: #d1fae5;
  --emerald-500: #10b981;
  --emerald-600: #059669;
  --emerald-700: #047857;
  --emerald-800: #065f46;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
               Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
               sans-serif;
}
</style>
