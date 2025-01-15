<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-cyan-800/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] z-50">
    <!-- Scan Lines Effect -->
    <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

    <div class="max-w-screen-xl mx-auto px-4">
      <div class="flex items-center justify-around h-16">
        <!-- Home -->
        <router-link 
          to="/" 
          class="flex flex-col items-center space-y-1 text-cyan-400 hover:text-cyan-300 transition-all duration-300 group"
          :class="{ 'text-cyan-300': currentRoute === '/' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-xs">Home</span>
        </router-link>

        <!-- Documentation -->
        <router-link 
          to="/docs" 
          class="flex flex-col items-center space-y-1 text-cyan-400 hover:text-cyan-300 transition-all duration-300 group"
          :class="{ 'text-cyan-300': currentRoute === '/docs' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span class="text-xs">Docs</span>
        </router-link>

        <!-- Profile Request (if authenticated) -->
        <router-link 
          v-if="isAuthenticated && !isAdmin"
          to="/profile/request" 
          class="flex flex-col items-center space-y-1 text-cyan-400 hover:text-cyan-300 transition-all duration-300 group"
          :class="{ 'text-cyan-300': currentRoute === '/profile/request' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-xs">Request Profile</span>
        </router-link>

        <!-- Mission Control (if admin) -->
        <router-link 
          v-if="isAdmin"
          to="/admin/dashboard" 
          class="flex flex-col items-center space-y-1 text-cyan-400 hover:text-cyan-300 transition-all duration-300 group"
          :class="{ 'text-cyan-300': currentRoute === '/admin/dashboard' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <span class="text-xs">Mission Control</span>
        </router-link>

        <!-- Notifications (if admin) -->
        <router-link 
          v-if="isAdmin"
          to="/notifications" 
          class="flex flex-col items-center space-y-1 text-cyan-400 hover:text-cyan-300 transition-all duration-300 group"
          :class="{ 'text-cyan-300': currentRoute === '/notifications' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="text-xs">Notifications</span>
        </router-link>

        <!-- Login/Logout -->
        <div v-if="!isAuthenticated">
          <router-link 
            to="/login"
            class="flex flex-col items-center space-y-1 text-cyan-400 hover:text-cyan-300 transition-all duration-300 group"
            :class="{ 'text-cyan-300': currentRoute === '/login' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span class="text-xs">Login</span>
          </router-link>
        </div>
        <button 
          v-else
          @click="handleLogout"
          class="flex flex-col items-center space-y-1 text-cyan-400 hover:text-cyan-300 transition-all duration-300 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span class="text-xs">Logout</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const currentRoute = computed(() => route.path)
const isAuthenticated = computed(() => userStore.isAuthenticated)
const isAdmin = computed(() => userStore.isAdmin)

async function handleLogout() {
  await userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
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
</style>
