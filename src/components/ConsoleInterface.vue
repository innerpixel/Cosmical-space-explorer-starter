<template>
  <div class="console-interface" :class="{ active: isActive }">
    <!-- Header -->
    <div class="console-header">
      <div class="status-indicator" :class="{ online: isOnline }"></div>
      <h2 class="console-title">CSMCL.SPACE TERMINAL</h2>
      <button @click="toggleConsole" class="console-toggle">
        {{ isActive ? 'MINIMIZE' : 'MAXIMIZE' }}
      </button>
    </div>

    <!-- Output Display -->
    <div class="console-output" ref="outputContainer">
      <div v-for="(line, index) in outputLines" 
           :key="index" 
           class="console-line"
           :class="line.type">
        <span class="timestamp">{{ formatTime(line.timestamp) }}</span>
        <span class="content">{{ line.content }}</span>
      </div>
    </div>

    <!-- Input Area -->
    <div class="console-input">
      <span class="prompt">&gt;</span>
      <input
        ref="inputField"
        v-model="currentInput"
        @keyup.enter="handleCommand"
        type="text"
        placeholder="Enter command..."
        :disabled="!isOnline"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useInterfaceStore } from '@/stores/interface.js'

const store = useInterfaceStore()
const inputField = ref(null)
const outputContainer = ref(null)
const currentInput = ref('')
const outputLines = ref([])
const isActive = ref(true)

const isOnline = computed(() => store.isSystemOnline)

// Format timestamp for display
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// Handle command input
const handleCommand = () => {
  if (!currentInput.value.trim()) return

  // Add command to output
  outputLines.value.push({
    type: 'command',
    content: currentInput.value,
    timestamp: Date.now()
  })

  // Process command (to be implemented)
  processCommand(currentInput.value)

  // Clear input
  currentInput.value = ''
  
  // Scroll to bottom
  scrollToBottom()
}

// Process command (placeholder)
const processCommand = (command) => {
  // Add system response
  outputLines.value.push({
    type: 'system',
    content: `Processing command: ${command}`,
    timestamp: Date.now()
  })
}

// Toggle console
const toggleConsole = () => {
  isActive.value = !isActive.value
}

// Auto-scroll
const scrollToBottom = () => {
  if (!outputContainer.value) return
  setTimeout(() => {
    outputContainer.value.scrollTop = outputContainer.value.scrollHeight
  }, 0)
}

// Watch for new messages from store
watch(() => store.messageQueue, (messages) => {
  const newMessages = messages.filter(msg => !msg.displayed)
  newMessages.forEach(msg => {
    outputLines.value.push({
      type: msg.type || 'message',
      content: msg.content,
      timestamp: msg.timestamp
    })
    msg.displayed = true
  })
  if (newMessages.length) scrollToBottom()
}, { deep: true })

</script>

<style scoped>
.console-interface {
  @apply bg-opacity-80 backdrop-blur-sm rounded-lg border border-cyan-500/30;
  @apply flex flex-col;
  @apply transition-all duration-300 ease-in-out;
  background: rgba(2, 4, 10, 0.9);
  height: 600px;
}

.console-interface:not(.active) {
  height: 56px;
}

.console-interface:not(.active) .console-output,
.console-interface:not(.active) .console-input {
  @apply hidden;
}

.console-header {
  @apply flex items-center gap-4 p-4 border-b border-cyan-500/30;
}

.status-indicator {
  @apply w-2 h-2 rounded-full bg-red-500;
}

.status-indicator.online {
  @apply bg-cyan-500;
}

.console-title {
  @apply text-cyan-500 text-sm font-mono flex-1;
}

.console-toggle {
  @apply text-xs text-cyan-500/70 hover:text-cyan-500 font-mono;
  @apply px-2 py-1 border border-cyan-500/30 rounded;
}

.console-output {
  @apply flex-1 overflow-y-auto p-4 font-mono text-sm;
  @apply space-y-2;
}

.console-line {
  @apply flex gap-4;
}

.console-line .timestamp {
  @apply text-cyan-500/50;
}

.console-line .content {
  @apply text-cyan-500/90;
}

.console-line.system .content {
  @apply text-yellow-500/90;
}

.console-line.error .content {
  @apply text-red-500/90;
}

.console-input {
  @apply flex items-center gap-2 p-4 border-t border-cyan-500/30;
}

.prompt {
  @apply text-cyan-500 font-mono;
}

input {
  @apply bg-transparent border-none outline-none flex-1;
  @apply text-cyan-500 font-mono placeholder-cyan-500/30;
}

input:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
