<template>
  <div class="min-h-screen bg-gray-50">
    <div class="relative top-20">
      <div class="container mx-auto py-16">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-gray-900 mb-8">Welcome to CSMCL SPACE</h1>
          
          <!-- Hero Section -->
          <section class="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Your Gateway to Space Exploration</h2>
            <p class="text-gray-600 mb-6">
              Join our community of space enthusiasts and contribute to the future of space exploration.
              Whether you're a developer, content creator, or space enthusiast, there's a place for you here.
            </p>
            <div class="flex gap-4">
              <router-link 
                to="/profile/request" 
                class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
              >
                Request Profile
              </router-link>
              <router-link 
                to="/docs" 
                class="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Learn More
              </router-link>
            </div>
          </section>

          <!-- Features Grid -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Profile Types -->
            <section class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">Profile Types</h3>
              <ul class="space-y-3 text-gray-600">
                <li class="flex items-start gap-3">
                  <span class="text-indigo-600">•</span>
                  <div>
                    <strong class="block text-gray-800">Member</strong>
                    <p>Access space-related content and join discussions</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-indigo-600">•</span>
                  <div>
                    <strong class="block text-gray-800">Contributor</strong>
                    <p>Create and share space-related content</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-indigo-600">•</span>
                  <div>
                    <strong class="block text-gray-800">Developer</strong>
                    <p>Build and improve space exploration tools</p>
                  </div>
                </li>
              </ul>
            </section>

            <!-- Getting Started -->
            <section class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">Getting Started</h3>
              <ol class="space-y-3 text-gray-600">
                <li class="flex items-start gap-3">
                  <span class="text-indigo-600 font-bold">1.</span>
                  <p>Sign up for an account</p>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-indigo-600 font-bold">2.</span>
                  <p>Request your first profile</p>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-indigo-600 font-bold">3.</span>
                  <p>Wait for admin approval</p>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-indigo-600 font-bold">4.</span>
                  <p>Start exploring and contributing!</p>
                </li>
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
