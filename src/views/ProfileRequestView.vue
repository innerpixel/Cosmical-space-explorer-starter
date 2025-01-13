<template>
  <div class="min-h-screen bg-gray-50">
    <div class="relative top-20">
      <div class="container mx-auto py-16">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-8">Request Profile</h1>
          <ProfileRequest />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileRequest from '../components/ProfileRequest.vue'
</script>
