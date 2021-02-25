import * as types from '../mutation-types'

const state = {
  currentTaskType: ''
}

const mutations = {
  [types.TASK_CURRENT_TASK_TYPE] (state, payload) {
    state.currentTaskType = payload
  }
}

export default {
  state,
  mutations
}
