<template>
  <div class="ml-3">
    <component v-bind:is="getBillingCurrentPage"></component>
  </div>
</template>

<script>
import Default from '../components/billing/BillingDefault.vue'
import MakePayment from '../components/billing/MakePayment.vue'
import MakePaymentSuccess from '../components/billing/MakePaymentSuccess.vue'
import { useBillingStore } from '@/stores/billing'

export default {
  name: 'BillingView',
  components: {
    Default,
    MakePayment,
    MakePaymentSuccess
  },
  computed: {
    billingStore() {
      return useBillingStore()
    }
  },
  methods: {
    billingStore: {
      setCurrentPage(page) {
        // Implementation of setCurrentPage method
      }
    }
  }
}
</script>

<style></style>
