<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div v-if="isLoading" class="text-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <div v-else>
              <h2 class="card-title mb-4">Welcome, {{ patientName }}!</h2>

              <div class="row">
                <div class="col-md-6 mb-4">
                  <div class="card h-100">
                    <div class="card-body">
                      <h5 class="card-title">Upcoming Appointments</h5>
                      <div
                        v-if="!upcomingAppointments.length"
                        class="text-muted"
                      >
                        No upcoming appointments
                      </div>
                      <div v-else>
                        <div
                          v-for="appt in upcomingAppointments"
                          :key="appt.id"
                          class="mb-3"
                        >
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <h6 class="mb-1">{{ appt.type }}</h6>
                              <p class="mb-0 text-muted">
                                {{ formatDateTime(appt.dateTime) }}
                              </p>
                            </div>
                            <button
                              class="btn btn-sm btn-outline-primary"
                              @click="viewAppointment(appt)"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 mb-4">
                  <div class="card h-100">
                    <div class="card-body">
                      <h5 class="card-title">Recent Messages</h5>
                      <div v-if="!recentMessages.length" class="text-muted">
                        No recent messages
                      </div>
                      <div v-else>
                        <div
                          v-for="msg in recentMessages"
                          :key="msg.id"
                          class="mb-3"
                        >
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <h6 class="mb-1">{{ msg.subject }}</h6>
                              <p class="mb-0 text-muted">
                                {{ formatDate(msg.date) }}
                              </p>
                            </div>
                            <button
                              class="btn btn-sm btn-outline-primary"
                              @click="viewMessage(msg)"
                            >
                              View Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-4">
                  <div class="card h-100">
                    <div class="card-body">
                      <h5 class="card-title">Recent Documents</h5>
                      <div v-if="!recentDocuments.length" class="text-muted">
                        No recent documents
                      </div>
                      <div v-else>
                        <div
                          v-for="doc in recentDocuments"
                          :key="doc.id"
                          class="mb-3"
                        >
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <h6 class="mb-1">{{ doc.name }}</h6>
                              <p class="mb-0 text-muted">
                                {{ formatDate(doc.date) }}
                              </p>
                            </div>
                            <button
                              class="btn btn-sm btn-outline-primary"
                              @click="viewDocument(doc)"
                            >
                              View Document
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 mb-4">
                  <div class="card h-100">
                    <div class="card-body">
                      <h5 class="card-title">Quick Actions</h5>
                      <div class="d-grid gap-2">
                        <button
                          class="btn btn-primary"
                          @click="scheduleAppointment"
                        >
                          Schedule Appointment
                        </button>
                        <button
                          class="btn btn-outline-primary"
                          @click="sendMessage"
                        >
                          Send Message
                        </button>
                        <button
                          class="btn btn-outline-primary"
                          @click="viewDocuments"
                        >
                          View Documents
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
import { useAppointmentStore, useMessageStore, useDocumentStore, useProfileStore } from '@/stores'

const router = useRouter()
const toast = useToast()
const appointmentStore = useAppointmentStore()
const messageStore = useMessageStore()
const documentStore = useDocumentStore()
const profileStore = useProfileStore()

const isLoading = ref(false)
const patientName = ref('')
const upcomingAppointments = ref([])
const recentMessages = ref([])
const recentDocuments = ref([])

const loadDashboardData = async () => {
  isLoading.value = true
  try {
    // Use the correct getters from the profile store (no API calls needed)
    const currentPatient = profileStore.getCurrentPatient

    // Get dummy data for development only
    const appointments = await appointmentStore.getUpcomingAppointments()
    const messages = await messageStore.getRecentMessages()
    const documents = await documentStore.getRecentDocuments()

    // Set patient name using the current patient if available
    if (currentPatient) {
      patientName.value = `${currentPatient.firstName} ${currentPatient.lastName}`
    } else {
      patientName.value = 'Demo Patient'
    }
    
    upcomingAppointments.value = appointments
    recentMessages.value = messages
    recentDocuments.value = documents
  } catch (error) {
    console.error('Error loading dashboard data:', error)
    toast.error('Failed to load dashboard data')
  } finally {
    isLoading.value = false
  }
}

const formatDateTime = (dateTime) => {
  return new Date(dateTime).toLocaleString()
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const viewAppointment = (appt) => {
  router.push(`/appointments/${appt.id}`)
}

const viewMessage = (msg) => {
  router.push(`/messages/${msg.id}`)
}

const viewDocument = (doc) => {
  router.push(`/documents/${doc.id}`)
}

const scheduleAppointment = () => {
  router.push('/appointments/schedule')
}

const sendMessage = () => {
  router.push('/messages/new')
}

const viewDocuments = () => {
  router.push('/documents')
}

onMounted(() => {
  loadDashboardData()
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
.btn-outline-primary {
  border-width: 2px;
}
</style>
