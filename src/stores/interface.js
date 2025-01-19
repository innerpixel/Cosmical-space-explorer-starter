import { defineStore } from 'pinia'

export const useInterfaceStore = defineStore('interface', {
  state: () => ({
    isSystemOnline: true,
    currentQuantumState: 'STABLE',
    currentCoordinates: '0.0.0.0',
    messageQueue: [],
    chatHistory: [],
    communicationState: {
      connected: false,
      videoEnabled: false,
      audioEnabled: false,
      screenSharing: false,
      signalStrength: 0,
      bandwidth: 0
    }
  }),

  actions: {
    initializeSystem() {
      this.isSystemOnline = true
      this.currentQuantumState = 'STABLE'
      this.addSystemMessage('System initialized')
      // Initialize communication in standby mode
      this.updateCommunicationState({
        connected: true,
        signalStrength: 85,
        bandwidth: 10.5
      })
    },

    addSystemMessage(content) {
      this.messageQueue.push({
        type: 'system',
        content,
        timestamp: Date.now(),
        displayed: false
      })
    },

    sendChatMessage(message) {
      // Add to message queue for display
      this.messageQueue.push({
        ...message,
        displayed: false
      })

      // Store in chat history
      this.chatHistory.push(message)

      // Here you would typically send the message to a backend service
      // For now, we'll just simulate a response
      setTimeout(() => {
        this.messageQueue.push({
          type: 'chat',
          isChat: true,
          username: 'CSMCL',
          content: 'Message received: ' + message.content,
          timestamp: Date.now(),
          displayed: false
        })
      }, 1000)
    },

    updateCommunicationState(newState) {
      this.communicationState = {
        ...this.communicationState,
        ...newState
      }
    },

    updateQuantumState(newState) {
      this.currentQuantumState = newState
      this.addSystemMessage(`Quantum state updated: ${newState}`)
    },

    updateCoordinates(newCoords) {
      this.currentCoordinates = newCoords
      this.addSystemMessage(`Position updated: ${newCoords}`)
    }
  }
})
