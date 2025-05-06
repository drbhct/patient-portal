<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-4">Contact Information</h5>

      <LoadingOverlay
        :show="isLoading"
        message="Loading contact information..."
      />

      <div v-if="error" class="alert alert-danger" role="alert">
        <i class="fas fa-exclamation-circle me-2"></i>
        {{ error }}
        <button
          class="btn btn-link p-0 ms-2"
          @click="loadContactInfo"
          :disabled="isLoading"
        >
          Try Again
        </button>
      </div>

      <div v-else-if="!isLoading">
        <div class="row g-3">
          <div class="col-md-6">
            <div class="contact-item">
              <i class="fas fa-phone-alt" aria-hidden="true"></i>
              <div>
                <h6 class="mb-1">Phone</h6>
                <p class="mb-0">
                  <a
                    :href="`tel:${contact.phone}`"
                    class="text-decoration-none"
                    :aria-label="`Call ${contact.phone}`"
                  >
                    {{ contact.phone || 'Not available' }}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="contact-item">
              <i class="fas fa-envelope" aria-hidden="true"></i>
              <div>
                <h6 class="mb-1">Email</h6>
                <p class="mb-0">
                  <a
                    :href="`mailto:${contact.email}`"
                    class="text-decoration-none"
                    :aria-label="`Email ${contact.email}`"
                  >
                    {{ contact.email || 'Not available' }}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="contact-item">
              <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
              <div>
                <h6 class="mb-1">Address</h6>
                <p class="mb-0">
                  <a
                    :href="`https://maps.google.com/?q=${encodeURIComponent(
                      contact.address
                    )}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-decoration-none"
                    :aria-label="`View ${contact.address} on Google Maps`"
                  >
                    {{ contact.address || 'Not available' }}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="contact-item">
              <i class="fas fa-clock" aria-hidden="true"></i>
              <div>
                <h6 class="mb-1">Hours</h6>
                <p class="mb-0">{{ contact.hours || 'Not available' }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <button
            class="btn btn-primary w-100"
            @click="sendMessage"
            :disabled="isLoading"
            aria-label="Send a message"
          >
            <i class="fas fa-paper-plane me-2" aria-hidden="true"></i>
            Send Message
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useContactStore } from '@/stores/contact'
import LoadingOverlay from '@/components/shared/LoadingOverlay.vue'
import { handleApiError } from '@/utils/apiErrorHandler'

const router = useRouter()
const toast = useToast()
const contactStore = useContactStore()

const isLoading = ref(false)
const error = ref(null)
const contact = ref({})

const loadContactInfo = async () => {
  isLoading.value = true
  error.value = null
  try {
    const result = await contactStore.getContactInfo()
    contact.value = result
  } catch (err) {
    error.value = 'Failed to load contact information'
    handleApiError(err, error.value)
  } finally {
    isLoading.value = false
  }
}

const sendMessage = () => {
  router.push('/messages/new')
}

onMounted(() => {
  loadContactInfo()
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

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
}

.contact-item:hover {
  background-color: #e9ecef;
  transform: translateY(-1px);
}

.contact-item i {
  font-size: 1.5rem;
  color: #0d6efd;
}

.contact-item h6 {
  color: #2c3e50;
  font-weight: 600;
}

.contact-item p {
  color: #6c757d;
}

.contact-item a {
  color: #0d6efd;
  transition: color 0.2s ease-in-out;
}

.contact-item a:hover {
  color: #0a58ca;
}

.alert {
  display: flex;
  align-items: center;
}

.btn-link {
  color: #0d6efd;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>
