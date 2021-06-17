
import auth from '../api/auth-request.js'
export default {
  install (Vue, options) {
    Vue.prototype.$auth = myInstance
    // console.log('instance installed')
    // console.log('route', Vue.route)
    // console.log('isAuthenticated', Vue.prototype.$auth.isAuthenticated())
    // Vue.prototype.$isAuthenticated = () => {
    //   const token = localStorage.getItem('config')
    //   if (!token) {
    //     return false
    //   }
    //   return true
    // }
    // Vue.prototype.$auth.logout()
    // console.log('isAuthenticated', Vue.prototype.$auth.isAuthenticated())
    Vue.prototype.$isAuthenticated = Vue.observable(myInstance.isAuthenticated())
  }
}

var myInstance = {
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
  },
  logout () {
    // localStorage.clear()
    sessionStorage.clear()
  },
  getToken () {
    // const token = localStorage.getItem('config')
    const token = sessionStorage.getItem('config')
    return token
  },
  isAuthenticated () {
    // const token = localStorage.getItem('config')
    // const completeAuth = localStorage.getItem('completeAuth')
    const token = sessionStorage.getItem('config')
    const completeAuth = sessionStorage.getItem('completeAuth')
    if (!token) {
      return false
    }

    if (!completeAuth) {
      return false
    }

    return true
  },
  completeAuth () {
    // localStorage.setItem('completeAuth', true)
    sessionStorage.setItem('completeAuth', true)
  }
}
