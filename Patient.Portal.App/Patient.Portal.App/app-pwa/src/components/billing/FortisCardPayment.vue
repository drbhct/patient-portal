<template>
  <div class="container mt-5 pt-5">
    <div class="col-lg-12 mb-5 mt-5">
      <h4 class="text-center" v-if="close">
        Payment complete. You may now close the page
      </h4>
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
      fortisPaymentResult: null,
      close: false
    }
  },
  computed: {
    ...mapGetters([
      'currentPatientAssociated',
      'getBillingTaskStatement',
      'getProfileAuthInfo',
      'getFacilityInfo',
      'getFortisPaymentForm',
      'getFortisStatementInfo',
      'getFortisPaymentViaUrl'
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
            posId: this.getFortisPaymentViaUrl.id
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
            email: this.getFortisPaymentForm.email,
            posId: this.getFortisPaymentViaUrl.id,
            transactionId: this.fortisPaymentResult.data.id,
            taskId: this.getFortisPaymentForm.taskId,
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
            title: 'Payment Unsuccessful. Please try again',
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

        this.$pnPublish(
          {
            channel: this.getFortisPaymentViaUrl.channel + '-done',
            message: Date.now()
          },
          (status, response) => {
            console.log('publish>')
            console.log(status, response)
          }
        )

        // unsubsribe pubnub channel to freeup
        const pnInstance = this.$pnGetInstance()
        pnInstance.unsubscribe({
          channels: [this.getFortisPaymentViaUrl.channel]
        })
      }
    }
  },
  async mounted() {
    // eslint-disable-next-line no-undef
    var elements = new Commerce.elements(
      this.getFortisPaymentViaUrl.clientToken
    )
    elements.create({
      container: '#payment',
      theme: 'default',
      digitalWallets: [],
      fields: {
        billing: [
          { name: 'address', required: true },
          { name: 'postal_code', required: true }
        ]
      }
    })
    elements.on('done', async result => {
      console.log('payment>done')
      console.log('resul>', result)
      this.fortisPaymentResult = result
      // Update transaction api Id
      const updateTransactionId = await api.patient.request.UpdateFortisTransactionApiId(
        {
          facilityId: this.currentPatientAssociated.facilityID,
          posId: this.getFortisPaymentViaUrl.id,
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

      this.pubNubMsg.channel = this.getFortisPaymentViaUrl.channel

      this.pubNubMsg.msg = this.$pnGetMessage(
        this.getFortisPaymentViaUrl.channel,
        this.newPubnubMsg
      )

      this.close = true
    })
  }
}
</script>
