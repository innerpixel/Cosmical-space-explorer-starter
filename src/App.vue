<template>
  <div class="min-h-screen flex flex-col">
    <TopBar />
    <main class="flex-1 pb-12">
      <RouterView />
    </main>
    <BottomBar />
  </div>
</template>

<script setup>
import TopBar from './components/TopBar.vue'
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
