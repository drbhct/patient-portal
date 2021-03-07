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
    * @param {Object} Payload request for patient tasks
    * @param {String} payload.facilityid
    * @param {String} payload.patientid
    */
    async gettask (payload) {
      return await securedJsonRequest.post('/patientportal/gettasks', payload)
    },
    /**
     * Method to check if patient has existing user account
    * @param {Object} Payload request object for checking if patient has associated user already
    * @param {String} payload.facilityid
    * @param {String} payload.patientid
    */
    async patientLookup (payload) {
      return await securedJsonRequest.post('/patientportal/patientlookup', payload)
    },
    /**
     * Method to get patient info
    * @param {Object} Payload request object for acquiring patient info
    * @param {String} payload.facilityid
    * @param {String} payload.patientid
    */
    async getPatient (payload) {
      return await securedJsonRequest.post('/patientportal/getpatient', payload)
    },
    /**
     * Method to get patient incomeplete case history
    * @param {Object} Payload request object for acquiring patient incomplete case history
    * @param {String} payload.facilityId
    * @param {String} payload.patientId
    */
    async findIncompleteCaseHistory (payload) {
      return await securedJsonRequest.post('/patientportal/findincompletecasehistory', payload)
    },
    /**
     * Method insert patient case history
    * @param {Object} Payload request object for acquiring patient incomplete case history
    * @param {String} payload.facilityId
    * @param {String} payload.patientId
    * @param {String} payload.aa boolean value if nph is auto accident or not
    */
    async insertCaseHistory (payload) {
      return await securedJsonRequest.post('/patientportal/insertCaseHistory', payload)
    },
    /**
     *
    * @param {Object} Payload request object
    * @param {String} payload.facilityid
    * @param {String} payload.caseHistoryId
    */
    async getCaseHistoryProblems (payload) {
      return await securedJsonRequest.post('/patientportal/GetCaseHistoryProblems', payload)
    },
    /**
     * Method to add case history problem
    * @param {Object} Payload request object for adding case history problem
    * @param {String} payload.facilityId
    * @param {String} payload.caseHistoryId
    * @param {String} payload.ordinal
    * @param {String} payload.region
    * @param {String} payload.name
    */
    async insertCaseHistoryProblem (payload) {
      return await securedJsonRequest.post('/patientportal/insertcasehistoryproblem', payload)
    },
    /**
     * Method to remove case history problem
    * @param {Object} Payload request object for removing case history problem
    * @param {String} payload.facilityId
    * @param {String} payload.caseHistoryProblemID
    */
    async deleteCaseHistoryProblem (payload) {
      return await securedJsonRequest.post('/patientportal/deletecasehistoryproblem', payload)
    },
    /**
     * Method to update case history problem
    * @param {Object} Payload request object for updating case history problem
    * @param {String} payload.facilityId
    * @param {String} payload.caseHistoryProblemId
    * @param {String} payload.fieldName
    * @param {String} payload.value
    */
    async updateCaseHistoryProblemValue (payload) {
      return await securedJsonRequest.post('/patientportal/updatecasehistoryproblemvalue', payload)
    },
    /**
     * Method to get case history conditions
    * @param {Object} Payload request object for adding case history problem
    * @param {String} payload.facilityId
    * @param {String} payload.id
    */
    async getCaseHistoryConditions (payload) {
      return await securedJsonRequest.post('/patientportal/getcasehistoryconditions', payload)
    },
    /**
     * Method to update case history conditions
    * @param {Object} Payload request object for updating case history problem
    * @param {String} payload.facilityId
    * @param {String} payload.caseHistoryId
    * @param {String} payload.conditions
    */
    async updateCaseHistoryConditions (payload) {
      return await securedJsonRequest.post('/patientportal/updatecasehistoryconditions', payload)
    },
    /**
     * Method to clear case history conditions
    * @param {Object} Payload request object for clearing case history problem
    * @param {String} payload.facilityId
    * @param {String} payload.id
    */
    async clearCaseHistoryConditions (payload) {
      return await securedJsonRequest.post('/patientportal/clearcasehistoryconditions', payload)
    },
    /**
     *
    * @param {Object} Payload request object
    * @param {String} payload.facilityId
    * @param {String} payload.id
    */
    async getCaseHistoryFamilyHealthHistory (payload) {
      return await securedJsonRequest.post('/patientportal/getcasehistoryfamilyhealthhistory', payload)
    },
    /**
     *
    * @param {Object} Payload request object
    * @param {String} payload.facilityid
    * @param {String} payload.id
    */
    async updateCaseHistoryFamilyHealthHistory (payload) {
      return await securedJsonRequest.post('/patientportal/UpdateCaseHistoryFamilyHealthHistory', payload)
    },
    async getUsStates (payload) {
      return await securedJsonRequest.get('/common/getusstates')
    },
    /**
     *
    * @param {Object} Payload request object
    * @param {String} payload.facilityId
    * @param {String} payload.patientId
    * @param {String} payload.lastName
    * @param {String} payload.firstName
    * @param {String} payload.mi
    * @param {String} payload.nickName
    * @param {String} payload.suffix
    * @param {String} payload.address
    * @param {String} payload.address2
    * @param {String} payload.state
    * @param {String} payload.zip
    * @param {String} payload.homePhone
    * @param {String} payload.cellPhone
    * @param {String} payload.email
    * @param {String} payload.dob
    * @param {String} payload.sex
    * @param {String} payload.employStatId
    * @param {String} payload.emerContact
    * @param {String} payload.emerRelation
    * @param {String} payload.emerPhone
    */
    async updatePatient (payload) {
      return await securedJsonRequest.post('/patientportal/updatepatient', payload)
    },
    /**
     *
    * @param {Object} Payload request object
    * @param {String} payload.facilityid
    * @param {String} payload.caseHistoryId
    */
    async getCaseHistoryOats (payload) {
      return await securedJsonRequest.post('/patientportal/GetCaseHistoryOats', payload)
    },
    /**
     *
    * @param {Object} Payload request object
    * @param {Number} payload.facilityid
    * @param {Number} payload.caseHistoryId
    * @param {Number} payload.oadId
    * @param {Number} payload.caseHistoryProblemId
    */
    async getCaseHistoryOatQuestions (payload) {
      return await securedJsonRequest.post('/patientportal/GetCaseHistoryOatQuestions', payload)
    },
    /**
     *
    * @param {Object} Payload request object
    * @param {String} payload.facilityid
    * @param {String} payload.oatId
    */
    async getOatAnswerList (payload) {
      return await securedJsonRequest.post('/patientportal/GetOatAnswerList', payload)
    },
    /**
     *
    * @param {Object} Payload request object
    * @param {String} payload.facilityid
    * @param {Number} payload.caseHistoryProblemId
    * @param {Object} payload.questionList
    */
    async updateCaseHistoryProblemOats (payload) {
      return await securedJsonRequest.post('/patientportal/UpdateCaseHistoryProblemOats', payload)
    }

  }
}
