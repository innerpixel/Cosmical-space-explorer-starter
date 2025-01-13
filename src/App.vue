<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Bar -->
    <TopBar />
    
    <!-- Spacer div to prevent content from slipping under navbar -->
    <div class="h-20"></div>
    
    <!-- Main Content -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <!-- Content wrapper with responsive padding -->
      <div class="max-w-7xl mx-auto space-y-8">
        <router-view></router-view>
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import TopBar from './components/TopBar.vue'
import Footer from './components/Footer.vue'
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
  --primary-50: #eef2ff;
  --primary-100: #e0e7ff;
  --primary-200: #c7d2fe;
  --primary-300: #a5b4fc;
  --primary-400: #818cf8;
  --primary-500: #6366f1;
  --primary-600: #4f46e5;
  --primary-700: #4338ca;
  --primary-800: #3730a3;
  --primary-900: #312e81;
  
  --secondary-50: #f8fafc;
  --secondary-100: #f1f5f9;
  --secondary-200: #e2e8f0;
  --secondary-300: #cbd5e1;
  --secondary-400: #94a3b8;
  --secondary-500: #64748b;
  --secondary-600: #475569;
  --secondary-700: #334155;
  --secondary-800: #1e293b;
  --secondary-900: #0f172a;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
               Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
               sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  overflow-y: auto;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Responsive padding adjustments */
@media (max-width: 640px) {
  .container {
    padding-top: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .container {
    padding-top: 2rem;
  }
}

@media (min-width: 1025px) {
  .container {
    padding-top: 3rem;
  }
}
</style>
