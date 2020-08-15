import * as types from '../mutation-types'

const state = {
  currentBillingPageView: 'MakePayment'
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
