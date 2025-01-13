<template>
  <div class="space-y-4">
    <div class="flex flex-col items-center gap-2  md:flex-row md:justify-center md:gap-4">
      <button
        @click="sendBasicNotification"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Send Basic Notification
      </button>

      <button
        @click="sendCustomNotification"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Send Custom Notification
      </button>

      <button
        @click="sendScheduledNotification"
        class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        Send Scheduled Notification
      </button>
    </div>
  </div>
</template>

<script setup>
import { showNotification } from '../services/notifications';

// Basic notification (without actions)
const sendBasicNotification = () => {
  showNotification('Hello!', {
    body: 'This is a simple notification'
  });
};

// Custom notification with actions (using service worker)
const sendCustomNotification = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    const baseUrl = import.meta.env.BASE_URL;
    registration.showNotification('New Message', {
      body: 'You have a new message from Space Explorer!',
      icon: `${baseUrl}icons/icon-192x192.png`,
      badge: `${baseUrl}icons/icon-72x72.png`,
      vibrate: [200, 100, 200],
      actions: [
        {
          action: 'open',
          title: 'Open App'
        },
        {
          action: 'close',
          title: 'Close'
        }
      ],
      data: {
        url: window.location.origin
      }
    });
  } else {
    // Fallback for browsers without service worker support
    showNotification('New Message', {
      body: 'You have a new message from Space Explorer!'
    });
  }
};

// Scheduled notification
const sendScheduledNotification = () => {
  setTimeout(() => {
    showNotification('Scheduled Alert', {
      body: 'This notification was scheduled to appear after 5 seconds!',
      tag: 'scheduled-notification'
    });
  }, 5000);
};
</script>
