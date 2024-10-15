// config module
export const getIsLoading = state => state.config.isLoading

// messages module
export const getMsgCurrentPage = state => state.messages.currentMsgPageView
export const getMsgInfo = state => state.messages.currentMsgInfo

// billing module
export const getBillingCurrentPage = state =>
  state.billing.currentBillingPageView
export const getBillingBalanceDue = state => state.billing.balanceDue
export const getBillingTaskStatement = state => state.billing.taskStatement

// PROFILE
export const getProfileCurrentPage = state =>
  state.profile.currentProfilePageView
export const getProfilePaymentCurrentPage = state =>
  state.profile.currentProfilePaymentView
export const getProfileAuthInfo = state => state.profile.profileAuthInfo
export const getProfilePatientAssociated = state =>
  state.profile.patientAssociated
export const currentPatientAssociated = state => state.profile.currentPatient
export const getFacilityInfo = state => state.profile.facilityInfo

// task
export const getTaskCurrentTaskType = state => state.task.currentTaskType
export const getTaskPreviousTaskType = state => state.task.previousTaskType
export const getTaskCurrentCaseHistoryId = state =>
  state.task.currentCaseHistoryId
export const getTaskCurrentCaseHistoryProblems = state =>
  state.task.currentCaseHistoryProblems
export const getTaskCurrentCaseHistoryOats = state =>
  state.task.currentCaseHistoryOats
export const getTaskCurrentCaseHistoryFormValues = state =>
  state.task.currentCaseHistoryComplaintFormValues
export const getTaskCurrentCaseHistoryAutoAccident = state =>
  state.task.currentCaseHistoryAutoAccident
export const getTaskCurrentCaseHistoryAAFormValues = state =>
  state.task.currentCaseHistoryAAFormValues
export const getTaskOfficeName = state => state.task.officeName
export const getTaskCode = state => state.task.taskCode
export const getTaskIsAccessOnly = state => state.task.isAccessOnly
export const getTaskIsAccessOnlyRoute = state => state.task.isAccessOnlyRoute
export const getTaskInfo = state => state.task.taskInfo
export const getTaskItem = state => state.task.taskItem
export const getUrlLinkInfo = state => state.task.urllinkInfo

// fortis payment
export const getFortisPaymentForm = state => state.billing.fortisPaymentForm
export const getFortisStatementInfo = state => state.billing.fortisStatementInfo
export const getFortisPaymentViaUrl = state => state.billing.fortisPaymentViaUrl
