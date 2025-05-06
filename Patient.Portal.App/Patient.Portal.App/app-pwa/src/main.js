import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VueCookies from 'vue-cookies'
import VueSweetalert2 from 'vue-sweetalert2'
import Toast from 'vue-toastification'
import { vMask } from 'vue-input-mask'
import VueContentPlaceholders from 'vue-content-placeholders'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import { AuthSimplePlugin } from './auth/auth-simple.js'

// Import the CSS file for toastification
import 'vue-toastification/dist/index.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Toast configuration
const toastOptions = {
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false
}

// Only initialize Sentry in production to avoid rate limiting during development
if (import.meta.env.PROD) {
  Sentry.init({
    app,
    dsn: 'https://baff50e5a05944ca933adaeb43c960ca@o1202081.ingest.sentry.io/6455112',
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0
  })
} else {
  console.log('Sentry disabled in development mode')
}

// Register plugins
app.use(pinia)
app.use(router)

// Use Vue 3 compatible plugins
app.use(VueSweetalert2)
app.use(Toast, toastOptions)
app.use(VueContentPlaceholders)

// Use VueCookies in a Vue 3 compatible way
app.config.globalProperties.$cookies = VueCookies

// Configure Auth plugin in a Vue 3 compatible way
const authPlugin = new AuthSimplePlugin()
app.config.globalProperties.$auth = authPlugin
app.provide('auth', authPlugin)

// Register directives
app.directive('mask', vMask)

// Mount the app
app.mount('#app')
