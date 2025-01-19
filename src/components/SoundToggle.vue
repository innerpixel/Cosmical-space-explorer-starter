<template>
  <button 
    @click="toggleSound"
    class="w-full px-6 py-3 flex items-center gap-4 group hover:bg-space-dark transition-all duration-200"
    @mouseenter="handleHover"
  >
    <div class="alien-icon flex-shrink-0">
      <div class="audio-icon">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
    <span class="text-interface-text-muted group-hover:text-interface-text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
      {{ buttonText }}
    </span>
  </button>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAudio } from '../composables/useAudio'
import { useSoundStore } from '../stores/soundStore'

const soundStore = useSoundStore()
const { initializeAudio, isInitialized, playAmbientSounds } = useAudio()
const isFirstClick = ref(true)

const buttonText = computed(() => {
  if (!isInitialized.value) return 'Enable Sound'
  return soundStore.isMuted ? 'Unmute Sound' : 'Mute Sound'
})

async function toggleSound() {
  console.log('Toggle sound clicked')
  if (isFirstClick.value) {
    console.log('First click - initializing audio')
    isFirstClick.value = false
    await initializeAudio()
    await playAmbientSounds()
    console.log('Audio initialized and ambient sounds started')
  }
  
  soundStore.toggleMute()
  soundStore.playUIClick()
}

function handleHover() {
  if (!isFirstClick.value) {
    soundStore.playUIHover()
  }
}
</script>
