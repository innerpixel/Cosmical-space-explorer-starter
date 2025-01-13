<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1">
      <RouterView />
    </main>
    <BottomBar />
  </div>
</template>

<script setup>
import BottomBar from './components/BottomBar.vue'
</script>

<style>
body {
  @apply bg-black min-h-screen;
}

#app {
  @apply text-gray-100;
}
</style>
