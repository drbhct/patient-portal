import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/http-common.js'

export const useDashboardStore = defineStore('dashboard', () => {
  const isLoading = ref(false)
  const dashboardData = ref(null)

  const setIsLoading = (value) => {
    isLoading.value = value
  }

  const setDashboardData = (data) => {
    dashboardData.value = data
  }

  const refreshDashboardData = async () => {
    try {
      // For development mode, always use mock data since api.dashboard doesn't exist
      console.log('Using mock dashboard data in development mode')
      
      // Create mock dashboard data
      const mockData = {
        appointments: [
          { id: 1, date: new Date().toISOString(), providerName: 'Dr. Smith', reason: 'Check-up' },
          { id: 2, date: new Date(Date.now() + 7 * 86400000).toISOString(), providerName: 'Dr. Johnson', reason: 'Follow-up' }
        ],
        messages: [
          { id: 1, date: new Date().toISOString(), subject: 'Lab Results', sender: 'Dr. Smith' },
          { id: 2, date: new Date(Date.now() - 2 * 86400000).toISOString(), subject: 'Appointment Confirmation', sender: 'Front Desk' }
        ],
        documents: [
          { id: 1, date: new Date().toISOString(), name: 'Lab Results.pdf', type: 'PDF' },
          { id: 2, date: new Date(Date.now() - 5 * 86400000).toISOString(), name: 'Insurance Form.pdf', type: 'PDF' }
        ],
        tasks: [
          { id: 1, name: 'Complete Health Questionnaire', status: 'pending' },
          { id: 2, name: 'Review Medication List', status: 'complete' }
        ]
      }
      
      setDashboardData(mockData)
      return mockData

      // NOTE: In production, would use the real API:
      // const response = await api.dashboard.request.getData()
      // setDashboardData(response.data)
      // return response.data
    } catch (error) {
      console.error('Error refreshing dashboard data:', error)
      
      // Return empty mock data on error to prevent UI breaking
      const emptyData = { appointments: [], messages: [], documents: [], tasks: [] }
      setDashboardData(emptyData)
      return emptyData
    }
  }

  return {
    isLoading,
    dashboardData,
    setIsLoading,
    setDashboardData,
    refreshDashboardData
  }
})
