<template>
  <div class="mx-1">
    <a href="javascript:void(0)" @click="setBillingCurrentPage('Default')">
      <i class="fas fa-angle-left"></i>
      Back to BIlling Statement
    </a>
    <div class="col-lg-12">
      <h2>Statement 123456</h2>
      <form class="my-5 col-lg-7" @submit.prevent="submitPayment" v-if="!useOtherCard">
        <div class="form-group row">
          <div class="col-lg-3">
            <label>Select Payment Method</label>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-6 mx-1 my-1">
            <select class="form-control" v-model="selectedCard" required>
              <option disabled selected hidden value="">Select Card</option>
              <option>VISA (02/22) - 4212</option>
              <option>MASTERCARD (05/25) - 5433</option>
            </select>
          </div>
          <div class="col-lg-5 mx-1 my-1">
            <button
              class="btn btn-default btn-lg btn-block"
              @click="showOtherCard"
            >Pay with different card</button>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-3">
            <label>Amount</label>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-6">
            <input type="number" step="0.01" class="form-control" placeholder="Enter Amount" v-model="payment.amount" required/>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-6 mx-1 my-1">
            <button class="btn btn-primary btn-lg btn-block">MAKE PAYMENT</button>
          </div>
        </div>
      </form>
      <other-card v-if="useOtherCard"></other-card>
    </div>
  </div>
</template>

<script>
import OtherCard from './MakePaymentOtherCard.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    OtherCard
  },
  data () {
    return {
      useOtherCard: false,
      saveOtherCard: false,
      selectedCard: '',
      payment: {
        cardNum: '',
        cvc: '',
        expireMonth: '',
        expireYear: '',
        saveInfo: false,
        amount: 0
      }
    }
  },
  computed: {
    ...mapGetters(['getBillingBalanceDue'])
  },
  methods: {
    ...mapActions(['setBillingCurrentPage']),
    submitPayment () {
      this.setBillingCurrentPage('MakePaymentSuccess')
    },
    showOtherCard () {
      this.useOtherCard = true
    }
  },
  mounted () {
    this.payment.amount = this.getBillingBalanceDue
  }
}
</script>
