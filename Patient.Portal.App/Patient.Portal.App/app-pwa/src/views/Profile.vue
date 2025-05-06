<template>
  <div class="form">
    <div class="col-12 col-md-12 col-lg-12 col-xl-12 col-align-center">
      <button
        @click="setProfileCurrentPage('MyInfo')"
        type="button"
        class="mb-4 mt-2 mr-2 btn btn-mar"
        v-bind:class="{ disabled: getProfileCurrentPage !== 'MyInfo' }"
      >
        <i class="fas fa-user fa-2x"></i>
        <span class="btn-title btn-w-65">Patient Info</span>
      </button>
      <button
        @click="setProfileCurrentPage('LoginInfo')"
        type="button"
        class="mb-4 mt-2 mr-2 btn btn-mar"
        v-bind:class="{ disabled: getProfileCurrentPage !== 'LoginInfo' }"
      >
        <i class="fas fa-lock fa-2x"></i>
        <span class="btn-title">Login Info</span>
      </button>
      <button
        @click="setProfileCurrentPage('CommInfo')"
        type="button"
        class="mb-4 mt-2 mr-2 btn btn-mar"
        v-bind:class="{ disabled: getProfileCurrentPage !== 'CommInfo' }"
      >
        <i class="fas fa-comments fa-2x"></i>
        <span class="btn-title">Comm Info</span>
      </button>
      <button
        @click="setProfileCurrentPage('PaymentInfo')"
        type="button"
        class="mb-4 mt-2 mr-2 btn btn-mar"
        v-if="canProcess"
        v-bind:class="{ disabled: getProfileCurrentPage !== 'PaymentInfo' }"
      >
        <i class="fas fa-dollar-sign fa-2x"></i>
        <span class="btn-title">Payment</span>
      </button>
    </div>
    <div class="col-12 col-lg-12 col-xl-12">
      <img
        class="dash-divider"
        src="/img/line-divider-transparent-1_edited.png"
      />
      <component v-bind:is="getProfileCurrentPage"></component>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import MyInfo from '../components/profile/ProfileInfo.vue'
import LoginInfo from '../components/profile/LoginInfo.vue'
import CommInfo from '../components/profile/CommInfo.vue'
import PaymentInfo from '../components/profile/PaymentInfo.vue'
import { useProfileStore } from '@/stores/profile'
import { useAuthStore } from '@/stores/auth'
import api from '../api/http-common.js'

// Component name is defined through the filename in Vue 3

// State
const profileInfo = ref(null)
const facilityInfo = ref(null)
const toast = useToast()

// Store access
const profileStore = useProfileStore()
const authStore = useAuthStore()

// Computed properties
const canProcess = computed(() => {
  if (!facilityInfo.value) {
    return false
  }

  return facilityInfo.value.openEdge || facilityInfo.value.fortis
})

const getProfileCurrentPage = computed(() => profileStore.getCurrentView)

// Methods
function setProfileCurrentPage(page) {
  profileStore.setCurrentView(page)
}

async function getPatient() {
  try {
    await profileStore.getPatient()
  } catch (error) {
    console.error('Error fetching patient:', error)
  }
}

async function updatePatient() {
  try {
    await profileStore.updatePatient(profileStore.currentPatient)
    toast.success('Profile updated successfully')
  } catch (error) {
    console.error('Error updating patient:', error)
    toast.error('Failed to update profile')
  }
}

// Lifecycle hooks
onMounted(async () => {
  facilityInfo.value = await api.auth.request.getFacilityInfo(
    profileStore.patientAssociated?.facilityID
  )
})
</script>
<style scoped>
.btn-w-65 {
  width: 65px !important;
}

.col-align-center {
  text-align: left !important;
}

.btn-mar {
  background-color: #990026;
  color: white;
  height: 80px;
  width: 90px;
  display: inline-grid;
  padding-top: 15px;
  text-align: center;
  border-radius: 4px;
  margin: 0 10px 0 10px;
}

.btn-title {
  font-size: 12px;
}

.dash-divider {
  width: 100%;
  height: 4px;
  margin-bottom: 10px;
  margin-top: 10px;
}

/* Mobile */
@media only screen and (max-width: 767px) {
  .col-align-center {
    text-align: center !important;
  }

  .btn-mar {
    background-color: #990026;
    color: white;
    height: 70px;
    width: 78px;
    display: inline-grid;
    padding-top: 10px;
    text-align: center;
    border-radius: 4px;
    margin: 0;
  }

  .btn-title {
    font-size: 11px;
    width: 60px;
    text-align: center;
  }
}

/* ----------- iPhone 5, 5S, 5C and 5SE ----------- */
@media only screen and (max-device-width: 320px) {
  .col-align-center {
    text-align: center !important;
  }

  .btn-mar {
    background-color: #990026;
    color: white;
    height: 60px;
    width: 64px;
    display: inline-grid;
    padding: 10px 0 0 0;
    text-align: center;
    border-radius: 4px;
    margin: 0;
  }

  .btn-title {
    font-size: 11px;
    width: 60px;
    text-align: center;
  }
}
</style>
