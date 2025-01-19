<template>
  <div class="console-interface" :class="{ active: isActive }">
    <!-- Header -->
    <div class="console-header">
      <div class="control-icons">
        <div class="alien-icon status" :class="{ online: isOnline }">
          <div class="inner-circle"></div>
          <div class="pulse"></div>
        </div>
        <button @click="setMode('command')" 
                class="alien-icon mode-icon" 
                :class="{ active: mode === 'command' }">
          <div class="symbol command-symbol">
            <div class="line"></div>
            <div class="dot"></div>
          </div>
        </button>
        <button @click="setMode('chat')" 
                class="alien-icon mode-icon" 
                :class="{ active: mode === 'chat' }">
          <div class="symbol chat-symbol">
            <div class="wave"></div>
            <div class="wave delayed"></div>
          </div>
        </button>
      </div>
      <h2 class="console-title">
        <span class="title-text">CSMCL.SPACE</span>
        <span class="mode-indicator" :class="mode === 'command' ? 'command' : 'chat'">{{ mode.toUpperCase() }}</span>
      </h2>
      <button @click="toggleConsole" class="alien-icon toggle-icon">
        <div class="symbol toggle-symbol">
          <div class="arrow"></div>
        </div>
      </button>
    </div>

    <!-- Output Display -->
    <div class="console-output" ref="outputContainer">
      <div v-for="(line, index) in outputLines" 
           :key="index" 
           class="console-line"
           :class="[line.type, { 'chat-message': line.isChat }]">
        <span class="timestamp">{{ formatTime(line.timestamp) }}</span>
        <span v-if="line.isChat" class="username">{{ line.username }}:</span>
        <span class="content" :class="{ 'chat-content': line.isChat }">{{ line.content }}</span>
      </div>
    </div>

    <!-- Input Area -->
    <div class="console-input">
      <span class="prompt" :class="mode === 'command' ? '' : 'chat'">{{ mode === 'command' ? '>' : '[CHAT]' }}</span>
      <input
        ref="inputField"
        v-model="currentInput"
        @keyup.enter="handleInput"
        type="text"
        :placeholder="inputPlaceholder"
        :disabled="!isOnline"
        :class="mode === 'command' ? '' : 'chat'"
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
const mode = ref('command') // 'command' or 'chat'

const isOnline = computed(() => store.isSystemOnline)
const inputPlaceholder = computed(() => 
  mode.value === 'command' ? 'Enter command...' : 'Type message...'
)

// Format timestamp for display
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const setMode = (newMode) => {
  mode.value = newMode
  inputField.value?.focus()
}

// Handle input (both commands and chat)
const handleInput = () => {
  if (!currentInput.value.trim()) return

  if (mode.value === 'chat') {
    handleChatMessage()
  } else {
    handleCommand()
  }

  // Clear input and scroll
  currentInput.value = ''
  scrollToBottom()
}

// Handle chat message
const handleChatMessage = () => {
  const message = {
    type: 'chat',
    isChat: true,
    username: 'User', // This should come from user state
    content: currentInput.value,
    timestamp: Date.now()
  }
  
  outputLines.value.push(message)
  store.sendChatMessage(message) // You'll need to implement this in the store
}

// Handle command
const handleCommand = () => {
  outputLines.value.push({
    type: 'command',
    content: currentInput.value,
    timestamp: Date.now()
  })

  processCommand(currentInput.value)
}

// Process command
const processCommand = (command) => {
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
      isChat: msg.type === 'chat',
      username: msg.username,
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
  height: 100%;
}

.console-interface:not(.active) {
  @apply flex flex-row items-center;
  height: 56px;
}

.console-interface:not(.active) .console-header {
  @apply border-b-0 border-r border-cyan-500/30 flex-shrink-0;
}

.console-interface:not(.active) .console-output {
  @apply hidden;
}

.console-interface:not(.active) .console-input {
  @apply border-t-0 flex-1;
}

.console-interface:not(.active) .mode-selector {
  @apply hidden;
}

.console-header {
  @apply flex items-center gap-4 p-4 border-b border-cyan-500/30;
  height: 56px;
}

.console-title {
  @apply text-cyan-500 text-sm font-mono flex-1 flex items-center gap-2;
}

.title-text {
  @apply text-cyan-500/90;
}

.mode-indicator {
  @apply text-xs px-2 py-0.5 rounded border border-cyan-500/30;
  @apply transition-all duration-300 ease-in-out;
  @apply transform;
  background: rgba(6, 182, 212, 0.1);
}

.mode-indicator.command {
  @apply border-cyan-500/50;
  background: rgba(6, 182, 212, 0.15);
  text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
}

.mode-indicator.chat {
  @apply border-emerald-500/50;
  background: rgba(16, 185, 129, 0.15);
  text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
}

.control-icons {
  @apply flex items-center gap-2;
}

.alien-icon {
  @apply w-6 h-6 relative flex items-center justify-center;
  @apply rounded-full border border-cyan-500/20;
  @apply transition-all duration-300;
  background: rgba(6, 182, 212, 0.05);
}

.alien-icon:hover {
  @apply border-cyan-500/40;
  background: rgba(6, 182, 212, 0.1);
}

.alien-icon.active {
  @apply border-cyan-500/60;
  background: rgba(6, 182, 212, 0.15);
}

/* Status Icon */
.status {
  @apply w-4 h-4;
}

.inner-circle {
  @apply absolute inset-1 rounded-full;
  @apply transition-all duration-300;
  background: rgba(239, 68, 68, 0.5);
}

.status.online .inner-circle {
  background: rgba(6, 182, 212, 0.5);
}

.pulse {
  @apply absolute inset-0 rounded-full;
  @apply transition-all duration-300;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  70% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Command Icon */
.command-symbol {
  @apply w-4 h-4 relative;
}

.command-symbol .line {
  @apply absolute h-0.5 w-3 bg-cyan-500/60;
  @apply transition-all duration-300;
  transform: rotate(45deg);
}

.command-symbol .dot {
  @apply absolute w-1 h-1 rounded-full bg-cyan-500/60;
  @apply transition-all duration-300;
  bottom: 0.5rem;
  right: 0.5rem;
}

.mode-icon.active .command-symbol .line {
  @apply bg-cyan-500;
}

.mode-icon.active .command-symbol .dot {
  @apply bg-cyan-500;
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.6);
}

/* Chat Icon */
.chat-symbol {
  @apply w-4 h-4 relative overflow-hidden;
}

.chat-symbol .wave {
  @apply absolute w-4 h-4;
  @apply transition-all duration-300;
  border: 1px solid rgba(6, 182, 212, 0.6);
  border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%;
  animation: wave 4s linear infinite;
}

.chat-symbol .wave.delayed {
  animation-delay: -2s;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.mode-icon.active .chat-symbol .wave {
  border-color: rgba(6, 182, 212, 0.9);
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.4);
}

/* Toggle Icon */
.toggle-symbol {
  @apply w-4 h-4 relative;
}

.toggle-symbol .arrow {
  @apply absolute w-2 h-2 border-t-2 border-r-2 border-cyan-500/60;
  @apply transition-all duration-300;
  transform: rotate(135deg);
  top: 25%;
}

.console-interface:not(.active) .toggle-symbol .arrow {
  transform: rotate(-45deg);
}

.console-output {
  @apply flex-1 overflow-y-auto p-4 font-mono text-sm;
  @apply space-y-2;
}

.console-line {
  @apply flex gap-4;
}

.console-line .timestamp {
  @apply text-cyan-500/50 shrink-0;
}

.console-line .username {
  @apply text-cyan-500/90 font-semibold shrink-0;
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

.console-line.chat-message {
  @apply pl-2 border-l-2 border-cyan-500/30;
}

.chat-content {
  @apply text-white/90;
}

.console-input {
  @apply flex items-center gap-2 p-4 border-t border-cyan-500/30;
  height: 56px;
}

.prompt {
  @apply text-cyan-500 font-mono shrink-0;
  @apply transition-all duration-300;
}

.prompt.chat {
  @apply text-emerald-500;
}

input {
  @apply bg-transparent border-none outline-none flex-1;
  @apply text-cyan-500 font-mono placeholder-cyan-500/30;
  @apply transition-colors duration-300;
  height: 40px;
  line-height: 40px;
}

input.chat {
  @apply text-emerald-500 placeholder-emerald-500/30;
}
</style>
