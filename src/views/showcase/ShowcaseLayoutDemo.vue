<template>
  <div class="space-y-8">
    <section class="prose prose-invert max-w-none">
      <h2 class="text-2xl font-semibold text-interface-text-primary mb-6">Layout System</h2>
      <p class="text-interface-text-muted mb-6">
        Our layout system provides flexible and responsive building blocks for structuring your cosmic interfaces.
        Built with Tailwind CSS, it offers intuitive classes for creating consistent and maintainable layouts.
      </p>
    </section>

    <section class="space-y-6">
      <h3 class="text-xl font-semibold text-interface-text-primary">Grid System</h3>
      <div class="space-y-4">
        <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="bg-space-darker p-4 rounded text-center text-interface-text-muted">Col 1</div>
            <div class="bg-space-darker p-4 rounded text-center text-interface-text-muted">Col 2</div>
            <div class="bg-space-darker p-4 rounded text-center text-interface-text-muted">Col 3</div>
          </div>
          <div class="prose prose-invert max-w-none">
            <p class="text-sm text-interface-text-muted mt-4">
              Our grid system uses CSS Grid with Tailwind's utility classes for flexible and responsive layouts.
              The example above demonstrates a basic 3-column grid that stacks on mobile devices.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h3 class="text-xl font-semibold text-interface-text-primary">Container & Spacing</h3>
      <div class="space-y-4">
        <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
          <div class="bg-space-darker p-4 rounded mb-4">
            <div class="max-w-3xl mx-auto bg-interface-border/20 p-4 rounded">
              <p class="text-center text-interface-text-muted">Contained Content</p>
            </div>
          </div>
          <div class="prose prose-invert max-w-none">
            <p class="text-sm text-interface-text-muted">
              Containers help maintain consistent content width across your application.
              Combined with our spacing utilities, they ensure proper content alignment and readability.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h3 class="text-xl font-semibold text-interface-text-primary">Responsive Patterns</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
          <h4 class="text-lg font-semibold text-interface-text-primary mb-4">Stack to Grid</h4>
          <div class="grid grid-cols-2 gap-2 mb-4">
            <div class="bg-space-darker p-2 rounded text-center text-interface-text-muted text-sm">Item</div>
            <div class="bg-space-darker p-2 rounded text-center text-interface-text-muted text-sm">Item</div>
          </div>
          <p class="text-sm text-interface-text-muted">
            Elements stack vertically on mobile and expand to grid on larger screens.
          </p>
        </div>
        
        <div class="bg-space-dark rounded-lg p-6 border border-interface-border">
          <h4 class="text-lg font-semibold text-interface-text-primary mb-4">Sidebar Layout</h4>
          <div class="grid grid-cols-3 gap-2 mb-4">
            <div class="bg-space-darker p-2 rounded text-center text-interface-text-muted text-sm">Sidebar</div>
            <div class="col-span-2 bg-space-darker p-2 rounded text-center text-interface-text-muted text-sm">Content</div>
          </div>
          <p class="text-sm text-interface-text-muted">
            Sidebar layouts collapse to full width on mobile devices.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ShowcaseLayoutDemo'
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
