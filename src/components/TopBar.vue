<template>
  <header class="sticky top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 h-20 shadow-lg z-[9999]">
    <div class="h-full px-0 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-full mx-2 sm:mx-0">
        <!-- Logo/Title -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="transform transition-transform duration-500 group-hover:scale-110">
            <img src="../assets/logo.svg" alt="CSMCL SPACE Logo" class="h-12 w-12" />
          </div>
          <span class="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-500">CSMCL SPACE</span>
        </router-link>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/" 
            class="text-gray-100 hover:text-white hover:underline transition-colors"
            :class="{ 'font-bold': currentRoute === '/' }"
          >
            Home
          </router-link>
          <router-link 
            to="/docs" 
            class="text-gray-100 hover:text-white hover:underline transition-colors"
            :class="{ 'font-bold': currentRoute === '/docs' }"
          >
            Documentation
          </router-link>
          <router-link 
            v-if="isAuthenticated"
            to="/profile/request" 
            class="text-gray-100 hover:text-white hover:underline transition-colors"
            :class="{ 'font-bold': currentRoute === '/profile/request' }"
          >
            Request Profile
          </router-link>
          <router-link 
            v-if="isAdmin"
            to="/admin/requests" 
            class="text-gray-100 hover:text-white hover:underline transition-colors"
            :class="{ 'font-bold': currentRoute === '/admin/requests' }"
          >
            Admin
          </router-link>
        </nav>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden text-white hover:text-gray-200 focus:outline-none"
        >
          <span v-if="!isMenuOpen">☰</span>
          <span v-else>✕</span>
        </button>

        <!-- User Actions -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link 
            v-if="!isAuthenticated"
            to="/login"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400 rounded-lg transition-colors"
          >
            Sign In
          </router-link>
          <div v-else class="flex items-center space-x-4">
            <span class="text-white">{{ userDisplayName }}</span>
            <button 
              @click="handleLogout"
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
          :class="{ 'bg-indigo-500': currentRoute === '/' }"
          @click="isMenuOpen = false"
        >
          Home
        </router-link>
        <router-link 
          to="/docs" 
          class="block py-2 text-gray-100 hover:text-white hover:bg-indigo-500 rounded-lg px-3 transition-colors"
          :class="{ 'bg-indigo-500': currentRoute === '/docs' }"
          @click="isMenuOpen = false"
        >
          Documentation
        </router-link>
        <router-link 
          v-if="isAuthenticated"
          to="/profile/request" 
          class="block py-2 text-gray-100 hover:text-white hover:bg-indigo-500 rounded-lg px-3 transition-colors"
          :class="{ 'bg-indigo-500': currentRoute === '/profile/request' }"
          @click="isMenuOpen = false"
        >
          Request Profile
        </router-link>
        <router-link 
          v-if="isAdmin"
          to="/admin/requests" 
          class="block py-2 text-gray-100 hover:text-white hover:bg-indigo-500 rounded-lg px-3 transition-colors"
          :class="{ 'bg-indigo-500': currentRoute === '/admin/requests' }"
          @click="isMenuOpen = false"
        >
          Admin
        </router-link>
        <div class="py-2">
          <router-link
            v-if="!isAuthenticated"
            to="/login"
            class="block py-2 text-gray-100 hover:text-white hover:bg-indigo-500 rounded-lg px-3 transition-colors"
            @click="isMenuOpen = false"
          >
            Sign In
          </router-link>
          <div v-else class="flex justify-between items-center px-3">
            <span class="text-white">{{ userDisplayName }}</span>
            <button 
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400 rounded-lg transition-colors"
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
const userDisplayName = computed(() => userStore.userDisplayName)
const currentRoute = computed(() => route?.path || '/')

const handleLogout = () => {
  userStore.logout()
  isMenuOpen.value = false
  router.push('/')
}
</script>
