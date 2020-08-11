import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

// module registration
import messages from './modules/messages.js'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    messages
  }
})
