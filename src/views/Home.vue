<template>
  <div class="max-w-7xl mx-auto">
    <!-- Welcome Card -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-emerald-100
                transform hover:scale-[1.01] transition-all duration-300">
      <h2 class="text-2xl sm:text-3xl font-bold text-emerald-800 mb-2">CSMCL SPACE - Welcome</h2>
      <p class="text-lg text-gray-600">STARTER TEMPLATE FOR PWA - A modern Progressive Web App template built with Vue 3 and Vite</p>
    </div>
    
    <!-- Feature Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Mobile First Card -->
      <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow
                  border-l-4 border-emerald-500">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800">Mobile First</h3>
        </div>
        <p class="text-gray-600">Optimized for all screen sizes with responsive design</p>
      </div>

      <!-- PWA Ready Card -->
      <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow
                  border-l-4 border-emerald-500">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800">PWA Ready</h3>
        </div>
        <p class="text-gray-600">Install as a native app with offline capabilities</p>
      </div>

      <!-- Offline Support Card -->
      <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow
                  border-l-4 border-emerald-500">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800">Offline Support</h3>
        </div>
        <p class="text-gray-600">Works without internet connection</p>
      </div>
    </div>

    <div class="mt-8 flex flex-col items-center justify-center md:justify-center">
      <NotificationDemo />
    </div>
  </div>
</template>

<script setup>
import NotificationDemo from '../components/NotificationDemo.vue'
</script>
