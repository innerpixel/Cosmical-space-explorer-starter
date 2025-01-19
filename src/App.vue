<template>
  <div class="app-container" :class="{ 'universal-translator-active': universalTranslator }">
    <nav class="nav-container group">
      <!-- Beacon Icon -->
      <div class="beacon-icon">
        <div class="beacon">
          <div class="core"></div>
          <div class="ring"></div>
          <div class="ring"></div>
          <div class="ring"></div>
        </div>
      </div>

      <!-- Navigation Panel -->
      <div class="nav-panel">
        <nav class="space-y-6">
          <router-link to="/" class="nav-icon" :title="universalTranslator ? 'Home' : 'Zhra\'gha'" data-alien-text="Zhra'gha">
            <div class="portal-icon">
              <div class="gateway"></div>
              <div class="vortex"></div>
            </div>
          </router-link>

          <router-link to="/features" class="nav-icon" :title="universalTranslator ? 'Features' : 'K\'thara Vex'" data-alien-text="K'thara Vex">
            <div class="crystal-icon">
              <div class="crystal-core"></div>
              <div class="crystal-facet"></div>
              <div class="crystal-facet"></div>
              <div class="crystal-facet"></div>
              <div class="crystal-glow"></div>
            </div>
          </router-link>

          <router-link to="/docs" class="nav-icon" :title="universalTranslator ? 'Documentation' : 'Gleeb gloopa'" data-alien-text="Gleeb gloopa">
            <div class="nav-system-icon">
              <div class="pointer"></div>
              <div class="ring"></div>
            </div>
          </router-link>

          <router-link to="/csmcl" class="nav-icon" :title="universalTranslator ? 'Space' : 'Zorvath'" data-alien-text="Zorvath">
            <div class="telepathy-icon">
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="link"></div>
            </div>
          </router-link>

          <router-link to="/showcase" class="nav-icon" :title="universalTranslator ? 'Components' : 'Plootz'" data-alien-text="Plootz">
            <div class="energy-icon">
              <div class="core"></div>
              <div class="rings">
                <div class="ring"></div>
                <div class="ring"></div>
              </div>
            </div>
          </router-link>

          <template v-if="!isLoggedIn">
            <router-link to="/login" class="nav-icon" :title="universalTranslator ? 'Login' : 'Gleeb gloopa'" data-alien-text="Gleeb gloopa">
              <div class="status">
                <div class="inner-circle"></div>
                <div class="pulse"></div>
              </div>
            </router-link>
            
            <router-link to="/profile/request" class="nav-icon" :title="universalTranslator ? 'Request Access' : 'Zhra\'gha'" data-alien-text="Zhra'gha">
              <div class="video-icon">
                <div class="lens"></div>
                <div class="sensor"></div>
              </div>
            </router-link>
          </template>
          
          <template v-else>
            <router-link v-if="isAdmin" to="/admin" class="nav-icon" :title="universalTranslator ? 'Admin' : 'Plootz'" data-alien-text="Plootz">
              <div class="audio-icon">
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
              </div>
            </router-link>

            <router-link to="/profile" class="nav-icon" :title="universalTranslator ? 'Profile' : 'Zorvath'" data-alien-text="Zorvath">
              <div class="status">
                <div class="inner-circle"></div>
                <div class="pulse"></div>
              </div>
            </router-link>

            <button @click="logout" class="nav-icon" :title="universalTranslator ? 'Logout' : 'Gleeb gloopa'" data-alien-text="Gleeb gloopa">
              <div class="portal-icon">
                <div class="gateway red"></div>
                <div class="vortex red"></div>
              </div>
            </button>
          </template>
        </nav>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue'
import { useUserStore } from './stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const isLoggedIn = computed(() => userStore.isLoggedIn)
const isAdmin = computed(() => userStore.isAdmin)
const universalTranslator = ref(localStorage.getItem('universal_translator') === 'active')

const activateTranslator = () => {
  universalTranslator.value = true
  localStorage.setItem('universal_translator', 'active')
  // Add activation effect
  const beacon = document.querySelector('.beacon')
  if (beacon) {
    beacon.classList.add('translator-activated')
    setTimeout(() => beacon.classList.remove('translator-activated'), 2000)
  }
}

// Provide the activation function to child components
provide('activateTranslator', activateTranslator)

const logout = async () => {
  await userStore.logout()
  router.push('/login')
}

// Load alien-icons CSS
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '/ideas-alienicons/alien-icons.css';
document.head.appendChild(link);

// Check if universal translator was discovered
universalTranslator.value = localStorage.getItem('universal_translator') === 'active';
</script>

<style scoped>
/* Navigation Container */
.nav-container {
  @apply fixed left-4 bottom-4 z-50;
}

/* Beacon Icon */
.beacon-icon {
  @apply relative w-12 h-12 rounded-full bg-space-darker border border-interface-border cursor-pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.beacon {
  @apply relative w-full h-full flex items-center justify-center;
}

.beacon .core {
  @apply absolute w-3 h-3 rounded-full bg-cyan-500;
  box-shadow: 0 0 15px theme('colors.cyan.500');
  animation: pulse 2s ease-in-out infinite;
}

.beacon .ring {
  @apply absolute rounded-full border border-cyan-500;
  animation: beacon-ping 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.beacon .ring:nth-child(2) {
  @apply w-6 h-6;
  animation-delay: 0s;
}

.beacon .ring:nth-child(3) {
  @apply w-8 h-8;
  animation-delay: 0.5s;
}

.beacon .ring:nth-child(4) {
  @apply w-10 h-10;
  animation-delay: 1s;
}

/* Translator Activation Effect */
.beacon.translator-activated .core {
  animation: translator-activate 2s ease-out forwards;
}

.beacon.translator-activated .ring {
  animation: translator-rings 2s ease-out forwards;
}

@keyframes translator-activate {
  0% {
    transform: scale(1);
    box-shadow: 0 0 15px theme('colors.cyan.500');
  }
  50% {
    transform: scale(2);
    box-shadow: 0 0 30px theme('colors.cyan.500');
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 15px theme('colors.cyan.500');
  }
}

@keyframes translator-rings {
  0% {
    transform: scale(1);
    border-color: theme('colors.cyan.500');
  }
  50% {
    transform: scale(1.5);
    border-color: theme('colors.yellow.400');
  }
  100% {
    transform: scale(1);
    border-color: theme('colors.cyan.500');
  }
}

/* Navigation Panel */
.nav-panel {
  @apply absolute left-0 bottom-full mb-4 flex flex-col gap-4 items-center bg-space-darker border border-interface-border rounded-lg p-4;
  transform: translateY(20px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover Effects */
.nav-container:hover .nav-panel {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.nav-container:hover .beacon-icon {
  transform: scale(0.8);
}

/* Tooltip Styles */
.nav-icon::after {
  content: attr(data-alien-text);
  @apply absolute -top-8 bg-space-dark text-interface-text-primary px-2 py-1 rounded text-xs
         opacity-0 transition-opacity duration-200 pointer-events-none whitespace-nowrap;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.nav-icon:hover::after {
  @apply opacity-100;
}

/* Universal Translator Styles */
.universal-translator-active .nav-icon::after {
  content: attr(title);
}

.universal-translator-active .nav-icon[data-alien-text]::before {
  content: attr(data-alien-text);
  @apply absolute -top-14 bg-space-dark text-cyan-400 px-2 py-1 rounded text-xs
         opacity-0 transition-opacity duration-200 pointer-events-none whitespace-nowrap;
  box-shadow: 0 0 10px theme('colors.cyan.500');
}

.universal-translator-active .nav-icon:hover::before {
  @apply opacity-100;
}

/* Rest of your existing styles */
/* Base Icon Styles */
.portal-icon, .nav-system-icon, .telepathy-icon, .energy-icon, .audio-icon, .status, .video-icon, .crystal-icon {
  @apply relative w-full h-full flex items-center justify-center;
}

/* Portal Icon */
.portal-icon .gateway {
  @apply absolute w-4 h-4 rounded-full bg-green-500;
  box-shadow: 0 0 10px theme('colors.green.500');
}

.portal-icon .gateway.red {
  @apply bg-red-500;
  box-shadow: 0 0 10px theme('colors.red.500');
}

.portal-icon .vortex {
  @apply absolute w-6 h-6 rounded-full border-2 border-green-500;
  animation: spin 2s linear infinite;
}

.portal-icon .vortex.red {
  @apply border-red-500;
}

/* Nav System Icon */
.nav-system-icon .pointer {
  @apply absolute w-2 h-6 bg-blue-500 -top-2;
  box-shadow: 0 0 10px theme('colors.blue.500');
}

.nav-system-icon .ring {
  @apply absolute w-6 h-6 rounded-full border border-blue-500;
  animation: pulse 2s ease-in-out infinite;
}

/* Telepathy Icon */
.telepathy-icon .circle {
  @apply absolute w-4 h-4 bg-yellow-500 rounded-full;
  box-shadow: 0 0 10px theme('colors.yellow.500');
}

.telepathy-icon .circle:nth-child(1) {
  transform: translateY(-4px);
}

.telepathy-icon .circle:nth-child(2) {
  transform: translateY(4px);
}

.telepathy-icon .link {
  @apply absolute w-0.5 h-8 bg-yellow-500 -top-4;
  box-shadow: 0 0 10px theme('colors.yellow.500');
}

/* Energy Icon */
.energy-icon .core {
  @apply absolute w-3 h-3 rounded-full bg-purple-500;
  box-shadow: 0 0 10px theme('colors.purple.500');
}

.energy-icon .rings {
  @apply absolute w-full h-full flex items-center justify-center;
}

.energy-icon .ring {
  @apply absolute w-5 h-5 rounded-full border border-purple-500;
  animation: pulse 2s ease-in-out infinite;
}

/* Audio Icon */
.audio-icon .wave {
  @apply absolute w-4 h-0.5 bg-pink-500 rounded-full;
  box-shadow: 0 0 10px theme('colors.pink.500');
}

.audio-icon .wave:nth-child(1) {
  transform: translateY(-4px);
}

.audio-icon .wave:nth-child(2) {
  transform: translateY(4px);
}

.audio-icon .wave:nth-child(3) {
  transform: translateY(8px);
}

/* Status Icon */
.status .inner-circle {
  @apply absolute w-3 h-3 rounded-full bg-blue-500;
  box-shadow: 0 0 10px theme('colors.blue.500');
}

.status .pulse {
  @apply absolute w-5 h-5 rounded-full bg-blue-400;
  box-shadow: 0 0 15px theme('colors.blue.400');
  animation: pulse 2s ease-in-out infinite;
}

/* Video Icon */
.video-icon .lens {
  @apply absolute w-4 h-4 bg-indigo-500 rounded-full;
  box-shadow: 0 0 10px theme('colors.indigo.500');
}

.video-icon .sensor {
  @apply absolute w-2 h-2 bg-indigo-400 -top-2;
  box-shadow: 0 0 15px theme('colors.indigo.400');
  animation: pulse 2s ease-in-out infinite;
}

/* Crystal Icon */
.crystal-icon {
  @apply relative w-full h-full;
  perspective: 1000px;
}

.crystal-core {
  @apply absolute inset-1/4 bg-cyan-500/80 rounded;
  transform-style: preserve-3d;
  animation: crystal-rotate 6s linear infinite;
}

.crystal-facet {
  @apply absolute inset-0 border-2 border-cyan-500/50;
  transform-style: preserve-3d;
}

.crystal-facet:nth-child(2) {
  transform: rotateX(60deg) rotateY(0deg);
}

.crystal-facet:nth-child(3) {
  transform: rotateX(-60deg) rotateY(60deg);
}

.crystal-facet:nth-child(4) {
  transform: rotateX(30deg) rotateY(-60deg);
}

.crystal-glow {
  @apply absolute inset-0 bg-cyan-500/20 rounded-full blur-lg;
  animation: crystal-pulse 3s ease-in-out infinite;
}

@keyframes crystal-rotate {
  from { transform: rotate3d(1, 1, 1, 0deg); }
  to { transform: rotate3d(1, 1, 1, 360deg); }
}

@keyframes crystal-pulse {
  0%, 100% { opacity: 0.2; transform: scale(1.1); }
  50% { opacity: 0.4; transform: scale(1.3); }
}

/* Animations */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.9);
  }
}

.nav-icon {
  @apply relative flex items-center justify-center transition-all duration-300 hover:scale-110;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 0.5rem;
}

.nav-icon:hover {
  border-color: currentColor;
  box-shadow: 0 0 15px currentColor;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Navigation Bar Background */
nav {
  background: rgba(17, 24, 39, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
}
</style>
