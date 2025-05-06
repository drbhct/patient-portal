<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title mb-4">Schedule an Appointment</h2>

            <div v-if="isLoading" class="text-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <div v-else>
              <form @submit.prevent="scheduleAppointment">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="appointmentType" class="form-label"
                      >Appointment Type</label
                    >
                    <select
                      id="appointmentType"
                      v-model="form.type"
                      class="form-select"
                      required
                    >
                      <option value="">Select Type</option>
                      <option
                        v-for="type in appointmentTypes"
                        :key="type.id"
                        :value="type.id"
                      >
                        {{ type.name }}
                      </option>
                    </select>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="provider" class="form-label">Provider</label>
                    <select
                      id="provider"
                      v-model="form.providerId"
                      class="form-select"
                      required
                    >
                      <option value="">Select Provider</option>
                      <option
                        v-for="provider in providers"
                        :key="provider.id"
                        :value="provider.id"
                      >
                        {{ provider.name }}
                      </option>
                    </select>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="date" class="form-label">Date</label>
                    <input
                      type="date"
                      id="date"
                      v-model="form.date"
                      class="form-control"
                      :min="minDate"
                      required
                    />
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="time" class="form-label">Time</label>
                    <select
                      id="time"
                      v-model="form.time"
                      class="form-select"
                      required
                    >
                      <option value="">Select Time</option>
                      <option
                        v-for="slot in availableTimeSlots"
                        :key="slot"
                        :value="slot"
                      >
                        {{ formatTime(slot) }}
                      </option>
                    </select>
                  </div>

                  <div class="col-12 mb-3">
                    <label for="reason" class="form-label"
                      >Reason for Visit</label
                    >
                    <textarea
                      id="reason"
                      v-model="form.reason"
                      class="form-control"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                </div>

                <div class="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="goBack"
                    :disabled="isSaving"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="isSaving"
                  >
                    {{ isSaving ? 'Scheduling...' : 'Schedule Appointment' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAppointmentStore } from '@/stores/appointment'

const router = useRouter()
const toast = useToast()
const appointmentStore = useAppointmentStore()

const isLoading = ref(false)
const isSaving = ref(false)
const appointmentTypes = ref([])
const providers = ref([])
const availableTimeSlots = ref([])

const form = ref({
  type: '',
  providerId: '',
  date: '',
  time: '',
  reason: ''
})

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const loadInitialData = async () => {
  isLoading.value = true
  try {
    const [types, providersList] = await Promise.all([
      appointmentStore.getAppointmentTypes(),
      appointmentStore.getProviders()
    ])
    appointmentTypes.value = types
    providers.value = providersList
  } catch (error) {
    console.error('Error loading initial data:', error)
    toast.error('Failed to load appointment data')
  } finally {
    isLoading.value = false
  }
}

const loadAvailableTimeSlots = async () => {
  if (!form.value.date || !form.value.providerId) {
    availableTimeSlots.value = []
    return
  }

  try {
    const slots = await appointmentStore.getAvailableTimeSlots({
      date: form.value.date,
      providerId: form.value.providerId
    })
    availableTimeSlots.value = slots
  } catch (error) {
    console.error('Error loading time slots:', error)
    toast.error('Failed to load available time slots')
  }
}

const formatTime = (time) => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const scheduleAppointment = async () => {
  isSaving.value = true
  try {
    await appointmentStore.scheduleAppointment({
      ...form.value,
      dateTime: `${form.value.date}T${form.value.time}`
    })
    toast.success('Appointment scheduled successfully')
    router.push('/appointments')
  } catch (error) {
    console.error('Error scheduling appointment:', error)
    toast.error('Failed to schedule appointment')
  } finally {
    isSaving.value = false
  }
}

const goBack = () => {
  router.back()
}

watch([() => form.value.date, () => form.value.providerId], () => {
  loadAvailableTimeSlots()
})

onMounted(() => {
  loadInitialData()
})
</script>

<style scoped>
.form-label {
  font-weight: 500;
}
.gap-2 {
  gap: 0.5rem;
}
</style>
