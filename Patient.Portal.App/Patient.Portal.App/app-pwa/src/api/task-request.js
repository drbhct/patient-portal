import axios from 'axios'
// import Vue from 'vue'

const prodApiEndpointDomain = 'https://hct-api-ncentral.healthcoretech.com'
// const devApiEndpointDomain = 'https://hct-api-ncentral-dev.azurewebsites.net'
const apiUrl = prodApiEndpointDomain

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
    /**
     * @param {Object} Payload request for patient tasks
     * @param {String} payload.facilityid
     * @param {String} payload.patientid
     */
    async gettask (payload) {
      return await securedJsonRequest.post('/patientportal/gettasks', payload)
    },
    /**
     * Get the task info via the taskId
     * @param {Number} taskId ID of the task
     * @returns {{ taskID: Number,userID:Number,facilityID:Number,patientID:Number,taskTypeID:Number,taskType:String, info}}
     */
    async getSpecificTask (taskId) {
      return await securedJsonRequest.get(`/patientportal/gettask/${taskId}`)
    },
    /**
     * Method to check if patient has existing user account
     * @param {Object} Payload request object for checking if patient has associated user already
     * @param {String} payload.facilityid
     * @param {String} payload.patientid
     */
    async patientLookup (payload) {
      return await securedJsonRequest.post(
        '/patientportal/patientlookup',
        payload
      )
    },
    /**
     * Method to get patient info
     * @param {Object} Payload request object for acquiring patient info
     * @param {String} payload.facilityid
     * @param {String} payload.patientid
     */
    async getPatient (payload) {
      return await securedJsonRequest.post(
        '/patientportal/getpatient',
        payload
      )
    },
    /**
     * Method to get patient incomeplete case history
     * @param {Object} Payload request object for acquiring patient incomplete case history
     * @param {String} payload.facilityId
     * @param {String} payload.patientId
     */
    async findIncompleteCaseHistory (payload) {
      return await securedJsonRequest.post(
        '/patientportal/findincompletecasehistory',
        payload
      )
    },
    /**
     * Method insert patient case history
     * @param {Object} Payload request object for acquiring patient incomplete case history
     * @param {String} payload.facilityId
     * @param {String} payload.patientId
     * @param {String} payload.aa boolean value if nph is auto accident or not
     */
    async insertCaseHistory (payload) {
      return await securedJsonRequest.post(
        '/patientportal/insertCaseHistory',
        payload
      )
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {String} payload.facilityid
     * @param {String} payload.caseHistoryId
     */
    async getCaseHistoryProblems (payload) {
      return await securedJsonRequest.post(
        '/patientportal/GetCaseHistoryProblems',
        payload
      )
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
      return await securedJsonRequest.post(
        '/patientportal/insertcasehistoryproblem',
        payload
      )
    },
    /**
     * Method to remove case history problem
     * @param {Object} Payload request object for removing case history problem
     * @param {String} payload.facilityId
     * @param {String} payload.caseHistoryProblemID
     */
    async deleteCaseHistoryProblem (payload) {
      return await securedJsonRequest.post(
        '/patientportal/deletecasehistoryproblem',
        payload
      )
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
      return await securedJsonRequest.post(
        '/patientportal/updatecasehistoryproblemvalue',
        payload
      )
    },
    /**
     * Method to get case history conditions
     * @param {Object} Payload request object for adding case history problem
     * @param {Number} payload.facilityId
     * @param {Number} payload.caseHistoryId
     */
    async getCaseHistoryConditions (payload) {
      return await securedJsonRequest.post(
        '/patientportal/getcasehistoryconditions',
        payload
      )
    },
    /**
     * Method to update case history conditions
     * @param {Object} Payload request object for updating case history problem
     * @param {String} payload.facilityId
     * @param {String} payload.caseHistoryId
     * @param {Array.<{ description: String, present: Boolean, notPresent: Boolean, past: Boolean }} conditions
     */
    async updateCaseHistoryConditions (payload) {
      return await securedJsonRequest.post(
        '/patientportal/updatecasehistoryconditions',
        payload
      )
    },
    /**
     * Method to clear case history conditions
     * @param {Object} Payload request object for clearing case history problem
     * @param {String} payload.facilityId
     * @param {String} payload.caseHistoryId
     */
    async clearCaseHistoryConditions (payload) {
      return await securedJsonRequest.post(
        '/patientportal/clearcasehistoryconditions',
        payload
      )
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {String} payload.facilityId
     * @param {String} payload.caseHistoryId
     */
    async getCaseHistoryFamilyHealthHistory (payload) {
      return await securedJsonRequest.post(
        '/patientportal/getcasehistoryfamilyhealthhistory',
        payload
      )
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {String} payload.facilityId
     * @param {String} payload.id the id of the record
     */
    async deleteCaseHistoryFamilyHealthHistory (payload) {
      return await securedJsonRequest.post(
        '/patientportal/DeleteCaseHistoryFamilyHealthHistory',
        payload
      )
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {Number} payload.facilityid
     * @param {Number} payload.caseHistoryId
     * @param {Number} payload.id the id of the record otherwise set to 0 to insert new record
     * @param {String} payload.description
     * @param {String} payload.relation
     * @param {Boolean} payload.present
     * @param {Boolean} payload.notPresent
     * @param {Boolean} payload.past
     * @param {Boolean} payload.unknown
     */
    async updateCaseHistoryFamilyHealthHistory (payload) {
      return await securedJsonRequest.post(
        '/patientportal/UpdateCaseHistoryFamilyHealthHistory',
        payload
      )
    },
    /**
     *
     * @param {Number} payload.facilityID
     * @param {Number} payload.caseHistoryId
     * @param {Object} payload.histories
     */
    async insertCaseHistoryFamilyHealthHistory (payload) {
      return await securedJsonRequest.post(
        '/patientportal/insertcasehistoryfamilyhealthhistory',
        payload
      )
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
      return await securedJsonRequest.post(
        '/patientportal/updatepatient',
        payload
      )
    },
    /**
     * @param {String} payload.facilityId
     * @param {String} payload.patientId
     * @param {String} payload.field
     * @param {String} payload.value
     */
    async updatePatientField (payload) {
      return await securedJsonRequest.post(
        '/patientportal/updatepatientfield',
        payload
      )
    },
    /**
     * Method to update case history conditions
     * @param {Object} Payload request object for updating case history problem
     * @param {String} payload.facilityId
     * @param {String} payload.caseHistoryId
     * @param {String} payload.code
     * @param {String} payload.value
     */
    async updateCaseHistoryAaValue (payload) {
      return await securedJsonRequest.post(
        '/patientportal/updatecasehistoryaavalue',
        payload
      )
    },
    /**
     * Method to update case history conditions
     * @param {Object} Payload request object for updating case history problem
     * @param {String} payload.facilityId
     * @param {String} payload.caseHistoryId
     * @param {Object} payload.values
     */
    async updateCaseHistoryAaValues (payload) {
      return await securedJsonRequest.post(
        '/patientportal/updatecasehistoryaavalues',
        payload
      )
    },
    /**
     * Method to update case history conditions
     * @param {Object} Payload request object for updating case history problem
     * @param {String} payload.facilityId
     * @param {String} payload.caseHistoryId
     * @param {Object} payload.values
     */
    async getOatAnswerList (payload) {
      return await securedJsonRequest.post(
        '/patientportal/GetOatAnswerList',
        payload
      )
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {String} payload.facilityid
     * @param {String} payload.caseHistoryId
     */
    async getCaseHistoryOats (payload) {
      return await securedJsonRequest.post(
        '/patientportal/GetCaseHistoryOats',
        payload
      )
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
      return await securedJsonRequest.post(
        '/patientportal/GetCaseHistoryOatQuestions',
        payload
      )
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {String} payload.facilityid
     * @param {Number} payload.caseHistoryProblemId
     * @param {Object} payload.questionList
     */
    async updateCaseHistoryProblemOats (payload) {
      return await securedJsonRequest.post(
        '/patientportal/UpdateCaseHistoryProblemOats',
        payload
      )
    },
    /**
     *
     * @param {Number} facilityId facilityid
     */
    async getEthnicityList (payload) {
      return await securedJsonRequest.get(
        '/patientportal/getEthnicityList/' + payload
      )
    },
    /**
     *
     * @param {Number} facilityId facilityid
     */
    async getRaceList (payload) {
      return await securedJsonRequest.get(
        '/patientportal/GetRaceList/' + payload
      )
    },
    /**
     *
     * @param {Number} facilityId facilityid
     */
    async getLanguageList (payload) {
      return await securedJsonRequest.get(
        '/patientportal/GetLanguageList/' + payload
      )
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {Number} payload.facilityid
     * @param {Number} payload.caseHistoryId
     * @param {String} payload.ethnicity
     * @param {String} payload.races
     * @param {String} payload.languages
     * @param {String} payload.declineEthnicity
     * @param {String} payload.declineRace
     * @param {String} payload.declineLanguage
     */
    async updateCaseHistoryDemographic (payload) {
      return await securedJsonRequest.post(
        '/patientportal/UpdateCaseHistoryDemographic',
        payload
      )
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {Number} payload.facilityid
     * @param {Number} payload.caseHistoryId
     * @param {Array.<{ description: String, answer: String }} questions
     */
    async updateCaseHistoryQuestions (payload) {
      return await securedJsonRequest.post(
        '/patientportal/UpdateCaseHistoryQuestions',
        payload
      )
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {Number} payload.facilityid
     * @param {Number} payload.caseHistoryId
     */
    async getCaseHistoryQuestions (payload) {
      return await securedJsonRequest.post(
        '/patientportal/GetCaseHistoryQuestions',
        payload
      )
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {Number} payload.facilityid
     * @param {Number} payload.caseHistoryId
     */
    async getCaseHistoryDemographic (payload) {
      return await securedJsonRequest.post(
        '/patientportal/GetCaseHistoryDemographic',
        payload
      )
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {Number} payload.facilityid
     * @param {Number} payload.caseHistoryId
     */
    async updateCaseHistoryComplete (payload) {
      return await securedJsonRequest.post(
        '/patientportal/UpdateCaseHistoryComplete',
        payload
      )
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {Number} payload.facilityid
     * @param {Number} payload.caseHistoryId
     */
    async getCaseHistoryAaValues (payload) {
      return await securedJsonRequest.post(
        '/patientportal/GetCaseHistoryAaValues',
        payload
      )
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {Number} payload.facilityid Facility ID where the patient is assoicated
     * @param {Number} payload.id ID of the task to tag as complete
     * @param {Number} payload.patientId ID  of the patient associated to the task
     */
    async updateTaskComplete (payload) {
      return await securedJsonRequest.post(
        '/patientportal/updatetaskcomplete',
        payload
      )
    },
    /**
     * Get the task info via the taskId
     * @param {Number} facilityformid ID of the task
     */
    async getFacilityFormJson (facilityformid, patientid) {
      return await securedJsonRequest.get(`/form/getfacilityformjson/${facilityformid}`)
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {Number} payload.facilityformid
     * @param {Number} payload.patientid
     */
    async getFacilityFormJsonQueryObj (payload) {
      return await securedJsonRequest.post(
        '/form/GetFacilityFormJson',
        payload
      )
    },
    /**
     *
     * @param {Object} Payload request object
     * @param {Number} payload.facilityformid
     * @param {Number} payload.patientid
     * @param {String} payload.data
    */
    async insertPatientForm (payload) {
      return await securedJsonRequest.post(
        '/form/insertPatientForm',
        payload
      )
    },
    /**
     *
     * @param {Number} payload.facilityid Facility ID where the patient is assoicated
     * @param {Number} payload.patientId ID  of the patient associated to the task
     * @param {String} payload.description
     * @param {String} payload.base64
     * @param {String} payload.folder
     */
    async uploadPatientForm (payload) {
      return await securedJsonRequest.post(
        '/patientportal/uploadpatientform',
        payload
      )
    },
    /**
     *
     * @param {Number} payload.facilityid Facility ID where the patient is assoicated
     * @param {Number} payload.patientId ID  of the patient associated to the task
     * @param {String} payload.relation
     * @param {String} payload.firstname
     * @param {String} payload.mi
     * @param {String} payload.dob
     */
    async insertInsuranceInfo (payload) {
      return await securedJsonRequest.post(
        '/patientportal/InsertInsuranceInfo',
        payload
      )
    },
    /**
     * @param {Number} payload.facilityid Facility ID where the patient is assoicated
     * @param {String} payload.patientId Base64
     * @param {String} payload.dataUri
     */
    async virusScan (payload) {
      return await securedJsonRequest.post(
        '/clam/VirusScan',
        payload
      )
    },
    /**
     * @param {Number} payload.facilityId
     * @param {Number} payload.id
     * @param {Boolean} payload.aa
     * @param {Boolean} payload.wc
     */
    async updateCaseHistory (payload) {
      return await securedJsonRequest.post(
        '/patientportal/UpdateCaseHistory',
        payload
      )
    }
  }
}
