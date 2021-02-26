import * as types from '../mutation-types'

const state = {
  currentTaskType: '',
  currentCaseHistoryId: 0,
  currentCaseHistoryProblems: []
}

const mutations = {
  [types.TASK_CURRENT_TASK_TYPE] (state, payload) {
    state.currentTaskType = payload
  },
  [types.TASK_CURRENT_CASE_HISTORY_ID] (state, payload) {
    state.currentCaseHistoryId = payload
  },
  [types.TASK_CURRENT_CASE_HISTORY_PROBLEMS] (state, payload) {
    state.currentCaseHistoryProblems = payload
  }
}

export default {
  state,
  mutations
}
