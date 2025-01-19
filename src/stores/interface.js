import { defineStore } from 'pinia'

export const useInterfaceStore = defineStore('interface', {
  state: () => ({
    systemInitialized: false,
    communicationState: {
      connected: false,
      videoEnabled: false,
      audioEnabled: false,
      screenSharing: false,
      audioEffect: null,
      signalStrength: 0,
      bandwidth: 0
    },
    messages: [], // Array to store messages
    consoleMode: 'cmd' // 'cmd' or 'chat'
  }),

  actions: {
    initializeSystem() {
      this.systemInitialized = true;
      this.communicationState = {
        connected: false,
        videoEnabled: false,
        audioEnabled: false,
        screenSharing: false,
        audioEffect: null,
        signalStrength: 0,
        bandwidth: 0
      };
      this.messages = [];
    },

    updateCommunicationState(newState) {
      this.communicationState = {
        ...this.communicationState,
        ...newState
      };
    },

    addMessage(message) {
      // Ensure message has required fields
      const formattedMessage = {
        id: Date.now(),
        timestamp: new Date(),
        type: message.type || 'info',
        content: message.content,
        ...message
      };

      this.messages.push(formattedMessage);

      // Keep only last 100 messages
      if (this.messages.length > 100) {
        this.messages.shift();
      }
    },

    clearMessages() {
      this.messages = [];
    },

    setConsoleMode(mode) {
      if (['cmd', 'chat'].includes(mode)) {
        this.consoleMode = mode;
      }
    }
  }
});
