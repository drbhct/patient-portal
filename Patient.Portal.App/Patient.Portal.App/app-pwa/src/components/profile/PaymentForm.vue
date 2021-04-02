<template>
  <form class="form-horizontal m-lg-4" @submit.prevent="saveInfo">
    <h3>Credit Card Information</h3>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="firstname">Name on card:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="inputDefault" v-model="form.nameOnAccount" required>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">Card Number</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="lastname" v-model="form.accountNo" v-mask="generateCardNumberMask" required>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">Expiration Date:</label>
      <div class="col-lg-2 col-xl-2 col-6">
        <select class="form-control" v-model="expMonth" required>
          <option disabled selected hidden value="">Month</option>
          <option v-for="month in monthList" :value="month.value" :key="month.text">{{ month.text }}</option>
        </select>
      </div>
      <div class="col-lg-2 col-xl-2 col-6">
        <select class="form-control" v-model="expYear" required>
          <option disabled selected hidden value="">Year</option>
          <option v-for="year in yearList" :value="year" :key="year">{{ year }}</option>
        </select>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">CVV/CID</label>
      <div class="col-lg-4 col-xl-4">
        <input type="number" class="form-control" id="cvv" v-model="cvv" required>
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
import api from '../../api/http-common.js'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
  data () {
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
  computed: {
    ...mapGetters(['getProfilePatientAssociated', 'currentPatientAssociated']),
    monthList () {
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
    yearList () {
      const currYear = new Date().getFullYear()
      const arr = []
      for (let index = 0; index < 10; index++) {
        arr.push(currYear + index)
      }
      return arr
    },
    getCardType () {
      const number = this.form.accountNo
      let re = new RegExp('^4')
      if (number.match(re) != null) return 'visa'

      re = new RegExp('^(34|37)')
      if (number.match(re) != null) return 'amex'

      re = new RegExp('^5[1-5]')
      if (number.match(re) != null) return 'mastercard'

      re = new RegExp('^6011')
      if (number.match(re) != null) return 'discover'

      re = new RegExp('^9792')
      if (number.match(re) != null) return 'troy'

      return 'visa' // default type
    },
    generateCardNumberMask () {
      return this.getCardType === 'amex' ? this.amexCardMask : this.otherCardMask
    }
  },
  methods: {
    ...mapActions(['setProfilePaymentCurrentPage']),
    async saveInfo () {
      const dateString = this.expMonth + '/1/' + this.expYear
      const expDate = new Date(dateString)

      expDate.setMonth(expDate.getMonth() + 1)
      expDate.setDate(expDate.getDate() - 1)

      if (this.getCardType === 'amex') {
        if (this.cvv.length === 4) {
          this.captureCardAlias(expDate)
        } else {
          this.$swal({
            position: 'top-center',
            title: 'Invalid CVV',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'error'
          })
        }
      } else {
        if (this.cvv.length === 3) {
          this.captureCardAlias(expDate)
        } else {
          this.$swal({
            position: 'top-center',
            title: 'Invalid CVV',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'error'
          })
        }
      }
    },
    async captureCardAlias (expDate) {
      const expireDate = moment(expDate).format('MMYY')

      const data = {
        facilityId: this.currentPatientAssociated.facilityID,
        patientId: this.currentPatientAssociated.patientID,
        nameOnCard: this.form.nameOnAccount,
        acctNum: this.form.accountNo.replace(/ /g, ''),
        expDate: expireDate,
        cardCode: this.cvv
      }

      const response = await api.patient.request.capturecardalias(data)
      if (response.data > 0) {
        this.paymentMethodID = response.data
        this.insertpaymentprofile(expDate)
      } else {
        this.$swal({
          position: 'top-center',
          title: 'Failed adding credit card details',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'error'
        })
      }
    },
    async insertpaymentprofile (expDate) {
      const acctNo = this.form.accountNo.replace(/ /g, '')
      const last4Digits = acctNo.substr(-4)
      this.form.accountNo = last4Digits
      this.form.expDate = expDate
      this.form.facilityId = this.currentPatientAssociated.facilityID
      this.form.patientId = this.currentPatientAssociated.patientID

      const response = await api.patient.request.insertpaymentprofile(this.form)
      if (response.data > 0) {
        this.$swal({
          position: 'top-center',
          title: 'Credit Card details added',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'success'
        })
      } else {
        this.$swal({
          position: 'top-center',
          title: 'Failed adding credit card details',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'error'
        })
      }

      this.setProfilePaymentCurrentPage('PaymentCardList')
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
  .btn-w-160 {
    width: 160px !important;
  }
</style>
