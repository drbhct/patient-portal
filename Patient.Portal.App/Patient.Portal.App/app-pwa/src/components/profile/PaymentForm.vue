<template>
  <form class="form-horizontal m-lg-4" @submit.prevent="saveInfo">
    <h3>Credit Card Information</h3>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="firstname"
        >Name on card:</label
      >
      <div class="col-lg-4 col-xl-4">
        <input
          type="text"
          class="form-control"
          id="inputDefault"
          v-model="form.nameOnAccount"
          required
        />
      </div>
    </div>
    <div class="form-group row">
      <label
        class="col-lg-2 control-label text-lg-right pt-2"
        for="inputDefault"
        >Card Number</label
      >
      <div class="col-lg-4 col-xl-4">
        <input
          type="text"
          class="form-control"
          id="lastname"
          v-model="form.accountNo"
          v-mask="generateCardNumberMask"
          required
        />
      </div>
    </div>
    <div class="form-group row">
      <label
        class="col-lg-2 control-label text-lg-right pt-2"
        for="inputDefault"
        >Expiration Date:</label
      >
      <div class="col-lg-2 col-xl-2 col-6">
        <select class="form-control" v-model="expMonth" required>
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
      <div class="col-lg-2 col-xl-2 col-6">
        <select class="form-control" v-model="expYear" required>
          <option disabled selected hidden value="">Year</option>
          <option v-for="year in yearList" :value="year" :key="year">
            {{ year }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group row">
      <label
        class="col-lg-2 control-label text-lg-right pt-2"
        for="inputDefault"
        >CVV/CID</label
      >
      <div class="col-lg-4 col-xl-4">
        <input
          type="number"
          class="form-control"
          id="cvv"
          v-model="cvv"
          required
        />
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-2"></div>
      <div class="col-lg-4 col-xl-4">
        <button class="btn btn-primary btn-w-160" type="submit">SAVE</button>
      </div>
    </div>
  </form>
</template>
<script>
import { useProfileStore } from '@/stores/profile'
import { useBillingStore } from '@/stores/billing'
import { storeToRefs } from 'pinia'

export default {
  data() {
    return {
      form: {
        id: '',
        nameOnAccount: '',
        accountNo: '',
        expDate: '',
        routeNo: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        merchantPaymentMethodID: '',
        paymentMethodID: 0,
        paymentMethod: ''
      },
      expMonth: '',
      expYear: '',
      cvv: '',
      amexCardMask: '#### ###### #####',
      otherCardMask: '#### #### #### ####'
    }
  },
  setup() {
    const profileStore = useProfileStore()
    const billingStore = useBillingStore()
    const { getProfilePatientAssociated, currentPatientAssociated } =
      storeToRefs(profileStore)

    return {
      profileStore,
      billingStore,
      getProfilePatientAssociated,
      currentPatientAssociated
    }
  },
  computed: {
    monthList() {
      return [
        { text: 'Jan', value: 1 },
        { text: 'Feb', value: 2 },
        { text: 'Mar', value: 3 },
        { text: 'Apr', value: 4 },
        { text: 'May', value: 5 },
        { text: 'Jun', value: 6 },
        { text: 'Jul', value: 7 },
        { text: 'Aug', value: 8 },
        { text: 'Sep', value: 9 },
        { text: 'Oct', value: 10 },
        { text: 'Nov', value: 11 },
        { text: 'Dec', value: 12 }
      ]
    },
    yearList() {
      const currYear = new Date().getFullYear()
      const arr = []
      for (let index = 0; index < 10; index++) {
        arr.push(currYear + index)
      }
      return arr
    },
    getCardType() {
      const number = this.form.accountNo
      if (number.match(/^4/)) return 'visa'
      if (number.match(/^(34|37)/)) return 'amex'
      if (number.match(/^5[1-5]/)) return 'mastercard'
      if (number.match(/^6011/)) return 'discover'
      if (number.match(/^9792/)) return 'troy'
      return 'visa' // default type
    },
    generateCardNumberMask() {
      return this.getCardType === 'amex'
        ? this.amexCardMask
        : this.otherCardMask
    }
  },
  methods: {
    setProfilePaymentCurrentPage(page) {
      this.profileStore.setProfilePaymentCurrentPage(page)
    },
    async saveInfo() {
      try {
        await this.billingStore.savePaymentInfo(this.form)
        this.$toast.success('Payment information saved successfully')
      } catch (error) {
        console.error('Error saving payment info:', error)
        this.$toast.error('Failed to save payment information')
      }
    },
    async captureCardAlias(expDate) {
      try {
        const response = await this.billingStore.captureCardAlias({
          cardNumber: this.form.accountNo,
          expDate
        })
        return response.data
      } catch (error) {
        console.error('Error capturing card alias:', error)
        throw error
      }
    },
    async insertpaymentprofile(expDate) {
      try {
        const cardAlias = await this.captureCardAlias(expDate)
        await this.billingStore.insertPaymentProfile({
          cardAlias,
          expDate
        })
        this.$toast.success('Payment profile created successfully')
      } catch (error) {
        console.error('Error inserting payment profile:', error)
        this.$toast.error('Failed to create payment profile')
      }
    }
  },
  mounted() {}
}
</script>
<style scoped>
.btn-w-160 {
  width: 160px !important;
}
</style>
