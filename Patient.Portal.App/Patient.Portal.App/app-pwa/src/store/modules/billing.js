import * as types from '../mutation-types'

const state = {
  currentBillingPageView: 'Default',
  balanceDue: 0,
  taskStatement: null,
  fortisPaymentForm: null,
  fortisStatementInfo: null,
  fortisPaymentViaUrl: null
}

const mutations = {
  [types.CURRENT_BILLING_PAGE_VIEW](state, payload) {
    state.currentBillingPageView = payload
  },
  [types.BILLING_BALANCE_DUE](state, payload) {
    state.balanceDue = payload
  },
  [types.BILLING_TASK_STATEMENT](state, payload) {
    state.taskStatement = payload
  },
  [types.FORTIS_PAYMENT_FORM](state, payload) {
    state.fortisPaymentForm = payload
  },
  [types.FORTIS_STATEMENT_INFO](state, payload) {
    state.fortisStatementInfo = payload
  },
  [types.FORTIS_PAYMENT_VIA_URL](state, payload) {
    state.fortisPaymentViaUrl = payload
  }
}

export default {
  state,
  mutations
}
