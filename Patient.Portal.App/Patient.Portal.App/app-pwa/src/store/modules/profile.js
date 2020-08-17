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
  }
}

export default {
  state,
  mutations
}
