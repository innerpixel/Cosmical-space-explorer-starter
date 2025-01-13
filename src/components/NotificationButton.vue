<template>
  <div>
    <button
      @click="enableNotifications"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      :disabled="notificationsEnabled"
    >
      {{ notificationsEnabled ? 'Notifications Enabled' : 'Enable Notifications' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { requestNotificationPermission, showNotification } from '../services/notifications';

const notificationsEnabled = ref(false);

onMounted(async () => {
  notificationsEnabled.value = Notification.permission === 'granted';
});

const enableNotifications = async () => {
  const granted = await requestNotificationPermission();
  if (granted) {
    notificationsEnabled.value = true;
    showNotification('Notifications Enabled', {
      body: 'You will now receive notifications from our app!',
    });
  }
};
</script>
