<template>
  <div class="not-found">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="title">Lost in Space</h1>
      <p class="message">The cosmic coordinates you're looking for seem to be in another galaxy.</p>
      <router-link to="/" class="home-link">
        <span class="icon">🚀</span>
        Return to Mission Control
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  @apply min-h-screen flex items-center justify-center bg-space-black p-4;
  background-image: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
}

.not-found-content {
  @apply text-center max-w-md mx-auto;
}

.error-code {
  @apply text-8xl md:text-9xl font-bold text-interface-text-primary mb-4;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  animation: pulse 2s infinite;
}

.title {
  @apply text-2xl md:text-3xl font-bold text-interface-text-primary mb-4;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.message {
  @apply text-interface-text-muted mb-8;
}

.home-link {
  @apply inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-interface-button;
  @apply text-interface-text-primary font-medium transition-all duration-200;
  @apply hover:bg-interface-button-hover hover:scale-105;
  @apply focus:outline-none focus:ring-2 focus:ring-interface-text-primary/50;
}

.icon {
  @apply text-xl;
}

@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
