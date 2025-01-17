<template>
  <div class="min-h-screen bg-space-black pt-16">
    <!-- Scan Lines Effect -->
    <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto space-y-8">
        <!-- Header -->
        <div class="text-center">
          <img src="../assets/logo.svg" alt="Logo" class="w-24 h-24 mx-auto mb-4 animate-pulse-slow">
          <h2 class="text-2xl font-semibold text-interface-text-primary">Reset Your Password</h2>
          <p class="text-interface-text-muted mt-2">Enter your email to receive a reset token</p>
        </div>

        <!-- Reset Form -->
        <div class="bg-space-darker rounded-lg shadow-glow border border-interface-border overflow-hidden p-8">
          <form @submit.prevent="handleResetRequest" class="space-y-6">
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

            <button
              type="submit"
              :disabled="loading"
              class="w-full py-2 px-4 bg-space-accent-cyan hover:bg-space-accent-cyan-dark 
                     text-white font-semibold rounded-md shadow-glow-cyan
                     transition-all duration-200 disabled:opacity-50"
            >
              <span v-if="loading">Requesting Reset...</span>
              <span v-else>Request Reset Token</span>
            </button>
          </form>

          <!-- Reset Token Display -->
          <div v-if="resetToken" class="mt-6 p-4 bg-space-dark rounded-lg border border-interface-border">
            <h4 class="text-sm font-medium text-interface-text-primary mb-2">Your Reset Token</h4>
            <div class="flex items-center space-x-2">
              <code class="flex-1 p-2 bg-black/30 rounded text-interface-text-secondary font-mono text-sm break-all">
                {{ resetToken }}
              </code>
              <button
                @click="copyToken"
                class="p-2 text-interface-text-muted hover:text-interface-text-primary 
                       transition-colors duration-200"
                title="Copy token"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
            </div>
            <p class="mt-2 text-sm text-interface-text-muted">
              Copy this token and use it to reset your password. The token will expire in 1 hour.
            </p>
          </div>

          <!-- Password Reset Form -->
          <div v-if="showResetForm" class="mt-6 space-y-6">
            <div>
              <label for="token" class="block text-sm font-medium text-interface-text-secondary mb-1">
                Reset Token
              </label>
              <input
                id="token"
                v-model="token"
                type="text"
                required
                class="w-full px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                       text-interface-text-primary placeholder-interface-text-muted/50
                       focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                       transition-all duration-200"
                placeholder="Enter your reset token"
              >
            </div>

            <div>
              <label for="newPassword" class="block text-sm font-medium text-interface-text-secondary mb-1">
                New Password
              </label>
              <input
                id="newPassword"
                v-model="newPassword"
                type="password"
                required
                class="w-full px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                       text-interface-text-primary placeholder-interface-text-muted/50
                       focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                       transition-all duration-200"
                placeholder="Enter your new password"
              >
            </div>

            <button
              @click="handlePasswordReset"
              :disabled="loading"
              class="w-full py-2 px-4 bg-space-accent-cyan hover:bg-space-accent-cyan-dark 
                     text-white font-semibold rounded-md shadow-glow-cyan
                     transition-all duration-200 disabled:opacity-50"
            >
              <span v-if="loading">Resetting Password...</span>
              <span v-else>Reset Password</span>
            </button>
          </div>

          <div v-if="error" class="mt-4">
            <p class="text-red-500 text-sm">{{ error }}</p>
          </div>

          <div v-if="success" class="mt-4">
            <p class="text-green-500 text-sm">{{ success }}</p>
          </div>
        </div>

        <!-- Back to Login -->
        <div class="text-center">
          <router-link
            to="/login"
            class="text-interface-text-primary hover:text-interface-text-secondary transition-colors duration-200"
          >
            Back to Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const email = ref('')
const token = ref('')
const newPassword = ref('')
const loading = ref(false)
const error = ref(null)
const success = ref(null)
const resetToken = ref(null)
const showResetForm = ref(false)

async function handleResetRequest() {
  loading.value = true
  error.value = null
  success.value = null
  
  try {
    const response = await api.post('/auth/forgot-password', {
      email: email.value
    })

    if (response.data.resetToken) {
      resetToken.value = response.data.resetToken
      showResetForm.value = true
      success.value = 'Reset token generated successfully!'
    } else {
      throw new Error('No reset token received')
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Failed to request password reset'
  } finally {
    loading.value = false
  }
}

async function handlePasswordReset() {
  loading.value = true
  error.value = null
  success.value = null

  try {
    const response = await api.post('/auth/reset-password', {
      token: token.value,
      newPassword: newPassword.value
    })

    success.value = 'Password reset successful!'
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Failed to reset password'
  } finally {
    loading.value = false
  }
}

async function copyToken() {
  try {
    await navigator.clipboard.writeText(resetToken.value)
    success.value = 'Token copied to clipboard!'
  } catch (err) {
    error.value = 'Failed to copy token'
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
