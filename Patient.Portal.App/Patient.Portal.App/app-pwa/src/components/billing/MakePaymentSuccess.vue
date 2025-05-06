<template>
  <div class="card">
    <div class="card-body text-center">
      <div class="success-icon mb-4" role="img" aria-label="Success">
        <i class="fas fa-check-circle" aria-hidden="true"></i>
      </div>

      <h2 class="card-title mb-4">Payment Successful!</h2>

      <LoadingOverlay :show="isLoading" message="Loading payment details..." />

      <div v-if="error" class="alert alert-danger" role="alert">
        <i class="fas fa-exclamation-circle me-2"></i>
        {{ error }}
        <button
          class="btn btn-link p-0 ms-2"
          @click="loadPaymentDetails"
          :disabled="isLoading"
        >
          Try Again
        </button>
      </div>

      <div v-else-if="!isLoading" class="payment-details mb-4">
        <div class="detail-item">
          <span class="label">Amount Paid</span>
          <span class="value">${{ formatAmount(paymentDetails.amount) }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Transaction ID</span>
          <span class="value">{{ paymentDetails.transactionId }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Date</span>
          <span class="value">{{ formatDateTime(paymentDetails.date) }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Payment Method</span>
          <span class="value">{{ paymentDetails.paymentMethod }}</span>
        </div>
      </div>

      <div class="d-grid gap-2">
        <button
          class="btn btn-primary"
          @click="viewReceipt"
          :disabled="isLoading"
          aria-label="View payment receipt"
        >
          <i class="fas fa-file-invoice me-2" aria-hidden="true"></i>
          View Receipt
        </button>
        <button
          class="btn btn-outline-primary"
          @click="backToBilling"
          :disabled="isLoading"
          aria-label="Return to billing page"
        >
          <i class="fas fa-arrow-left me-2" aria-hidden="true"></i>
          Back to Billing
        </button>
        <button
          class="btn btn-link"
          @click="sendEmailReceipt"
          :disabled="isLoading || isSendingEmail"
          aria-label="Send receipt via email"
        >
          <i
            v-if="isSendingEmail"
            class="fas fa-spinner fa-spin me-2"
            aria-hidden="true"
          ></i>
          <i v-else class="fas fa-envelope me-2" aria-hidden="true"></i>
          Send Receipt via Email
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBillingStore } from '@/stores/billing'
import LoadingOverlay from '@/components/shared/LoadingOverlay.vue'
import { handleApiError, handleApiSuccess } from '@/utils/apiErrorHandler'

const router = useRouter()
const billingStore = useBillingStore()

const isLoading = ref(false)
const isSendingEmail = ref(false)
const error = ref(null)
const paymentDetails = ref({
  amount: 0,
  transactionId: '',
  date: new Date(),
  paymentMethod: ''
})

const loadPaymentDetails = async () => {
  isLoading.value = true
  error.value = null
  try {
    const details = await billingStore.getLastPaymentDetails()
    paymentDetails.value = details
  } catch (err) {
    error.value = 'Failed to load payment details'
    handleApiError(err, error.value)
  } finally {
    isLoading.value = false
  }
}

const formatAmount = (amount) => {
  return amount.toFixed(2)
}

const formatDateTime = (date) => {
  return new Date(date).toLocaleString()
}

const viewReceipt = () => {
  router.push(`/billing/receipt/${paymentDetails.value.transactionId}`)
}

const backToBilling = () => {
  router.push('/billing')
}

const sendEmailReceipt = async () => {
  isSendingEmail.value = true
  try {
    await billingStore.sendEmailReceipt(paymentDetails.value.transactionId)
    handleApiSuccess('Receipt sent to your email')
  } catch (err) {
    handleApiError(err, 'Failed to send receipt')
  } finally {
    isSendingEmail.value = false
  }
}

onMounted(() => {
  loadPaymentDetails()
})
</script>

<style scoped>
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  max-width: 600px;
  margin: 0 auto;
}

.card-title {
  color: #2c3e50;
  font-weight: 600;
}

.success-icon {
  font-size: 4rem;
  color: #28a745;
  animation: scaleIn 0.5s ease-out;
}

.payment-details {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #dee2e6;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item .label {
  color: #6c757d;
}

.detail-item .value {
  font-weight: 600;
  color: #2c3e50;
}

.btn-outline-primary {
  border-width: 2px;
}

.btn-link {
  color: #0d6efd;
  text-decoration: none;
  padding: 0;
}

.btn-link:hover {
  text-decoration: underline;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.alert {
  display: flex;
  align-items: center;
}

/* Add focus styles for keyboard navigation */
.btn:focus-visible {
  outline: 2px solid #0d6efd;
  outline-offset: 2px;
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

/* Add success icon animation */
@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
