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
    ...mapActions(['setIsLoading'])
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

      try {
        this.pubNubMsg.channel = this.getFortisPaymentViaUrl.channel

        this.fortisPaymentResult = result

        // Update transaction api Id
        await api.patient.request.UpdateFortisTransactionApiId({
          facilityId: this.currentPatientAssociated.facilityID,
          posId: this.getFortisPaymentViaUrl.id,
          transactionId: result.data.id
        })

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

        if (!completeResponse.data.value) {
          this.$swal({
            text: completeResponse.data.reason,
            position: 'top-center',
            title: 'Payment Unsuccessful. Please try again',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'error'
          })
          return
        }

        this.$swal({
          text: completeResponse.data.reason,
          position: 'top-center',
          title: 'Payment',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'success'
        })
        this.$pnPublish(
          {
            channel: this.getFortisPaymentViaUrl.channel + '-done',
            message: Date.now()
          },
          (status, response) => {
            console.log(
              'publish>' + this.getFortisPaymentViaUrl.channel + '-done'
            )
            console.log(status, response)
          }
        )
        this.close = true
      } catch (ex) {
      } finally {
      }
    })
  }
}
</script>
