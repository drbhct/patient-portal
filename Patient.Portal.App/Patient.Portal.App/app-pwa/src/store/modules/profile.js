import * as types from '../mutation-types'

const state = {
  currentProfilePageView: 'MyInfo',
  profileAuthInfo: null
}

const mutations = {
  [types.CURRENT_PROFILE_PAGE_VIEW] (state, payload) {
    state.currentProfilePageView = payload
  },
  [types.PROFILE_AUTH_INFO] (state, payload) {
    state.profileAuthInfo = payload
  },
  [types.PROFILE_MY_INFO] (state, payload) {
    state.profileAuthInfo.firstName = payload.firstName
    state.profileAuthInfo.lastName = payload.lastName
    state.profileAuthInfo.nickName = payload.nickName
    state.profileAuthInfo.email = payload.email
  }
}

export default {
  state,
  mutations
}
