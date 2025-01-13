<template>
  <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 mt-40">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Documentation</h1>
    
    <!-- Profile Types -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Profile Types</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <div v-for="(privileges, type) in profileTypes" :key="type" 
             class="p-4 border border-gray-200 rounded-lg">
          <h3 class="text-lg font-medium text-indigo-600 mb-2 capitalize">
            {{ type }}
          </h3>
          <ul class="list-disc list-inside text-gray-600 space-y-1">
            <li v-for="privilege in privileges" :key="privilege" class="capitalize">
              {{ privilege.replace('_', ' ') }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Profile Slots -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Profile Slots</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="p-4 border border-gray-200 rounded-lg">
          <h3 class="text-lg font-medium text-indigo-600 mb-2">Available Slots</h3>
          <ul class="space-y-2 text-gray-600">
            <li><strong>Admin:</strong> Unlimited slots</li>
            <li><strong>Developer:</strong> 3 slots</li>
            <li><strong>Contributor:</strong> 2 slots</li>
            <li><strong>Member:</strong> 1 slot</li>
          </ul>
        </div>
        <div class="p-4 border border-gray-200 rounded-lg">
          <h3 class="text-lg font-medium text-indigo-600 mb-2">How Slots Work</h3>
          <p class="text-gray-600">
            Slots are determined by your highest profile type. For example, if you
            have a Developer profile, you can have up to 3 different profiles of any
            type (except Admin).
          </p>
        </div>
      </div>
    </section>

    <!-- Request Process -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Profile Request Process</h2>
      <div class="space-y-4">
        <div class="p-4 border border-gray-200 rounded-lg">
          <ol class="list-decimal list-inside space-y-3 text-gray-600">
            <li>
              <strong>Check Available Slots:</strong> Verify you have available profile slots
            </li>
            <li>
              <strong>Submit Request:</strong> Fill out the profile request form with:
              <ul class="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Desired profile type</li>
                <li>Description of why you want this profile</li>
                <li>Relevant skills</li>
              </ul>
            </li>
            <li>
              <strong>Admin Review:</strong> Wait for an admin to review your request
            </li>
            <li>
              <strong>Approval/Rejection:</strong> You'll be notified when your request is processed
            </li>
          </ol>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'

const { PROFILE_PRIVILEGES: profileTypes } = useUserStore()
</script>
