<template>
  <div class="space-y-8">
    <section class="prose prose-invert max-w-none">
      <h2 class="text-2xl font-semibold text-interface-text-primary mb-6">UI Patterns</h2>
      <p class="text-interface-text-muted mb-6">
        Discover our collection of common UI patterns and solutions for creating consistent and intuitive user experiences.
        Each pattern is designed with accessibility and usability in mind.
      </p>
    </section>

    <section class="space-y-6">
      <h3 class="text-xl font-semibold text-interface-text-primary">Navigation Patterns</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
          <h4 class="text-lg font-semibold text-interface-text-primary mb-4">Breadcrumb Navigation</h4>
          <div class="flex items-center space-x-2 text-sm mb-4">
            <span class="text-interface-text-muted">Home</span>
            <svg class="w-4 h-4 text-interface-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span class="text-interface-text-muted">Components</span>
            <svg class="w-4 h-4 text-interface-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span class="text-interface-text-primary">Current</span>
          </div>
          <p class="text-sm text-interface-text-muted">
            Breadcrumbs help users understand their current location and navigate back through the hierarchy.
          </p>
        </div>

        <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
          <h4 class="text-lg font-semibold text-interface-text-primary mb-4">Tab Navigation</h4>
          <div class="flex space-x-4 border-b border-interface-border mb-4">
            <button class="px-4 py-2 text-interface-text-primary border-b-2 border-interface-text-primary">Active</button>
            <button class="px-4 py-2 text-interface-text-muted">Tab 2</button>
            <button class="px-4 py-2 text-interface-text-muted">Tab 3</button>
          </div>
          <p class="text-sm text-interface-text-muted">
            Tabs organize content into different sections, allowing users to switch between views.
          </p>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h3 class="text-xl font-semibold text-interface-text-primary">Data Display</h3>
      <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
        <h4 class="text-lg font-semibold text-interface-text-primary mb-4">Data Table</h4>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-interface-border">
            <thead>
              <tr>
                <th class="px-4 py-3 text-left text-sm font-semibold text-interface-text-primary">Name</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-interface-text-primary">Status</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-interface-text-primary">Role</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-interface-border">
              <tr>
                <td class="px-4 py-3 text-sm text-interface-text-muted">John Doe</td>
                <td class="px-4 py-3 text-sm">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td class="px-4 py-3 text-sm text-interface-text-muted">Admin</td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-sm text-interface-text-muted">Jane Smith</td>
                <td class="px-4 py-3 text-sm">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td class="px-4 py-3 text-sm text-interface-text-muted">User</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h3 class="text-xl font-semibold text-interface-text-primary">Feedback Patterns</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
          <h4 class="text-lg font-semibold text-interface-text-primary mb-4">Toast Notifications</h4>
          <div class="space-y-2">
            <div class="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div class="ml-3">
                <p class="text-sm font-medium text-green-500">Success Message</p>
                <p class="mt-1 text-sm text-interface-text-muted">Action completed successfully.</p>
              </div>
            </div>
            <div class="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start">
              <svg class="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-500">Error Message</p>
                <p class="mt-1 text-sm text-interface-text-muted">Something went wrong. Please try again.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
          <h4 class="text-lg font-semibold text-interface-text-primary mb-4">Loading States</h4>
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="animate-spin rounded-full h-5 w-5 border-2 border-interface-text-primary border-t-transparent"></div>
              <span class="text-sm text-interface-text-muted">Loading...</span>
            </div>
            <div class="h-2 bg-space-darker rounded overflow-hidden">
              <div class="w-2/3 h-full bg-interface-text-primary rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ShowcasePatterns'
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
