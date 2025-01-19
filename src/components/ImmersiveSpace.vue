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
  @apply absolute inset-2;
  background: transparent;
  border-radius: theme('borderRadius.lg');
  border: 1px solid rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

canvas {
  @apply w-full h-full;
  border-radius: inherit;
}

.interface-layer {
  @apply absolute inset-0 pointer-events-none p-4;
  z-index: 10;
}

.interface-grid {
  @apply h-full grid grid-cols-12 gap-4;
}

.console-section {
  @apply col-span-4 pointer-events-auto flex flex-col;
  min-height: calc(100vh - 2rem); /* Account for padding */
}

.communication-section {
  @apply col-span-8 pointer-events-auto flex flex-col;
  min-height: calc(100vh - 2rem); /* Account for padding */
}
</style>
