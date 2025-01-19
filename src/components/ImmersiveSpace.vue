<template>
  <div class="immersive-container">
    <div class="canvas-area">
      <canvas ref="canvas"></canvas>
    </div>
    <div class="interface-layer md:block hidden">
      <div class="interface-grid">
        <!-- Left Console -->
        <div class="console-section">
          <ConsoleInterface />
        </div>
        
        <!-- Right Communication Panel -->
        <div class="communication-section">
          <CommunicationPanel />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ConsoleInterface from './ConsoleInterface.vue'
import CommunicationPanel from './CommunicationPanel.vue'
import { useInterfaceStore } from '../stores/interface'

const store = useInterfaceStore()
const canvas = ref(null)

onMounted(() => {
  store.initializeSystem()
})
</script>

<style scoped>
.immersive-container {
  @apply fixed inset-0 overflow-hidden;
  background: rgb(2, 4, 10);
}

.canvas-area {
  @apply absolute inset-0;
  background: transparent;
}

canvas {
  @apply w-full h-full;
}

.interface-layer {
  @apply absolute inset-0 pointer-events-none;
}

.interface-grid {
  @apply h-full w-full p-4 grid pointer-events-none;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}

.console-section {
  @apply h-full flex items-end pointer-events-auto;
  grid-column: 1;
}

.communication-section {
  @apply h-full flex items-end pointer-events-auto;
  grid-column: 3;
}
</style>
