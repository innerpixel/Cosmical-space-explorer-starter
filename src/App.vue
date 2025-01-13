<template>
  <div class="min-h-screen bg-gray-50 flex flex-col pt-20">
    <TopBar class="fixed top-0 left-0 right-0 z-50" />
    <RouterView />
    <Footer />
    <BottomBar />
  </div>
</template>

<script setup>
import TopBar from './components/TopBar.vue'
import Footer from './components/Footer.vue'
import BottomBar from './components/BottomBar.vue'
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  @apply bg-black min-h-screen;
}

#app {
  @apply text-gray-100 min-h-screen pb-20;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
