import axios from 'axios'
// import Vue from 'vue'

// const user = Vue.$cookies.get('user')
// const user = localStorage.getItem('config')
// console.log('request user>', user)
// let token = ''
// if (user) {
//   token = user
// }
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
        localStorage.clear()
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
     * @param {Object} Payload request for patient future appointments
     * @param {String} payload.facilityid
     * @param {String} payload.patientid
     */
    async getpatientfutureappts (payload) {
      return await securedJsonRequest.post('/patientportal/getpatientfutureappts', payload)
    },
    /**
    * @param {Object} Payload request for patient tasks
    * @param {String} payload.facilityid
    * @param {String} payload.patientid
    */
    async gettasks (payload) {
      return await securedJsonRequest.post('/patientportal/gettasks/', payload)
    },
    /**
    * @param {Object} Payload request for patient document list
    * @param {String} payload.facilityid
    * @param {String} payload.patientid
    */
    async getattachmentlist (payload) {
      return await securedJsonRequest.post('/patientportal/getattachmentlist', payload)
    },
    /**
    * @param {Object} Payload
    * @param {String} payload.facilityid
    * @param {String} payload.id
    */
    async getpaymentprofilelist (payload) {
      return await securedJsonRequest.post('/patientportal/getpaymentprofilelist', payload)
    },
    /**
    * @param {Object} payload  request object for saving user profile payment
    * @param {String} payload.facilityId
    * @param {String} payload.patientId
    * @param {String} payload.nameOnAccount
    * @param {Boolean} payload.accountNo
    * @param {Date} payload.expDate
    * @param {String} payload.routeNo
    * @param {String} payload.address1
    * @param {String} payload.address2
    * @param {String} payload.city
    * @param {String} payload.state
    * @param {String} payload.zip
    * @param {String} payload.merchantPaymentMethodID
    * @param {String} payload.paymentMethodID
    * @param {String} payload.paymentMethod
    */
    async insertpaymentprofile (payload) {
      return await securedJsonRequest.post('/patientportal/insertpaymentprofile', payload)
    },
    /**
    * @param {Object} payload  request object for capture card alias
    * @param {String} payload.facilityId
    * @param {String} payload.patientId
    * @param {String} payload.nameOnCard
    * @param {String} payload.acctNum
    * @param {Date} payload.expDate
    * @param {String} payload.cardCode
    */
    async capturecardalias (payload) {
      return await securedJsonRequest.post('/patientportal/capturecardalias', payload)
    },
    /**
    * @param {Object} payload  request object for capture card alias
    * @param {String} payload.facilityId
    * @param {String} payload.id
    * @param {String} payload.user
    */
    async deletepaymentprofile (payload) {
      return await securedJsonRequest.post('/patientportal/deletepaymentprofile', payload)
    },
    /**
    * @param {Object} payload  request object for capture card alias
    * @param {String} payload.facilityId
    * @param {String} payload.id
    */
    async downloadfile (payload) {
      return await securedJsonRequest.post('/patientportal/downloadfile', payload)
    }
  }
}
