<template>
  <div class="home">
    <ImmersiveSpace />
  </div>
</template>

<script setup>
import ImmersiveSpace from '../components/ImmersiveSpace.vue'
</script>

<style scoped>
/* Scan Lines */
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

.bg-space-darker {
  background-color: #141414;
}

.border-interface-border {
  border-color: #333;
}

.shadow-glow {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.text-interface-text-primary {
  color: #fff;
}

.text-interface-text-muted {
  color: #ccc;
}

.interface-button-primary {
  background-color: #007bff;
}

.interface-button-hover {
  background-color: #0056b3;
}

.interface-button-hover {
  color: #fff;
}

.animate-glow-pulse {
  animation: glow-pulse 2s infinite;
}

@keyframes glow-pulse {
  0% {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
  }
  100% {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
}

.home {
  @apply fixed inset-0 overflow-hidden;
  min-height: 100vh;
  min-height: 100dvh;
}
</style>
