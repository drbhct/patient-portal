import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    isLoading: false
  }),

  actions: {
    setLoading(value) {
      this.isLoading = value
    }
  }
})
