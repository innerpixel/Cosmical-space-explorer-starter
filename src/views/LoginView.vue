<template>
  <div class="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Retro TV Screen Effect -->
      <div class="relative bg-black p-8 rounded-lg border-4 border-gray-700 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
        <!-- Scan Lines Effect -->
        <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>
        
        <!-- TV Screen Content -->
        <div class="relative z-10">
          <div class="text-center">
            <img class="mx-auto h-24 w-auto animate-pulse" src="/src/assets/logo.svg" alt="CSMCL SPACE Logo">
            <h2 class="mt-6 text-center text-4xl font-extrabold text-cyan-400 glow">
              SPACE EXPLORER
            </h2>
            <p class="mt-2 text-center text-sm text-cyan-300">
              Enter Your Credentials
            </p>
          </div>
          
          <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="username" class="sr-only">Username</label>
                <input
                  id="username"
                  v-model="formData.username"
                  name="username"
                  type="text"
                  required
                  class="appearance-none rounded-t-md relative block w-full px-3 py-3 bg-gray-900 border border-cyan-700 placeholder-cyan-500 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-lg"
                  placeholder="Username"
                >
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <input
                  id="password"
                  v-model="formData.password"
                  name="password"
                  type="password"
                  required
                  class="appearance-none rounded-b-md relative block w-full px-3 py-3 bg-gray-900 border border-cyan-700 placeholder-cyan-500 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-lg"
                  placeholder="Password"
                >
              </div>
            </div>

            <div v-if="error" class="text-red-400 text-sm text-center glow-error">
              {{ error }}
            </div>

            <div>
              <button
                type="submit"
                :disabled="isLoading"
                class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-black bg-cyan-400 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              >
                <span v-if="isLoading">Initiating Login Sequence...</span>
                <span v-else>Access System</span>
              </button>
            </div>
          </form>

          <!-- Test Credentials -->
          <div class="mt-6 p-4 bg-gray-900 rounded-md border border-cyan-800">
            <h3 class="text-sm font-medium text-cyan-400">Test Access Codes:</h3>
            <div class="mt-2 space-y-2 text-xs text-cyan-300 font-mono">
              <p><strong>Admin:</strong> username: admin / password: admin</p>
              <p><strong>Developer:</strong> username: developer / password: dev123</p>
              <p><strong>User:</strong> username: user / password: user123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const formData = ref({
  username: '',
  password: ''
})

const isLoading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  isLoading.value = true
  
  try {
    await userStore.login(formData.value)
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Access Denied. Invalid Credentials.'
  } finally {
    isLoading.value = false
  }
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

.glow-error {
  text-shadow: 0 0 10px rgba(239, 68, 68, 0.5),
               0 0 20px rgba(239, 68, 68, 0.3),
               0 0 30px rgba(239, 68, 68, 0.2);
}
</style>
