<template>
  <div class="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Request New Profile</h2>

    <!-- Available Slots -->
    <div class="mb-6 p-4 bg-indigo-50 rounded-lg">
      <p class="text-indigo-700">
        Available Profile Slots: {{ userStore.availableProfileSlots }}
      </p>
    </div>

    <!-- Profile Request Form -->
    <form @submit.prevent="submitRequest" class="space-y-6">
      <!-- Profile Type -->
      <div>
        <label class="form-label mb-2">
          Profile Type
        </label>
        <select
          v-model="formData.type"
          class="form-select"
          required
        >
          <option value="">Select a profile type</option>
          <option
            v-for="(privileges, type) in userStore.PROFILE_PRIVILEGES"
            :key="type"
            :value="type"
            :disabled="type === 'admin'"
          >
            {{ type.charAt(0).toUpperCase() + type.slice(1) }}
          </option>
        </select>
      </div>

      <!-- Description -->
      <div>
        <label class="form-label mb-2">
          Why do you want this profile?
        </label>
        <textarea
          v-model="formData.description"
          rows="4"
          class="form-textarea"
          required
        ></textarea>
      </div>

      <!-- Skills -->
      <div>
        <label class="form-label mb-2">
          Relevant Skills
        </label>
        <div class="flex flex-wrap gap-2">
          <input
            v-model="newSkill"
            @keydown.enter.prevent="addSkill"
            placeholder="Type and press Enter"
            class="form-input"
          />
        </div>
        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="skill in formData.skills"
            :key="skill"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
          >
            {{ skill }}
            <button
              @click.prevent="removeSkill(skill)"
              class="ml-2 text-indigo-600 hover:text-indigo-500"
            >
              ×
            </button>
          </span>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="loading || userStore.availableProfileSlots <= 0"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {{ loading ? 'Submitting...' : 'Submit Request' }}
        </button>
      </div>
    </form>

    <!-- Error Message -->
    <div
      v-if="error"
      class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
    >
      {{ error }}
    </div>

    <!-- Success Message -->
    <div
      v-if="successMessage"
      class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
    >
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const loading = ref(false)
const error = ref(null)
const successMessage = ref(null)
const newSkill = ref('')

const formData = reactive({
  type: '',
  description: '',
  skills: []
})

function addSkill() {
  if (newSkill.value.trim()) {
    formData.skills.push(newSkill.value.trim())
    newSkill.value = ''
  }
}

function removeSkill(skill) {
  formData.skills = formData.skills.filter(s => s !== skill)
}

async function submitRequest() {
  try {
    loading.value = true
    error.value = null
    successMessage.value = null

    await userStore.requestNewProfile({
      type: formData.type,
      description: formData.description,
      skills: formData.skills
    })

    successMessage.value = 'Profile request submitted successfully! An admin will review your request.'
    formData.type = ''
    formData.description = ''
    formData.skills = []
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-input, .form-select, .form-textarea {
  @apply mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500;
}

.form-label {
  @apply block text-sm font-medium text-gray-700;
}
</style>
