import { ref, onMounted, onUnmounted } from 'vue';
import { audioService } from '../services/audioService';

export function useAudio() {
  const isInitialized = ref(false);
  const isMuted = ref(false);
  const volumes = ref({
    master: 1,
    ambient: 0.3,
    ui: 0.4,
    engine: 0.5,
    alert: 0.6
  });

  const initializeAudio = async () => {
    if (isInitialized.value) return;
    await audioService.initialize();
    isInitialized.value = true;
  };

  // Clean up on unmount
  onUnmounted(() => {
    audioService.stopAllAmbient();
  });

  const playAmbientSounds = async () => {
    if (!isInitialized.value) return;
    await audioService.playAmbient('ambient-space', { volume: 0.2 });
    await audioService.playAmbient('ambient-computer', { volume: 0.1 });
  };

  const playUISound = async (soundName) => {
    if (!isInitialized.value) return;
    await audioService.playSound(`ui-${soundName}`, {
      duration: 200,
      volume: volumes.value.ui
    });
  };

  const playEngineSound = async (soundName) => {
    if (!isInitialized.value) return;
    await audioService.playSound(`engine-${soundName}`, {
      volume: volumes.value.engine
    });
  };

  const playAlertSound = async (soundName) => {
    if (!isInitialized.value) return;
    await audioService.playSound(`alert-${soundName}`, {
      duration: 1000,
      volume: volumes.value.alert
    });
  };

  const setVolume = (category, volume) => {
    volumes.value[category] = volume;
    audioService.setVolume(category, volume);
  };

  const toggleMute = () => {
    isMuted.value = !isMuted.value;
    if (isMuted.value) {
      audioService.muteAll();
    } else {
      audioService.unmuteAll();
    }
  };

  return {
    isInitialized,
    isMuted,
    volumes,
    initializeAudio,
    playUISound,
    playEngineSound,
    playAlertSound,
    playAmbientSounds,
    setVolume,
    toggleMute
  };
}
