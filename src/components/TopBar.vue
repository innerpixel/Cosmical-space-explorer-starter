<template>
  <header class="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 z-50 h-20 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div class="flex items-center justify-between h-full">
        <!-- Logo/Title -->
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center p-2 shrink-0">
            <img src="/icons/favicon.svg" alt="Logo" class="w-full h-full" />
          </div>
          <div class="hidden sm:block">
            <h1 class="text-xl md:text-2xl font-bold text-white">Vue PWA</h1>
            <p class="text-xs md:text-sm text-indigo-100">Progressive Web App</p>
          </div>
        </div>

        <!-- Right section with dropdown -->
        <div class="flex items-center gap-2 sm:gap-4">
          <!-- User Dropdown -->
          <div class="relative">
            <button 
              @click="isDropdownOpen = !isDropdownOpen"
              class="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <span class="hidden sm:inline">{{ userStore.userDisplayName }}</span>
              <span class="sm:hidden">Menu</span>
              <svg 
                class="w-5 h-5 transition-transform"
                :class="{ 'rotate-180': isDropdownOpen }"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div 
              v-show="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5"
            >
              <router-link 
                v-if="isAdmin"
                to="/admin"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                @click="isDropdownOpen = false"
              >
                Admin Dashboard
              </router-link>
              <button 
                @click="logout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
              >
                Logout
              </button>
            </div>
          </div>

          <!-- Install Button -->
          <button
            v-if="showInstallButton"
            @click="installPWA"
            class="hidden sm:flex items-center gap-2 bg-white text-indigo-600 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium 
                   transition-all duration-300 hover:bg-indigo-50 hover:shadow-lg transform hover:scale-105
                   active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span class="hidden md:inline">Install App</span>
          </button>

          <!-- Mobile Install Button -->
          <button
            v-if="showInstallButton"
            @click="installPWA"
            class="sm:hidden flex items-center justify-center w-10 h-10 bg-white text-indigo-600 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>

          <!-- Installed Badge -->
          <div v-if="isPWA" class="hidden sm:flex items-center gap-2 text-white bg-indigo-400 bg-opacity-20 px-3 py-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm font-medium">Installed</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Backdrop for dropdown -->
  <div 
    v-if="isDropdownOpen"
    class="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
    @click="isDropdownOpen = false"
  ></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const isAdmin = computed(() => userStore.isAdmin)
const isDropdownOpen = ref(false)

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

const logout = () => {
  userStore.logout()
  isDropdownOpen.value = false
  router.push('/')
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

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
