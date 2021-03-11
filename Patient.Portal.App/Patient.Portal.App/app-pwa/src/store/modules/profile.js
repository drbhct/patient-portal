import * as types from '../mutation-types'

const state = {
  currentProfilePageView: 'MyInfo',
  currentProfilePaymentView: 'PaymentCardList',
  profileAuthInfo: null,
  patientAssociated: null
}

const mutations = {
  [types.CURRENT_PROFILE_PAGE_VIEW] (state, payload) {
    state.currentProfilePageView = payload
  },
  [types.CURRENT_PROFILE_PAYMENT_VIEW] (state, payload) {
    state.currentProfilePaymentView = payload
  },
  [types.PROFILE_AUTH_INFO] (state, payload) {
    state.profileAuthInfo = payload
  },
  [types.PROFILE_MY_INFO] (state, payload) {
    state.profileAuthInfo.firstName = payload.firstName
    state.profileAuthInfo.lastName = payload.lastName
    state.profileAuthInfo.nickName = payload.nickName
    state.profileAuthInfo.email = payload.email
  },
  [types.PROFILE_PATIENT_ASSOCIATED] (state, payload) {
    state.patientAssociated = payload
  }
}

export default {
  state,
  mutations
}
