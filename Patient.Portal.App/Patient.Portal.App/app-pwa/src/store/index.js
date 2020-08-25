import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import VuexPersist from 'vuex-persistedstate'

// module registration
import messages from './modules/messages.js'
import billing from './modules/billing.js'
import profile from './modules/profile.js'
import config from './modules/config.js'
Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage,
  paths: [
    'profile.profileAuthInfo'
  ]
})

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    messages,
    billing,
    profile,
    config
  },
  plugins: [vuexLocalStorage],
  strict: true
})
