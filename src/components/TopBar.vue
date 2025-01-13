<template>
  <header class="sticky top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 h-20 shadow-lg z-[9999]">
    <div class="h-full px-0 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-full mx-2 sm:mx-0">
        <!-- Logo/Title -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="transform transition-transform duration-500 group-hover:scale-110">
            <img src="../assets/logo.svg" alt="CSMCL SPACE Logo - Interactive space exploration logo with mouse-following rocket" class="h-14 w-14" />
          </div>
          <span class="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-500">CSMCL SPACE</span>
        </router-link>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/" 
            class="text-gray-100 hover:text-white hover:underline transition-colors"
            :class="{ 'font-bold': $route.path === '/' }"
          >
            Home
          </router-link>
          <router-link 
            to="/docs" 
            class="text-gray-100 hover:text-white hover:underline transition-colors"
            :class="{ 'font-bold': $route.path === '/docs' }"
          >
            Documentation
          </router-link>
          <router-link 
            v-if="isAuthenticated"
            to="/profile/request" 
            class="text-gray-100 hover:text-white hover:underline transition-colors"
            :class="{ 'font-bold': $route.path === '/profile/request' }"
          >
            Request Profile
          </router-link>
          <router-link 
            v-if="isAdmin"
            to="/admin/requests" 
            class="text-gray-100 hover:text-white hover:underline transition-colors"
            :class="{ 'font-bold': $route.path === '/admin/requests' }"
          >
            Admin
          </router-link>
        </nav>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden text-white hover:text-gray-200 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- User Actions -->
        <div class="hidden md:flex items-center space-x-4">
          <button 
            v-if="!isAuthenticated"
            @click="login"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400 rounded-lg transition-colors"
          >
            Sign In
          </button>
          <div v-else class="flex items-center space-x-4">
            <span class="text-white">{{ username }}</span>
            <button 
              @click="logout"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400 rounded-lg transition-colors"
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
      class="md:hidden absolute top-20 left-0 right-0 bg-indigo-600 shadow-lg z-50"
    >
      <div class="px-4 py-2 space-y-2">
        <router-link 
          to="/" 
          class="block py-2 text-gray-100 hover:text-white hover:bg-indigo-500 rounded-lg px-3 transition-colors"
          :class="{ 'font-bold': $route.path === '/' }"
          @click="isMenuOpen = false"
        >
          Home
        </router-link>
        <router-link 
          to="/docs" 
          class="block py-2 text-gray-100 hover:text-white hover:bg-indigo-500 rounded-lg px-3 transition-colors"
          :class="{ 'font-bold': $route.path === '/docs' }"
          @click="isMenuOpen = false"
        >
          Documentation
        </router-link>
        <router-link 
          v-if="isAuthenticated"
          to="/profile/request" 
          class="block py-2 text-gray-100 hover:text-white hover:bg-indigo-500 rounded-lg px-3 transition-colors"
          :class="{ 'font-bold': $route.path === '/profile/request' }"
          @click="isMenuOpen = false"
        >
          Request Profile
        </router-link>
        <router-link 
          v-if="isAdmin"
          to="/admin/requests" 
          class="block py-2 text-gray-100 hover:text-white hover:bg-indigo-500 rounded-lg px-3 transition-colors"
          :class="{ 'font-bold': $route.path === '/admin/requests' }"
          @click="isMenuOpen = false"
        >
          Admin
        </router-link>
        <div class="pt-2 border-t border-indigo-500">
          <button 
            v-if="!isAuthenticated"
            @click="login"
            class="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400 rounded-lg transition-colors"
          >
            Sign In
          </button>
          <div v-else class="space-y-2">
            <span class="block text-white px-3">{{ username }}</span>
            <button 
              @click="logout"
              class="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400 rounded-lg transition-colors"
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

const userStore = useUserStore()
const isMenuOpen = ref(false)

const isAuthenticated = computed(() => userStore.isAuthenticated)
const isAdmin = computed(() => userStore.isAdmin)
const username = computed(() => userStore.username)

const login = () => {
  userStore.login()
}

const logout = () => {
  userStore.logout()
  isMenuOpen.value = false
}
</script>
