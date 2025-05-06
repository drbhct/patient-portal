import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessageStore = defineStore('message', () => {
  const currentPage = ref('MsgList')
  const currentMessage = ref(null)
  const isLoading = ref(false)

  const setCurrentPage = (page) => {
    currentPage.value = page
  }

  const setCurrentMessage = (message) => {
    currentMessage.value = message
  }

  const setIsLoading = (value) => {
    isLoading.value = value
  }

  // Add method to get recent messages (mock data for development)
  const getRecentMessages = async () => {
    try {
      console.log('Using mock message data in development mode')
      // Return mock message data
      return [
        {
          id: 1,
          date: new Date().toISOString(),
          sender: 'Dr. Smith',
          subject: 'Lab Results',
          preview: 'Your recent lab results show improvement...',
          read: false
        },
        {
          id: 2,
          date: new Date(Date.now() - 3 * 86400000).toISOString(),
          sender: 'Front Desk',
          subject: 'Appointment Confirmation',
          preview: 'This is to confirm your appointment on...',
          read: true
        }
      ]
    } catch (error) {
      console.error('Error fetching recent messages:', error)
      return []
    }
  }

  return {
    currentPage,
    currentMessage,
    isLoading,
    setCurrentPage,
    setCurrentMessage,
    setIsLoading,
    getRecentMessages
  }
})
