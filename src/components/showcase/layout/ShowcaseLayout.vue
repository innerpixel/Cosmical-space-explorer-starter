<template>
  <div class="showcase-layout">
    <header class="showcase-header">
      <div class="header-content">
        <!-- Mobile Menu Toggle -->
        <div class="flex items-center justify-between">
          <button 
            class="mobile-menu-toggle md:hidden"
            @click="isSidebarOpen = !isSidebarOpen"
            :aria-expanded="isSidebarOpen"
          >
            <span class="sr-only">Toggle Menu</span>
            <svg 
              class="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                v-if="!isSidebarOpen" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h1 class="text-xl md:text-2xl font-bold text-interface-text-primary">{{ title }}</h1>
          
          <!-- Spacer to center title -->
          <div class="w-6 md:hidden"></div>
        </div>
        
        <nav class="showcase-nav mt-4">
          <slot name="navigation"></slot>
        </nav>
      </div>
    </header>
    
    <main class="showcase-main">
      <!-- Mobile Sidebar Overlay -->
      <div 
        v-if="isSidebarOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        @click="isSidebarOpen = false"
      ></div>

      <!-- Sidebar -->
      <aside 
        class="showcase-sidebar"
        :class="{
          'transform transition-transform duration-300 ease-in-out': true,
          '-translate-x-full': !isSidebarOpen,
          'translate-x-0': isSidebarOpen
        }"
      >
        <div class="h-full overflow-y-auto py-4">
          <slot name="sidebar"></slot>
        </div>
      </aside>
      
      <!-- Main Content -->
      <div 
        class="showcase-content"
        :class="{ 'md:ml-64': true }"
      >
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ShowcaseLayout',
  props: {
    title: {
      type: String,
      default: 'Component Showcase'
    }
  },
  data() {
    return {
      isSidebarOpen: false
    }
  },
  watch: {
    '$route'() {
      // Close sidebar on route change (mobile)
      this.isSidebarOpen = false
    }
  }
}
</script>

<style scoped>
.showcase-layout {
  @apply min-h-screen bg-space-black flex flex-col;
}

.showcase-header {
  @apply bg-space-darker border-b border-interface-border sticky top-0 z-30;
}

.header-content {
  @apply w-full p-3 md:p-6;
}

.mobile-menu-toggle {
  @apply text-interface-text-primary hover:text-interface-text-muted 
         transition-colors duration-200 p-1;
}

.showcase-nav {
  @apply -mx-3 px-3 md:mx-0 md:px-0;
  @apply overflow-x-auto whitespace-nowrap;
  -webkit-overflow-scrolling: touch;
}

.showcase-main {
  @apply flex-1 relative;
  min-height: calc(100vh - 116px); /* Adjust based on header height */
}

.showcase-sidebar {
  @apply fixed md:fixed top-[116px] bottom-0 left-0 w-64 z-50 
         bg-space-darker border-r border-interface-border;
  
  height: calc(100vh - 116px); /* Match main height */
}

.showcase-content {
  @apply w-full min-h-full bg-space-black;
  @apply p-3 md:p-6;
  @apply md:ml-64; /* Add margin only on desktop */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.showcase-nav::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.showcase-nav {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Custom scrollbar for sidebar */
.showcase-sidebar::-webkit-scrollbar {
  width: 4px;
}

.showcase-sidebar::-webkit-scrollbar-track {
  @apply bg-space-black;
}

.showcase-sidebar::-webkit-scrollbar-thumb {
  @apply bg-interface-border rounded;
}

/* Improve touch scrolling on mobile */
.showcase-sidebar, .showcase-content {
  -webkit-overflow-scrolling: touch;
}

@screen md {
  .showcase-main {
    min-height: calc(100vh - 132px); /* Adjust for larger header on desktop */
  }
  
  .showcase-sidebar {
    top: 132px;
    height: calc(100vh - 132px);
  }
}
</style>
