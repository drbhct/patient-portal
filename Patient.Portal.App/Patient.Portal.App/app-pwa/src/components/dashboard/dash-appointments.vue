<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-4">Upcoming Appointments</h5>

      <div v-if="isLoading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else-if="!appointments.length" class="text-muted">
        No upcoming appointments
      </div>
      <div v-else>
        <div v-for="appt in appointments" :key="appt.id" class="mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h6 class="mb-1">{{ appt.type }}</h6>
              <p class="mb-0 text-muted">
                {{ formatDateTime(appt.dateTime) }}
              </p>
              <p class="mb-0 text-muted">Provider: {{ appt.provider }}</p>
            </div>
            <div class="d-flex gap-2">
              <button
                class="btn btn-sm btn-outline-primary"
                @click="viewAppointment(appt)"
              >
                View Details
              </button>
              <button
                class="btn btn-sm btn-outline-warning"
                @click="rescheduleAppointment(appt)"
                :disabled="appt.status === 'cancelled'"
              >
                Reschedule
              </button>
            </div>
          </div>
          <hr v-if="!isLast(appt)" class="my-3" />
        </div>
      </div>

      <div class="mt-4">
        <button class="btn btn-primary w-100" @click="scheduleAppointment">
          Schedule New Appointment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAppointmentStore } from '@/stores/appointment'

const router = useRouter()
const toast = useToast()
const appointmentStore = useAppointmentStore()

const isLoading = ref(false)
const appointments = ref([])

const loadAppointments = async () => {
  isLoading.value = true
  try {
    const result = await appointmentStore.getUpcomingAppointments()
    appointments.value = result
  } catch (error) {
    console.error('Error loading appointments:', error)
    toast.error('Failed to load appointments')
  } finally {
    isLoading.value = false
  }
}

const formatDateTime = (dateTime) => {
  return new Date(dateTime).toLocaleString()
}

const isLast = (appt) => {
  return appointments.value[appointments.value.length - 1].id === appt.id
}

const viewAppointment = (appt) => {
  router.push(`/appointments/${appt.id}`)
}

const rescheduleAppointment = (appt) => {
  router.push(`/appointments/${appt.id}/reschedule`)
}

const scheduleAppointment = () => {
  router.push('/appointments/schedule')
}

onMounted(() => {
  loadAppointments()
})
</script>

<style scoped>
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
.card-title {
  color: #2c3e50;
  font-weight: 600;
}
.btn-outline-primary,
.btn-outline-warning {
  border-width: 2px;
}
.gap-2 {
  gap: 0.5rem;
}
</style>
