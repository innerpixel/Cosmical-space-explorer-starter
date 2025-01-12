<template>
  <header class="fixed top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-green-600 z-50">
    <div class="max-w-7xl mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo/Title -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center p-2">
            <img src="/icons/favicon.svg" alt="Logo" class="w-full h-full" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">Vue PWA</h1>
            <p class="text-xs text-emerald-100">Progressive Web App</p>
          </div>
        </div>

        <!-- Right section with install button -->
        <div class="flex items-center gap-4">
          <!-- Install Button -->
          <button
            v-if="showInstallButton"
            @click="installPWA"
            class="bg-white text-emerald-600 px-4 py-2 rounded-lg text-sm font-medium 
                   flex items-center gap-2 transition-all duration-300
                   hover:bg-emerald-50 hover:shadow-lg transform hover:scale-105
                   active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Install App
          </button>

          <!-- Installed Badge -->
          <div v-if="isPWA" class="flex items-center gap-2 text-white bg-emerald-400 bg-opacity-20 px-3 py-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm font-medium">Installed</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// PWA Installation
const deferredPrompt = ref(null)
const showInstallButton = ref(false)
const isPWA = ref(window.matchMedia('(display-mode: standalone)').matches)

// Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  // Don't prevent default anymore, let the browser handle it
  deferredPrompt.value = e
  showInstallButton.value = true
})

const installPWA = async () => {
  if (!deferredPrompt.value) {
    console.log('Installation prompt not available')
    return
  }

  try {
    // Show the install prompt
    const result = await deferredPrompt.value.prompt()
    console.log('Install prompt shown')
    
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.value.userChoice
    console.log('User choice:', choiceResult.outcome)
    
    if (choiceResult.outcome === 'accepted') {
      console.log('PWA installed successfully')
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
  console.log('PWA installed')
  showInstallButton.value = false
  isPWA.value = true
  deferredPrompt.value = null
})

window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
  isPWA.value = e.matches
})
</script>

<style scoped>
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
