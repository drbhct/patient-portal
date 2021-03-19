import * as types from '../mutation-types'

const state = {
  previousTaskType: [],
  currentTaskType: '',
  currentCaseHistoryId: 0,
  currentCaseHistoryProblems: [],
  currentCaseHistoryOats: [],
  currentCaseHistoryComplaintFormValues: null
}

const mutations = {
  [types.TASK_CURRENT_TASK_TYPE] (state, payload) {
    if (state.currentTaskType) {
      const exist = state.previousTaskType.find(c => c === state.currentTaskType)
      if (!exist) {
        state.previousTaskType.push(state.currentTaskType)
      }
    }
    state.currentTaskType = payload
  },
  [types.TASK_CURRENT_CASE_HISTORY_ID] (state, payload) {
    state.currentCaseHistoryId = payload
  },
  [types.TASK_CURRENT_CASE_HISTORY_PROBLEMS] (state, payload) {
    state.currentCaseHistoryProblems = payload
  },
  [types.TASK_CURRENT_CASE_HISTORY_OATS] (state, payload) {
    state.currentCaseHistoryOats = payload
  },
  [types.TASK_CURRENT_CASE_HISTORY_COMPLAINT_FORM_VAL] (state, payload) {
    state.currentCaseHistoryComplaintFormValues = payload
  }
}

export default {
  state,
  mutations
}
