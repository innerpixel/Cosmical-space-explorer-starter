import { defineStore } from 'pinia'

export const useInterfaceStore = defineStore('interface', {
  state: () => ({
    // System State
    isReady: false,
    activeModules: [],
    systemStatus: {
      online: false,
      signalStrength: 0,
      latency: 0
    },

    // Communication State
    communicationState: {
      videoEnabled: false,
      audioEnabled: false,
      screenSharing: false,
      connections: []
    },

    // Message System
    messageQueue: [],
    activeConversation: null,
    notifications: []
  }),

  getters: {
    isSystemOnline: (state) => state.systemStatus.online,
    pendingMessages: (state) => state.messageQueue.filter(msg => !msg.read),
    activeConnections: (state) => state.communicationState.connections.filter(conn => conn.active)
  },

  actions: {
    initializeSystem() {
      this.systemStatus.online = true
      this.isReady = true
    },

    addMessage(message) {
      this.messageQueue.push({
        id: Date.now(),
        timestamp: new Date(),
        read: false,
        played: false,
        ...message
      })
    },

    updateSystemStatus(status) {
      this.systemStatus = { ...this.systemStatus, ...status }
    },

    toggleModule(moduleName) {
      const index = this.activeModules.indexOf(moduleName)
      if (index === -1) {
        this.activeModules.push(moduleName)
      } else {
        this.activeModules.splice(index, 1)
      }
    },

    updateCommunicationState(state) {
      this.communicationState = { ...this.communicationState, ...state }
    }
  }
})
