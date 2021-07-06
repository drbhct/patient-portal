import * as types from '../mutation-types'

const state = {
  currentMsgPageView: 'List',
  currentMsgInfo: null
}

const mutations = {
  [types.CURRENT_MSG_PAGE_VIEW] (state, payload) {
    state.currentMsgPageView = payload
  },
  [types.CURRENT_MSG_INFO] (state, payload) {
    state.currentMsgInfo = payload
  }
}

export default {
  state,
  mutations
}
