<template>
  <div class="min-h-screen bg-space-black pt-16">
    <!-- Scan Lines Effect -->
    <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

    <div class="w-full">
      <!-- Hero Section -->
      <div class="relative w-full mb-16">
        <div class="scanner-container bg-space-darker border-y border-interface-border p-12 overflow-hidden">
          <!-- Moving Border Light Effect -->
          <div class="light-border"></div>
          
          <!-- Content -->
          <div class="text-center relative z-10">
            <img src="../assets/logo.svg" alt="Logo" class="w-32 h-32 mx-auto mb-6">
            <h1 class="text-4xl font-bold text-interface-text-primary mb-4 scanner-text">
              Welcome to Cosmical Space Explorer
            </h1>
            <p class="text-xl text-interface-text-muted mb-8 scanner-text">
              Your gateway to the infinite cosmos
            </p>
            <router-link
              to="/docs"
              class="inline-flex items-center px-6 py-3 border border-transparent rounded-md
                     shadow-button hover:shadow-button-hover
                     text-white bg-interface-button-primary hover:bg-interface-button-hover
                     transition-all duration-200"
            >
              Start Your Mission
            </router-link>
          </div>

          <!-- Scanner Line -->
          <div class="scanner-line"></div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-6 lg:px-8 mb-16">
        <div class="bg-space-darker p-6 rounded-lg border border-interface-border shadow-glow">
          <div class="text-interface-text-primary mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-interface-text-primary mb-2">Explore Missions</h3>
          <p class="text-interface-text-muted">Discover ongoing space missions and their objectives.</p>
        </div>

        <div class="bg-space-darker p-6 rounded-lg border border-interface-border shadow-glow">
          <div class="text-interface-text-primary mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-interface-text-primary mb-2">Mission Control</h3>
          <p class="text-interface-text-muted">Access real-time mission data and control interfaces.</p>
        </div>

        <div class="bg-space-darker p-6 rounded-lg border border-interface-border shadow-glow">
          <div class="text-interface-text-primary mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-interface-text-primary mb-2">Secure Access</h3>
          <p class="text-interface-text-muted">Advanced security protocols for mission-critical operations.</p>
        </div>
      </div>

      <!-- Component Showcase Section -->
      <div class="px-4 md:px-6 lg:px-8 mb-16">
        <div class="bg-space-darker p-8 rounded-lg border border-interface-border shadow-glow">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-interface-text-primary mb-4">
              Explore Our Component Universe
            </h2>
            <p class="text-xl text-interface-text-muted max-w-2xl mx-auto">
              Discover a galaxy of pre-built components, layouts, and patterns to accelerate your cosmic development journey.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <router-link to="/showcase/layout" class="bg-space-black p-6 rounded-lg border border-interface-border hover:border-interface-text-primary transition-all duration-200 group">
              <div class="text-interface-text-primary mb-4">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-interface-text-primary mb-2">Layout System</h3>
              <p class="text-interface-text-muted mb-4">Flexible grid systems and containers for perfect cosmic alignment.</p>
              <span class="text-interface-text-primary group-hover:text-interface-button-hover">
                Explore Layouts →
              </span>
            </router-link>

            <router-link to="/showcase/components" class="bg-space-black p-6 rounded-lg border border-interface-border hover:border-interface-text-primary transition-all duration-200 group">
              <div class="text-interface-text-primary mb-4">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-interface-text-primary mb-2">UI Components</h3>
              <p class="text-interface-text-muted mb-4">Ready-to-use components for building stellar interfaces.</p>
              <span class="text-interface-text-primary group-hover:text-interface-button-hover">
                View Components →
              </span>
            </router-link>

            <router-link to="/showcase/patterns" class="bg-space-black p-6 rounded-lg border border-interface-border hover:border-interface-text-primary transition-all duration-200 group">
              <div class="text-interface-text-primary mb-4">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-interface-text-primary mb-2">UI Patterns</h3>
              <p class="text-interface-text-muted mb-4">Common patterns and solutions for consistent experiences.</p>
              <span class="text-interface-text-primary group-hover:text-interface-button-hover">
                Discover Patterns →
              </span>
            </router-link>
          </div>

          <div class="text-center">
            <router-link
              to="/showcase"
              class="inline-flex items-center px-6 py-3 border border-interface-button-primary rounded-md
                     shadow-button hover:shadow-button-hover
                     text-white bg-interface-button-primary hover:bg-interface-button-hover
                     transition-all duration-200"
            >
              Launch Component Explorer
            </router-link>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center">
        <router-link 
          to="/docs" 
          class="inline-flex items-center px-6 py-3 border border-transparent rounded-md
                 shadow-button hover:shadow-button-hover
                 text-white bg-interface-button-primary hover:bg-interface-button-hover
                 transition-all duration-200 animate-glow-pulse"
        >
          <span>Start Exploring</span>
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

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
  from { background-position: 0 0; }
  to { background-position: 0 100%; }
}

/* Scanner Container and Line */
.scanner-container {
  position: relative;
  min-height: 400px;
}

.scanner-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(6, 182, 212, 0.8),
    transparent
  );
  animation: scan-line 3s ease-in-out infinite;
  z-index: 1;
}

@keyframes scan-line {
  0% {
    top: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* Moving Border Light Effect */
.light-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.light-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), transparent) border-box;
  -webkit-mask: 
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  animation: border-light 4s linear infinite;
}

@keyframes border-light {
  0% {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
  25% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  50% {
    clip-path: polygon(100% 0, 100% 100%, 100% 100%, 100% 0);
  }
  75% {
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
  }
  100% {
    clip-path: polygon(0 0, 0 100%, 0 100%, 0 0);
  }
}

/* Scanner Text Effect */
.scanner-text {
  position: relative;
  overflow: hidden;
}

.scanner-text::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(6, 182, 212, 0.2),
    transparent
  );
  transform: translateX(-100%);
  animation: scan-text 3s linear infinite;
}

@keyframes scan-text {
  100% {
    transform: translateX(100%);
  }
}
</style>
