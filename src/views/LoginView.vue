<template>
  <div class="min-h-screen bg-space-black pt-16">
    <!-- Scan Lines Effect -->
    <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto bg-space-darker rounded-lg shadow-glow border border-interface-border overflow-hidden">
        <!-- Logo Section -->
        <div class="p-8 text-center">
          <img src="../assets/logo.svg" alt="Logo" class="w-32 h-32 mx-auto mb-4 animate-pulse-slow">
          <h1 class="text-3xl font-bold text-interface-text-primary animate-glow-pulse mb-2">
            Cosmical Space Explorer
          </h1>
          <p class="text-interface-text-muted">Enter your credentials to continue</p>
        </div>

        <!-- Login Form -->
        <div class="p-8 pt-0">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-interface-text-secondary mb-1">
                Email Address
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="w-full px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                       text-interface-text-primary placeholder-interface-text-muted/50
                       focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                       transition-all duration-200"
                placeholder="Enter your email"
              >
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-interface-text-secondary mb-1">
                Password
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="w-full px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                       text-interface-text-primary placeholder-interface-text-muted/50
                       focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                       transition-all duration-200"
                placeholder="Enter your password"
              >
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="rememberMe"
                  type="checkbox"
                  class="h-4 w-4 bg-space-dark border-interface-border rounded 
                         text-interface-button-primary focus:ring-interface-button-hover
                         transition-colors duration-200"
                >
                <label for="remember-me" class="ml-2 block text-sm text-interface-text-muted">
                  Remember me
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="text-interface-text-primary hover:text-interface-text-secondary transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            <div v-if="error" class="mt-4">
              <p class="text-red-500 text-sm">{{ error }}</p>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full py-2 px-4 bg-space-accent-cyan hover:bg-space-accent-cyan-dark 
                     text-white font-semibold rounded-md shadow-glow-cyan
                     transition-all duration-200 disabled:opacity-50"
            >
              <span v-if="loading">Logging in...</span>
              <span v-else>Login</span>
            </button>
          </form>
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

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  
  try {
    await userStore.login({
      email: email.value,
      password: password.value
    })
    router.push('/')
  } catch (err) {
    console.error('Login error:', err)
    error.value = err.message || 'Failed to login. Please check your credentials and try again.'
  } finally {
    loading.value = false
  }
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
