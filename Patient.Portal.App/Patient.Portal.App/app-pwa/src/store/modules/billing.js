import * as types from '../mutation-types'

const state = {
  currentBillingPageView: 'Default',
  balanceDue: 0
}

const mutations = {
  [types.CURRENT_BILLING_PAGE_VIEW] (state, payload) {
    state.currentBillingPageView = payload
  },
  [types.BILLING_BALANCE_DUE] (state, payload) {
    state.balanceDue = payload
  }
}

export default {
  state,
  mutations
}
