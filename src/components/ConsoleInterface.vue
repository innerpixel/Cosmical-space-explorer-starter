<template>
  <div 
    class="console-interface" 
    :class="{ active: isActive }"
    @keydown.esc="toggleConsole"
  >
    <div class="console-header">
      <div class="control-icons">
        <div class="alien-icon" @click="toggleConsole">
          <div class="status">
            <div class="inner-circle"></div>
            <div class="pulse"></div>
          </div>
        </div>
        <div class="toggle-symbol">
          <div class="arrow"></div>
        </div>
        <div class="console-handle" @click="toggleConsole">
          <div class="handle-icon"></div>
        </div>
        <div class="mode-icons">
          <div class="mode-icon command-symbol" :class="{ active: mode === 'command' }" @click="setMode('command')">
            <div class="line"></div>
            <div class="dot"></div>
          </div>
          <div class="mode-icon chat-symbol" :class="{ active: mode === 'chat' }" @click="setMode('chat')">
            <div class="wave"></div>
            <div class="wave delayed"></div>
          </div>
        </div>
      </div>
      <div class="console-title">
        <h4>Console Interface</h4>
        <div class="mode-indicator" :class="mode">{{ mode }}</div>
      </div>
    </div>
    <div 
      ref="outputContainer"
      class="output-container"
      :class="{ 'chat-mode': mode === 'chat' }"
    >
      <div 
        v-for="(line, index) in outputLines" 
        :key="index"
        class="output-line"
        :class="line.type"
      >
        <span class="timestamp">{{ formatTime(line.timestamp) }}</span>
        <span class="content" v-html="line.content"></span>
      </div>
    </div>
    
    <div class="input-container">
      <span class="prompt" :class="mode">></span>
      <input
        ref="inputField"
        v-model="currentInput"
        type="text"
        class="command-input"
        :class="mode"
        @keyup.enter="handleCommand"
        :placeholder="mode === 'chat' ? 'Type a message...' : 'Enter command...'"
        autocomplete="off"
        spellcheck="false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useInterfaceStore } from '../stores/interface';
import * as audioEffects from '../services/audioEffects';

const store = useInterfaceStore();
const isActive = ref(true);
const mode = ref('command');
const currentInput = ref('');
const inputField = ref(null);
const outputContainer = ref(null);

const outputLines = computed(() => store.messages);

// Set mode
const setMode = (newMode) => {
  mode.value = newMode;
  inputField.value?.focus();
  store.addMessage({
    type: 'info',
    content: `Switched to ${newMode} mode`,
    timestamp: new Date()
  });
};

// Handle command
const handleCommand = () => {
  if (!currentInput.value.trim()) return;
  
  // Add command to output
  store.addMessage({
    type: 'command',
    content: currentInput.value,
    timestamp: new Date()
  });

  // Handle mode switching commands
  if (currentInput.value.toLowerCase() === 'mode chat') {
    setMode('chat');
  } else if (currentInput.value.toLowerCase() === 'mode command') {
    setMode('command');
  }
  // Handle sound commands
  else if (currentInput.value.toLowerCase().startsWith('sound ')) {
    const result = audioEffects.parseAndExecuteSoundCommand(currentInput.value);
    store.addMessage({
      type: result.success ? 'success' : 'error',
      content: result.message,
      timestamp: new Date()
    });
  } else if (currentInput.value.toLowerCase() === 'help') {
    // Display help text
    store.addMessage({
      type: 'info',
      content: helpText,
      timestamp: new Date()
    });
  } else if (currentInput.value.toLowerCase() === 'clear') {
    // Clear the console
    store.clearMessages();
  } else {
    // Handle unknown command
    store.addMessage({
      type: 'error',
      content: `Unknown command: ${currentInput.value}`,
      timestamp: new Date()
    });
  }

  // Clear input and focus
  currentInput.value = '';
  inputField.value?.focus();
  scrollToBottom();
};

// Toggle console
const toggleConsole = () => {
  isActive.value = !isActive.value;
  if (isActive.value) {
    setTimeout(() => {
      inputField.value?.focus();
      scrollToBottom();
    }, 300); // Wait for transition
  }
};

// Format timestamp
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// Scroll to bottom
const scrollToBottom = () => {
  if (outputContainer.value) {
    outputContainer.value.scrollTop = outputContainer.value.scrollHeight;
  }
};

// Watch for messages and scroll
watch(() => store.messages, (newMessages, oldMessages) => {
  if (newMessages.length > (oldMessages?.length || 0)) {
    scrollToBottom();
  }
});

// Help text
const helpText = `Available Commands:
  1. Sound Control:
     sound [category] suppression [level]
     sound [category] volume [increase|decrease]
     
     Categories: ambient, engine, interface, voice
     Suppression Levels: none, lowest, low, medium, high, highest
     
  2. Mode Switching:
     mode chat - Switch to chat mode
     mode command - Switch to command mode
     
  3. Console Control:
     clear - Clear console output
     help - Show this help message

  Examples: 
    sound engine suppression lowest
    sound ambient volume increase
    mode chat
    mode command
    clear
`;

// Focus input on mount
onMounted(() => {
  inputField.value?.focus();
});
</script>

<style scoped>
.console-interface {
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  background: rgba(2, 4, 10, 0.9);
  font-family: 'Courier New', monospace;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  border-right: 1px solid rgba(6, 182, 212, 0.3);
}

.console-interface.active {
  transform: translateX(0);
}

/* Header Styles */
.console-header {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(6, 182, 212, 0.3);
  background: rgba(6, 182, 212, 0.05);
  gap: 1rem;
  height: 48px;
}

.control-icons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.alien-icon {
  width: 24px;
  height: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(6, 182, 212, 0.2);
  background: rgba(6, 182, 212, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.alien-icon:hover {
  border-color: rgba(6, 182, 212, 0.4);
  background: rgba(6, 182, 212, 0.1);
}

.alien-icon.active {
  border-color: rgba(6, 182, 212, 0.6);
  background: rgba(6, 182, 212, 0.15);
}

/* Status Icon */
.status {
  width: 16px;
  height: 16px;
}

.inner-circle {
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: rgba(6, 182, 212, 0.5);
  transition: all 0.3s ease;
}

.status.online .inner-circle {
  background: rgba(6, 182, 212, 0.8);
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.4);
}

.pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(6, 182, 212, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.5; }
  70% { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1); opacity: 0; }
}

/* Console Title */
.console-title {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: rgba(6, 182, 212, 0.9);
  margin: 0;
}

.mode-indicator {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid rgba(6, 182, 212, 0.3);
  background: rgba(6, 182, 212, 0.1);
}

.mode-indicator.command {
  border-color: rgba(6, 182, 212, 0.4);
  background: rgba(6, 182, 212, 0.15);
}

.mode-indicator.chat {
  border-color: rgba(16, 185, 129, 0.4);
  background: rgba(16, 185, 129, 0.15);
  color: rgba(16, 185, 129, 0.9);
}

/* Toggle Icon */
.toggle-symbol {
  width: 16px;
  height: 16px;
  position: relative;
}

.toggle-symbol .arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  border-top: 2px solid rgba(6, 182, 212, 0.6);
  border-right: 2px solid rgba(6, 182, 212, 0.6);
  top: 25%;
  left: 25%;
  transition: transform 0.3s ease;
}

.active .toggle-symbol .arrow {
  transform: rotate(-45deg);  /* Points left when open */
}

.console-interface:not(.active) .toggle-symbol .arrow {
  transform: rotate(135deg);  /* Points right when closed */
}

.console-handle {
  position: absolute;
  right: -24px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 48px;
  background: rgba(2, 4, 10, 0.9);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-left: none;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.console-handle:hover {
  background: rgba(6, 182, 212, 0.1);
}

.mode-icons {
  display: flex;
  gap: 0.5rem;
}

.mode-icon {
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mode-icon:hover {
  border-color: rgba(6, 182, 212, 0.5);
  background: rgba(6, 182, 212, 0.1);
}

.mode-icon.active {
  border-color: rgba(6, 182, 212, 0.8);
  background: rgba(6, 182, 212, 0.15);
}

.command-symbol {
  width: 16px;
  height: 16px;
  position: relative;
}

.command-symbol .line {
  position: absolute;
  width: 12px;
  height: 2px;
  background: rgba(6, 182, 212, 0.6);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}

.command-symbol .dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(6, 182, 212, 0.6);
  border-radius: 50%;
  bottom: 2px;
  right: 2px;
}

.chat-symbol {
  width: 16px;
  height: 16px;
  position: relative;
  overflow: hidden;
}

.chat-symbol .wave {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 1px solid rgba(6, 182, 212, 0.6);
  border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%;
  animation: wave 4s linear infinite;
}

.chat-symbol .wave.delayed {
  animation-delay: -2s;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Output Container */
.output-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.output-line {
  margin: 0.25rem 0;
  line-height: 1.4;
  display: flex;
  gap: 0.75rem;
  word-break: break-word;
}

.timestamp {
  color: rgba(6, 182, 212, 0.5);
  font-size: 0.875rem;
  white-space: nowrap;
}

.command { color: rgba(6, 182, 212, 0.9); }
.error { color: rgba(239, 68, 68, 0.9); }
.success { color: rgba(16, 185, 129, 0.9); }
.info { color: rgba(6, 182, 212, 0.9); }

/* Input Container */
.input-container {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-top: 1px solid rgba(6, 182, 212, 0.3);
  background: rgba(6, 182, 212, 0.05);
  height: 48px;
}

.prompt {
  color: rgba(6, 182, 212, 0.9);
  margin-right: 0.75rem;
  font-weight: 500;
}

.prompt.chat {
  color: rgba(16, 185, 129, 0.9);
}

.command-input {
  flex: 1;
  background: transparent;
  border: none;
  color: rgba(6, 182, 212, 0.9);
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  outline: none;
}

.command-input.chat {
  color: rgba(16, 185, 129, 0.9);
}

.command-input::placeholder {
  color: rgba(6, 182, 212, 0.4);
}

.command-input.chat::placeholder {
  color: rgba(16, 185, 129, 0.4);
}

/* Scrollbar */
.output-container::-webkit-scrollbar {
  width: 8px;
}

.output-container::-webkit-scrollbar-track {
  background: rgba(6, 182, 212, 0.05);
}

.output-container::-webkit-scrollbar-thumb {
  background: rgba(6, 182, 212, 0.2);
  border-radius: 4px;
}

.output-container::-webkit-scrollbar-thumb:hover {
  background: rgba(6, 182, 212, 0.3);
}
</style>
