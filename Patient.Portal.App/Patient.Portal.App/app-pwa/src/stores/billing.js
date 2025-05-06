import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { handleApiError } from '@/utils/apiErrorHandler'

export const useBillingStore = defineStore('billing',
  () => {
  // State
    const accountSummary = ref({
      currentBalance: 0,
      lastPayment: 0,
      lastPaymentDate: null
    })
    const recentTransactions = ref([])
    const savedCards = ref([])
    const lastPayment = ref(null)
    const isLoading = ref(false)
    const error = ref(null)

    // Getters
    const defaultCard = computed(() =>
      savedCards.value.find((card) => card.isDefault)
    )

    const totalTransactions = computed(() => recentTransactions.value.length)

    // Actions
    const getAccountSummary = async () => {
      isLoading.value = true
      error.value = null
      try {
        const response = await fetch('/api/billing/summary')
        if (!response.ok) throw new Error('Failed to fetch account summary')
        const data = await response.json()
        accountSummary.value = data
        return data
      } catch (err) {
        handleApiError(err, 'Failed to load account summary')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    const getRecentTransactions = async ({
      page = 1,
      perPage = 10,
      startDate,
      endDate
    } = {}) => {
      isLoading.value = true
      error.value = null
      try {
        const queryParams = new URLSearchParams({
          page,
          perPage,
          startDate,
          endDate
        })
        const response = await fetch(`/api/billing/transactions?${queryParams}`)
        if (!response.ok) throw new Error('Failed to fetch transactions')
        const data = await response.json()
        recentTransactions.value = data.items
        return data
      } catch (err) {
        handleApiError(err, 'Failed to load transactions')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    const getCreditCards = async () => {
      isLoading.value = true
      error.value = null
      try {
        const response = await fetch('/api/billing/cards')
        if (!response.ok) throw new Error('Failed to fetch saved cards')
        const data = await response.json()
        savedCards.value = data
        return data
      } catch (err) {
        handleApiError(err, 'Failed to load saved cards')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    const processPayment = async (paymentData) => {
      isLoading.value = true
      error.value = null
      try {
        const response = await fetch('/api/billing/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentData)
        })
        if (!response.ok) throw new Error('Failed to process payment')
        const data = await response.json()
        lastPayment.value = data
        return data
      } catch (err) {
        handleApiError(err, 'Failed to process payment')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    const setDefaultCard = async (cardId) => {
      isLoading.value = true
      error.value = null
      try {
        const response = await fetch(`/api/billing/cards/${cardId}/default`, {
          method: 'PUT'
        })
        if (!response.ok) throw new Error('Failed to set default card')
        await getCreditCards() // Refresh cards list
      } catch (err) {
        handleApiError(err, 'Failed to set default card')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    const deleteCard = async (cardId) => {
      isLoading.value = true
      error.value = null
      try {
        const response = await fetch(`/api/billing/cards/${cardId}`, {
          method: 'DELETE'
        })
        if (!response.ok) throw new Error('Failed to delete card')
        savedCards.value = savedCards.value.filter((card) => card.id !== cardId)
      } catch (err) {
        handleApiError(err, 'Failed to delete card')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    const getLastPaymentDetails = async () => {
      isLoading.value = true
      error.value = null
      try {
        const response = await fetch('/api/billing/last-payment')
        if (!response.ok) throw new Error('Failed to fetch last payment details')
        const data = await response.json()
        lastPayment.value = data
        return data
      } catch (err) {
        handleApiError(err, 'Failed to load last payment details')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    const sendEmailReceipt = async (transactionId) => {
      isLoading.value = true
      error.value = null
      try {
        const response = await fetch(
        `/api/billing/receipt/${transactionId}/email`,
        {
          method: 'POST'
        }
        )
        if (!response.ok) throw new Error('Failed to send email receipt')
      } catch (err) {
        handleApiError(err, 'Failed to send email receipt')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    const exportTransactions = async ({ startDate, endDate }) => {
      isLoading.value = true
      error.value = null
      try {
        const queryParams = new URLSearchParams({ startDate, endDate })
        const response = await fetch(
        `/api/billing/transactions/export?${queryParams}`
        )
        if (!response.ok) throw new Error('Failed to export transactions')
        return await response.blob()
      } catch (err) {
        handleApiError(err, 'Failed to export transactions')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    return {
    // State
      accountSummary,
      recentTransactions,
      savedCards,
      lastPayment,
      isLoading,
      error,
      // Getters
      defaultCard,
      totalTransactions,
      // Actions
      getAccountSummary,
      getRecentTransactions,
      getCreditCards,
      processPayment,
      setDefaultCard,
      deleteCard,
      getLastPaymentDetails,
      sendEmailReceipt,
      exportTransactions
    }
  }, {
    persist: {
      key: 'billing',
      storage: localStorage,
      paths: ['accountSummary', 'savedCards', 'lastPayment']
    }
  })
