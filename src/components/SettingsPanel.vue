<template>
  <div class="w-full">
    <!-- Settings Items -->
    <div class="space-y-4">
      <!-- Sound Toggle -->
      <button 
        @click="toggleSound"
        class="w-full px-6 py-3 flex items-center gap-4 group hover:bg-space-dark transition-all duration-200"
      >
        <div class="alien-icon flex-shrink-0">
          <div class="audio-icon">
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
          </div>
        </div>
        <span class="text-interface-text-muted group-hover:text-interface-text-primary transition-all duration-300 whitespace-nowrap">
          {{ isMuted ? 'Unmute' : 'Mute' }} Sound
        </span>
      </button>

      <!-- Theme Toggle -->
      <button 
        @click="toggleTheme"
        class="w-full px-6 py-3 flex items-center gap-4 group hover:bg-space-dark transition-all duration-200"
      >
        <div class="alien-icon flex-shrink-0">
          <div class="glyph-icon">
            <div class="symbol">
              <div class="line"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>
        <span class="text-interface-text-muted group-hover:text-interface-text-primary transition-all duration-300 whitespace-nowrap">
          Toggle Theme
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSoundStore } from '../stores/soundStore'

const soundStore = useSoundStore()
const isMuted = ref(soundStore.isMuted)

function toggleSound() {
  soundStore.toggleMute()
  isMuted.value = soundStore.isMuted
}

function toggleTheme() {
  // Theme toggle logic here
}
</script>
