<template>
  <div>
    <div class="col-lg-12 mb-5">
      <!-- <h3>Fortis Payment Manual</h3> -->
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
import { mapGetters, mapActions } from 'vuex'
// eslint-disable-next-line no-unused-vars
import api from '../../api/http-common.js'

export default {
  data() {
    return {
      pubNubMsg: {
        channel: '',
        msg: []
      },
      fortisPaymentResult: null
    }
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
  methods: {
    ...mapActions(['setIsLoading']),
    async newPubnubMsg(msg) {
      try {
        this.setIsLoading(true)
        // const msgJson = JSON.parse(msg.message)
        console.log('msgJson', msg)

        // Check if can complete the transaction
        var canCompleteTransactionResponse = await api.patient.request.CheckPosTransactionComplete(
          {
            facilityId: this.currentPatientAssociated.facilityID,
            posId: this.fortisPaymentViaUrl.id
          }
        )
        if (!canCompleteTransactionResponse.data.value) {
          this.$swal({
            text: canCompleteTransactionResponse.data.reason,
            position: 'top-center',
            title: 'Payment',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'error'
          })
          return
        }

        var completeResponse = await api.patient.request.fortisTransactionComplete(
          {
            facilityId: this.currentPatientAssociated.facilityID,
            email: this.form.email,
            posId: this.fortisPaymentViaUrl.id,
            transactionId: this.fortisPaymentResult.data.id,
            taskId: this.form.taskId,
            patientId: this.currentPatientAssociated.patientID
          }
        )

        if (completeResponse.data.value) {
          this.$swal({
            text: completeResponse.data.reason,
            position: 'top-center',
            title: 'Payment',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'success'
          })
          setTimeout(() => {
            this.setIsLoading(false)
            this.$router.push('/')
          }, 1000)
        } else {
          this.$swal({
            text: completeResponse.data.reason,
            position: 'top-center',
            title: 'Payment Error',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'error'
          })
        }
      } catch (ex) {
        console.error(ex)
        this.$swal({
          text: 'Error occured unable to complete transaction',
          position: 'top-center',
          title: 'Error',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'error'
        })
      } finally {
        this.setIsLoading(false)
        const pnInstance = this.$pnGetInstance()
        pnInstance.unsubscribe({ channels: [this.fortisPaymentViaUrl.channel] })
      }
    }
  },
  async mounted() {
    // eslint-disable-next-line no-undef
    var elements = new Commerce.elements(fortisPaymentViaUrl.clientToken)
    elements.create({
      container: '#payment',
      theme: 'default'
    })
    elements.on('done', async result => {
      console.log('payment>done')
      console.log('resul>', result)
      this.fortisPaymentResult = result
      // Update transaction api Idd
      const updateTransactionId = await api.patient.request.UpdateFortisTransactionApiId(
        {
          facilityId: this.currentPatientAssociated.facilityID,
          posId: this.fortisPaymentViaUrl.id,
          transactionId: result.data.id
        }
      )

      console.log('updateTransactionId>', updateTransactionId)
      if (!updateTransactionId.data.value) {
        this.$swal({
          text: updateTransactionId.data.reason,
          position: 'top-center',
          title: 'UpdateFortisTransactionApiId Failed',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'error'
        })
        return
      }

      // Register pubnub channel
      const pnInstance = this.$pnGetInstance()

      pnInstance.subscribe({ channels: [this.fortisPaymentViaUrl.channel] })

      this.pubNubMsg.channel = this.fortisPaymentViaUrl.channel

      this.pubNubMsg.msg = this.$pnGetMessage(
        this.fortisPaymentViaUrl.channel,
        this.newPubnubMsg
      )
    })
  }
}
</script>
