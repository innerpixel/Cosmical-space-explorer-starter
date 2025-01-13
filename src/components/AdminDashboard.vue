<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-2xl font-bold text-emerald-800 mb-6">Admin Dashboard</h2>
      
      <!-- Notification Form -->
      <div class="space-y-4 mb-8">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Notification Title
          </label>
          <input
            v-model="notificationTitle"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter notification title"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            v-model="notificationMessage"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            rows="3"
            placeholder="Enter notification message"
          ></textarea>
        </div>

        <div class="flex items-center gap-4">
          <button
            @click="sendNotification"
            class="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            :disabled="!canSendNotification"
          >
            Send Notification
          </button>
          
          <button
            @click="clearForm"
            class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <!-- Notification History -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Notifications</h3>
        <div class="space-y-4">
          <div v-for="notification in recentNotifications" :key="notification.id"
               class="p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-medium text-gray-900">{{ notification.title }}</h4>
                <p class="text-gray-600">{{ notification.options.body }}</p>
              </div>
              <span class="text-sm text-gray-500">
                {{ new Date(notification.timestamp).toLocaleString() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useNotificationStore } from '../stores/notificationStore'
import { useUserStore } from '../stores/userStore'

const notificationStore = useNotificationStore()
const userStore = useUserStore()

const notificationTitle = ref('')
const notificationMessage = ref('')

const canSendNotification = computed(() => {
  return notificationTitle.value.trim() && notificationMessage.value.trim() && userStore.isAdmin
})

const recentNotifications = computed(() => {
  return notificationStore.recentNotifications
})

const sendNotification = async () => {
  if (!canSendNotification.value) return

  await notificationStore.sendNotification(notificationTitle.value, {
    body: notificationMessage.value
  })

  clearForm()
}

const clearForm = () => {
  notificationTitle.value = ''
  notificationMessage.value = ''
}
</script>
