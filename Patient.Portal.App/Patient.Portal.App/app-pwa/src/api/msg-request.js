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
        // Unauthorized and logout the user or relogin
        sessionStorage.clear()
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
      * @param {Boolean} payload.includeArchived
      */
    async getMessageList (payload) {
      return await securedJsonRequest.post('/patientportal/GetMessageList', payload)
    },
    /**
     * Api access to set the msg status as read
      * @param {Object} payload  request object to get user patient message list
      * @param {String} payload.facilityId
      * @param {String} payload.id message id
      */
    async setMessageAsRead (payload) {
      return await securedJsonRequest.post('/patientportal/UpdateMessageRead', payload)
    },
    /**
     * Api access to get the message thread list
      * @param {Object} payload  request object to get user patient message list
      * @param {String} payload.facilityId
      * @param {String} payload.patiendId
      * @param {String} payload.parentId
      */
    async getMessageThread (payload) {
      return await securedJsonRequest.post('/patientportal/GetMessageThread', payload)
    },
    /**
     * Api access to reply
      * @param {Object} payload  request object to get user patient message list
      * @param {String} payload.facilityId
      * @param {String} payload.patiendId
      * @param {String} payload.parentId
      * @param {String} payload.message
      */
    async insertMessageReply (payload) {
      return await securedJsonRequest.post('/patientportal/InsertMessageReply', payload)
    },
    /**
     * Api access to reply
      * @param {Object} payload  request object to get user patient message list
      * @param {String} payload.facilityId
      * @param {String} payload.id
      */
    async archiveMessage (payload) {
      return await securedJsonRequest.post('/patientportal/archivemessage', payload)
    },
    /**
     * Api access to message count
      * @param {Object} payload  request object to get user patient message list
      * @param {String} payload.facilityId
      * @param {String} payload.patientId
      */
    async getArchivedMessageCount (payload) {
      return await securedJsonRequest.post('/patientportal/getarchivedmessagecount', payload)
    },
    /**
     * Api access to insert new message
      * @param {Object} payload  request object to get user patient message list
      * @param {String} payload.facilityId
      * @param {String} payload.patiendId
      * @param {String} payload.subject
      * @param {String} payload.message
      */
    async insertMessage (payload) {
      return await securedJsonRequest.post('/patientportal/insertmessage', payload)
    },
    /**
     * Api access get unread msg count
      * @param {Object} payload  request object to get user patient message list
      * @param {String} payload.facilityId
      * @param {String} payload.patiendId
      */
    async getUnReadMessageCount  (payload) {
      return await securedJsonRequest.post('/patientportal/getunreadmessagecount ', payload)
    },
    /**
     * Api access get set unread value
      * @param {Object} payload  request object to update message read
      * @param {String} payload.facilityId
      * @param {String} payload.id
      * @param {Boolean} payload.read
      */
    async updateMessageRead (payload) {
      return await securedJsonRequest.post('/patientportal/updatemessageread ', payload)
    }
  }
}
