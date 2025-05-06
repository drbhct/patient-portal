<template>
  <div class="mx-1">
    <a href="javascript:void(0)" @click="setBillingCurrentPage('Default')">
      <i class="fas fa-angle-left"></i>
      Back to Billing Statement
    </a>
    <div class="col-lg-12">
      <h2>Statement 123456</h2>
      <form
        class="my-5 col-lg-7"
        @submit.prevent="submitPayment"
        v-if="!useOtherCard"
      >
        <div class="form-group row">
          <div class="col-lg-3">
            <label>Select Payment Method</label>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-6 mx-1 my-1">
            <select class="form-control" v-model="selectedCard" required>
              <option disabled selected hidden value="">Select Card</option>
              <option
                v-for="card in creditCards"
                :key="card.id"
                :value="card.id"
              >
                {{ card.type }} ({{ card.expMonth }}/{{ card.expYear }}) -
                {{ card.last4 }}
              </option>
            </select>
          </div>
          <div class="col-lg-5 mx-1 my-1">
            <button
              class="btn btn-default btn-lg btn-block"
              @click="showOtherCard"
            >
              Pay with different card
            </button>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-3">
            <label>Amount</label>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-6">
            <input
              type="number"
              step="0.01"
              class="form-control"
              placeholder="Enter Amount"
              v-model="payment.amount"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-6 mx-1 my-1">
            <button class="btn btn-primary btn-lg btn-block">
              MAKE PAYMENT
            </button>
          </div>
        </div>
      </form>
      <other-card v-if="useOtherCard"></other-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useBillingStore } from '@/stores/billing'
import OtherCard from './MakePaymentOtherCard.vue'
const toast = useToast()
const billingStore = useBillingStore()

const useOtherCard = ref(false)
const selectedCard = ref('')
const payment = ref({
  amount: 0
})

const creditCards = ref([])

const setBillingCurrentPage = (page) => {
  billingStore.setCurrentView(page)
}

const submitPayment = async () => {
  if (!selectedCard.value) {
    toast.error('Please select a payment method')
    return
  }

  try {
    await billingStore.processPayment({
      amount: payment.value.amount,
      cardId: selectedCard.value
    })
    setBillingCurrentPage('MakePaymentSuccess')
  } catch (error) {
    console.error('Payment error:', error)
    toast.error('Failed to process payment')
  }
}

const showOtherCard = () => {
  useOtherCard.value = true
}

onMounted(async () => {
  try {
    const cards = await billingStore.getCreditCards()
    creditCards.value = cards
    payment.value.amount = billingStore.getStatementInfo?.TotalDue || 0
  } catch (error) {
    console.error('Error loading cards:', error)
    toast.error('Failed to load payment methods')
  }
})
</script>
