import { defineStore } from 'pinia'

export const useDocumentStore = defineStore('document', {
  state: () => ({
    documents: []
  }),
  actions: {
    async getRecentDocuments() {
      // This is a mock implementation - in a real app, you would fetch from an API
      return [
        {
          id: 1,
          name: 'Medical Records',
          date: new Date(2025, 4, 1),
          url: '#'
        },
        {
          id: 2,
          name: 'Insurance Information',
          date: new Date(2025, 4, 2),
          url: '#'
        }
      ]
    },
    async getDocumentById(id) {
      // This is a mock implementation
      const documents = await this.getRecentDocuments()
      return documents.find(doc => doc.id === id)
    }
  },
  // Enable persistence
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'document',
        storage: localStorage
      }
    ]
  }
})
