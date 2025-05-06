<template>
  <div class="container mt-5 pt-5">
    <div class="col-lg-12 mb-5 mt-5">
      <h4 class="text-center" v-if="isPaymentComplete">
        Payment complete. You may now close the page
      </h4>
      <div id="payment">
        <!-- Elements will create input elements here -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useSweetAlert } from '@/composables/useSweetAlert'
import { useBillingStore } from '@/stores/billing'
import { useProfileStore } from '@/stores/profile'
import { useConfigStore } from '@/stores/config'

// Store setup
const billingStore = useBillingStore()
const profileStore = useProfileStore()
const configStore = useConfigStore()

// Composables
const toast = useToast()
const swal = useSweetAlert()

// Component state
const isPaymentComplete = ref(false)
const fortisPaymentResult = ref(null)
const pubNubMsg = ref({
  channel: '',
  msg: []
})

// Payment processing
const handlePaymentComplete = async (result) => {
  console.log('payment>done', result)

  try {
    configStore.setLoading(true)
    fortisPaymentResult.value = result
    pubNubMsg.value.channel = billingStore.getFortisPaymentViaUrl.channel

    // Update transaction API ID
    await billingStore.updateFortisTransactionApiId({
      facilityId: profileStore.getPatientAssociated.facilityID,
      posId: billingStore.getFortisPaymentViaUrl.id,
      transactionId: result.data.id
    })

    // Complete the transaction
    const completeResponse = await billingStore.completeFortisTransaction({
      facilityId: profileStore.getPatientAssociated.facilityID,
      email: billingStore.getFortisPaymentForm.email,
      posId: billingStore.getFortisPaymentViaUrl.id,
      transactionId: fortisPaymentResult.value.data.id,
      taskId: billingStore.getFortisPaymentForm.taskId,
      patientId: profileStore.getPatientAssociated.patientID
    })

    if (!completeResponse.data.value) {
      await swal.fire({
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

    await swal.fire({
      text: completeResponse.data.reason,
      position: 'top-center',
      title: 'Payment Successful',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2000,
      icon: 'success'
    })

    // Publish completion message
    window.$pnPublish(
      {
        channel: `${billingStore.getFortisPaymentViaUrl.channel}-done`,
        message: Date.now()
      },
      (status, response) => {
        console.log(
          'publish>',
          `${billingStore.getFortisPaymentViaUrl.channel}-done`,
          status,
          response
        )
      }
    )
  } catch (error) {
    console.error('Error processing payment:', error)
    toast.error('Failed to process payment')
  } finally {
    configStore.setLoading(false)
    isPaymentComplete.value = true
  }
}

// Initialize Fortis Elements
const initializeFortisElements = () => {
  // eslint-disable-next-line no-undef
  const elements = new Commerce.Elements(
    billingStore.getFortisPaymentViaUrl.clientToken
  )

  elements.create({
    container: '#payment',
    environment: billingStore.getFortisPaymentViaUrl.environment,
    theme: 'default',
    digitalWallets: [],
    fields: {
      billing: [
        { name: 'address', required: true },
        { name: 'postal_code', required: true }
      ]
    }
  })

  elements.on('done', handlePaymentComplete)
}

onMounted(() => {
  initializeFortisElements()
})
</script>
