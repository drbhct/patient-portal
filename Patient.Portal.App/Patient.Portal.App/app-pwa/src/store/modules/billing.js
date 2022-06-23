import * as types from '../mutation-types'

const state = {
  currentBillingPageView: 'Default',
  balanceDue: 0,
  taskStatement: null
}

const mutations = {
  [types.CURRENT_BILLING_PAGE_VIEW] (state, payload) {
    state.currentBillingPageView = payload
  },
  [types.BILLING_BALANCE_DUE] (state, payload) {
    state.balanceDue = payload
  },
  [types.BILLING_TASK_STATEMENT] (state, payload) {
    state.taskStatement = payload
  }
}

export default {
  state,
  mutations
}
