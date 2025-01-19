<template>
  <div class="csmcl-space relative">
    <ImmersiveSpace />
    
    <!-- Console Interface -->
    <div class="absolute inset-0 z-40 flex items-center justify-center p-8">
      <div class="w-full max-w-4xl bg-space-darker bg-opacity-90 rounded-lg border border-interface-border shadow-glow overflow-hidden">
        <ConsoleInterface />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'
import { useSoundStore } from '../stores/soundStore'
import ImmersiveSpace from '../components/ImmersiveSpace.vue'
import ConsoleInterface from '../components/ConsoleInterface.vue'

const userStore = useUserStore()
const soundStore = useSoundStore()
</script>

<style scoped>
.bg-scan-lines {
  background-image: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}

.bg-space-black {
  background-color: #000;
}
</style>
