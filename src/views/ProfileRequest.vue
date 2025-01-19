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
                <option 
                  v-for="type in profileTypes" 
                  :key="type.value" 
                  :value="type.value"
                >
                  {{ type.label }} - {{ type.description }}
                </option>
              </select>
            </div>

            <!-- Description with character count -->
            <div>
              <label class="block text-sm font-medium text-interface-text-secondary mb-2">
                Mission Statement
                <span class="text-xs text-interface-text-muted ml-2">
                  ({{ descriptionLength }}/1000 characters)
                </span>
              </label>
              <textarea
                v-model="formData.description"
                rows="4"
                required
                :class="{
                  'border-red-500': descriptionLength > 0 && descriptionLength < 50,
                  'border-green-500': descriptionLength >= 50 && descriptionLength <= 1000
                }"
                class="w-full px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                       text-interface-text-primary placeholder-interface-text-muted/50
                       focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                       transition-all duration-200"
                placeholder="Describe your mission objectives and relevant experience (minimum 50 characters)..."
              ></textarea>
              <p class="text-sm text-interface-text-muted mt-1">
                {{ descriptionRemaining }} characters remaining
              </p>
            </div>

            <!-- Skills based on selected type -->
            <div v-if="formData.type">
              <label class="block text-sm font-medium text-interface-text-secondary mb-2">
                Specializations for {{ formData.type.charAt(0).toUpperCase() + formData.type.slice(1) }}
              </label>
              <div class="space-y-2">
                <div 
                  v-for="skill in currentSkills" 
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
              :disabled="isLoading || !isValid"
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { profileService } from '../services/profileService'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()
const isLoading = ref(false)
const error = ref(null)

const formData = ref({
  type: '',
  description: '',
  skills: []
})

// Production profile types
const profileTypes = [
  { value: 'explorer', label: 'Explorer', description: 'Space exploration and discovery' },
  { value: 'scientist', label: 'Scientist', description: 'Research and analysis' },
  { value: 'engineer', label: 'Engineer', description: 'Technical systems and maintenance' },
  { value: 'commander', label: 'Commander', description: 'Mission leadership and coordination' }
]

// Production skills
const availableSkills = {
  explorer: [
    'Space Navigation',
    'Astronomical Research',
    'Data Analysis',
    'Equipment Operation',
    'Emergency Procedures',
    'EVA Operations'
  ],
  scientist: [
    'Data Analysis',
    'Research Methods',
    'Laboratory Techniques',
    'Scientific Documentation',
    'Experimental Design',
    'Statistical Analysis'
  ],
  engineer: [
    'Systems Maintenance',
    'Technical Troubleshooting',
    'Equipment Repair',
    'System Design',
    'Safety Protocols',
    'Power Systems'
  ],
  commander: [
    'Mission Planning',
    'Team Leadership',
    'Crisis Management',
    'Strategic Decision Making',
    'Communication',
    'Resource Management'
  ]
}

// Computed available skills based on selected type
const currentSkills = computed(() => {
  return formData.value.type ? availableSkills[formData.value.type] : []
})

// Validation
const isValid = computed(() => {
  return (
    formData.value.type &&
    formData.value.description.length >= 50 &&
    formData.value.description.length <= 1000 &&
    formData.value.skills.length > 0
  )
})

const descriptionLength = computed(() => formData.value.description.length)
const descriptionRemaining = computed(() => 1000 - descriptionLength.value)

async function handleSubmit() {
  if (!isValid.value) {
    error.value = 'Please fill in all required fields correctly'
    return
  }

  isLoading.value = true
  error.value = null
  
  try {
    const response = await profileService.submitRequest({
      ...formData.value,
      userId: userStore.user.id,
      currentProfile: userStore.userProfile
    })
    
    // Update user store if needed
    if (response && response.request) {
      userStore.pendingRequests = [...(userStore.pendingRequests || []), response.request]
    }
    
    router.push({
      path: '/profile',
      query: { 
        requestSubmitted: 'true',
        requestId: response?.request?._id 
      }
    })
  } catch (err) {
    if (err.response?.status === 401) {
      error.value = 'Session expired. Please log in again.'
      await userStore.logout()
      router.push({
        path: '/login',
        query: { redirect: '/profile/request' }
      })
    } else {
      error.value = err.message || 'Failed to submit request'
    }
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
