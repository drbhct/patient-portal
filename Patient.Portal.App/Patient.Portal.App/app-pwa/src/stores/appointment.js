import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/http-common.js'

export const useAppointmentStore = defineStore('appointment', () => {
  const appointments = ref([])
  const currentAppointment = ref(null)
  const isLoading = ref(false)

  const setAppointments = (newAppointments) => {
    appointments.value = newAppointments
  }

  const setCurrentAppointment = (appointment) => {
    currentAppointment.value = appointment
  }

  const setIsLoading = (value) => {
    isLoading.value = value
  }

  const getUpcomingAppointments = async () => {
    try {
      // In development mode, return mock appointment data
      if (import.meta.env.DEV) {
        console.log('Using mock appointment data in development mode')
        return [
          {
            id: 1,
            date: new Date(Date.now() + 3 * 86400000).toISOString(),
            time: '10:30 AM',
            provider: 'Dr. Jane Smith',
            reason: 'Follow-up Appointment',
            location: 'Main Office',
            status: 'Confirmed'
          },
          {
            id: 2,
            date: new Date(Date.now() + 10 * 86400000).toISOString(),
            time: '2:15 PM',
            provider: 'Dr. Robert Johnson',
            reason: 'Annual Physical',
            location: 'North Clinic',
            status: 'Scheduled'
          }
        ]
      } else {
        // In production, use the real API
        const response = await api.appointment.request.getUpcoming()
        return response.data
      }
    } catch (error) {
      console.error('Error fetching upcoming appointments:', error)
      // Return empty array on error to prevent UI breaking
      return []
    }
  }

  return {
    appointments,
    currentAppointment,
    isLoading,
    setAppointments,
    setCurrentAppointment,
    setIsLoading,
    getUpcomingAppointments
  }
})
