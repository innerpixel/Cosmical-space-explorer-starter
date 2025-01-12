<!-- PWA install button and update notification -->
<template>
  <div class="fixed bottom-4 right-4 flex flex-col gap-2">
    <!-- Install button -->
    <button
      v-if="showInstallButton"
      @click="installPWA"
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
      Install App
    </button>

    <!-- Update notification -->
    <button
      v-if="showUpdateButton"
      @click="updatePWA"
      class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
      </svg>
      Update Available
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const deferredPrompt = ref(null)
const showInstallButton = ref(false)
const showUpdateButton = ref(false)

// Handle PWA installation
onMounted(() => {
  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    showInstallButton.value = true
  })

  // Listen for service worker updates
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateButton.value = true
          }
        })
      })
    })
  }
})

// Install PWA function
const installPWA = async () => {
  if (!deferredPrompt.value) return
  
  try {
    await deferredPrompt.value.prompt()
    const choiceResult = await deferredPrompt.value.userChoice
    
    if (choiceResult.outcome === 'accepted') {
      console.log('PWA installed successfully')
    }
    deferredPrompt.value = null
    showInstallButton.value = false
  } catch (error) {
    console.error('Error installing PWA:', error)
  }
}

// Update PWA function
const updatePWA = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready
    await registration.update()
    showUpdateButton.value = false
    window.location.reload()
  }
}
</script>
