<template>
  <footer class="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Left section -->
        <div class="flex items-center space-x-4">
          <router-link 
            to="/" 
            class="text-gray-600 hover:text-emerald-600 transition-colors"
          >
            Home
          </router-link>
          <router-link 
            v-if="isAdmin"
            to="/admin" 
            class="text-gray-600 hover:text-emerald-600 transition-colors"
          >
            Admin
          </router-link>
        </div>

        <!-- Center section -->
        <div class="flex items-center">
          <span class="text-sm text-gray-500">© 2025 CSMCL SPACE. All rights reserved.</span>
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
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const isAdmin = computed(() => userStore.isAdmin)

// PWA Installation
const deferredPrompt = ref(null)
const showInstallButton = ref(false)
const isPWA = ref(window.matchMedia('(display-mode: standalone)').matches)

// Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  deferredPrompt.value = e
  showInstallButton.value = true
})

const installPWA = async () => {
  if (!deferredPrompt.value) return

  try {
    const result = await deferredPrompt.value.prompt()
    const choiceResult = await deferredPrompt.value.userChoice
    
    if (choiceResult.outcome === 'accepted') {
      showInstallButton.value = false
      isPWA.value = true
    }
  } catch (err) {
    console.error('Error installing PWA:', err)
  } finally {
    deferredPrompt.value = null
  }
}

// Check if running as PWA
window.addEventListener('appinstalled', () => {
  showInstallButton.value = false
  isPWA.value = true
  deferredPrompt.value = null
})

window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
  isPWA.value = e.matches
})
</script>
