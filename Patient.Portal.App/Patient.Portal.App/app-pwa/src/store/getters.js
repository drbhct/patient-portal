// config module
export const getIsLoading = state => state.config.isLoading

// messages module
export const getMsgCurrentPage = state => state.messages.currentMsgPageView

// billing module
export const getBillingCurrentPage = state => state.billing.currentBillingPageView
export const getBillingBalanceDue = state => state.billing.balanceDue

// PROFILE
export const getProfileCurrentPage = state => state.profile.currentProfilePageView
export const getProfileAuthInfo = state => state.profile.profileAuthInfo
export const getProfilePatientAssociated = state => state.profile.patientAssociated
