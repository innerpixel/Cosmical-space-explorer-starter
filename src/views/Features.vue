<template>
  <div class="features-space min-h-screen bg-space-black p-8">
    <!-- Artifact Discovery Section -->
    <div class="max-w-4xl mx-auto mb-16">
      <div class="group bg-space-darker bg-opacity-90 rounded-lg border border-interface-border p-8 
                  hover:border-cyan-500/50 transition-all duration-500 cursor-pointer"
           :class="{ 'border-cyan-500': isActivated }">
        <div class="flex items-start space-x-8">
          <!-- Artifact Visual -->
          <div class="artifact-container w-32 h-32 relative">
            <div class="artifact-icon absolute inset-0" :class="{ 'activated': isActivated }">
              <div class="telepathy-icon">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="link"></div>
                <div class="wave-emitter"></div>
              </div>
            </div>
            <div class="artifact-glow absolute inset-0 bg-cyan-500/20 rounded-full filter blur-xl transform scale-125"
                 :class="{ 'activated': isActivated }"></div>
          </div>

          <!-- Artifact Description -->
          <div class="flex-1 space-y-4">
            <div class="flex items-center space-x-3">
              <h2 class="text-3xl font-bold text-cyan-400">Ancient Communication Device</h2>
              <span class="px-2 py-1 rounded-full text-sm"
                    :class="isActivated ? 'bg-green-500/20 text-green-400' : 'bg-cyan-500/20 text-cyan-400'">
                {{ isActivated ? 'Active' : 'Inactive' }}
              </span>
            </div>
            
            <p class="text-interface-text-muted">
              {{ isActivated 
                ? 'Translation matrix successfully initialized. All systems operational.'
                : 'A remarkable artifact discovered among cosmic ruins. Analysis indicates advanced capabilities for universal translation and sonic wave manipulation. Current status: dormant.' 
              }}
            </p>

            <!-- Activation Interface -->
            <div class="activation-interface bg-space-dark rounded-lg p-4 mt-4">
              <div class="mb-4">
                <div class="text-sm text-interface-text-secondary mb-2">
                  {{ isActivated ? 'Active Frequencies' : 'Detected Frequencies' }}:
                </div>
                <div class="frequency-waves flex space-x-2 h-8">
                  <div v-for="n in 5" :key="n" 
                       class="wave-bar"
                       :class="{ 'activated': isActivated }"></div>
                </div>
              </div>

              <button 
                @click="activateArtifact" 
                class="w-full px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                :class="[
                  isActivated 
                    ? 'bg-green-500/20 text-green-400 cursor-default'
                    : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30',
                ]"
                :disabled="isActivated || isInitializing"
              >
                <span>{{ isActivated ? 'Translation Matrix Active' : isInitializing ? 'Initializing...' : 'Initialize Translation Matrix' }}</span>
                <div v-if="isInitializing" 
                     class="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
                <div v-else-if="isActivated"
                     class="w-4 h-4 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold text-interface-text-primary mb-8">Discovered Technologies</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Quantum Navigation -->
        <div class="feature-card">
          <div class="alien-icon">
            <div class="quantum-icon">
              <div class="core"></div>
              <div class="orbit"></div>
            </div>
          </div>
          <h3>Quantum Navigation</h3>
          <p>Advanced spatial manipulation interface for seamless cosmic traversal.</p>
        </div>

        <!-- Energy Manipulation -->
        <div class="feature-card">
          <div class="alien-icon">
            <div class="energy-icon">
              <div class="core"></div>
              <div class="rings">
                <div class="ring"></div>
              </div>
            </div>
          </div>
          <h3>Energy Manipulation</h3>
          <p>Harness and redirect cosmic energy streams through intuitive controls.</p>
        </div>

        <!-- Telepathic Interface -->
        <div class="feature-card">
          <div class="alien-icon">
            <div class="telepathy-icon">
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="link"></div>
            </div>
          </div>
          <h3>Telepathic Interface</h3>
          <p>Direct neural connection for enhanced user interaction and control.</p>
        </div>

        <!-- Portal Technology -->
        <div class="feature-card">
          <div class="alien-icon">
            <div class="portal-icon">
              <div class="gateway"></div>
              <div class="vortex"></div>
            </div>
          </div>
          <h3>Portal Technology</h3>
          <p>Instant spatial transportation between designated cosmic coordinates.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const activateTranslator = inject('activateTranslator')
const isActivated = ref(false)
const isInitializing = ref(false)

const activateArtifact = async () => {
  if (isInitializing.value || isActivated.value) return
  
  try {
    isInitializing.value = true
    
    // Simulate initialization sequence
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Activate translator
    activateTranslator()
    isActivated.value = true
    
    // Enable sound globally
    localStorage.setItem('sound_enabled', 'true')
  } catch (error) {
    console.error('Error activating artifact:', error)
  } finally {
    isInitializing.value = false
  }
}
</script>

<style scoped>
.feature-card {
  @apply bg-space-darker bg-opacity-90 rounded-lg border border-interface-border p-6 
         hover:border-cyan-500/50 transition-all duration-300;
}

.feature-card h3 {
  @apply text-xl font-semibold text-interface-text-primary mt-4 mb-2;
}

.feature-card p {
  @apply text-interface-text-muted;
}

.wave-bar {
  @apply w-2 bg-cyan-500/40 rounded-full transform origin-bottom transition-all duration-500;
  animation: wave-animation 2s infinite;
}

.wave-bar.activated {
  @apply bg-green-500/40;
  animation: wave-animation 1s infinite;
}

.wave-bar:nth-child(1) { animation-delay: 0.0s; height: 100%; }
.wave-bar:nth-child(2) { animation-delay: 0.1s; height: 70%; }
.wave-bar:nth-child(3) { animation-delay: 0.2s; height: 100%; }
.wave-bar:nth-child(4) { animation-delay: 0.3s; height: 60%; }
.wave-bar:nth-child(5) { animation-delay: 0.4s; height: 90%; }

.artifact-icon {
  animation: artifact-pulse 4s ease-in-out infinite;
}

.artifact-icon.activated {
  animation: artifact-pulse 2s ease-in-out infinite;
}

.artifact-glow {
  animation: glow-pulse 4s ease-in-out infinite;
}

.artifact-glow.activated {
  @apply bg-green-500/20;
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes wave-animation {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.5); }
}

@keyframes artifact-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.2; transform: scale(1.25); }
  50% { opacity: 0.4; transform: scale(1.35); }
}
</style>
