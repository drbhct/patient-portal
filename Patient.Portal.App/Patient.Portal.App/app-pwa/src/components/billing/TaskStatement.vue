<!-- eslint-disable no-undef -->
<template>
  <div>
    <div class="modal fade" tabindex="-1" role="dialog" id="newCardModal">
      <div class="modal-dialog" role="document">
        <form @submit.prevent="diffCardPayment">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title label">Card Details</h5>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="nameOnCard">Name on Card</label>
                <input
                  class="form-control"
                  type="text"
                  name="nameOnCard"
                  id="nameOnCard"
                  v-model="otherCardForm.nameOnCard"
                  required
                />
              </div>
              <div class="form-group">
                <label for="accountNo">Account No.</label>
                <input
                  required
                  type="number"
                  name="accountNo"
                  id="accountNo"
                  class="form-control"
                  v-model="otherCardForm.acctNum"
                  maxlength="20"
                />
              </div>
              <div class="form-group">
                <div class="row form-group pb-3">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="col-form-label" for="formGroupExampleInput"
                        >Month</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder=""
                        maxlength="2"
                        v-model="otherCardForm.month"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="col-form-label">Year</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder=""
                        maxlength="2"
                        v-model="otherCardForm.year"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="cardCode">Card Code</label>
                <input
                  required
                  type="text"
                  name="cardCode"
                  id="cardCode"
                  class="form-control"
                  v-model="otherCardForm.cardCode"
                  maxlength="4"
                />
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="otherCardForm.saveAlias"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Save card for future use?
                  </label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="col-lg-12">
      <h2>
        Statement {{ statementInfo?.StatementDate }}
        <span
          title="Download File"
          class="ml-2"
          style="cursor: pointer"
          @click="viewFileInTab(statementInfo?.FileID)"
        >
          <i class="fa-solid fa-file-pdf"></i>
        </span>
      </h2>
      <div v-if="statementInfo" class="ml-3">
        <div class="row">
          <div class="d-inline p-1"><strong>Statement Date:</strong></div>
          <div class="d-inline p-1">
            {{ statementInfo.StatementDate }}
          </div>
        </div>
        <div class="row">
          <div class="d-inline p-1"><strong>Total Due:</strong></div>
          <div class="d-inline p-1">
            {{ evenRound(statementInfo.TotalDue, 2, 'money') }}
          </div>
        </div>
        <div class="row"></div>
      </div>
      <hr />
      <fieldset v-if="canProcess">
        <form class="col-lg-7" @submit.prevent="makePayment">
          <div class="row mb-1">
            <div class="col-lg-6">
              <label>Amount to Pay</label>
              <input
                type="number"
                step="0.01"
                class="form-control"
                placeholder="Enter Amount"
                required
                v-model="form.totalDue"
              />
            </div>
          </div>
          <div class="row mb-1">
            <div class="col-lg-6">
              <label>Email address for receipt</label>
              <input
                type="email"
                class="form-control"
                placeholder="Enter Email"
                required
                v-model="form.email"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <h5 v-if="creditCardList.length > 0">Select Payment Method</h5>
              <div
                v-for="(cc, index) in creditCardList"
                :key="index"
                @click="selectCard(cc)"
              >
                <div
                  class="credit-card"
                  :class="[
                    setCardClass(cc.paymentMethod),
                    { 'bg-success': cc.selected }
                  ]"
                >
                  <div class="credit-card-last4">
                    {{ displayAcctNo(cc.accountNo) }}
                  </div>
                  <div class="credit-card-expiry mt-2">
                    {{ displayCardExp(cc) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <hr />
            </div>
          </div>
          <div
            class="row justify-content-center mb-3"
            v-if="creditCardList.length >= 1"
          >
            <div class="col">
              <btn-saving
                :is-disabled="isDisabledPayment"
                :is-saving="isSaving"
                :loading-text="'Processing payment ...'"
                :display-text="'Make Payment'"
              />
            </div>
          </div>
        </form>
      </fieldset>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useBillingStore } from '../stores/billing'
import BtnSaving from '../components/button-saving.vue'

const router = useRouter()
const toast = useToast()
const billingStore = useBillingStore()

const statementInfo = ref(null)
const creditCardList = ref([])
const isSaving = ref(false)
const isDisabledPayment = ref(false)

const otherCardForm = ref({
  nameOnCard: '',
  acctNum: '',
  month: '',
  year: '',
  cardCode: '',
  saveAlias: false
})

const form = ref({
  totalDue: '',
  email: ''
})

const canProcess = computed(() => {
  return statementInfo.value && statementInfo.value.TotalDue > 0
})

const evenRound = (num, decimalPlaces, type) => {
  const d = decimalPlaces || 0
  const m = Math.pow(10, d)
  const n = +(d ? num * m : num).toFixed(8)
  const i = Math.floor(n)
  const f = n - i
  const e = 1e-8
  const r =
    f > 0.5 - e && f < 0.5 + e ? (i % 2 === 0 ? i : i + 1) : Math.round(n)
  return type === 'money' ? (r / m).toFixed(2) : r / m
}

const displayAcctNo = (accountNo) => {
  return `****${accountNo.slice(-4)}`
}

const displayCardExp = (card) => {
  return `${card.expMonth}/${card.expYear}`
}

const setCardClass = (paymentMethod) => {
  const method = paymentMethod.toLowerCase()
  if (method.includes('visa')) return 'bg-primary'
  if (method.includes('master')) return 'bg-danger'
  if (method.includes('amex')) return 'bg-success'
  if (method.includes('discover')) return 'bg-warning'
  return 'bg-secondary'
}

const selectCard = (card) => {
  creditCardList.value.forEach((cc) => {
    cc.selected = cc === card
  })
}

const viewFileInTab = (fileId) => {
  if (fileId) {
    window.open(`/api/documents/view/${fileId}`, '_blank')
  }
}

const makePayment = async () => {
  if (!form.value.totalDue || !form.value.email) {
    toast.error('Please fill in all required fields')
    return
  }

  const selectedCard = creditCardList.value.find((cc) => cc.selected)
  if (!selectedCard) {
    toast.error('Please select a payment method')
    return
  }

  isSaving.value = true
  isDisabledPayment.value = true

  try {
    await billingStore.processPayment({
      amount: form.value.totalDue,
      email: form.value.email,
      cardId: selectedCard.id
    })
    toast.success('Payment processed successfully')
    router.push('/billing/success')
  } catch (error) {
    console.error('Payment error:', error)
    toast.error('Failed to process payment')
  } finally {
    isSaving.value = false
    isDisabledPayment.value = false
  }
}

const diffCardPayment = async () => {
  if (!otherCardForm.value.nameOnCard || !otherCardForm.value.acctNum) {
    toast.error('Please fill in all required fields')
    return
  }

  isSaving.value = true
  isDisabledPayment.value = true

  try {
    await billingStore.processNewCardPayment({
      ...otherCardForm.value,
      amount: form.value.totalDue,
      email: form.value.email
    })
    toast.success('Payment processed successfully')
    router.push('/billing/success')
  } catch (error) {
    console.error('Payment error:', error)
    toast.error('Failed to process payment')
  } finally {
    isSaving.value = false
    isDisabledPayment.value = false
  }
}

onMounted(async () => {
  try {
    const [statement, cards] = await Promise.all([
      billingStore.getStatementInfo(),
      billingStore.getCreditCards()
    ])
    statementInfo.value = statement
    creditCardList.value = cards
  } catch (error) {
    console.error('Error loading data:', error)
    toast.error('Failed to load statement information')
  }
})
</script>

<style scoped>
.credit-card {
  padding: 1rem;
  border-radius: 0.5rem;
  color: white;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.credit-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.credit-card-last4 {
  font-size: 1.2rem;
  font-weight: bold;
}

.credit-card-expiry {
  font-size: 0.9rem;
}
</style>
