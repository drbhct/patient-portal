import * as types from '../mutation-types'

const state = {
  previousTaskType: [],
  currentTaskType: '',
  currentCaseHistoryId: 0,
  currentCaseHistoryProblems: [],
  currentCaseHistoryOats: [],
  currentCaseHistoryComplaintFormValues: null,
  currentCaseHistoryAutoAccident: [],
  currentCaseHistoryAAFormValues: null,
  officeName: '',
  taskCode: '',
  isAccessOnly: false,
  isAccessOnlyRoute: '/',
  taskInfo: ''
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
  },
  [types.TASK_CURRENT_OFFICE_NAME] (state, payload) {
    state.officeName = payload
  },
  [types.TASK_CURRENT_CODE] (state, payload) {
    state.taskCode = payload
  },
  [types.TASK_IS_ACCESS_ONLY] (state, payload) {
    state.isAccessOnly = payload
  },
  [types.TASK_IS_ACCESS_ONLY_ROUTE] (state, payload) {
    state.isAccessOnlyRoute = payload
  },
  [types.TASK_INFO] (state, payload) {
    state.taskInfo = payload
  }
}

export default {
  state,
  mutations
}
