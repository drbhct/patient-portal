import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    currentMsgPageView: 'List',
    currentMsgInfo: null
  }),

  getters: {
    getCurrentView: (state) => state.currentMsgPageView,
    getCurrentMessage: (state) => state.currentMsgInfo
  },

  actions: {
    setCurrentView(view) {
      this.currentMsgPageView = view
    },
    setCurrentMessage(message) {
      this.currentMsgInfo = message
    }
  }
})
