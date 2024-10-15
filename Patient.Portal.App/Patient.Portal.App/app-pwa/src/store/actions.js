import * as types from './mutation-types.js'

export const logoutApp = async store => {
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

export const setTaskCurrentCaseHistoryOats = async (store, payload) => {
  await store.commit(types.TASK_CURRENT_CASE_HISTORY_OATS, payload)
}

export const setTaskCurrentCaseHistoryComplaintFormVal = async (
  store,
  payload
) => {
  await store.commit(
    types.TASK_CURRENT_CASE_HISTORY_COMPLAINT_FORM_VAL,
    payload
  )
}

export const setTaskCurrentCaseHistoryAutoAccident = async (store, payload) => {
  await store.commit(types.TASK_CURRENT_CASE_HISTORY_AUTO_ACCIDENT, payload)
}

export const setTaskCurrentCaseHistoryAAFormValues = async (store, payload) => {
  await store.commit(types.TASK_CURRENT_CASE_HISTORY_AA_FORM_VALUES, payload)
}

export const setProfileCurrentPatient = async (store, payload) => {
  await store.commit(types.CURRENT_PROFILE_PATIENT, payload)
}

export const setTaskOfficeName = async (store, payload) => {
  await store.commit(types.TASK_CURRENT_OFFICE_NAME, payload)
}

export const setTaskCode = (store, payload) => {
  store.commit(types.TASK_CURRENT_CODE, payload)
}

export const setTaskIsAccessOnly = (store, payload) => {
  store.commit(types.TASK_IS_ACCESS_ONLY, payload)
}

export const setBillingStatementTask = (store, payload) => {
  store.commit(types.BILLING_TASK_STATEMENT, payload)
}

export const setTaskIsAccessOnlyRoute = (store, payload) => {
  store.commit(types.TASK_IS_ACCESS_ONLY_ROUTE, payload)
}

export const setFacilityInfo = (store, payload) => {
  store.commit(types.PROFILE_FACILITY_INFO, payload)
}
export const setFortisPaymentForm = (store, payload) => {
  store.commit(types.FORTIS_PAYMENT_FORM, payload)
}

export const setFortisStatementInfo = (store, payload) => {
  store.commit(types.FORTIS_STATEMENT_INFO, payload)
}
export const setFortisPaymentUrl = (store, payload) => {
  store.commit(types.FORTIS_PAYMENT_VIA_URL, payload)
}

export const setTaskInfo = async (store, payload) => {
  await store.commit(types.TASK_INFO, payload)
}

export const setTaskItem = async (store, payload) => {
  await store.commit(types.TASK_ITEM, payload)
}

export const setUrlLinkInfo = async (store, payload) => {
  await store.commit(types.URL_LINK_INFO, payload)
}
