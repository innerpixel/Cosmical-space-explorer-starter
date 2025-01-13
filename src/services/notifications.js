export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const showNotification = async (title, options = {}) => {
  const hasPermission = await requestNotificationPermission();
  
  if (!hasPermission) {
    console.warn('Notification permission not granted');
    return;
  }

  // Get the base URL from Vite's env
  const baseUrl = import.meta.env.BASE_URL;

  const defaultOptions = {
    icon: `${baseUrl}icons/icon-192x192.png`,
    badge: `${baseUrl}icons/icon-72x72.png`,
    vibrate: [200, 100, 200],
    ...options
  };

  // Use service worker for notifications with actions
  if (options.actions && 'serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    return registration.showNotification(title, defaultOptions);
  }

  // Fall back to regular notification for simple notifications
  return new Notification(title, defaultOptions);
};

// Function to convert VAPID key from base64 to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// For development, we'll use a dummy VAPID key
const VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';

export const initializePushNotifications = async () => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push notifications are not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });
    
    console.log('Push notification subscription:', subscription);
    return subscription;
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
    return null;
  }
};
