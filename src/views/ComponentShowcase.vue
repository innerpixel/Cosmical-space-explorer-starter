<template>
  <div class="min-h-screen bg-space-black pt-16">
    <!-- Scan Lines Effect -->
    <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-interface-text-primary animate-glow-pulse mb-4">
          Space Theme Components
        </h1>
        <p class="text-xl text-interface-text-muted">
          A showcase of our design system elements
        </p>
      </div>

      <!-- Component Sections -->
      <div class="grid grid-cols-1 gap-12">
        <!-- Colors Section -->
        <section class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-8">
          <h2 class="text-2xl font-semibold text-interface-text-primary mb-6">Colors</h2>
          
          <div class="space-y-6">
            <!-- Surface Colors -->
            <div>
              <h3 class="text-lg font-medium text-interface-text-secondary mb-3">Surface Colors</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="space-y-2">
                  <div class="h-20 bg-space-black rounded-lg border border-interface-border"></div>
                  <p class="text-sm text-interface-text-muted">space-black</p>
                </div>
                <div class="space-y-2">
                  <div class="h-20 bg-space-darker rounded-lg border border-interface-border"></div>
                  <p class="text-sm text-interface-text-muted">space-darker</p>
                </div>
                <div class="space-y-2">
                  <div class="h-20 bg-space-dark rounded-lg border border-interface-border"></div>
                  <p class="text-sm text-interface-text-muted">space-dark</p>
                </div>
                <div class="space-y-2">
                  <div class="h-20 bg-space rounded-lg border border-interface-border"></div>
                  <p class="text-sm text-interface-text-muted">space</p>
                </div>
              </div>
            </div>

            <!-- Accent Colors -->
            <div>
              <h3 class="text-lg font-medium text-interface-text-secondary mb-3">Accent Colors</h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="space-y-2">
                  <div class="h-20 bg-space-accent-cyan-light rounded-lg border border-interface-border"></div>
                  <p class="text-sm text-interface-text-muted">accent-cyan-light</p>
                </div>
                <div class="space-y-2">
                  <div class="h-20 bg-space-accent-purple-light rounded-lg border border-interface-border"></div>
                  <p class="text-sm text-interface-text-muted">accent-purple-light</p>
                </div>
                <div class="space-y-2">
                  <div class="h-20 bg-space-accent-blue-light rounded-lg border border-interface-border"></div>
                  <p class="text-sm text-interface-text-muted">accent-blue-light</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Typography Section -->
        <section class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-8">
          <h2 class="text-2xl font-semibold text-interface-text-primary mb-6">Typography</h2>
          
          <div class="space-y-6">
            <div>
              <h1 class="text-4xl font-bold text-interface-text-primary mb-2">Heading 1</h1>
              <p class="text-sm text-interface-text-muted">text-4xl font-bold text-interface-text-primary</p>
            </div>
            <div>
              <h2 class="text-3xl font-semibold text-interface-text-primary mb-2">Heading 2</h2>
              <p class="text-sm text-interface-text-muted">text-3xl font-semibold text-interface-text-primary</p>
            </div>
            <div>
              <h3 class="text-2xl font-medium text-interface-text-secondary mb-2">Heading 3</h3>
              <p class="text-sm text-interface-text-muted">text-2xl font-medium text-interface-text-secondary</p>
            </div>
            <div>
              <p class="text-interface-text-primary mb-2">Regular paragraph text</p>
              <p class="text-sm text-interface-text-muted">text-interface-text-primary</p>
            </div>
            <div>
              <p class="text-interface-text-muted mb-2">Muted paragraph text</p>
              <p class="text-sm text-interface-text-muted">text-interface-text-muted</p>
            </div>
          </div>
        </section>

        <!-- Components Section -->
        <section class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-8">
          <h2 class="text-2xl font-semibold text-interface-text-primary mb-6">Components</h2>
          
          <div class="space-y-8">
            <!-- Buttons -->
            <div>
              <h3 class="text-lg font-medium text-interface-text-secondary mb-4">Buttons</h3>
              <div class="flex flex-wrap gap-4">
                <button class="px-4 py-2 bg-interface-button-primary hover:bg-interface-button-hover text-white rounded-md transition-colors duration-200 shadow-button hover:shadow-button-hover">
                  Primary Button
                </button>
                <button class="px-4 py-2 border border-interface-border text-interface-text-primary hover:text-interface-text-secondary rounded-md transition-colors duration-200">
                  Secondary Button
                </button>
                <button class="px-4 py-2 bg-space-accent-purple-light hover:bg-space-accent-purple-dark text-white rounded-md transition-colors duration-200">
                  Accent Button
                </button>
              </div>
            </div>

            <!-- Cards -->
            <div>
              <h3 class="text-lg font-medium text-interface-text-secondary mb-4">Cards</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-space-dark rounded-lg border border-interface-border p-6 shadow-glow">
                  <h4 class="text-interface-text-primary font-medium mb-2">Basic Card</h4>
                  <p class="text-interface-text-muted">A simple card component with border and glow effect.</p>
                </div>
                <div class="bg-space-dark rounded-lg border border-interface-border p-6 shadow-glow hover:shadow-glow-hover transition-shadow duration-200">
                  <h4 class="text-interface-text-primary font-medium mb-2">Interactive Card</h4>
                  <p class="text-interface-text-muted">Hover to see the enhanced glow effect.</p>
                </div>
                <div class="bg-gradient-to-br from-space-accent-cyan-dark to-space-accent-purple-dark rounded-lg border border-interface-border p-6 shadow-glow">
                  <h4 class="text-interface-text-primary font-medium mb-2">Gradient Card</h4>
                  <p class="text-interface-text-muted">Card with gradient background.</p>
                </div>
              </div>
            </div>

            <!-- Form Elements -->
            <div>
              <h3 class="text-lg font-medium text-interface-text-secondary mb-4">Form Elements</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-interface-text-secondary mb-1">Input Field</label>
                    <input 
                      type="text" 
                      placeholder="Enter text"
                      class="w-full px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                             text-interface-text-primary placeholder-interface-text-muted/50
                             focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                             transition-all duration-200"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-interface-text-secondary mb-1">Select Menu</label>
                    <select 
                      class="w-full px-4 py-2 bg-space-dark border border-interface-border rounded-md 
                             text-interface-text-primary
                             focus:outline-none focus:ring-2 focus:ring-interface-border-hover
                             transition-all duration-200"
                    >
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                </div>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-interface-text-secondary mb-1">Checkbox</label>
                    <div class="flex items-center">
                      <input 
                        type="checkbox"
                        class="h-4 w-4 bg-space-dark border-interface-border rounded 
                               text-interface-button-primary focus:ring-interface-button-hover
                               transition-colors duration-200"
                      >
                      <span class="ml-2 text-interface-text-muted">Remember me</span>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-interface-text-secondary mb-1">Radio Buttons</label>
                    <div class="space-y-2">
                      <div class="flex items-center">
                        <input 
                          type="radio"
                          name="radio-group"
                          class="h-4 w-4 bg-space-dark border-interface-border
                                 text-interface-button-primary focus:ring-interface-button-hover
                                 transition-colors duration-200"
                        >
                        <span class="ml-2 text-interface-text-muted">Option A</span>
                      </div>
                      <div class="flex items-center">
                        <input 
                          type="radio"
                          name="radio-group"
                          class="h-4 w-4 bg-space-dark border-interface-border
                                 text-interface-button-primary focus:ring-interface-button-hover
                                 transition-colors duration-200"
                        >
                        <span class="ml-2 text-interface-text-muted">Option B</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Badges -->
            <div>
              <h3 class="text-lg font-medium text-interface-text-secondary mb-4">Badges</h3>
              <div class="flex flex-wrap gap-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                           bg-space-accent-cyan-dark text-interface-text-primary">
                  Default
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                           bg-green-900/50 text-green-400">
                  Success
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                           bg-yellow-900/50 text-yellow-400">
                  Warning
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                           bg-red-900/50 text-red-400">
                  Error
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Effects Section -->
        <section class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-8">
          <h2 class="text-2xl font-semibold text-interface-text-primary mb-6">Effects</h2>
          
          <div class="space-y-8">
            <!-- Glow Effects -->
            <div>
              <h3 class="text-lg font-medium text-interface-text-secondary mb-4">Glow Effects</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-space-dark rounded-lg border border-interface-border p-6 shadow-glow">
                  <p class="text-interface-text-muted">Default Glow</p>
                </div>
                <div class="bg-space-dark rounded-lg border border-interface-border p-6 shadow-glow-lg">
                  <p class="text-interface-text-muted">Large Glow</p>
                </div>
                <div class="bg-space-dark rounded-lg border border-interface-border p-6 animate-glow-pulse">
                  <p class="text-interface-text-muted">Pulsing Glow</p>
                </div>
              </div>
            </div>

            <!-- Animations -->
            <div>
              <h3 class="text-lg font-medium text-interface-text-secondary mb-4">Animations</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-space-dark rounded-lg border border-interface-border p-6 animate-pulse">
                  <p class="text-interface-text-muted">Pulse Animation</p>
                </div>
                <div class="bg-space-dark rounded-lg border border-interface-border p-6">
                  <p class="text-interface-text-muted animate-bounce">Bounce Animation</p>
                </div>
                <div class="bg-space-dark rounded-lg border border-interface-border p-6">
                  <p class="text-interface-text-muted animate-spin">Spin Animation</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for this showcase
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
</style>
