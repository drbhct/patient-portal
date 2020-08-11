import * as types from '../mutation-types'

const state = {
  currentMsgPageView: 'List'
}

const mutations = {
  [types.CURRENT_MSG_PAGE_VIEW] (state, payload) {
    state.currentMsgPageView = payload
  }
}

export default {
  state,
  mutations
}
