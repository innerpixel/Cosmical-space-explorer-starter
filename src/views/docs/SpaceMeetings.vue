<template>
  <div class="relative min-h-screen bg-space-darker bg-opacity-90 p-8">
    <!-- Immersive Background Effects -->
    <div class="fixed inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>
    <div class="fixed inset-0 bg-gradient-to-br from-yellow-900/10 to-orange-900/10 pointer-events-none"></div>

    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-12">
        <div class="flex items-center gap-4 mb-6">
          <div class="alien-icon w-12 h-12">
            <div class="telepathy-icon">
              <div class="waves">
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
              </div>
            </div>
          </div>
          <h1 class="text-3xl font-bold text-interface-text-primary">Space Meetings</h1>
        </div>
        <p class="text-xl text-interface-text-muted">Guide to virtual space meetings and communication</p>
      </div>

      <!-- Documentation Content -->
      <div class="prose prose-invert max-w-none">
        <div v-html="content" class="space-y-8"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

const content = ref('')

onMounted(async () => {
  try {
    const response = await fetch('/docs/features/SPACE_MEETINGS.md')
    const markdown = await response.text()
    content.value = marked.parse(markdown)
  } catch (error) {
    console.error('Error loading documentation:', error)
  }
})
</script>

<style scoped>
.prose {
  @apply text-interface-text-muted text-left;
}

.prose h1, .prose h2, .prose h3, .prose h4 {
  @apply text-interface-text-primary font-semibold text-left;
}

.prose h1 {
  @apply text-3xl mb-8;
}

.prose h2 {
  @apply text-2xl mb-6 border-b border-interface-border pb-4;
}

.prose h3 {
  @apply text-xl mb-4;
}

.prose p {
  @apply mb-4 text-left;
}

.prose ul, .prose ol {
  @apply mb-6 space-y-2 text-left pl-4;
}

.prose li {
  @apply text-left;
  list-style-position: outside;
}

.prose code {
  @apply bg-space-dark px-2 py-1 rounded text-sm;
}

.prose pre {
  @apply bg-space-dark p-4 rounded-lg overflow-x-auto mb-6 text-left;
}

.prose pre code {
  @apply bg-transparent p-0;
}

.prose blockquote {
  @apply border-l-4 border-interface-border pl-4 italic text-left;
}

.prose a {
  @apply text-yellow-400 hover:text-yellow-300 transition-colors duration-200;
}

.prose table {
  @apply w-full mb-6 text-left;
}

.prose th {
  @apply text-interface-text-primary font-semibold p-2 border-b border-interface-border text-left;
}

.prose td {
  @apply p-2 border-b border-interface-border text-left;
}
</style>
