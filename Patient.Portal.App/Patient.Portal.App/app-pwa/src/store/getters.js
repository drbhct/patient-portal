// config module
export const getIsLoading = state => state.config.isLoading

// messages module
export const getMsgCurrentPage = state => state.messages.currentMsgPageView
export const getMsgInfo = state => state.messages.currentMsgInfo

// billing module
export const getBillingCurrentPage = state => state.billing.currentBillingPageView
export const getBillingBalanceDue = state => state.billing.balanceDue

// PROFILE
export const getProfileCurrentPage = state => state.profile.currentProfilePageView
export const getProfilePaymentCurrentPage = state => state.profile.currentProfilePaymentView
export const getProfileAuthInfo = state => state.profile.profileAuthInfo
export const getProfilePatientAssociated = state => state.profile.patientAssociated

// task
export const getTaskCurrentTaskType = state => state.task.currentTaskType
export const getTaskPreviousTaskType = state => state.task.previousTaskType
export const getTaskCurrentCaseHistoryId = state => state.task.currentCaseHistoryId
export const getTaskCurrentCaseHistoryProblems = state => state.task.currentCaseHistoryProblems
export const getTaskCurrentCaseHistoryOats = state => state.task.currentCaseHistoryOats
