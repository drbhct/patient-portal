import * as types from '../mutation-types'

const state = {
  currentBillingPageView: 'Default'
}

const mutations = {
  [types.CURRENT_BILLING_PAGE_VIEW] (state, payload) {
    state.currentBillingPageView = payload
  }
}

export default {
  state,
  mutations
}
