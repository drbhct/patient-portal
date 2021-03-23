<template>
  <div class="mx-1">
    <div class="row">
      <div class="col-12 col-lg-6 col-xl-6">
        <h3 v-if="getProfilePaymentCurrentPage === 'PaymentCardList'">Payment Information</h3>
        <a v-if="getProfilePaymentCurrentPage === 'PaymentForm'" href="javascript:void(0)" @click="setProfilePaymentCurrentPage('PaymentCardList')">
          <i class="fas fa-angle-left"></i>
          Back to Payment Information
        </a>
      </div>
      <div class="col-6 col-lg-6 col-xl-6 d-none d-lg-block d-xl-block">
        <div class="float-right" v-if="getProfilePaymentCurrentPage === 'PaymentCardList'">
          <button class="btn btn-primary btn-w-160" @click="setProfilePaymentCurrentPage('PaymentForm')">ADD NEW</button>
        </div>
      </div>
    </div>
    <br>
    <div>
      <component v-bind:is="getProfilePaymentCurrentPage"></component>
    </div>
    <br />
    <div class="col-12 col-lg-6 col-xl-6 d-lg-none" v-if="getProfilePaymentCurrentPage === 'PaymentCardList'">
      <button class="btn btn-primary btn-w-100p" @click="setProfilePaymentCurrentPage('PaymentForm')">ADD NEW</button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import PaymentForm from './PaymentForm.vue'
import PaymentCardList from './PaymentCardList.vue'

export default {
  components: {
    PaymentForm,
    PaymentCardList
  },
  computed: {
    ...mapGetters(['getProfilePaymentCurrentPage'])
  },
  methods: {
    ...mapActions(['setProfilePaymentCurrentPage'])
  }
}
</script>
<style scoped>
h4 {
  font-weight: 600 !important;
}
.btn-w-160 {
  width: 160px !important;
}
.btn-w-100p {
  width: 100% !important;
}
</style>
