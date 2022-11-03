import axios from 'axios'
// import Vue from 'vue'

// // const user = Vue.$cookies.get('user')
// const user = localStorage.getItem('config')
// // console.log('request user>', user)
// let token = ''
// if (user) {
//   token = user
// }
// const apiUrl = 'https://peak-api-dev.azurewebsites.net'
const apiUrl = 'https://hct-api-ncentral.healthcoretech.com'

const securedJsonRequest = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
    // Authorization: 'bearer ' + token
  }
})

securedJsonRequest.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('config')
    const token = sessionStorage.getItem('config')
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
        // localStorage.clear()
        sessionStorage.clear()
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
    async apiLogin () {
      const payload = {
        username: 'patientportal',
        password:
          'cw5e9ZsEnlsn1sduVzJstwyXTbtP6u4F49yPKm0gKay0VlvrDoa2njmvky4EGT6MnEiT646pmaiOxOFBmbGYl5pgE9fEiGms6GIs'
      }
      return await securedJsonRequest.post(
        '/patientportal/authenticate',
        payload
      )
    },
    /**
     * @param {Object} payload  request object for login
     * @param {String} payload.username email is use for the username field
     * @param {String} payload.password
     * @param {String} apiToken
     */
    async validateUser (payload, apiToken) {
      // NOTE: Need to create another instance due to token still not available until refresh
      const manualReq = axios.create({
        baseURL: apiUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + apiToken
        }
      })
      return await manualReq.post('/patientportal/validateuser', payload)
    },
    /**
     * @param {Object} payload  request object for login
     * @param {String} payload.username email is use for the username field
     * @param {String} payload.password
     */
    async validateUserNoToken (payload) {
      return await securedJsonRequest.post(
        '/patientportal/validateuser',
        payload
      )
    },
    /**
     * @param {Object} payload  request object for updating user info
     * @param {String} payload.id
     * @param {String} payload.firstName
     * @param {String} payload.lastName
     * @param {String} payload.nickName
     */
    async updateUser (payload) {
      return await securedJsonRequest.post(
        '/patientportal/updateuser',
        payload
      )
    },
    /**
     * @param {Object} payload  request object for update user email
     * @param {String} payload.id
     * @param {String} payload.email
     * @param {String} payload.pwd
     */
    async updateUserEmail (payload) {
      return await securedJsonRequest.post(
        '/patientportal/updateuseremail',
        payload
      )
    },
    /**
     * @param {Object} payload  request object for updating user mobile phone
     * @param {String} payload.id
     * @param {String} payload.mobilePhone
     */
    async updateUserMobilephone (payload) {
      return await securedJsonRequest.post(
        '/patientportal/updateusermobilephone',
        payload
      )
    },
    /**
     * @param {Object} payload  request object for updating user comm options
     * @param {String} payload.id
     * @param {Boolean} payload.canEmail
     * @param {Boolean} payload.canSms
     */
    async updateUserCommoptions (payload) {
      return await securedJsonRequest.post(
        '/patientportal/updateusercommoptions',
        payload
      )
    },
    /**
     * @param {Object} payload  request object for updating user comm options
     * @param {String} payload.id
     * @param {String} payload.pwd
     */
    async updateUserPwd (payload) {
      return await securedJsonRequest.post(
        '/patientportal/updateuserpwd',
        payload
      )
    },
    /**
     * @param {String} payload
     * @param {String} apiToken
     */
    async getUserWithToken (payload, apiToken) {
      // NOTE: Need to create another instance due to token still not available until refresh
      const manualReq = axios.create({
        baseURL: apiUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + apiToken
        }
      })
      return await manualReq.get('/patientportal/getUser/' + payload)
    },
    /**
     * @param {String} payload
     */
    async getUser (payload) {
      return await securedJsonRequest.get('/patientportal/getUser/' + payload)
    },
    /**
     * @param {String} userId
     */
    async getUserPatient (payload) {
      return await securedJsonRequest.get(
        '/patientportal/getuserpatients/' + payload
      )
    },
    /**
     * @param {Object} Payload request object for acquiring comm options for the user using associated patient info
     * @param {Number} payload.facilityId
     * @param {Number} payload.patientId
     */
    async getPatientCommOptions (payload) {
      return await securedJsonRequest.post(
        '/patientportal/getpatientcommoptions',
        payload
      )
    },
    /**
     * Get patient info
     * @param {Object} Payload request object for acquiring patient info
     * @param {Number} payload.facilityId
     * @param {Number} payload.patientId
     */
    async getPatient (payload) {
      return await securedJsonRequest.post(
        '/patientportal/GetPatient',
        payload
      )
    },
    /**
     * API access to update user associated patient communication options
     * Reminder of the only acceptable combinations:
     * SendSMS, SendSMS + SendEmail, SendEmail, CallMobilePhone, CallMobilePhone + SendEmail, CallHomePhone, CallHomePhone + SendEmail
     * @param {Object} Payload request object for updating patient comm options
     * @param {Number} payload.patientId
     * @param {Number} payload.facilityId
     * @param {Number} payload.sendSms
     * @param {Number} payload.sendEmail
     * @param {Number} payload.callMobilePhone
     * @param {Number} payload.callHomePhone
     * @param {Boolean} payload.twoWaySms
     * @param {Boolean} payload.otherEmail
     * @param {String} payload.mobilePhone
     * @param {String} payload.homePhone
     * @param {String} payload.email
     */
    async updatePatientCommOptions (payload) {
      return await securedJsonRequest.post(
        '/patientportal/updatepatientcommoptions',
        payload
      )
    },
    /**
     * @param {String} payload link key to get patient info when associating it to a user
     */
    async getLink (payload) {
      return await securedJsonRequest.get('/patientportal/GetLink/' + payload)
    },
    /**
     * verify if email is already in use
     * @param {String} payload email to verify
     */
    async isUserExists (payload) {
      return await securedJsonRequest.get(
        '/patientportal/userexists/' + payload
      )
    },
    /**
     * Create new patient portal user
     * @param {Object} Payload request object for acquiring patient info
     * @param {String} payload.email
     * @param {String} payload.pwd
     * @param {String} payload.firstName
     * @param {String} payload.lastName
     * @param {String} payload.nickName
     * @param {String} payload.mobilePhone
     */
    async insertUser (payload) {
      return await securedJsonRequest.post(
        '/patientportal/InsertUser',
        payload
      )
    },
    /**
     * Associate patient to portal user account
     * @param {Object} Payload request object for associating user to patient info
     * @param {String} payload.patientPortalUserID
     * @param {String} payload.facilityId
     * @param {String} payload.patientId
     * @param {String} payload.firstName
     * @param {String} payload.lastName
     */
    async insertUserPatient (payload) {
      return await securedJsonRequest.post(
        '/patientportal/InsertUserPatient',
        payload
      )
    },
    /**
     * Update patient info
     * @param {Object} Payload request object for updating patient info
     * @param {String} payload.patientPortalUserID
     * @param {String} payload.facilityId
     * @param {String} payload.patientId
     * @param {String} payload.firstName
     * @param {String} payload.lastName
     */
    async updatePatient (payload) {
      return await securedJsonRequest.post(
        '/patientportal/updatePatient',
        payload
      )
    },
    /**
     * Update patient mobile
     * @param {Object} Payload request object for updating patient info
     * @param {String} payload.facilityId
     * @param {String} payload.patientId
     * @param {String} payload.value
     */
    async updatePatientMobilePhone (payload) {
      return await securedJsonRequest.post(
        '/patientportal/updatepatientmobilephone',
        payload
      )
    },
    /**
     * Update patient email
     * @param {Object} Payload request object for updating patient info
     * @param {String} payload.facilityId
     * @param {String} payload.patientId
     * @param {String} payload.value
     */
    async updatePatientEmail (payload) {
      return await securedJsonRequest.post(
        '/patientportal/updatepatientemail',
        payload
      )
    },
    /**
     * @param {String} payload facilityId
     */
    async getFacilityInfo (payload) {
      return (
        await securedJsonRequest.get(
          '/patientportal/getfacilityinfo/' + payload
        )
      ).data
    },
    /**
     * Reset the user password via email
     * @param {Object} payload request object for sending email notificatin link for user to reset their password
     * @param {String} payload.email User account email
     * @returns {{ value: Boolean, reason: String }} api will return the success object
     */
    async resetUserPassword (payload) {
      return (
        await securedJsonRequest.post('/patientportal/resetuserpwd', payload)
      ).data
    }
  }
}
