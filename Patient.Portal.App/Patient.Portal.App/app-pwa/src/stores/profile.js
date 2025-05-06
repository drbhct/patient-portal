import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProfileStore = defineStore('profile',
  () => {
  // State
    const currentProfilePageView = ref('MyInfo')
    const currentProfilePaymentView = ref('PaymentCardList')
    const profileAuthInfo = ref(null)
    const patientAssociated = ref(null)
    const currentPatient = ref(null)
    const facilityInfo = ref(null)

    // Getters
    const getCurrentView = computed(() => currentProfilePageView.value)
    const getCurrentPaymentView = computed(() => currentProfilePaymentView.value)
    const getAuthInfo = computed(() => profileAuthInfo.value)
    const getPatientAssociated = computed(() => patientAssociated.value)
    const getCurrentPatient = computed(() => currentPatient.value)
    const getFacilityInfo = computed(() => facilityInfo.value)

    // Actions
    const setCurrentView = (view) => {
      currentProfilePageView.value = view
    }

    const setCurrentPaymentView = (view) => {
      currentProfilePaymentView.value = view
    }

    const setAuthInfo = (info) => {
      profileAuthInfo.value = info
    }

    const updateMyInfo = (payload) => {
      if (!profileAuthInfo.value) return

      profileAuthInfo.value = {
        ...profileAuthInfo.value,
        firstName: payload.firstName,
        lastName: payload.lastName,
        nickName: payload.nickName,
        email: payload.email
      }
    }

    const setPatientAssociated = (patient) => {
      patientAssociated.value = patient
    }

    const setCurrentPatient = (patient) => {
      currentPatient.value = patient
    }

    const setFacilityInfo = (info) => {
      facilityInfo.value = info
    }
    return {
    // State
      currentProfilePageView,
      currentProfilePaymentView,
      profileAuthInfo,
      patientAssociated,
      currentPatient,
      facilityInfo,
      // Getters
      getCurrentView,
      getCurrentPaymentView,
      getAuthInfo,
      getPatientAssociated,
      getCurrentPatient,
      getFacilityInfo,
      // Actions
      setCurrentView,
      setCurrentPaymentView,
      setAuthInfo,
      updateMyInfo,
      setPatientAssociated,
      setCurrentPatient,
      setFacilityInfo
    }
  }, {
    persist: {
      key: 'profile',
      storage: localStorage,
      paths: ['profileAuthInfo', 'patientAssociated', 'currentPatient']
    }
  })
