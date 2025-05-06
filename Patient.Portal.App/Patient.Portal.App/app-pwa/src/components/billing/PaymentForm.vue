<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-4">Payment Information</h5>

      <form @submit.prevent="handleSubmit" novalidate>
        <div class="row g-3">
          <div class="col-md-6">
            <div class="form-group">
              <label for="cardNumber" class="form-label">Card Number</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="cardNumber"
                  v-model="form.cardNumber"
                  :class="{ 'is-invalid': errors.cardNumber }"
                  placeholder="1234 5678 9012 3456"
                  @input="formatCardNumber"
                  maxlength="19"
                  required
                  aria-describedby="cardNumberFeedback"
                  :aria-invalid="!!errors.cardNumber"
                />
                <span class="input-group-text">
                  <i :class="getCardIcon(cardType)" aria-hidden="true"></i>
                </span>
              </div>
              <div id="cardNumberFeedback" class="invalid-feedback">
                {{ errors.cardNumber }}
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label for="cardHolder" class="form-label">Cardholder Name</label>
              <input
                type="text"
                class="form-control"
                id="cardHolder"
                v-model="form.cardHolder"
                :class="{ 'is-invalid': errors.cardHolder }"
                placeholder="John Doe"
                required
                aria-describedby="cardHolderFeedback"
                :aria-invalid="!!errors.cardHolder"
              />
              <div id="cardHolderFeedback" class="invalid-feedback">
                {{ errors.cardHolder }}
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label for="expiryDate" class="form-label">Expiry Date</label>
              <input
                type="text"
                class="form-control"
                id="expiryDate"
                v-model="form.expiryDate"
                :class="{ 'is-invalid': errors.expiryDate }"
                placeholder="MM/YY"
                @input="formatExpiryDate"
                maxlength="5"
                required
                aria-describedby="expiryDateFeedback"
                :aria-invalid="!!errors.expiryDate"
              />
              <div id="expiryDateFeedback" class="invalid-feedback">
                {{ errors.expiryDate }}
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label for="cvv" class="form-label">CVV</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="cvv"
                  v-model="form.cvv"
                  :class="{ 'is-invalid': errors.cvv }"
                  placeholder="123"
                  @input="formatCVV"
                  maxlength="4"
                  required
                  aria-describedby="cvvFeedback"
                  :aria-invalid="!!errors.cvv"
                />
                <span class="input-group-text">
                  <i
                    class="fas fa-question-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="3 or 4 digit security code on the back of your card"
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
              <div id="cvvFeedback" class="invalid-feedback">
                {{ errors.cvv }}
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="form-group">
              <label for="amount" class="form-label">Payment Amount</label>
              <div class="input-group">
                <span class="input-group-text">$</span>
                <input
                  type="number"
                  class="form-control"
                  id="amount"
                  v-model="form.amount"
                  :class="{ 'is-invalid': errors.amount }"
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  required
                  aria-describedby="amountFeedback"
                  :aria-invalid="!!errors.amount"
                />
              </div>
              <div id="amountFeedback" class="invalid-feedback">
                {{ errors.amount }}
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="saveCard"
                v-model="form.saveCard"
                aria-describedby="saveCardHelp"
              />
              <label class="form-check-label" for="saveCard">
                Save card for future payments
              </label>
              <div id="saveCardHelp" class="form-text">
                Your card information will be securely stored for future use
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="isProcessing"
            aria-label="Submit payment"
          >
            <span
              v-if="isProcessing"
              class="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            >
              <span class="sr-only">Processing...</span>
            </span>
            {{ isProcessing ? 'Processing Payment...' : 'Submit Payment' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useBillingStore } from '@/stores/billing'
import {
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  validateAmount
} from '@/utils/validation'
import { handleApiError, handleApiSuccess } from '@/utils/apiErrorHandler'

const router = useRouter()
const toast = useToast()
const billingStore = useBillingStore()

const isProcessing = ref(false)
const errors = reactive({})

const form = reactive({
  cardNumber: '',
  cardHolder: '',
  expiryDate: '',
  cvv: '',
  amount: '',
  saveCard: false
})

const cardType = computed(() => {
  const number = form.cardNumber.replace(/\s/g, '')
  if (number.startsWith('4')) return 'visa'
  if (/^5[1-5]/.test(number)) return 'mastercard'
  if (/^3[47]/.test(number)) return 'amex'
  if (/^6(?:011|5)/.test(number)) return 'discover'
  return ''
})

const getCardIcon = (type) => {
  const icons = {
    visa: 'fab fa-cc-visa',
    mastercard: 'fab fa-cc-mastercard',
    amex: 'fab fa-cc-amex',
    discover: 'fab fa-cc-discover'
  }
  return icons[type] || 'far fa-credit-card'
}

const validateForm = () => {
  errors.cardNumber = validateCardNumber(form.cardNumber)
  errors.cardHolder = form.cardHolder.trim()
    ? ''
    : 'Please enter the cardholder name'
  errors.expiryDate = validateExpiryDate(form.expiryDate)
  errors.cvv = validateCVV(form.cvv)
  errors.amount = validateAmount(form.amount)

  return !Object.values(errors).some((error) => error)
}

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  value = value.replace(/(\d{4})/g, '$1 ').trim()
  form.cardNumber = value
}

const formatExpiryDate = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2)
  }
  form.expiryDate = value
}

const formatCVV = (event) => {
  form.cvv = event.target.value.replace(/\D/g, '')
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isProcessing.value = true
  try {
    const paymentData = {
      cardNumber: form.cardNumber.replace(/\s/g, ''),
      cardHolder: form.cardHolder,
      expiryDate: form.expiryDate,
      cvv: form.cvv,
      amount: parseFloat(form.amount),
      saveCard: form.saveCard
    }

    await billingStore.processPayment(paymentData)
    handleApiSuccess('Payment processed successfully')
    router.push('/billing/payment-success')
  } catch (err) {
    handleApiError(err, 'Failed to process payment')
  } finally {
    isProcessing.value = false
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.card-title {
  color: #2c3e50;
  font-weight: 600;
}

.form-label {
  font-weight: 500;
  color: #2c3e50;
}

.form-control:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.input-group-text {
  background-color: #f8f9fa;
  border-color: #ced4da;
}

.input-group .form-control {
  border-right: none;
}

.input-group .form-control:focus {
  border-right: none;
  box-shadow: none;
}

.form-check-label {
  color: #6c757d;
}

.form-text {
  font-size: 0.875rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

/* Add focus styles for keyboard navigation */
.form-control:focus-visible {
  outline: 2px solid #0d6efd;
  outline-offset: 2px;
}

/* Add hover styles */
.form-control:hover:not(:disabled) {
  border-color: #86b7fe;
}

/* Add transition effects */
.form-control,
.btn {
  transition: all 0.2s ease-in-out;
}
</style>
