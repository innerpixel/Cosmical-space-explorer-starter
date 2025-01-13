<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Request a Profile</h1>
    <div class="max-w-lg mx-auto">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="profileType" class="block text-sm font-medium text-gray-700">Profile Type</label>
          <select
            id="profileType"
            v-model="formData.type"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select a profile type</option>
            <option value="developer">Developer</option>
            <option value="contributor">Contributor</option>
            <option value="member">Member</option>
          </select>
        </div>

        <div v-if="error" class="text-red-600 text-sm">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <span v-if="isLoading">Submitting...</span>
            <span v-else>Submit Request</span>
          </button>
        </div>
      </form>
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
  type: ''
})

const error = ref('')
const isLoading = ref(false)

async function handleSubmit() {
  if (!formData.value.type) {
    error.value = 'Please select a profile type'
    return
  }

  error.value = ''
  isLoading.value = true

  try {
    await userStore.requestNewProfile(formData.value)
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Failed to submit profile request'
  } finally {
    isLoading.value = false
  }
}
</script>
