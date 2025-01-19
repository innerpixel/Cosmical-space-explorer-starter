<template>
  <div class="communication-panel">
    <!-- Header with Status -->
    <div class="panel-header">
      <div class="status-group">
        <div class="status-indicator" :class="{ online: isConnected }"></div>
        <span class="status-text">{{ connectionStatus }}</span>
      </div>
      <div class="metrics">
        <span class="metric">Signal: {{ signalStrength }}%</span>
        <span class="metric">BW: {{ bandwidth }}Mbps</span>
      </div>
    </div>

    <!-- Video/Screen Display -->
    <div class="display-area" :class="{ active: hasActiveStream }">
      <video ref="videoElement" autoplay playsinline></video>
      <div class="overlay" v-if="!hasActiveStream">
        <span>No Active Communication</span>
      </div>
    </div>

    <!-- Controls -->
    <div class="control-panel">
      <button 
        @click="toggleVideo" 
        :class="{ active: videoEnabled, disabled: !isConnected }"
        class="control-btn">
        <span class="icon">📹</span>
        <span class="label">Video</span>
      </button>
      <button 
        @click="toggleAudio" 
        :class="{ active: audioEnabled, disabled: !isConnected }"
        class="control-btn">
        <span class="icon">🎤</span>
        <span class="label">Audio</span>
      </button>
      <button 
        @click="toggleScreenShare" 
        :class="{ active: screenSharing, disabled: !isConnected }"
        class="control-btn">
        <span class="icon">🖥️</span>
        <span class="label">Share</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useInterfaceStore } from '../stores/interface'

const store = useInterfaceStore()
const videoElement = ref(null)

// Computed properties for status
const isConnected = computed(() => store.communicationState.connected)
const videoEnabled = computed(() => store.communicationState.videoEnabled)
const audioEnabled = computed(() => store.communicationState.audioEnabled)
const screenSharing = computed(() => store.communicationState.screenSharing)
const hasActiveStream = computed(() => videoEnabled.value || screenSharing.value)

// Status metrics
const connectionStatus = computed(() => isConnected.value ? 'CONNECTED' : 'STANDBY')
const signalStrength = computed(() => store.communicationState.signalStrength || 0)
const bandwidth = computed(() => store.communicationState.bandwidth || 0)

// Control functions
const toggleVideo = async () => {
  try {
    if (!videoEnabled.value) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoElement.value.srcObject = stream
      store.updateCommunicationState({ videoEnabled: true })
    } else {
      stopVideoStream()
      store.updateCommunicationState({ videoEnabled: false })
    }
  } catch (error) {
    store.addMessage({
      type: 'error',
      content: 'Failed to access video device: ' + error.message
    })
  }
}

const toggleAudio = async () => {
  try {
    if (!audioEnabled.value) {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      store.updateCommunicationState({ audioEnabled: true })
    } else {
      store.updateCommunicationState({ audioEnabled: false })
    }
  } catch (error) {
    store.addMessage({
      type: 'error',
      content: 'Failed to access audio device: ' + error.message
    })
  }
}

const toggleScreenShare = async () => {
  try {
    if (!screenSharing.value) {
      const stream = await navigator.mediaDevices.getDisplayMedia()
      videoElement.value.srcObject = stream
      store.updateCommunicationState({ screenSharing: true })
    } else {
      stopScreenShare()
      store.updateCommunicationState({ screenSharing: false })
    }
  } catch (error) {
    store.addMessage({
      type: 'error',
      content: 'Failed to start screen sharing: ' + error.message
    })
  }
}

const stopVideoStream = () => {
  if (videoElement.value && videoElement.value.srcObject) {
    videoElement.value.srcObject.getTracks().forEach(track => track.stop())
    videoElement.value.srcObject = null
  }
}

const stopScreenShare = () => {
  stopVideoStream()
}

// Cleanup
onUnmounted(() => {
  stopVideoStream()
  stopScreenShare()
})
</script>

<style scoped>
.communication-panel {
  @apply flex flex-col h-full bg-opacity-80 backdrop-blur-sm rounded-lg border border-cyan-500/30 relative;
  background: rgba(2, 4, 10, 0.9);
}

.panel-header {
  @apply flex items-center justify-between p-4 border-b border-cyan-500/30;
  min-height: 4rem;
}

.status-group {
  @apply flex items-center gap-2;
}

.status-indicator {
  @apply w-2 h-2 rounded-full bg-red-500;
}

.status-indicator.online {
  @apply bg-cyan-500;
}

.status-text {
  @apply text-cyan-500 text-sm font-mono;
}

.metrics {
  @apply flex gap-4;
}

.metric {
  @apply text-cyan-500/70 text-xs font-mono;
}

.display-area {
  @apply relative bg-black/50;
  /* Set a specific height that leaves room for header and controls */
  height: calc(100% - 8rem); /* 4rem header + 4rem controls */
  min-height: 0; /* Allow shrinking */
}

.display-area video {
  @apply absolute inset-0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* Maintain aspect ratio */
  background: rgba(0, 0, 0, 0.3);
}

.overlay {
  @apply absolute inset-0 flex items-center justify-center;
  background: rgba(0, 0, 0, 0.3);
}

.overlay span {
  @apply text-cyan-500/50 font-mono text-sm;
}

.control-panel {
  @apply flex justify-center gap-4 p-4 border-t border-cyan-500/30;
  min-height: 4rem;
  background: rgba(2, 4, 10, 0.9); /* Match panel background */
  position: relative; /* Ensure it stays above video */
  z-index: 20;
}

.control-btn {
  @apply flex flex-col items-center gap-1 px-4 py-2 rounded;
  @apply text-cyan-500/70 hover:text-cyan-500;
  @apply border border-cyan-500/30 hover:border-cyan-500;
}

.control-btn.active {
  @apply bg-cyan-500/20 text-cyan-500;
}

.control-btn.disabled {
  @apply opacity-50 cursor-not-allowed;
}

.control-btn .icon {
  @apply text-lg;
}

.control-btn .label {
  @apply text-xs font-mono;
}
</style>
