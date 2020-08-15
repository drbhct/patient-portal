import * as types from './mutation-types.js'

export const setMsgCurrentPage = (store, payload) => {
  store.commit(types.CURRENT_MSG_PAGE_VIEW, payload)
}

export const setBillingCurrentPage = (store, payload) => {
  store.commit(types.CURRENT_BILLING_PAGE_VIEW, payload)
}
