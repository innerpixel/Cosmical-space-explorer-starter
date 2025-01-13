<template>
  <header class="sticky top-0 left-0 right-0 bg-black shadow-[0_0_20px_rgba(6,182,212,0.3)] z-[9999] border-b border-cyan-800">
    <!-- Scan Lines Effect -->
    <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

    <div class="h-20 px-0 sm:px-6 lg:px-8 relative">
      <div class="flex items-center justify-between h-full mx-2 sm:mx-0">
        <!-- Logo/Title -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="transform transition-transform duration-500 group-hover:scale-110">
            <img src="../assets/logo.svg" alt="CSMCL SPACE Logo" class="h-12 w-12" />
          </div>
          <span class="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-500 glow">CSMCL SPACE</span>
        </router-link>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/" 
            class="text-cyan-400 hover:text-cyan-300 transition-colors glow"
            :class="{ 'font-bold': currentRoute === '/' }"
          >
            Home
          </router-link>
          <router-link 
            to="/docs" 
            class="text-cyan-400 hover:text-cyan-300 transition-colors glow"
            :class="{ 'font-bold': currentRoute === '/docs' }"
          >
            Documentation
          </router-link>
          <router-link 
            v-if="isAuthenticated"
            to="/profile/request" 
            class="text-cyan-400 hover:text-cyan-300 transition-colors glow"
            :class="{ 'font-bold': currentRoute === '/profile/request' }"
          >
            Request Profile
          </router-link>
          <router-link 
            v-if="isAdmin"
            to="/admin/requests" 
            class="text-cyan-400 hover:text-cyan-300 transition-colors glow"
            :class="{ 'font-bold': currentRoute === '/admin/requests' }"
          >
            Admin
          </router-link>
        </nav>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden text-cyan-400 hover:text-cyan-300 focus:outline-none glow"
        >
          <span v-if="!isMenuOpen">☰</span>
          <span v-else>✕</span>
        </button>

        <!-- User Actions -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link 
            v-if="!isAuthenticated"
            to="/login"
            class="px-4 py-2 text-sm font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
          >
            Sign In
          </router-link>
          <div v-else class="flex items-center space-x-4">
            <span class="text-cyan-400 glow">{{ userDisplayName }}</span>
            <button 
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-if="isMenuOpen"
      class="md:hidden absolute w-full bg-black border-t border-cyan-800 shadow-[0_0_20px_rgba(6,182,212,0.3)] z-50"
    >
      <div class="px-4 py-2 space-y-2">
        <router-link 
          to="/" 
          class="block py-2 text-cyan-400 hover:text-cyan-300 hover:bg-gray-900 rounded-lg px-3 transition-colors glow"
          :class="{ 'bg-gray-900': currentRoute === '/' }"
          @click="isMenuOpen = false"
        >
          Home
        </router-link>
        <router-link 
          to="/docs" 
          class="block py-2 text-cyan-400 hover:text-cyan-300 hover:bg-gray-900 rounded-lg px-3 transition-colors glow"
          :class="{ 'bg-gray-900': currentRoute === '/docs' }"
          @click="isMenuOpen = false"
        >
          Documentation
        </router-link>
        <router-link 
          v-if="isAuthenticated"
          to="/profile/request" 
          class="block py-2 text-cyan-400 hover:text-cyan-300 hover:bg-gray-900 rounded-lg px-3 transition-colors glow"
          :class="{ 'bg-gray-900': currentRoute === '/profile/request' }"
          @click="isMenuOpen = false"
        >
          Request Profile
        </router-link>
        <router-link 
          v-if="isAdmin"
          to="/admin/requests" 
          class="block py-2 text-cyan-400 hover:text-cyan-300 hover:bg-gray-900 rounded-lg px-3 transition-colors glow"
          :class="{ 'bg-gray-900': currentRoute === '/admin/requests' }"
          @click="isMenuOpen = false"
        >
          Admin
        </router-link>
        <div class="py-2">
          <router-link
            v-if="!isAuthenticated"
            to="/login"
            class="block py-2 text-cyan-400 hover:text-cyan-300 hover:bg-gray-900 rounded-lg px-3 transition-colors glow"
            @click="isMenuOpen = false"
          >
            Sign In
          </router-link>
          <div v-else class="flex justify-between items-center px-3">
            <span class="text-cyan-400 glow">{{ userDisplayName }}</span>
            <button 
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Spacer to prevent content from being hidden under the fixed header -->
  <div class="h-20"></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const isMenuOpen = ref(false)

const isAuthenticated = computed(() => userStore.isAuthenticated)
const isAdmin = computed(() => userStore.isAdmin)
const userDisplayName = computed(() => userStore.username)
const currentRoute = computed(() => route?.path || '/')

const handleLogout = () => {
  userStore.logout()
  isMenuOpen.value = false
  router.push('/')
}
</script>

<style>
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

.glow {
  text-shadow: 0 0 10px rgba(6, 182, 212, 0.5),
               0 0 20px rgba(6, 182, 212, 0.3),
               0 0 30px rgba(6, 182, 212, 0.2);
}
</style>
