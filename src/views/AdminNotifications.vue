<template>
  <div class="min-h-screen bg-space-black pt-16">
    <div class="w-full">
      <!-- Notifications Header -->
      <div class="relative w-full mb-8">
        <div class="bg-space-darker border-y border-interface-border p-8">
          <h1 class="text-3xl font-bold text-interface-text-primary mb-4">Notification Center</h1>
          <p class="text-interface-text-muted max-w-3xl">Send and manage notifications to all users of the Cosmical Space Explorer platform.</p>
        </div>
      </div>

      <!-- Notifications Content -->
      <div class="px-4 md:px-6 lg:px-8">
        <!-- Scan Lines Effect -->
        <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

        <div class="container mx-auto py-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- New Notification Form -->
            <div class="lg:col-span-2">
              <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-8">
                <h2 class="text-2xl font-semibold text-interface-text-primary mb-6">Send New Notification</h2>
                
                <form @submit.prevent="sendNotification" class="space-y-6">
                  <!-- Notification Type -->
                  <div>
                    <label class="block text-sm font-medium text-interface-text-secondary mb-2">
                      Notification Type
                    </label>
                    <div class="flex flex-wrap gap-4">
                      <button
                        v-for="type in notificationTypes"
                        :key="type.value"
                        type="button"
                        :class="[
                          'px-4 py-2 rounded-md font-medium transition-all duration-200',
                          selectedType === type.value
                            ? 'bg-space-accent-cyan text-white shadow-glow-cyan'
                            : 'bg-space-dark text-interface-text-muted hover:bg-space hover:text-interface-text-primary'
                        ]"
                        @click="selectedType = type.value"
                      >
                        {{ type.label }}
                      </button>
                    </div>
                  </div>

                  <!-- Title -->
                  <div>
                    <label for="title" class="block text-sm font-medium text-interface-text-secondary mb-2">
                      Title
                    </label>
                    <input
                      id="title"
                      v-model="title"
                      type="text"
                      required
                      class="w-full px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                             text-interface-text-primary placeholder-interface-text-muted/50
                             focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                             transition-all duration-200"
                      placeholder="Enter notification title"
                    >
                  </div>

                  <!-- Message -->
                  <div>
                    <label for="message" class="block text-sm font-medium text-interface-text-secondary mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      v-model="message"
                      required
                      rows="4"
                      class="w-full px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                             text-interface-text-primary placeholder-interface-text-muted/50
                             focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                             transition-all duration-200"
                      placeholder="Enter notification message"
                    ></textarea>
                  </div>

                  <!-- Target Users -->
                  <div>
                    <label class="block text-sm font-medium text-interface-text-secondary mb-2">
                      Target Users
                    </label>
                    <div class="space-y-2">
                      <label class="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          v-model="targetUsers.all"
                          class="form-checkbox text-space-accent-cyan"
                        >
                        <span class="text-interface-text-primary">All Users</span>
                      </label>
                      <label class="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          v-model="targetUsers.developers"
                          :disabled="targetUsers.all"
                          class="form-checkbox text-space-accent-cyan"
                        >
                        <span :class="targetUsers.all ? 'text-interface-text-muted' : 'text-interface-text-primary'">
                          Developers Only
                        </span>
                      </label>
                      <label class="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          v-model="targetUsers.admins"
                          :disabled="targetUsers.all"
                          class="form-checkbox text-space-accent-cyan"
                        >
                        <span :class="targetUsers.all ? 'text-interface-text-muted' : 'text-interface-text-primary'">
                          Admins Only
                        </span>
                      </label>
                    </div>
                  </div>

                  <!-- Schedule -->
                  <div>
                    <label class="block text-sm font-medium text-interface-text-secondary mb-2">
                      Schedule
                    </label>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label for="date" class="block text-xs text-interface-text-muted mb-1">Date</label>
                        <input
                          id="date"
                          v-model="schedule.date"
                          type="date"
                          class="w-full px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                                 text-interface-text-primary
                                 focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                                 transition-all duration-200"
                        >
                      </div>
                      <div>
                        <label for="time" class="block text-xs text-interface-text-muted mb-1">Time</label>
                        <input
                          id="time"
                          v-model="schedule.time"
                          type="time"
                          class="w-full px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                                 text-interface-text-primary
                                 focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                                 transition-all duration-200"
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Submit Button -->
                  <div class="pt-4">
                    <button
                      type="submit"
                      :disabled="loading"
                      class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md
                             shadow-button hover:shadow-button-hover
                             text-white bg-space-accent-cyan hover:bg-space-accent-cyan-dark
                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-space-accent-cyan
                             transition-all duration-200 disabled:opacity-50"
                    >
                      <span v-if="loading" class="animate-spin mr-2">⟳</span>
                      <span>{{ loading ? 'Sending...' : 'Send Notification' }}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Recent Notifications -->
            <div class="lg:col-span-1">
              <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-8">
                <h2 class="text-2xl font-semibold text-interface-text-primary mb-6">Recent Notifications</h2>
                
                <div class="space-y-4">
                  <div
                    v-for="notification in recentNotifications"
                    :key="notification.id"
                    class="p-4 rounded-lg border border-interface-border bg-space-dark"
                  >
                    <div class="flex items-start justify-between">
                      <div>
                        <h3 class="text-interface-text-primary font-medium">{{ notification.title }}</h3>
                        <p class="text-sm text-interface-text-muted mt-1">{{ notification.message }}</p>
                      </div>
                      <span
                        :class="[
                          'px-2 py-1 text-xs font-medium rounded-full',
                          notification.type === 'info' ? 'bg-space-accent-blue-dark text-interface-text-primary' :
                          notification.type === 'success' ? 'bg-green-900 text-green-100' :
                          notification.type === 'warning' ? 'bg-yellow-900 text-yellow-100' :
                          'bg-red-900 text-red-100'
                        ]"
                      >
                        {{ notification.type }}
                      </span>
                    </div>
                    <div class="mt-2 flex items-center justify-between text-xs text-interface-text-muted">
                      <span>{{ notification.date }}</span>
                      <span>{{ notification.target }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Notification types
const notificationTypes = [
  { value: 'info', label: 'Information' },
  { value: 'success', label: 'Success' },
  { value: 'warning', label: 'Warning' },
  { value: 'error', label: 'Error' }
]

// Form state
const selectedType = ref('info')
const title = ref('')
const message = ref('')
const targetUsers = ref({
  all: false,
  developers: false,
  admins: false
})
const schedule = ref({
  date: '',
  time: ''
})
const loading = ref(false)

// Mock recent notifications
const recentNotifications = ref([
  {
    id: 1,
    type: 'info',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur on Saturday at 2 AM UTC',
    date: '2024-01-13 14:30',
    target: 'All Users'
  },
  {
    id: 2,
    type: 'success',
    title: 'New Feature Released',
    message: 'Check out our new space navigation tools!',
    date: '2024-01-12 09:15',
    target: 'Developers'
  },
  {
    id: 3,
    type: 'warning',
    title: 'API Usage Notice',
    message: 'High API usage detected. Please optimize your requests.',
    date: '2024-01-11 16:45',
    target: 'Developers'
  }
])

// Send notification function
async function sendNotification() {
  loading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Add to recent notifications
    recentNotifications.value.unshift({
      id: Date.now(),
      type: selectedType.value,
      title: title.value,
      message: message.value,
      date: new Date().toLocaleString(),
      target: targetUsers.value.all ? 'All Users' :
             targetUsers.value.developers ? 'Developers' :
             targetUsers.value.admins ? 'Admins' : 'None'
    })
    
    // Reset form
    title.value = ''
    message.value = ''
    selectedType.value = 'info'
    targetUsers.value = { all: false, developers: false, admins: false }
    schedule.value = { date: '', time: '' }
    
    // Show success message (you can implement this)
    console.log('Notification sent successfully!')
  } catch (error) {
    console.error('Failed to send notification:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.shadow-button {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
}

.shadow-button-hover {
  box-shadow: 0 0 25px rgba(6, 182, 212, 0.5);
}

.shadow-glow {
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.15);
}

.bg-scan-lines {
  background: linear-gradient(
    180deg,
    rgba(6, 182, 212, 0.05) 0%,
    rgba(6, 182, 212, 0.02) 50%,
    rgba(6, 182, 212, 0.05) 100%
  );
  background-size: 100% 8px;
}
</style>
