<template>
  <div class="documentation-space relative min-h-screen bg-space-black">
    <!-- Immersive Background -->
    <div class="fixed inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>
    <div class="fixed inset-0 bg-gradient-to-b from-cyan-900/20 to-purple-900/20 pointer-events-none"></div>
    
    <!-- Content Container -->
    <div class="relative z-10 container mx-auto px-4 py-16">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="alien-icon mx-auto mb-6 w-16 h-16">
          <div class="glyph-icon animate-pulse">
            <div class="symbol">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>
        <h1 class="text-4xl font-bold text-interface-text-primary mb-4">Space Explorer Documentation</h1>
        <p class="text-xl text-interface-text-muted max-w-2xl mx-auto">Navigate through our cosmic knowledge base</p>
      </div>

      <!-- Documentation Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Architecture Section -->
        <div class="group bg-space-darker bg-opacity-90 rounded-lg border border-interface-border p-6 hover:border-cyan-500/50 transition-all duration-300">
          <router-link to="/docs/architecture/domain" class="block">
            <div class="alien-icon w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300">
              <div class="quantum-icon">
                <div class="core"></div>
                <div class="orbit"></div>
                <div class="orbit"></div>
              </div>
            </div>
            <h2 class="text-2xl font-semibold text-interface-text-primary mb-3">Architecture</h2>
            <p class="text-interface-text-muted mb-4">Explore the domain architecture and system design</p>
            <div class="space-y-2">
              <div class="text-sm text-interface-text-muted hover:text-interface-text-primary transition-colors duration-200">
                → Domain Architecture
              </div>
            </div>
          </router-link>
        </div>

        <!-- Development Section -->
        <div class="group bg-space-darker bg-opacity-90 rounded-lg border border-interface-border p-6 hover:border-purple-500/50 transition-all duration-300">
          <div class="space-y-6">
            <div class="alien-icon w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300">
              <div class="energy-icon">
                <div class="core"></div>
                <div class="rings">
                  <div class="ring"></div>
                  <div class="ring"></div>
                </div>
              </div>
            </div>
            <h2 class="text-2xl font-semibold text-interface-text-primary mb-3">Development</h2>
            <p class="text-interface-text-muted mb-4">Learn about development workflows and processes</p>
            <div class="space-y-2">
              <router-link 
                to="/docs/development/overview"
                class="block text-sm text-interface-text-muted hover:text-interface-text-primary transition-colors duration-200"
              >
                → Development Overview
              </router-link>
              <router-link 
                to="/docs/development/flow"
                class="block text-sm text-interface-text-muted hover:text-interface-text-primary transition-colors duration-200"
              >
                → Development Flow
              </router-link>
            </div>
          </div>
        </div>

        <!-- Deployment Section -->
        <div class="group bg-space-darker bg-opacity-90 rounded-lg border border-interface-border p-6 hover:border-green-500/50 transition-all duration-300">
          <router-link to="/docs/deployment/flow" class="block">
            <div class="alien-icon w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300">
              <div class="portal-icon">
                <div class="gateway"></div>
                <div class="vortex"></div>
              </div>
            </div>
            <h2 class="text-2xl font-semibold text-interface-text-primary mb-3">Deployment</h2>
            <p class="text-interface-text-muted mb-4">Understand deployment processes and flows</p>
            <div class="space-y-2">
              <div class="text-sm text-interface-text-muted hover:text-interface-text-primary transition-colors duration-200">
                → Deployment Flow
              </div>
            </div>
          </router-link>
        </div>

        <!-- Features Section -->
        <div class="group bg-space-darker bg-opacity-90 rounded-lg border border-interface-border p-6 hover:border-yellow-500/50 transition-all duration-300">
          <router-link to="/docs/features/space-meetings" class="block">
            <div class="alien-icon w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300">
              <div class="telepathy-icon">
                <div class="waves">
                  <div class="wave"></div>
                  <div class="wave"></div>
                  <div class="wave"></div>
                </div>
              </div>
            </div>
            <h2 class="text-2xl font-semibold text-interface-text-primary mb-3">Features</h2>
            <p class="text-interface-text-muted mb-4">Discover platform features and capabilities</p>
            <div class="space-y-2">
              <div class="text-sm text-interface-text-muted hover:text-interface-text-primary transition-colors duration-200">
                → Space Meetings
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activateTranslator = inject('activateTranslator')

const handleLinkHover = () => {
  // Play hover sound
  const audio = new Audio('/sounds/hover.mp3')
  audio.volume = 0.2
  audio.play()
}

const handleLinkClick = () => {
  // Play click sound
  const audio = new Audio('/sounds/click.mp3')
  audio.volume = 0.3
  audio.play()
}

// Add event listeners for sound effects
onMounted(() => {
  const links = document.querySelectorAll('a')
  links.forEach(link => {
    link.addEventListener('mouseenter', handleLinkHover)
    link.addEventListener('click', handleLinkClick)
  })
})
</script>

<style scoped>
.documentation-space {
  min-height: 100vh;
  background-color: #0a0a0f;
  background-image: 
    radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 50%),
    linear-gradient(to bottom, rgba(6, 182, 212, 0.02) 0%, transparent 100%);
}

.bg-scan-lines {
  background-image: repeating-linear-gradient(
    transparent 0px,
    transparent 1px,
    rgba(6, 182, 212, 0.05) 2px,
    rgba(6, 182, 212, 0.05) 3px
  );
  background-size: 100% 3px;
  pointer-events: none;
}

/* Morse Code Animation */
pre code {
  animation: morse-glow 2s ease-in-out infinite;
  font-family: monospace;
}

@keyframes morse-glow {
  0%, 100% { text-shadow: 0 0 5px theme('colors.cyan.500'); }
  50% { text-shadow: 0 0 15px theme('colors.cyan.500'); }
}
</style>
