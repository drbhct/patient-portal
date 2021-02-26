import * as types from './mutation-types.js'

export const logoutApp = async (store) => {
  await store.commit(types.PROFILE_AUTH_INFO, null)
  await store.commit(types.PROFILE_PATIENT_ASSOCIATED, null)
}
export const setIsLoading = (store, payload) => {
  store.commit(types.IS_LOADING, payload)
}

export const setMsgCurrentPage = (store, payload) => {
  store.commit(types.CURRENT_MSG_PAGE_VIEW, payload)
}

export const setBillingCurrentPage = (store, payload) => {
  store.commit(types.CURRENT_BILLING_PAGE_VIEW, payload)
}

export const setBillingBalanceDue = (store, payload) => {
  store.commit(types.BILLING_BALANCE_DUE, payload)
}

export const setProfileCurrentPage = (store, payload) => {
  store.commit(types.CURRENT_PROFILE_PAGE_VIEW, payload)
}

export const setProfilePaymentCurrentPage = (store, payload) => {
  store.commit(types.CURRENT_PROFILE_PAYMENT_VIEW, payload)
}

export const setProfileAuthInfo = async (store, payload) => {
  await store.commit(types.PROFILE_AUTH_INFO, payload)
}

export const setProfileMyInfo = (store, payload) => {
  store.commit(types.PROFILE_MY_INFO, payload)
}

export const setProfilePatientAssociated = (store, payload) => {
  store.commit(types.PROFILE_PATIENT_ASSOCIATED, payload)
}

export const setCurrentMsgInfo = (store, payload) => {
  store.commit(types.CURRENT_MSG_INFO, payload)
}

export const setTaskCurrentTaskType = (store, payload) => {
  store.commit(types.TASK_CURRENT_TASK_TYPE, payload)
}

export const setTaskCurrentCaseHistoryId = async (store, payload) => {
  await store.commit(types.TASK_CURRENT_CASE_HISTORY_ID, payload)
}

export const setTaskCurrentCaseHistoryProblems = async (store, payload) => {
  await store.commit(types.TASK_CURRENT_CASE_HISTORY_PROBLEMS, payload)
}
