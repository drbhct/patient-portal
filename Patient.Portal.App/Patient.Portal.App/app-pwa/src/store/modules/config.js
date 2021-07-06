import * as types from '../mutation-types'

const state = {
  isLoading: false
}

const mutations = {
  [types.IS_LOADING] (state, payload) {
    state.isLoading = payload
  }
}

export default {
  state,
  mutations
}
