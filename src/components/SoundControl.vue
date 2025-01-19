<template>
  <div class="sound-control">
    <div class="flex items-center gap-4 p-4 bg-space-darker bg-opacity-90 rounded-lg border border-interface-border">
      <!-- Master Volume -->
      <div class="flex items-center gap-2">
        <button 
          @click="toggleMute"
          class="p-2 rounded-lg bg-space-dark hover:bg-space-darker border border-interface-border transition-all duration-200"
        >
          <div class="alien-icon small">
            <div class="audio-icon" :class="{ 'opacity-50': isMuted }">
              <div class="wave"></div>
              <div class="wave"></div>
              <div class="wave"></div>
            </div>
          </div>
        </button>
      </div>

      <!-- Volume Controls -->
      <div class="flex flex-col gap-2">
        <div v-for="(volume, category) in volumes" :key="category" class="flex items-center gap-2">
          <span class="text-sm text-interface-text-muted capitalize w-20">{{ category }}</span>
          <input 
            type="range" 
            :value="volume" 
            @input="e => setVolume(category, parseFloat(e.target.value))"
            min="0" 
            max="1" 
            step="0.1"
            class="w-32 accent-cyan-500"
          />
          <span class="text-sm text-interface-text-muted w-12">{{ Math.round(volume * 100) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAudio } from '../composables/useAudio';

const {
  isMuted,
  volumes,
  setVolume,
  toggleMute
} = useAudio();
</script>

<style scoped>
input[type="range"] {
  @apply h-2 rounded-full bg-space-dark;
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  @apply w-4 h-4 rounded-full bg-cyan-500 cursor-pointer;
}

input[type="range"]::-moz-range-thumb {
  @apply w-4 h-4 rounded-full bg-cyan-500 cursor-pointer border-none;
}
</style>
