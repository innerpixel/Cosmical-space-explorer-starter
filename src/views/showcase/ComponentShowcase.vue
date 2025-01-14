<template>
  <div class="min-h-screen bg-space-black pt-16">
    <div class="w-full">
      <!-- Showcase Header -->
      <div class="relative w-full mb-8">
        <div class="bg-space-darker border-y border-interface-border p-8">
          <h1 class="text-3xl font-bold text-interface-text-primary mb-4">Component Library</h1>
          <p class="text-interface-text-muted max-w-3xl">Explore our collection of cosmic components designed for building stellar interfaces.</p>
        </div>
      </div>

      <!-- Showcase Content -->
      <div class="px-4 md:px-6 lg:px-8">
        <!-- Scan Lines Effect -->
        <div class="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>

        <div class="container mx-auto py-8">
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Navigation Sidebar -->
            <div class="lg:col-span-1">
              <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-6 sticky top-24">
                <h2 class="text-xl font-semibold text-interface-text-primary mb-4">Components</h2>
                <nav class="space-y-2">
                  <router-link 
                    v-for="route in routes" 
                    :key="route.path"
                    :to="route.path"
                    class="flex items-center space-x-3 px-3 py-2 rounded-lg text-interface-text-muted hover:text-interface-text-primary hover:bg-space-darker transition-colors duration-200"
                    active-class="text-interface-text-primary bg-space-darker"
                  >
                    <span v-html="route.icon"></span>
                    <span>{{ route.name }}</span>
                  </router-link>
                </nav>
              </div>
            </div>

            <!-- Main Content -->
            <div class="lg:col-span-3">
              <div class="bg-space-darker rounded-lg border border-interface-border shadow-glow p-8">
                <router-view v-slot="{ Component }">
                  <transition
                    enter-active-class="transition-opacity duration-200 ease-out"
                    leave-active-class="transition-opacity duration-200 ease-in"
                    enter-from-class="opacity-0"
                    leave-to-class="opacity-0"
                  >
                    <component :is="Component" />
                  </transition>
                </router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentShowcase',
  data() {
    return {
      routes: [
        { 
          path: '/showcase', 
          name: 'Overview',
          icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>'
        },
        { 
          path: '/showcase/layout', 
          name: 'Layout',
          icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>'
        },
        { 
          path: '/showcase/components', 
          name: 'Components',
          icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>'
        },
        { 
          path: '/showcase/patterns', 
          name: 'Patterns',
          icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>'
        }
      ]
    }
  }
}
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

/* Shadow glow effect */
.shadow-glow {
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.1);
}
</style>
