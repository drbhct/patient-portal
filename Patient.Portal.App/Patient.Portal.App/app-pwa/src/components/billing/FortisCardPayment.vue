<template>
  <div>
    <div class="col-lg-12 mb-5">
      <h3>Fortis Payment Manual</h3>
      <div class="form-group-row">
        <h4>Notify the Recipient</h4>
      </div>
      <div class="form-group row">
        <div class="col-lg-3">
          <label>Email address for receipt</label>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-lg-6">
          <input
            type="email"
            class="form-control"
            placeholder="Enter Email"
            required
            v-model="form.email"
          />
        </div>
      </div>
      <div id="payment">
        <!-- Elements will create input elements here -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
import api from '../../api/http-common.js'

export default {
  data() {
    return {}
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    statementInfo: {
      type: Object,
      required: true
    },
    fortisPaymentViaUrl: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'currentPatientAssociated',
      'getBillingTaskStatement',
      'getProfileAuthInfo',
      'getFacilityInfo'
    ])
  },
  async mounted() {
    const payload = {
      facilityId: this.currentPatientAssociated.facilityID,
      patientId: this.currentPatientAssociated.patientID,
      amount: this.form.totalDue,
      email: this.form.email,
      statementBatchID: this.statementInfo.StatementBatchID,
      taskId: this.form.taskId
    }
    var paymentUrlResponse = await api.patient.request.getFortisTransactionUrl(
      payload
    )
    // console.log(paymentUrlResponse)

    // eslint-disable-next-line no-undef
    var elements = new Commerce.elements(paymentUrlResponse.data.clientToken)
    elements.create({
      container: '#payment',
      theme: 'default'
    })
    elements.on('paymentFinished', async result => {
      console.log('paymentFinished...')
      console.log('paymentFinished>', result)
      if (result.status === 'approved') {
        // Transaction approved
        await api.patient.request.fortisTransactionComplete({
          facilityId: this.currentPatientAssociated.facilityID,
          email: this.form.email,
          id: this.fortisPaymentViaUrl.id,
          transactionId: result.data.id
        })
        this.$swal({
          text: 'Transaction complete',
          position: 'top-center',
          title: 'Payment',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'success'
        })
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      } else {
        // Transaction declined, voided, refunded...
        this.$swal({
          text: 'Unable to complete the transaction',
          position: 'top-center',
          title: 'Transaction unsuccessful',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'success'
        })
      }
    })
    console.log('fortis card payment initialize ...')
  }
}
</script>
