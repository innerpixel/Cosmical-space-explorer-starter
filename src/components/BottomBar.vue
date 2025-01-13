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
          v-if="isAuthenticated"
          to="/profile/request" 
          class="flex flex-col items-center space-y-1 text-cyan-400 hover:text-cyan-300 transition-all duration-300 group"
          :class="{ 'text-cyan-300': currentRoute === '/profile/request' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-xs">Profile</span>
        </router-link>

        <!-- Admin (if admin) -->
        <router-link 
          v-if="isAdmin"
          to="/admin/requests" 
          class="flex flex-col items-center space-y-1 text-cyan-400 hover:text-cyan-300 transition-all duration-300 group"
          :class="{ 'text-cyan-300': currentRoute === '/admin/requests' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="text-xs">Admin</span>
        </router-link>

        <!-- Login/Logout -->
        <div v-if="!isAuthenticated">
          <router-link 
            to="/login"
            class="flex flex-col items-center space-y-1 text-cyan-400 hover:text-cyan-300 transition-all duration-300 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span class="text-xs">Login</span>
          </router-link>
        </div>
        <div v-else>
          <button 
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
    </div>
  </nav>

  <!-- Spacer to prevent content from being hidden under the fixed nav -->
  <div class="h-16"></div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const route = useRoute()
const userStore = useUserStore()

const currentRoute = computed(() => route.path)
const isAuthenticated = computed(() => userStore.isAuthenticated)
const isAdmin = computed(() => userStore.isAdmin)

const handleLogout = () => {
  userStore.logout()
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
  from { background-position: 0 0; }
  to { background-position: 0 100%; }
}
</style>
