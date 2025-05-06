import auth from '../api/auth-request.js'
import { ref } from 'vue'

const isAuthenticated = ref(false)

export default {
  install(app, options) {
    app.config.globalProperties.$auth = myInstance
    app.config.globalProperties.$isAuthenticated = isAuthenticated
    // console.log('instance installed')
    // console.log('route', app.config.globalProperties.route)
    // console.log('isAuthenticated', app.config.globalProperties.$auth.isAuthenticated())
    // app.config.globalProperties.$isAuthenticated = () => {
    //   const token = localStorage.getItem('config')
    //   if (!token) {
    //     return false
    //   }
    //   return true
    // }
    // app.config.globalProperties.$auth.logout()
    // console.log('isAuthenticated', app.config.globalProperties.$auth.isAuthenticated())
  }
}

var myInstance = {
  async login(username, password) {
    try {
      const response = await auth.login(username, password)
      return response.data
    } catch (error) {
      console.error('Error logging in:', error)
      throw error
    }
  },
  logout() {
    // localStorage.clear()
    sessionStorage.clear()
    isAuthenticated.value = false
  },
  getToken() {
    // const token = localStorage.getItem('config')
    const token = sessionStorage.getItem('config')
    return token
  },
  isAuthenticated() {
    // const token = localStorage.getItem('config')
    // const completeAuth = localStorage.getItem('completeAuth')
    const token = sessionStorage.getItem('config')
    const completeAuth = sessionStorage.getItem('completeAuth')
    if (!token || !completeAuth) {
      isAuthenticated.value = false
      return false
    }
    isAuthenticated.value = true
    return true
  },
  completeAuth() {
    // localStorage.setItem('completeAuth', true)
    sessionStorage.setItem('completeAuth', true)
    isAuthenticated.value = true
  }
}
