import * as types from '../mutation-types'

const state = {
  currentProfilePageView: 'MyInfo'
}

const mutations = {
  [types.CURRENT_PROFILE_PAGE_VIEW] (state, payload) {
    state.currentProfilePageView = payload
  }
}

export default {
  state,
  mutations
}
