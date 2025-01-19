import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAudio } from '../composables/useAudio'

export const useSoundStore = defineStore('sound', () => {
  const isMuted = ref(false)
  const { playUISound, playEngineSound, setVolume } = useAudio()

  function playUIHover() {
    console.log('Playing UI hover sound, muted:', isMuted.value)
    if (isMuted.value) return
    playUISound('hover')
  }

  function playUIClick() {
    console.log('Playing UI click sound, muted:', isMuted.value)
    if (isMuted.value) return
    playUISound('click')
  }

  function playTransitionIn() {
    console.log('Playing transition in sound, muted:', isMuted.value)
    if (isMuted.value) return
    playEngineSound('transition-in')
  }

  function playTransitionOut() {
    console.log('Playing transition out sound, muted:', isMuted.value)
    if (isMuted.value) return
    playEngineSound('transition-out')
  }

  function toggleMute() {
    isMuted.value = !isMuted.value
    console.log('Toggling mute:', isMuted.value)
    setVolume('master', isMuted.value ? 0 : 1)
  }

  return {
    isMuted,
    playUIHover,
    playUIClick,
    playTransitionIn,
    playTransitionOut,
    toggleMute
  }
})
