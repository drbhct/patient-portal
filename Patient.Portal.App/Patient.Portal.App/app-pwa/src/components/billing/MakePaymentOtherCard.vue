<template>
  <form class="my-5 col-lg-7" @submit.prevent="submitPayment">
    <div class="form-group row">
      <div class="col-lg-3">
        <label>Card number</label>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-6">
        <input
          type="number"
          class="form-control"
          min="0"
          v-model="payment.cardNum"
          required
        />
      </div>
    </div>

    <div class="form-group row">
      <div class="col-lg-3">
        <label>Expiration Date</label>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-3 mx-1 my-1">
        <select class="form-control" v-model="payment.expireMonth" required>
          <option disabled selected hidden value="">Month</option>
          <option
            v-for="month in monthList"
            :value="month.value"
            :key="month.text"
          >
            {{ month.text }}
          </option>
        </select>
      </div>
      <div class="col-lg-3 mx-1 my-1">
        <select class="form-control" v-model="payment.expireYear" required>
          <option disabled selected hidden value="">Year</option>
          <option v-for="year in yearList" :value="year" :key="year">
            {{ year }}
          </option>
        </select>
      </div>
    </div>

    <div class="form-group row">
      <div class="col-lg-3">
        <label>CVC (Security Code)</label>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-6">
        <input
          type="text"
          class="form-control"
          v-model="payment.cvc"
          required
        />
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
          class="form-control"
          placeholder="Enter Amount"
          v-model="payment.amount"
          step="0.01"
        />
      </div>
    </div>

    <div class="form-group row">
      <div class="col-lg-5">
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            v-model="payment.saveInfo"
          />
          <label class="form-check-label"
            >Save to available payment methods?</label
          >
        </div>
      </div>
    </div>

    <div class="form-group row">
      <div class="col-lg-6 mx-1 my-1">
        <button class="btn btn-primary btn-lg btn-block">MAKE PAYMENT</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useBillingStore } from '@/stores/billing'
import { handleApiError, handleApiSuccess } from '@/utils/apiErrorHandler'

const router = useRouter()
const toast = useToast()
const billingStore = useBillingStore()

const payment = ref({
  cardNum: '',
  cvc: '',
  expireMonth: '',
  expireYear: '',
  saveInfo: false,
  amount: ''
})

const monthList = computed(() => {
  return Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    text: new Date(2000, i).toLocaleString('default', { month: 'long' })
  }))
})

const yearList = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 10 }, (_, i) => currentYear + i)
})

const submitPayment = async () => {
  if (
    !payment.value.cardNum ||
    !payment.value.cvc ||
    !payment.value.expireMonth ||
    !payment.value.expireYear
  ) {
    toast.error('Please fill in all required fields')
    return
  }

  try {
    await billingStore.processNewCardPayment({
      nameOnCard: payment.value.cardNum,
      acctNum: payment.value.cardNum,
      month: payment.value.expireMonth,
      year: payment.value.expireYear,
      cardCode: payment.value.cvc,
      saveAlias: payment.value.saveInfo,
      amount: payment.value.amount
    })
    handleApiSuccess('Payment processed successfully')
    router.push('/billing/success')
  } catch (err) {
    handleApiError(err, 'Failed to process payment')
  }
}

onMounted(() => {
  payment.value.amount = billingStore.getStatementInfo?.TotalDue || 0
})
</script>

<style scoped>
.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
