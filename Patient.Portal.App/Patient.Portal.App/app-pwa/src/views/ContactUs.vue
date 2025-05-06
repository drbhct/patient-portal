<template>
  <div class="pl-2 pr-2">
    <div class="row pt-4">
      <div class="col-12">
        <h3>Contact Us</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12 pt-4">
        <div class="row">
          <label class="col-4 col-md-4 col-xl-2 col-lg-3 text-right f-title"
            >Office Name:</label
          >
          <label class="col-8 col-md-6 col-xl-6 col-lg-6 text-left f-desc">{{
            facilityInfo.officeName
          }}</label>
        </div>
        <div class="row">
          <label class="col-4 col-md-4 col-xl-2 col-lg-3 text-right f-title"
            >Address:</label
          >
          <label class="col-8 col-md-6 col-xl-6 col-lg-6 text-left f-desc">{{
            facilityInfo.address
          }}</label>
        </div>
        <div class="row" v-if="facilityInfo.address2.length > 0">
          <label class="col-4 col-md-4 col-xl-2 col-lg-3 text-right f-title"
            >Address 2:</label
          >
          <label class="col-8 col-md-6 col-xl-6 col-lg-6 text-left f-desc">{{
            facilityInfo.address2
          }}</label>
        </div>
        <div class="row">
          <label class="col-4 col-md-4 col-xl-2 col-lg-3 text-right f-title"
            >City:</label
          >
          <label
            class="col-8 col-md-6 col-xl-6 col-lg-6 text-left pt-2 f-desc"
            >{{ facilityInfo.city }}</label
          >
        </div>
        <div class="row">
          <label class="col-4 col-md-4 col-xl-2 col-lg-3 text-right f-title"
            >State:</label
          >
          <label class="col-8 col-md-6 col-xl-6 col-lg-6 text-left f-desc">{{
            facilityInfo.state
          }}</label>
        </div>
        <div class="row">
          <label class="col-4 col-md-4 col-xl-2 col-lg-3 text-right f-title"
            >Zip:</label
          >
          <label class="col-8 col-md-6 col-xl-6 col-lg-6 text-left f-desc">{{
            facilityInfo.zip
          }}</label>
        </div>
        <div class="row">
          <label class="col-4 col-md-4 col-xl-2 col-lg-3 text-right f-title"
            >Phone:</label
          >
          <input
            v-show="false"
            type="text"
            v-model="facilityInfo.phone"
            v-mask="'(###) ###-####'"
          />
          <label
            class="col-8 col-md-6 col-xl-6 col-lg-6 control-label text-left f-desc"
            v-mask="'(###) ###-####'"
            >{{ facilityInfo.phone }}</label
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import api from '../api/http-common.js'
import { useProfileStore } from '@/stores/profile'
import { useContactStore } from '@/stores/contact'

// State
const facilityInfo = ref(null)
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Store access
const profileStore = useProfileStore()
const contactStore = useContactStore()
const toast = useToast()

// Computed properties
const currentPatientAssociated = computed(() => profileStore.patientAssociated)

// Methods
async function submitForm() {
  try {
    await contactStore.submitContactForm(form.value)
    toast.success('Message sent successfully')
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    toast.error('Failed to send message')
  }
}

// Lifecycle hooks
onMounted(async () => {
  facilityInfo.value = await api.auth.request.getFacilityInfo(
    currentPatientAssociated.value?.facilityID
  )
})
</script>
<style scoped>
.f-title {
  font-weight: 600;
  font-size: 16px;
}
.f-desc {
  font-weight: 500;
  font-size: 16px;
}
/* ----------- iPhone Plus ----------- */
@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) {
  .f-title {
    font-weight: 500;
    font-size: 14px;
  }

  .f-desc {
    font-weight: 400;
    font-size: 14px;
  }
}
</style>
