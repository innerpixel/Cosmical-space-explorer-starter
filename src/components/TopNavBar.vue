<template>
  <div class="top-nav-bar fixed top-0 left-0 right-0 z-50">
    <div class="w-full bg-space-darker bg-opacity-90 border-b border-interface-border shadow-glow">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Left Section: Logo/Title -->
          <div class="flex items-center gap-4">
            <router-link to="/" class="flex items-center gap-2">
              <div class="alien-icon">
                <div class="logo-icon">
                  <div class="core"></div>
                  <div class="ring"></div>
                </div>
              </div>
              <span class="text-xl font-medium text-interface-text-primary">Cosmical Explorer <span class="text-cyan-400">Beta</span></span>
            </router-link>
          </div>

          <!-- Center Section: Navigation -->
          <nav class="flex items-center gap-6">
            <router-link 
              v-for="item in navigationItems" 
              :key="item.path"
              :to="item.path"
              :class="[
                'px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2',
                'hover:bg-space-dark hover:text-interface-text-primary',
                'text-interface-text-muted'
              ]"
              @click="handleNavClick"
              @mouseenter="handleNavHover"
            >
              <div class="alien-icon small">
                <div :class="item.icon">
                  <div class="icon-element"></div>
                </div>
              </div>
              {{ item.label }}
            </router-link>
          </nav>

          <!-- Right Section: Controls -->
          <div class="flex items-center gap-4">
            <button 
              @click="toggleControls"
              class="px-4 py-2 rounded-lg bg-space-dark hover:bg-space-darker border border-interface-border text-interface-text-muted hover:text-interface-text-primary transition-all duration-200 flex items-center gap-2"
            >
              <div class="alien-icon small">
                <div class="control-panel-icon">
                  <div class="panel"></div>
                  <div class="lights"></div>
                </div>
              </div>
              <span class="text-cyan-400">Controls</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls Panel (Slides down) -->
    <div 
      v-show="showControls"
      class="controls-panel w-full bg-space-darker bg-opacity-95 border-b border-interface-border shadow-glow transition-all duration-300"
      :class="{ 'controls-panel-open': showControls }"
    >
      <div class="container mx-auto px-4 py-4">
        <MasterControlPanel />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAudio } from '../composables/useAudio';
import MasterControlPanel from './MasterControlPanel.vue';

const { playUISound } = useAudio();
const showControls = ref(false);

const navigationItems = [
  { path: '/docs', label: 'Documentation', icon: 'docs-icon' },
  { path: '/mission-control', label: 'Mission Control', icon: 'mission-icon' },
  { path: '/profile', label: 'Profile', icon: 'profile-icon' }
];

const handleNavClick = async () => {
  await playUISound('click');
};

const handleNavHover = async () => {
  await playUISound('hover');
};

const toggleControls = async () => {
  await playUISound('click');
  showControls.value = !showControls.value;
};
</script>

<style scoped>
.top-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
}

.controls-panel {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 40;
}

.controls-panel-open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

.shadow-glow {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.15);
}

/* Navigation hover effects */
.router-link-active {
  @apply bg-space-dark text-interface-text-primary;
}

/* Alien icon styles */
.alien-icon {
  @apply w-6 h-6;
}

.alien-icon.small {
  @apply w-4 h-4;
}

.logo-icon, .control-panel-icon, .docs-icon, .mission-icon, .profile-icon {
  @apply w-full h-full;
}
</style>
