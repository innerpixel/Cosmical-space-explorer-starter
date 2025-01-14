<template>
  <div class="space-y-8">
    <section class="prose prose-invert max-w-none">
      <h2 class="text-2xl font-semibold text-interface-text-primary mb-6">Welcome to Our Component Universe</h2>
      <p class="text-interface-text-muted mb-6">
        Explore our collection of cosmic components, layouts, and patterns designed to help you build stellar interfaces.
        Each component is carefully crafted to provide a seamless and immersive space exploration experience.
      </p>
    </section>

    <section class="space-y-6">
      <h3 class="text-xl font-semibold text-interface-text-primary">Component Categories</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="section in sections" :key="section.title" class="bg-space-dark rounded-lg p-6 border border-interface-border">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0" v-html="section.icon"></div>
            <div>
              <h4 class="text-lg font-semibold text-interface-text-primary mb-2">{{ section.title }}</h4>
              <p class="text-interface-text-muted mb-4">{{ section.description }}</p>
              <ul class="list-disc list-inside text-interface-text-muted space-y-1">
                <li v-for="item in section.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h3 class="text-xl font-semibold text-interface-text-primary">Key Features</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="feature in features" :key="feature.title" class="bg-space-dark rounded-lg p-6 border border-interface-border">
          <div class="flex-shrink-0 mb-4" v-html="feature.icon"></div>
          <h4 class="text-lg font-semibold text-interface-text-primary mb-2">{{ feature.title }}</h4>
          <p class="text-interface-text-muted">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h3 class="text-xl font-semibold text-interface-text-primary">Getting Started</h3>
      <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
        <ol class="list-decimal list-inside space-y-4 text-interface-text-muted">
          <li>
            <span class="font-semibold text-interface-text-primary">Browse Components:</span>
            Explore our collection of pre-built components in the sidebar
          </li>
          <li>
            <span class="font-semibold text-interface-text-primary">View Examples:</span>
            Each component comes with interactive examples and code snippets
          </li>
          <li>
            <span class="font-semibold text-interface-text-primary">Copy & Customize:</span>
            Use our components as building blocks for your own cosmic interfaces
          </li>
          <li>
            <span class="font-semibold text-interface-text-primary">Get Support:</span>
            Check the documentation or reach out to our support team for help
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ShowcaseOverview',
  data() {
    return {
      sections: [
        {
          title: 'Layout Components',
          description: 'Fundamental building blocks for structuring your cosmic interfaces.',
          icon: '<svg class="w-8 h-8 text-interface-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>',
          items: ['Grid System', 'Containers', 'Spacing Utilities', 'Responsive Design']
        },
        {
          title: 'UI Components',
          description: 'Pre-built components for common interface patterns.',
          icon: '<svg class="w-8 h-8 text-interface-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>',
          items: ['Buttons', 'Forms', 'Cards', 'Navigation']
        },
        {
          title: 'Patterns',
          description: 'Common UI patterns and solutions for space applications.',
          icon: '<svg class="w-8 h-8 text-interface-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>',
          items: ['Data Tables', 'Modal Dialogs', 'Notifications', 'Loading States']
        },
        {
          title: 'Animations',
          description: 'Smooth transitions and effects for space-themed interfaces.',
          icon: '<svg class="w-8 h-8 text-interface-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
          items: ['Transitions', 'Loading Spinners', 'Progress Indicators', 'Hover Effects']
        }
      ],
      features: [
        {
          title: 'Space Theme',
          description: 'Dark mode optimized with cosmic accents and glow effects.',
          icon: '<svg class="w-8 h-8 text-interface-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>'
        },
        {
          title: 'Responsive',
          description: 'Fully responsive components that work across all devices.',
          icon: '<svg class="w-8 h-8 text-interface-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>'
        },
        {
          title: 'Accessible',
          description: 'Built with accessibility in mind for all space explorers.',
          icon: '<svg class="w-8 h-8 text-interface-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>'
        }
      ]
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
</style>
