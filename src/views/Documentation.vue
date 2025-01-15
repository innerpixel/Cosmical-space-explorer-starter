<template>
  <div class="min-h-screen bg-space-black pt-16">
    <div class="w-full">
      <!-- Documentation Header -->
      <div class="relative w-full mb-8">
        <div class="bg-space-darker border-y border-interface-border p-8">
          <h1 class="text-3xl font-bold text-interface-text-primary mb-4">Documentation</h1>
          <p class="text-interface-text-muted max-w-3xl">Your guide to exploring and utilizing the Cosmical Space Explorer platform.</p>
        </div>
      </div>

      <!-- Documentation Content -->
      <div class="px-4 md:px-6 lg:px-8">
        <!-- Scan Lines Effect -->
        <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

        <div class="container mx-auto py-8">
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
        <h4 class="text-interface-text-primary mb-2">Selective Admission Protocol</h4>
        <p class="text-interface-text-muted mb-4">
          Access to deep space operations requires special clearance levels and strict vetting procedures:
        </p>
        <ul class="list-disc list-inside text-interface-text-muted mb-4">
          <li>Level 1: Basic space operations and known celestial bodies</li>
          <li>Level 2: Advanced propulsion systems and experimental technologies</li>
          <li>Level 3: First contact protocols and xenological studies</li>
          <li>Level 4: [CLASSIFIED] Deep space anomalies and temporal phenomena</li>
          <li>Level 5: [TOP SECRET] Known worlds alliance protocols</li>
        </ul>

        <div class="bg-red-900/20 border border-red-700/50 rounded p-4 mb-4">
          <h5 class="text-red-400 font-semibold mb-2">⚠️ Critical Notice</h5>
          <p class="text-interface-text-muted">
            Personnel seeking clearance beyond Level 3 must formally acknowledge departure from known space protocols
            and accept the implications of accessing classified xenological information.
          </p>
        </div>
      </div>

      <div class="bg-space-dark rounded p-4 mb-4">
        <h4 class="text-interface-text-primary mb-2">Role Hierarchy</h4>
        <ul class="list-disc list-inside text-interface-text-muted mb-4">
          <li>Administrator: Full system access and role management</li>
          <li>Commander: Mission leadership and strategic operations</li>
          <li>Engineer: Technical systems and maintenance</li>
          <li>Scientist: Research and data analysis</li>
          <li>Explorer: Field operations and exploration</li>
          <li>Member: Basic platform access</li>
        </ul>

        <h4 class="text-interface-text-primary mb-2">Role Progression</h4>
        <p class="text-interface-text-muted mb-4">
          New users start as Members and can request role upgrades based on their qualifications and experience.
          Role requests are reviewed and approved by administrators.
        </p>

        <h4 class="text-interface-text-primary mb-2">Test Credentials</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <p class="text-interface-text-primary font-semibold">Administrator Access</p>
            <p class="text-interface-text-muted">Email: innerpixel@csmcl.space</p>
            <p class="text-interface-text-muted">Password: adventure</p>
          </div>
          <div class="space-y-2">
            <p class="text-interface-text-primary font-semibold">Explorer Access</p>
            <p class="text-interface-text-muted">Email: explorer@csmcl.space</p>
            <p class="text-interface-text-muted">Password: adventure</p>
          </div>
          <div class="space-y-2">
            <p class="text-interface-text-primary font-semibold">Scientist Access</p>
            <p class="text-interface-text-muted">Email: scientist@csmcl.space</p>
            <p class="text-interface-text-muted">Password: adventure</p>
          </div>
          <div class="space-y-2">
            <p class="text-interface-text-primary font-semibold">Engineer Access</p>
            <p class="text-interface-text-muted">Email: engineer@csmcl.space</p>
            <p class="text-interface-text-muted">Password: adventure</p>
          </div>
          <div class="space-y-2">
            <p class="text-interface-text-primary font-semibold">Commander Access</p>
            <p class="text-interface-text-muted">Email: commander@csmcl.space</p>
            <p class="text-interface-text-muted">Password: adventure</p>
          </div>
        </div>

        <div class="mt-4 p-4 bg-space-darker rounded border border-interface-border">
          <h4 class="text-interface-text-primary mb-2">⚠️ Important Note</h4>
          <p class="text-interface-text-muted">
            These are test credentials for demonstration purposes. In a production environment,
            each user should create their own secure account and follow proper security protocols.
          </p>
        </div>
      </div>

      <div class="bg-space-dark rounded p-4 mb-4">
        <h4 class="text-interface-text-primary mb-2">Security Best Practices</h4>
        <ul class="list-disc list-inside text-interface-text-muted">
          <li>Use strong, unique passwords</li>
          <li>Enable two-factor authentication when available</li>
          <li>Never share your credentials</li>
          <li>Log out after each session</li>
          <li>Report any suspicious activity to administrators</li>
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
