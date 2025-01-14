<template>
  <div class="space-y-8">
    <section class="prose prose-invert max-w-none">
      <h2 class="text-2xl font-semibold text-interface-text-primary mb-6">UI Components</h2>
      <p class="text-interface-text-muted mb-6">
        Explore our collection of ready-to-use UI components designed for cosmic interfaces.
        Each component is crafted with attention to detail and follows space-themed design principles.
      </p>
    </section>

    <section class="space-y-6">
      <h3 class="text-xl font-semibold text-interface-text-primary">Buttons</h3>
      <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4">
            <button class="px-4 py-2 bg-interface-button hover:bg-interface-button-hover text-interface-text-primary rounded-lg transition-colors duration-200">
              Primary Button
            </button>
            <button class="px-4 py-2 border border-interface-border hover:border-interface-text-primary text-interface-text-primary rounded-lg transition-colors duration-200">
              Secondary Button
            </button>
            <button class="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors duration-200">
              Danger Button
            </button>
          </div>
          <p class="text-sm text-interface-text-muted">
            Buttons follow a consistent style with hover and focus states. Use primary buttons for main actions,
            secondary for alternative actions, and danger buttons for destructive operations.
          </p>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h3 class="text-xl font-semibold text-interface-text-primary">Form Elements</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
          <h4 class="text-lg font-semibold text-interface-text-primary mb-4">Text Inputs</h4>
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-interface-text-muted">Standard Input</label>
              <input 
                type="text" 
                class="w-full px-4 py-2 bg-space-darker border border-interface-border rounded-lg focus:border-interface-text-primary focus:ring-1 focus:ring-interface-text-primary/50 text-interface-text-primary"
                placeholder="Enter text..."
              >
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-interface-text-muted">Search Input</label>
              <div class="relative">
                <input 
                  type="search" 
                  class="w-full pl-10 pr-4 py-2 bg-space-darker border border-interface-border rounded-lg focus:border-interface-text-primary focus:ring-1 focus:ring-interface-text-primary/50 text-interface-text-primary"
                  placeholder="Search..."
                >
                <svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-interface-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
          <h4 class="text-lg font-semibold text-interface-text-primary mb-4">Selection Controls</h4>
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <input 
                type="checkbox" 
                class="w-4 h-4 rounded border-interface-border text-interface-text-primary focus:ring-interface-text-primary/50"
              >
              <label class="text-interface-text-muted">Checkbox Option</label>
            </div>
            <div class="flex items-center space-x-3">
              <input 
                type="radio" 
                name="radio-group" 
                class="w-4 h-4 border-interface-border text-interface-text-primary focus:ring-interface-text-primary/50"
              >
              <label class="text-interface-text-muted">Radio Option</label>
            </div>
            <div class="flex items-center space-x-3">
              <button 
                class="relative inline-flex h-6 w-11 items-center rounded-full bg-space-darker transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-interface-text-primary/50"
                :class="{ 'bg-interface-text-primary': isToggled }"
                @click="isToggled = !isToggled"
              >
                <span 
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
                  :class="{ 'translate-x-6': isToggled, 'translate-x-1': !isToggled }"
                ></span>
              </button>
              <label class="text-interface-text-muted">Toggle Switch</label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h3 class="text-xl font-semibold text-interface-text-primary">Cards</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-space-dark rounded-lg border border-interface-border overflow-hidden">
          <div class="aspect-video bg-space-darker flex items-center justify-center">
            <svg class="w-12 h-12 text-interface-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div class="p-4">
            <h4 class="text-lg font-semibold text-interface-text-primary mb-2">Media Card</h4>
            <p class="text-sm text-interface-text-muted">A card with media content and description.</p>
          </div>
        </div>

        <div class="bg-space-dark rounded-lg border border-interface-border p-4">
          <h4 class="text-lg font-semibold text-interface-text-primary mb-2">Simple Card</h4>
          <p class="text-sm text-interface-text-muted mb-4">A basic card with title and content.</p>
          <button class="text-sm text-interface-text-primary hover:text-interface-button-hover transition-colors duration-200">
            Learn More →
          </button>
        </div>

        <div class="bg-space-dark rounded-lg border border-interface-border p-4">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-space-darker flex items-center justify-center">
              <svg class="w-6 h-6 text-interface-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-lg font-semibold text-interface-text-primary">Profile Card</h4>
              <p class="text-sm text-interface-text-muted">A card with avatar and details.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h3 class="text-xl font-semibold text-interface-text-primary">Badges & Tags</h3>
      <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
        <div class="space-y-4">
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500">
              Info
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
              Success
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-500">
              Warning
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-500">
              Error
            </span>
          </div>
          <p class="text-sm text-interface-text-muted">
            Badges and tags help categorize content and show status. They come in various colors to indicate different states.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ShowcaseComponents',
  data() {
    return {
      isToggled: false
    }
  }
}
</script>

<style scoped>
.bg-space-dark {
  background-color: rgba(10, 10, 15, 0.6);
  backdrop-filter: blur(8px);
}

/* Hover effect for cards */
.bg-space-dark {
  transition: transform 0.2s, box-shadow 0.2s;
}

.bg-space-dark:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(6, 182, 212, 0.1);
}

/* Custom checkbox and radio styles */
input[type="checkbox"], input[type="radio"] {
  @apply bg-space-darker border-interface-border;
}

input[type="checkbox"]:checked, input[type="radio"]:checked {
  @apply bg-interface-text-primary border-interface-text-primary;
}
</style>
