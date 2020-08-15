import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

// module registration
import messages from './modules/messages.js'
import billing from './modules/billing.js'
import profile from './modules/profile.js'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    messages,
    billing,
    profile
  }
})
