<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>Appointments</h2>
          <button class="btn btn-primary" @click="scheduleAppointment">
            Schedule Appointment
          </button>
        </div>

        <div v-if="isLoading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else-if="!appointments.length" class="alert alert-info">
          No appointments scheduled.
        </div>
        <div v-else>
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Provider</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="appt in appointments" :key="appt.id">
                      <td>{{ formatDateTime(appt.dateTime) }}</td>
                      <td>{{ appt.provider }}</td>
                      <td>{{ appt.type }}</td>
                      <td>
                        <span
                          :class="{
                            'badge badge-success': appt.status === 'confirmed',
                            'badge badge-warning': appt.status === 'pending',
                            'badge badge-danger': appt.status === 'cancelled'
                          }"
                        >
                          {{ appt.status }}
                        </span>
                      </td>
                      <td>
                        <div class="btn-group">
                          <button
                            class="btn btn-sm btn-primary"
                            @click="viewAppointment(appt)"
                            :disabled="isLoading"
                          >
                            View
                          </button>
                          <button
                            class="btn btn-sm btn-warning"
                            @click="rescheduleAppointment(appt)"
                            :disabled="isLoading || appt.status === 'cancelled'"
                          >
                            Reschedule
                          </button>
                          <button
                            class="btn btn-sm btn-danger"
                            @click="cancelAppointment(appt)"
                            :disabled="
                              isCancelling === appt.id ||
                              appt.status === 'cancelled'
                            "
                          >
                            {{
                              isCancelling === appt.id
                                ? 'Cancelling...'
                                : 'Cancel'
                            }}
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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
const isCancelling = ref(null)
const appointments = ref([])

const loadAppointments = async () => {
  isLoading.value = true
  try {
    const result = await appointmentStore.getAppointments()
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

const viewAppointment = (appt) => {
  router.push(`/appointments/${appt.id}`)
}

const scheduleAppointment = () => {
  router.push('/appointments/schedule')
}

const rescheduleAppointment = (appt) => {
  router.push(`/appointments/${appt.id}/reschedule`)
}

const cancelAppointment = async (appt) => {
  if (!confirm('Are you sure you want to cancel this appointment?')) {
    return
  }

  isCancelling.value = appt.id
  try {
    await appointmentStore.cancelAppointment(appt.id)
    const index = appointments.value.findIndex((a) => a.id === appt.id)
    if (index !== -1) {
      appointments.value[index].status = 'cancelled'
    }
    toast.success('Appointment cancelled successfully')
  } catch (error) {
    console.error('Error cancelling appointment:', error)
    toast.error('Failed to cancel appointment')
  } finally {
    isCancelling.value = null
  }
}

onMounted(() => {
  loadAppointments()
})
</script>

<style scoped>
.table th {
  font-weight: 600;
}
.badge {
  padding: 0.5em 0.75em;
}
.btn-group {
  gap: 0.5rem;
}
</style>
