<template>
  <div class="min-h-screen bg-space-black pt-16">
    <!-- Scan Lines Effect -->
    <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

    <div class="container mx-auto px-4">
      <!-- Main Content Container -->
      <div class="max-w-6xl mx-auto space-y-8">
        <!-- Introduction Section -->
        <section class="prose prose-invert max-w-none">
          <h2 class="text-2xl font-semibold text-interface-text-primary mb-6">Welcome to Cosmical Space Explorer</h2>
          <p class="text-interface-text-muted mb-6">
            Join our interstellar community of explorers, scientists, engineers, and commanders. Each role offers unique 
            capabilities and responsibilities in our mission to explore the cosmos.
          </p>
        </section>

        <!-- Login Form Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Login Form -->
          <div class="bg-space-darker rounded-lg shadow-glow border border-interface-border overflow-hidden">
            <div class="p-8">
              <div class="text-center mb-6">
                <img src="/icons/icon-192.svg" alt="Logo" class="w-24 h-24 mx-auto mb-4 animate-pulse-slow">
                <h3 class="text-xl font-semibold text-interface-text-primary">Login to Your Account</h3>
              </div>

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
                    <router-link 
                      to="/forgot-password"
                      class="text-interface-text-primary hover:text-interface-text-secondary transition-colors duration-200"
                    >
                      Forgot password?
                    </router-link>
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

          <!-- Profile Information -->
          <div class="space-y-6">
            <div v-for="profile in profiles" :key="profile.type" 
                 class="bg-space-dark rounded-lg p-6 border border-interface-border">
              <h4 class="text-lg font-semibold text-interface-text-primary mb-2">{{ profile.title }}</h4>
              <p class="text-interface-text-muted mb-4">{{ profile.description }}</p>
              <ul class="list-disc list-inside text-interface-text-muted space-y-1">
                <li v-for="ability in profile.abilities" :key="ability">{{ ability }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <section class="prose prose-invert max-w-none">
          <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
            <h3 class="text-xl font-semibold text-interface-text-primary mb-4">Getting Started</h3>
            <ol class="list-decimal list-inside space-y-3 text-interface-text-muted">
              <li>Login with your credentials or sign up for a new account</li>
              <li>Start as a Member with basic access to space exploration data</li>
              <li>Request profile upgrades to unlock advanced features and responsibilities</li>
              <li>Join missions and contribute to our cosmic discoveries</li>
            </ol>
          </div>
        </section>
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
const loading = ref(false)
const error = ref(null)

// Profile information
const profiles = ref([
  {
    type: 'explorer',
    title: 'Space Explorer',
    description: 'Chart new territories and discover unknown celestial bodies.',
    abilities: [
      'Access to advanced navigation tools',
      'Participate in exploration missions',
      'Record and catalog discoveries',
      'Earn exploration achievements'
    ]
  },
  {
    type: 'scientist',
    title: 'Space Scientist',
    description: 'Study cosmic phenomena and analyze space data.',
    abilities: [
      'Access to research laboratories',
      'Conduct space experiments',
      'Analyze celestial data',
      'Publish scientific findings'
    ]
  },
  {
    type: 'engineer',
    title: 'Space Engineer',
    description: 'Maintain and upgrade space equipment and systems.',
    abilities: [
      'Access to engineering tools',
      'Repair space equipment',
      'Design new technologies',
      'Optimize system performance'
    ]
  }
])

async function handleLogin() {
  loading.value = true
  error.value = null
  try {
    await userStore.login({
      email: email.value,
      password: password.value
    })
    router.push('/')
  } catch (err) {
    error.value = err.message
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
    rgba(0, 0, 0, 0.1) 50%,
    transparent 100%
  );
  background-size: 100% 4px;
}
</style>