import Vue from 'vue'
import auth from '../api/auth-request.js'

let authInstance

export class AuthSimplePlugin {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    // TODO: On refresh value is reset
    this.logged = false
  }

  install (vue, options) {
    authInstance = this
    vue.prototype.$auth = Vue.observable(authInstance)
  }

  /**
   * Validate the user
   * @param {String} username username of the user
   * @param {String} password password of the user
   */
  async login (username, password) {
    const appTokenRaw = await auth.request.apiLogin()
    const userDataRaw = await auth.request.validateUser({
      username,
      password
    }, appTokenRaw.data.token)

    if (userDataRaw.data) {
      // localStorage.setItem('config', appTokenRaw.data.token)
      sessionStorage.setItem('config', appTokenRaw.data.token)
    }

    return userDataRaw.data
  }

  /**
   * Logout the user
   */
  logout () {
    this.logged = false
    // this.isAuthenticated = false
    sessionStorage.clear()
  }

  /**
   * Toggle to properly complete the authentication
   */
  completeAuth () {
    this.logged = true
    // localStorage.setItem('completeAuth', true)
    sessionStorage.setItem('completeAuth', true)
  }

  /**
   * Check if the user is currently authenticated or not
   * @returns {Boolean} true or false
   */
  isAuthenticated () {
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
  getToken () {
    const token = sessionStorage.getItem('config')
    return token
  }
}
