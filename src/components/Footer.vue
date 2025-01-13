<template>
  <footer class="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
    <div class="h-full px-0 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 mx-2 sm:mx-0">
        <!-- Left section -->
        <div class="flex items-center space-x-4">
          <router-link 
            to="/" 
            class="text-gray-600 hover:text-emerald-600 transition-colors"
          >
            Home
          </router-link>
          <router-link 
            to="/docs" 
            class="text-gray-600 hover:text-emerald-600 transition-colors"
          >
            Documentation
          </router-link>
        </div>

        <!-- Center section -->
        <div class="flex items-center">
          <span class="text-sm text-gray-500"> 2025 CSMCL SPACE. All rights reserved.</span>
        </div>

        <!-- Right section -->
        <div class="flex items-center space-x-4">
          <button 
            v-if="showInstallButton"
            @click="installPWA"
            class="flex items-center gap-2 px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Install App
          </button>
          <span v-if="isPWA" class="text-sm text-emerald-600">
            Installed
          </span>
        </div>
      </div>
    </div>
  </footer>

  <!-- Add padding to main content to prevent overlap -->
  <div class="h-16"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showInstallButton = ref(false)
const isPWA = ref(false)
let deferredPrompt = null

// Handle PWA installation
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e
  showInstallButton.value = true
})

async function installPWA() {
  if (!deferredPrompt) return
  
  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
  
  if (outcome === 'accepted') {
    console.log('PWA installed')
    showInstallButton.value = false
  }
  
  deferredPrompt = null
}

// Check if running as PWA
window.addEventListener('appinstalled', () => {
  showInstallButton.value = false
  isPWA.value = true
})

onMounted(() => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    isPWA.value = true
  }
})
</script>
