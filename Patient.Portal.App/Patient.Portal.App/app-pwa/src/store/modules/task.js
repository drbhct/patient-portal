import * as types from '../mutation-types'

const state = {
  previousTaskType: [],
  currentTaskType: '',
  currentCaseHistoryId: 0,
  currentCaseHistoryProblems: [],
  currentCaseHistoryOats: [],
  currentCaseHistoryComplaintFormValues: null,
  currentCaseHistoryAutoAccident: [],
  currentCaseHistoryAAFormValues: null
}

const mutations = {
  [types.TASK_CURRENT_TASK_TYPE] (state, payload) {
    if (state.currentTaskType) {
      const exist = state.previousTaskType.find(c => c === state.currentTaskType)
      if (!exist) {
        state.previousTaskType.push(state.currentTaskType)
      }
    }

    if (payload.back) {
      state.previousTaskType = state.previousTaskType.filter(el => el !== payload.removePage)
      state.currentTaskType = payload.page
    } else {
      state.currentTaskType = payload
    }
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
  },
  [types.TASK_CURRENT_CASE_HISTORY_AUTO_ACCIDENT] (state, payload) {
    state.currentCaseHistoryAutoAccident = payload
  },
  [types.TASK_CURRENT_CASE_HISTORY_AA_FORM_VALUES] (state, payload) {
    state.currentCaseHistoryAAFormValues = payload
  }
}

export default {
  state,
  mutations
}
