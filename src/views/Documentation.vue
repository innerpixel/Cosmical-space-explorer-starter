<template>
  <div class="min-h-screen bg-space-black pt-16">
    <!-- Scan Lines Effect -->
    <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

    <div class="container mx-auto px-4 py-8">
      <!-- Documentation Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-interface-text-primary animate-glow-pulse mb-4">
          Mission Documentation
        </h1>
        <p class="text-xl text-interface-text-muted max-w-2xl mx-auto">
          Essential guides and protocols for space exploration operations
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Navigation Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6 sticky top-24">
            <h2 class="text-xl font-semibold text-interface-text-primary mb-4">Contents</h2>
            <nav class="space-y-2">
              <a 
                v-for="(section, index) in sections" 
                :key="index"
                :href="'#' + section.id"
                class="block text-interface-text-muted hover:text-interface-text-primary transition-colors duration-200"
              >
                {{ section.title }}
              </a>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3 space-y-8">
          <section 
            v-for="(section, index) in sections" 
            :key="index"
            :id="section.id"
            class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-8"
          >
            <h2 class="text-2xl font-semibold text-interface-text-primary mb-6">{{ section.title }}</h2>
            <div class="prose prose-invert max-w-none">
              <div v-html="section.content"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sections = ref([
  {
    id: 'getting-started',
    title: 'Getting Started',
    content: `
      <h3 class="text-xl font-semibold text-interface-text-primary mb-4">Mission Preparation</h3>
      <p class="text-interface-text-muted mb-4">
        Welcome to the Cosmical Space Explorer documentation. This guide will help you navigate through
        the essential procedures and protocols for space exploration operations.
      </p>
      <div class="bg-space-dark rounded p-4 mb-4">
        <h4 class="text-interface-text-primary mb-2">Quick Start</h4>
        <ol class="list-decimal list-inside space-y-2 text-interface-text-muted">
          <li>Create your explorer profile</li>
          <li>Complete security clearance</li>
          <li>Access mission control dashboard</li>
          <li>Begin mission preparations</li>
        </ol>
      </div>
    `
  },
  {
    id: 'mission-control',
    title: 'Mission Control',
    content: `
      <h3 class="text-xl font-semibold text-interface-text-primary mb-4">Command Center Operations</h3>
      <p class="text-interface-text-muted mb-4">
        The Mission Control interface provides real-time telemetry data and command capabilities
        for ongoing space missions.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-space-dark rounded p-4">
          <h4 class="text-interface-text-primary mb-2">Telemetry Data</h4>
          <ul class="list-disc list-inside text-interface-text-muted">
            <li>Orbital parameters</li>
            <li>System status</li>
            <li>Environmental readings</li>
          </ul>
        </div>
        <div class="bg-space-dark rounded p-4">
          <h4 class="text-interface-text-primary mb-2">Command Interface</h4>
          <ul class="list-disc list-inside text-interface-text-muted">
            <li>Mission parameters</li>
            <li>System controls</li>
            <li>Emergency procedures</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 'security-protocols',
    title: 'Security Protocols',
    content: `
      <h3 class="text-xl font-semibold text-interface-text-primary mb-4">Access Control</h3>
      <p class="text-interface-text-muted mb-4">
        Security is paramount in space operations. All personnel must adhere to strict security
        protocols to maintain mission integrity.
      </p>
      <div class="bg-space-dark rounded p-4 mb-4">
        <h4 class="text-interface-text-primary mb-2">Clearance Levels</h4>
        <ul class="list-disc list-inside text-interface-text-muted">
          <li>Level 1: Basic Access</li>
          <li>Level 2: Mission Control</li>
          <li>Level 3: Command Authority</li>
          <li>Level 4: Administrator</li>
        </ul>
      </div>
    `
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    content: `
      <h3 class="text-xl font-semibold text-interface-text-primary mb-4">Common Issues</h3>
      <p class="text-interface-text-muted mb-4">
        Reference this section for solutions to common technical issues and emergency procedures.
      </p>
      <div class="space-y-4">
        <div class="bg-space-dark rounded p-4">
          <h4 class="text-interface-text-primary mb-2">Connection Issues</h4>
          <p class="text-interface-text-muted">
            If you experience connection problems:
          </p>
          <ol class="list-decimal list-inside text-interface-text-muted mt-2">
            <li>Verify network connectivity</li>
            <li>Check security credentials</li>
            <li>Clear browser cache</li>
            <li>Contact mission support</li>
          </ol>
        </div>
      </div>
    `
  }
])
</script>

<style scoped>
.bg-scan-lines {
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(6, 182, 212, 0.05) 50%,
    transparent 100%
  );
  background-size: 100% 4px;
  animation: scan 8s linear infinite;
}

@keyframes scan {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 100%;
  }
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: theme('colors.space.darker');
}

::-webkit-scrollbar-thumb {
  background: theme('colors.interface.border.DEFAULT');
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: theme('colors.interface.border.hover');
}
</style>
