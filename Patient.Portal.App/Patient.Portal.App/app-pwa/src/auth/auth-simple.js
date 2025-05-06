import auth from '../api/auth-request.js'
import axios from 'axios'

const apiUrl = 'https://hct-api-ncentral.healthcoretech.com'

const securedJsonRequest = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

securedJsonRequest.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('config')
    if (token) {
      config.headers.common.Authorization = 'bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export class AuthSimplePlugin {
  constructor() {
    this.logged = false
  }

  // Updated install method for Vue 3 compatibility
  install(app) {
    // Use config.globalProperties for Vue 3
    app.config.globalProperties.$auth = this
    
    // Also provide the auth instance through provide/inject pattern for composition API
    app.provide('auth', this)
  }

  /**
   * Validate the user
   * @param {String} username username of the user
   * @param {String} password password of the user
   */
  async login(username, password) {
    const appTokenRaw = await auth.request.apiLogin()
    const userDataRaw = await auth.request.validateUser(
      {
        username,
        password
      },
      appTokenRaw.data.token
    )

    if (userDataRaw.data) {
      sessionStorage.setItem('config', appTokenRaw.data.token)
    }

    return userDataRaw.data
  }

  /**
   * Logout the user
   */
  logout() {
    this.logged = false
    sessionStorage.clear()
  }

  /**
   * Toggle to properly complete the authentication
   */
  completeAuth() {
    this.logged = true
    sessionStorage.setItem('completeAuth', true)
  }

  /**
   * Check if the user is currently authenticated or not
   * @returns {Boolean} true or false
   */
  isAuthenticated() {
    const token = sessionStorage.getItem('config')
    const completeAuth = sessionStorage.getItem('completeAuth')
    if (!token) {
      return false
    }

    if (!completeAuth) {
      return false
    }

    return true
  }

  /**
   * Acquire the app token
   * @returns {String} App Token
   */
  getToken() {
    const token = sessionStorage.getItem('config')
    return token
  }
}

export default {
  request: {
    async login(credentials) {
      return await securedJsonRequest.post('/auth/login', credentials)
    },
    async validateUser() {
      return await securedJsonRequest.get('/auth/validateuser')
    },
    async updateUser(payload) {
      return await securedJsonRequest.post('/auth/updateuser', payload)
    },
    async getFacilityInfo(facilityId) {
      return await securedJsonRequest.get('/auth/getfacilityinfo/' + facilityId)
    },
    async getFacilityList() {
      return await securedJsonRequest.get('/auth/getfacilitylist')
    }
  }
}
