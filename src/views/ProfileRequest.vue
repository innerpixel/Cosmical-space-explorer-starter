<template>
  <div class="min-h-screen bg-space-black pt-16">
    <!-- Scan Lines Effect -->
    <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-interface-text-primary animate-glow-pulse mb-4">
            Request Mission Profile
          </h1>
          <p class="text-xl text-interface-text-muted">
            Submit your credentials for mission clearance
          </p>
        </div>

        <!-- Request Form -->
        <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Profile Type -->
            <div>
              <label class="block text-sm font-medium text-interface-text-secondary mb-2">
                Profile Type
              </label>
              <select
                v-model="formData.type"
                required
                class="w-full px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                       text-interface-text-primary
                       focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                       transition-all duration-200"
              >
                <option value="">Select profile type</option>
                <option value="explorer">Explorer</option>
                <option value="scientist">Scientist</option>
                <option value="engineer">Engineer</option>
                <option value="commander">Commander</option>
              </select>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-interface-text-secondary mb-2">
                Mission Statement
              </label>
              <textarea
                v-model="formData.description"
                rows="4"
                required
                class="w-full px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                       text-interface-text-primary placeholder-interface-text-muted/50
                       focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                       transition-all duration-200"
                placeholder="Describe your mission objectives and relevant experience..."
              ></textarea>
            </div>

            <!-- Skills -->
            <div>
              <label class="block text-sm font-medium text-interface-text-secondary mb-2">
                Specializations
              </label>
              <div class="space-y-2">
                <div 
                  v-for="skill in availableSkills" 
                  :key="skill"
                  class="flex items-center"
                >
                  <input
                    type="checkbox"
                    :id="skill"
                    v-model="formData.skills"
                    :value="skill"
                    class="h-4 w-4 bg-space-dark border-interface-border rounded 
                           text-interface-button-primary focus:ring-interface-button-hover
                           transition-colors duration-200"
                  >
                  <label :for="skill" class="ml-2 text-interface-text-muted">
                    {{ skill }}
                  </label>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md
                     shadow-button hover:shadow-button-hover
                     text-white bg-interface-button-primary hover:bg-interface-button-hover
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-interface-button-hover
                     transition-all duration-200 animate-glow-pulse
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading">Processing Request...</span>
              <span v-else>Submit Request</span>
            </button>

            <!-- Error Message -->
            <div v-if="error" class="p-4 bg-red-900/50 border border-red-500 rounded-md">
              <p class="text-red-400">{{ error }}</p>
            </div>
          </form>
        </div>

        <!-- Requirements Info -->
        <div class="mt-8 bg-space-darker rounded-lg border border-interface-border shadow-glow p-6">
          <h3 class="text-xl font-semibold text-interface-text-primary mb-4">Profile Requirements</h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <h4 class="text-interface-text-secondary font-medium">Explorer</h4>
              <ul class="list-disc list-inside text-interface-text-muted">
                <li>Basic navigation skills</li>
                <li>Physical fitness certification</li>
                <li>Emergency protocol knowledge</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="text-interface-text-secondary font-medium">Scientist</h4>
              <ul class="list-disc list-inside text-interface-text-muted">
                <li>Research experience</li>
                <li>Data analysis proficiency</li>
                <li>Laboratory safety training</li>
              </ul>
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
  type: '',
  description: '',
  skills: []
})

const isLoading = ref(false)
const error = ref('')

const availableSkills = [
  'Space Navigation',
  'Life Support Systems',
  'Quantum Mechanics',
  'Xenobiology',
  'Astro Engineering',
  'Deep Space Communications',
  'Zero-G Operations',
  'Emergency Response'
]

const handleSubmit = async () => {
  error.value = ''
  isLoading.value = true

  try {
    await userStore.requestProfile(formData.value)
    router.push('/profile')
  } catch (err) {
    error.value = err.message || 'Failed to submit profile request. Please try again.'
  } finally {
    isLoading.value = false
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
