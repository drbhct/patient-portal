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
import VueHtmlToPaper from 'vue-html-to-paper'

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title // override the window title
}

Vue.use(VueHtmlToPaper, options)
Vue.use(PubNubVue, {
  subscribeKey: process.env.VUE_APP_PUBNUB_SUBSCRIBE_KEY,
  publishKey: process.env.VUE_APP_PUBNUB_PUBLISH_KEY,
  uuid: window.Login,
  ssl: true,
  presenceTimeout: 130
})

Sentry.init({
  Vue,
  dsn: 'https://baff50e5a05944ca933adaeb43c960ca@o1202081.ingest.sentry.io/6455112',
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
