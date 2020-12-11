<template>
  <div class="mx-1">
    <div v-for="item in cardlist" :key="item.id">
      <div class="row">
        <div class="col-12 col-lg-6 col-xl-6">
          <p>
            Name on Card: {{ item.nameOnAccount }} <br />
            Last 4: {{ accountNo(item.accountNo) }}<br />
            Expires: {{ date(item.expDate) }}
          </p>
        </div>
      </div>
      <div class="row padding-bottom-10">
        <div class="col-12 col-lg-6 col-xl-6">
          <button class="btn btn-primary btn-w-160">REMOVE</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../api/http-common.js'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  components: {
  },
  data () {
    return {
      cardlist: []
    }
  },
  computed: {
    ...mapGetters(['getProfilePatientAssociated']),
    currentPatientAssociated () {
      if (this.getProfilePatientAssociated.length === 0) {
        return null
      }
      return this.getProfilePatientAssociated[0]
    }
  },
  methods: {
    date: function (date) {
      return moment(date).format('MM/DD/YYYY')
    },
    accountNo: function (acctNo) {
      const ccType = this.getCardType(acctNo)
      if (ccType === 'amex') {
        return 'XXXX-XXXXXX-' + acctNo.substr(-5)
      } else {
        return 'XXXX-XXXX-XXXX-' + acctNo.substr(-4)
      }
    },
    getCardType (acctNo) {
      const number = acctNo
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
  async mounted () {
    const res = await api.patient.request.getpaymentprofilelist({
      facilityid: this.currentPatientAssociated.facilityID,
      id: this.currentPatientAssociated.patientID
    })

    this.cardlist = res.data
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
  .padding-bottom-10 {
    padding-bottom: 10px;
  }
</style>
