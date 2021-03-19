import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import VueSweetalert2 from 'vue-sweetalert2'
import VueMask from 'v-mask'
import VueContentPlaceholders from 'vue-content-placeholders'

Vue.use(VueContentPlaceholders)
Vue.use(VueSweetalert2)
Vue.use(VueMask)
Vue.use(VueCookies)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
