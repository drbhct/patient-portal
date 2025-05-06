<template>
  <div class="mx-1">
    <div v-for="item in cardList" :key="item.id">
      <div class="row">
        <div class="col-12 col-lg-6 col-xl-6">
          <p>
            Name on Card: {{ item.nameOnAccount }} <br />
            Last 4: {{ formatAccountNo(item.accountNo) }}<br />
            Expires: {{ formatDate(item.expDate) }}
          </p>
        </div>
      </div>
      <div class="row padding-bottom-10">
        <div class="col-12 col-lg-6 col-xl-6">
          <button class="btn btn-primary btn-w-160" @click="remove(item)">
            REMOVE
          </button>
        </div>
      </div>
    </div>
    <div v-if="cardList.length === 0" class="text-center">
      No payment methods found.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBillingStore } from '@/stores/billing'
import { useToast } from 'vue-toastification'
import { useSweetAlert } from '@/composables/useSweetAlert'
import moment from 'moment'

const billingStore = useBillingStore()
const toast = useToast()
const swal = useSweetAlert()
const cardList = ref([])

const formatDate = (dateStr) => {
  return moment(dateStr).format('MM/DD/YYYY')
}

const formatAccountNo = (acctNo) => {
  const ccType = getCardType(acctNo)
  if (ccType === 'amex') {
    return 'XXXX-XXXXXX-' + acctNo.slice(-5)
  }
  return 'XXXX-XXXX-XXXX-' + acctNo.slice(-4)
}

const getCardType = (acctNo) => {
  if (!acctNo) return 'visa'
  if (acctNo.match(/^4/)) return 'visa'
  if (acctNo.match(/^(34|37)/)) return 'amex'
  if (acctNo.match(/^5[1-5]/)) return 'mastercard'
  if (acctNo.match(/^6011/)) return 'discover'
  if (acctNo.match(/^9792/)) return 'troy'
  return 'visa'
}

const remove = async (item) => {
  try {
    const result = await swal.fire({
      position: 'top-center',
      title: 'Are you sure you want to remove this card?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false
    })

    if (result.isConfirmed) {
      await removeCC(item)
    }
  } catch (error) {
    console.error('Error in remove:', error)
    toast.error('Failed to process remove request')
  }
}

const removeCC = async (item) => {
  try {
    await billingStore.deletePaymentMethod(item.id)
    await loadList()
    toast.success('Payment method removed successfully')
  } catch (error) {
    console.error('Error removing payment method:', error)
    toast.error('Failed to remove payment method')
  }
}

const loadList = async () => {
  try {
    const response = await billingStore.getPaymentMethods()
    cardList.value = response.data
  } catch (error) {
    console.error('Error loading payment methods:', error)
    toast.error('Failed to load payment methods')
  }
}

onMounted(() => {
  loadList()
})
</script>

<style scoped>
h4 {
  font-weight: 600 !important;
}
.btn-w-160 {
  width: 160px !important;
}
.padding-bottom-10 {
  padding-bottom: 10px;
}
</style>
