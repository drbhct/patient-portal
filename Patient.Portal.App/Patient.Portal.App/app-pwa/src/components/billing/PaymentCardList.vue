<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="card-title mb-0">Saved Payment Methods</h5>
        <button
          class="btn btn-primary"
          @click="addNewCard"
          :disabled="isLoading"
          aria-label="Add new payment method"
        >
          <i class="fas fa-plus me-2" aria-hidden="true"></i>
          Add New Card
        </button>
      </div>

      <LoadingOverlay :show="isLoading" message="Loading payment methods..." />

      <div v-if="error" class="alert alert-danger" role="alert">
        <i class="fas fa-exclamation-circle me-2"></i>
        {{ error }}
        <button
          class="btn btn-link p-0 ms-2"
          @click="loadCards"
          :disabled="isLoading"
        >
          Try Again
        </button>
      </div>

      <div v-else-if="!isLoading">
        <div v-if="!cards.length" class="text-center py-4">
          <i
            class="fas fa-credit-card fa-3x text-muted mb-3"
            aria-hidden="true"
          ></i>
          <p class="text-muted mb-0">No saved payment methods</p>
        </div>
        <div v-else>
          <div
            v-for="card in cards"
            :key="card.id"
            class="card mb-3"
            :class="{ 'border-primary': card.isDefault }"
          >
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <div class="card-icon me-3">
                    <i :class="getCardIcon(card.type)" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h6 class="mb-1">
                      {{ card.type }} ending in {{ card.last4 }}
                      <span
                        v-if="card.isDefault"
                        class="badge bg-primary ms-2"
                        aria-label="Default payment method"
                      >
                        Default
                      </span>
                    </h6>
                    <p class="mb-0 text-muted">
                      Expires {{ formatExpiryDate(card.expiryDate) }}
                    </p>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <button
                    class="btn btn-sm btn-outline-primary"
                    @click="setDefaultCard(card)"
                    :disabled="isProcessing === card.id || card.isDefault"
                    :aria-label="
                      card.isDefault
                        ? 'Default payment method'
                        : 'Set as default payment method'
                    "
                  >
                    <i
                      v-if="isProcessing === card.id"
                      class="fas fa-spinner fa-spin me-1"
                      aria-hidden="true"
                    ></i>
                    {{ card.isDefault ? 'Default' : 'Set as Default' }}
                  </button>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteCard(card)"
                    :disabled="isProcessing === card.id"
                    :aria-label="Delete payment method"
                  >
                    <i class="fas fa-trash-alt" aria-hidden="true"></i>
                  </button>
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
import { useBillingStore } from '@/stores/billing'
import LoadingOverlay from '@/components/shared/LoadingOverlay.vue'
import { handleApiError, handleApiSuccess } from '@/utils/apiErrorHandler'

const router = useRouter()
const toast = useToast()
const billingStore = useBillingStore()

const isLoading = ref(false)
const isProcessing = ref(null)
const error = ref(null)
const cards = ref([])

const loadCards = async () => {
  isLoading.value = true
  error.value = null
  try {
    const result = await billingStore.getCreditCards()
    cards.value = result
  } catch (err) {
    error.value = 'Failed to load payment methods'
    handleApiError(err, error.value)
  } finally {
    isLoading.value = false
  }
}

const getCardIcon = (type) => {
  const icons = {
    visa: 'fab fa-cc-visa',
    mastercard: 'fab fa-cc-mastercard',
    amex: 'fab fa-cc-amex',
    discover: 'fab fa-cc-discover'
  }
  return icons[type.toLowerCase()] || 'far fa-credit-card'
}

const formatExpiryDate = (date) => {
  const [month, year] = date.split('/')
  return `${month}/${year}`
}

const addNewCard = () => {
  router.push('/billing/add-card')
}

const setDefaultCard = async (card) => {
  if (card.isDefault) return

  isProcessing.value = card.id
  try {
    await billingStore.setDefaultCard(card.id)
    cards.value = cards.value.map((c) => ({
      ...c,
      isDefault: c.id === card.id
    }))
    handleApiSuccess('Default card updated')
  } catch (err) {
    handleApiError(err, 'Failed to update default card')
  } finally {
    isProcessing.value = null
  }
}

const deleteCard = async (card) => {
  if (!confirm('Are you sure you want to delete this card?')) {
    return
  }

  isProcessing.value = card.id
  try {
    await billingStore.deleteCard(card.id)
    cards.value = cards.value.filter((c) => c.id !== card.id)
    handleApiSuccess('Card deleted successfully')
  } catch (err) {
    handleApiError(err, 'Failed to delete card')
  } finally {
    isProcessing.value = null
  }
}

onMounted(() => {
  loadCards()
})
</script>

<style scoped>
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: all 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.card-title {
  color: #2c3e50;
  font-weight: 600;
}

.card-icon {
  font-size: 2rem;
  color: #0d6efd;
}

.btn-outline-primary,
.btn-outline-danger {
  border-width: 2px;
  transition: all 0.2s ease-in-out;
}

.btn-outline-primary:hover,
.btn-outline-danger:hover {
  transform: translateY(-1px);
}

.gap-2 {
  gap: 0.5rem;
}

.badge {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.35em 0.65em;
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

/* Add focus styles for keyboard navigation */
.btn:focus-visible {
  outline: 2px solid #0d6efd;
  outline-offset: 2px;
}

/* Add disabled styles */
.btn:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

/* Add loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fa-spinner {
  animation: spin 1s linear infinite;
}
</style>
