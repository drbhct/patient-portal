<template>
  <div class="ml-3">
    <component v-bind:is="getBillingCurrentPage"></component>
  </div>
</template>

<script>
import Default from '../components/billing/BillingDefault.vue'
import MakePayment from '../components/billing/MakePayment.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Default,
    MakePayment
  },
  computed: {
    ...mapGetters(['getBillingCurrentPage'])
  },
  methods: {
    ...mapActions(['setBillingCurrentPage'])
  }
}
</script>

<style>

</style>
