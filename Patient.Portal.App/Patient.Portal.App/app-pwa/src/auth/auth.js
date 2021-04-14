/* globals localStorage */
import auth from '../api/auth-request.js'
export default {
  install (Vue, options) {
    Vue.prototype.$auth = myInstance
  },

  getToken () {
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.token
  },

  onChange () {}
}

var myInstance = {
  async login (username, password) {
    const appTokenRaw = await auth.request.apiLogin()
    const userDataRaw = await auth.request.validateUser({
      username,
      password
    }, appTokenRaw.data.token)

    if (userDataRaw.data) {
      localStorage.setItem('config', appTokenRaw.data.token)
    }
    return userDataRaw.data
  },
  logout () {
    localStorage.clear()
  },
  getToken () {
    const token = localStorage.getItem('config')
    return token
  },
  isAuthenticated () {
    const token = localStorage.getItem('config')
    if (!token) {
      return false
    }
    return true
  }
}
