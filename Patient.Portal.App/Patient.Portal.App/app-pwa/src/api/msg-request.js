import axios from 'axios'
// import Vue from 'vue'

// const user = Vue.$cookies.get('user')
const apiUrl = 'https://peak-api-dev.azurewebsites.net'

const securedJsonRequest = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

securedJsonRequest.interceptors.request.use(
  config => {
    const token = localStorage.getItem('config')
    if (token) {
      config.headers.common.Authorization = 'bearer ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

securedJsonRequest.interceptors.response.use(
  response => response,
  error => {
    // whatever you want to do with the error
    console.log('intercep error', error)
    if (error.response) {
      console.log('error.response', error.response)
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)

      if (error.response.status === 400) {
        // Vue.$swal(error.response.statusText.replace('|', '\n'))
      }
      if (error.response.status === 500) {
        // Vue.$swal(error.response.statusText)
      }
      if (error.response.status === 401) {
        // Unauthorized and logout the user or relogin
        window.location = '/account/login'
      }
    } else if (error.request) {
      console.log('error.request', error.request)
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    console.log(error.config)
  }
)

export default {
  request: {
    /**
     * Api access to get message  list for the user patient
      * @param {Object} payload  request object to get user patient message list
      * @param {String} payload.facilityId
      * @param {String} payload.patientId
      */
    async getMessageList (payload) {
      return await securedJsonRequest.post('/patientportal/GetMessageList', payload)
    }
  }
}
