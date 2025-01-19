<template>
  <div class="communication-panel">
    <!-- Header with Status -->
    <div class="panel-header">
      <div class="status-group">
        <div class="alien-icon status" :class="{ online: isConnected }">
          <div class="inner-circle"></div>
          <div class="pulse"></div>
        </div>
        <span class="status-text">{{ connectionStatus }}</span>
      </div>
      <div class="metrics">
        <div class="metric">
          <div class="metric-icon signal">
            <div class="bar" v-for="i in 4" :key="i" 
                 :class="{ active: signalStrength >= i * 25 }"></div>
          </div>
          <span class="value">{{ signalStrength }}%</span>
        </div>
        <div class="metric">
          <div class="metric-icon bandwidth">
            <div class="wave" v-for="i in 3" :key="i"></div>
          </div>
          <span class="value">{{ bandwidth }}Mbps</span>
        </div>
      </div>
    </div>

    <!-- Video/Screen Display -->
    <div class="display-area" :class="{ active: hasActiveStream }">
      <video ref="videoElement" autoplay playsinline></video>
      <div class="overlay" v-if="!hasActiveStream">
        <div class="scan-line"></div>
        <span>AWAITING TRANSMISSION</span>
      </div>
    </div>

    <!-- Controls -->
    <div class="control-panel">
      <button 
        @click="toggleVideo" 
        :class="{ active: videoEnabled, disabled: !isConnected }"
        class="control-btn">
        <div class="alien-icon">
          <div class="symbol video-symbol">
            <div class="lens"></div>
            <div class="sensor"></div>
          </div>
        </div>
        <span class="label">VIDEO</span>
      </button>
      
      <button 
        @click="toggleAudio" 
        :class="{ active: audioEnabled, disabled: !isConnected }"
        class="control-btn">
        <div class="alien-icon">
          <div class="symbol audio-symbol">
            <div class="wave" v-for="i in 3" :key="i"></div>
          </div>
        </div>
        <span class="label">AUDIO</span>
      </button>
      
      <button 
        @click="toggleScreenShare" 
        :class="{ active: screenSharing, disabled: !isConnected }"
        class="control-btn">
        <div class="alien-icon">
          <div class="symbol share-symbol">
            <div class="grid"></div>
            <div class="beam"></div>
          </div>
        </div>
        <span class="label">SHARE</span>
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
  @apply flex flex-col h-full;
  @apply bg-opacity-80 backdrop-blur-sm rounded-lg border border-cyan-500/30;
  background: rgba(2, 4, 10, 0.9);
}

.panel-header {
  @apply flex items-center justify-between p-4 border-b border-cyan-500/30;
  height: 56px;
}

.status-group {
  @apply flex items-center gap-2;
}

.status-text {
  @apply text-xs font-mono text-cyan-500/70;
}

.metrics {
  @apply flex items-center gap-4;
}

.metric {
  @apply flex items-center gap-2;
}

.metric-icon {
  @apply w-6 h-4 relative flex items-center;
}

.metric .value {
  @apply text-xs font-mono text-cyan-500/70;
}

/* Signal Strength Icon */
.signal {
  @apply flex items-end justify-between;
}

.signal .bar {
  @apply w-1 bg-cyan-500/30 rounded-t;
  transition: all 0.3s ease;
}

.signal .bar:nth-child(1) { height: 25%; }
.signal .bar:nth-child(2) { height: 50%; }
.signal .bar:nth-child(3) { height: 75%; }
.signal .bar:nth-child(4) { height: 100%; }

.signal .bar.active {
  @apply bg-cyan-500;
}

/* Bandwidth Icon */
.bandwidth {
  @apply flex items-center justify-center overflow-hidden;
}

.bandwidth .wave {
  @apply absolute w-6 h-6 border border-cyan-500/30 rounded-full;
  animation: expand 2s infinite;
}

.bandwidth .wave:nth-child(2) {
  animation-delay: 0.5s;
}

.bandwidth .wave:nth-child(3) {
  animation-delay: 1s;
}

@keyframes expand {
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Display Area */
.display-area {
  @apply flex-1 relative overflow-hidden rounded-lg m-4;
  @apply bg-gray-900/50 border border-cyan-500/20;
}

video {
  @apply w-full h-full object-cover;
}

.overlay {
  @apply absolute inset-0 flex items-center justify-center;
  @apply text-cyan-500/70 font-mono text-sm;
  background: rgba(2, 4, 10, 0.7);
}

.scan-line {
  @apply absolute w-full h-0.5 bg-cyan-500/30;
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}

/* Control Panel */
.control-panel {
  @apply flex items-center justify-center gap-4 p-4 border-t border-cyan-500/30;
  height: 56px;
}

.control-btn {
  @apply flex flex-col items-center gap-1;
  @apply transition-all duration-300;
}

.control-btn .label {
  @apply text-xs font-mono text-cyan-500/50;
}

.control-btn:hover .label {
  @apply text-cyan-500/70;
}

.control-btn.active .label {
  @apply text-cyan-500;
}

.alien-icon {
  @apply w-8 h-8 relative flex items-center justify-center;
  @apply rounded-full border border-cyan-500/20;
  @apply transition-all duration-300;
  background: rgba(6, 182, 212, 0.05);
}

.control-btn:hover .alien-icon {
  @apply border-cyan-500/40;
  background: rgba(6, 182, 212, 0.1);
}

.control-btn.active .alien-icon {
  @apply border-cyan-500/60;
  background: rgba(6, 182, 212, 0.15);
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
}

/* Video Symbol */
.video-symbol {
  @apply w-5 h-5 relative;
}

.video-symbol .lens {
  @apply absolute inset-1 rounded-full border-2 border-cyan-500/60;
  @apply transition-all duration-300;
}

.video-symbol .sensor {
  @apply absolute w-1 h-1 rounded-full bg-cyan-500/60;
  @apply transition-all duration-300;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.control-btn.active .video-symbol .lens {
  @apply border-cyan-500;
}

.control-btn.active .video-symbol .sensor {
  @apply bg-cyan-500;
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.6);
}

/* Audio Symbol */
.audio-symbol {
  @apply w-5 h-5 relative flex items-center justify-center;
}

.audio-symbol .wave {
  @apply absolute h-3 border-r-2 border-cyan-500/60;
  @apply transition-all duration-300;
  animation: pulse 1.5s infinite;
}

.audio-symbol .wave:nth-child(2) {
  height: 2.5rem;
  animation-delay: 0.2s;
}

.audio-symbol .wave:nth-child(3) {
  height: 2rem;
  animation-delay: 0.4s;
}

.control-btn.active .audio-symbol .wave {
  @apply border-cyan-500;
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.6);
}

/* Share Symbol */
.share-symbol {
  @apply w-5 h-5 relative;
}

.share-symbol .grid {
  @apply absolute inset-1;
  background-image: linear-gradient(to right, rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(6, 182, 212, 0.3) 1px, transparent 1px);
  background-size: 4px 4px;
}

.share-symbol .beam {
  @apply absolute w-full h-0.5 bg-cyan-500/60;
  @apply transition-all duration-300;
  top: 50%;
  transform: translateY(-50%);
  animation: scan-beam 2s infinite;
}

@keyframes scan-beam {
  0%, 100% { transform: translateY(-50%) scaleX(0.3); }
  50% { transform: translateY(-50%) scaleX(1); }
}

.control-btn.active .share-symbol .beam {
  @apply bg-cyan-500;
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.6);
}

.control-btn.disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
