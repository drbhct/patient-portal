import { defineStore } from 'pinia'
import { ref } from 'vue'
import { handleApiError } from '@/utils/apiErrorHandler'

export const useContactStore = defineStore('contact', () => {
  // State
  const contactInfo = ref({
    phone: '',
    email: '',
    address: '',
    hours: ''
  })
  const isLoading = ref(false)
  const error = ref(null)

  // Actions
  const getContactInfo = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch('/api/contact')
      if (!response.ok) throw new Error('Failed to fetch contact information')
      const data = await response.json()
      contactInfo.value = data
      return data
    } catch (err) {
      handleApiError(err, 'Failed to load contact information')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const sendMessage = async (messageData) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch('/api/contact/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      })
      if (!response.ok) throw new Error('Failed to send message')
      return await response.json()
    } catch (err) {
      handleApiError(err, 'Failed to send message')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    contactInfo,
    isLoading,
    error,
    // Actions
    getContactInfo,
    sendMessage
  }
})
