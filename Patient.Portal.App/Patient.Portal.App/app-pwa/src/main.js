import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import VueSweetalert2 from 'vue-sweetalert2'
import VueMask from 'v-mask'
import VueContentPlaceholders from 'vue-content-placeholders'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
// import auth from './auth/auth.js'
import PubNubVue from 'pubnub-vue'
import { AuthSimplePlugin } from './auth/auth-simple.js'

Vue.use(PubNubVue, {
  subscribeKey: process.env.VUE_APP_PUBNUB_SUBSCRIBE_KEY,
  publishKey: process.env.VUE_APP_PUBNUB_PUBLISH_KEY,
  uuid: window.Login,
  ssl: true,
  presenceTimeout: 130
})

Sentry.init({
  Vue,
  dsn: 'https://903308b1d24a48768a190cd33ddb2b42@o264517.ingest.sentry.io/5689328',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

Vue.use(new AuthSimplePlugin())
// Vue.use(auth)
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
