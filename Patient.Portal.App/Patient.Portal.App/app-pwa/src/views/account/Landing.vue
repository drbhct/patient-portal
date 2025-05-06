<template>
  <div class="content-body">
    <div class="modal fade" tabindex="-1" role="dialog" id="addPatientModal">
      <div class="modal-dialog" role="document">
        <form @submit.prevent="patientAttach">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title label">
                Logging in with attach patient info
              </h5>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label class="label f-weight-550">Patient</label>
                <div class="col-md-10 details" v-if="attachPatientInfo">
                  <blockquote>
                    <h5>
                      {{ attachPatientInfo.firstName }}
                      {{ attachPatientInfo.lastName }}
                      - Account No: {{ attachPatientInfo.acctNo }}
                    </h5>
                    <p>
                      {{ attachPatientInfo.address }} <br />
                      {{ attachPatientInfo.city }} <br />
                    </p>
                  </blockquote>
                </div>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    v-model="confirmLink"
                  />
                  <label class="form-check-label"
                    >Confirm link patient to account</label
                  >
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="patientSelection">
      <div class="modal-dialog" role="document">
        <div>
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title label">Multiple Patients</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <label class="label f-weight-550"
                >Select the patient record you would like to manage</label
              >
              <button
                type="button"
                class="mb-1 mt-1 mr-1 btn btn-default btn-lg btn-block"
                v-for="patient in patientList"
                :key="patient.id"
                @click="patientSelect(patient)"
              >
                {{ patient.firstName }} {{ patient.lastName }}
                <h6>
                  {{ patient.officeName }}
                </h6>
              </button>

              <!-- <div class="form-group">
                <label class="label f-weight-550">Select the patient record you would like to manage</label>
                <select v-model="selectedPatient" required class="form-control">
                  <option
                    v-for="patient in patientList"
                    :value="patient"
                    :key="patient.id"
                  >
                    {{ patient.firstName }} {{ patient.lastName }}
                  </option>
                </select>
              </div> -->
            </div>
            <!-- <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Select</button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5 mr-2 ml-2 justify-content-md-center">
      <div class="col-lg-5 mt-5">
        <section class="card card-featured mb-4">
          <div class="card-body">
            <form @submit.prevent="login">
              <span>
                <h3 class="label">PORTAL LOGIN</h3>
              </span>
              <!-- to error: add class "has-danger" -->
              <div class="form-group">
                <label class="label f-weight-550">Email Address</label>
                <input
                  type="email"
                  class="form-control form-control-sm"
                  required
                  v-model="loginForm.userName"
                />
              </div>
              <div class="form-group mb-4">
                <label class="label f-weight-550">Password</label>
                <!-- <a href="#" style="float:right;font-size:12px;">Forgot password?</a> -->
                <input
                  type="password"
                  class="form-control form-control-sm"
                  required
                  v-model="loginForm.password"
                />
              </div>
              <!-- <btn-saving
                :is-saving="isSaving"
                :loading-text="'Validating...'"
                :display-text="'Login'"
              /> -->
              <button type="submit" class="mb-1 mt-1 mr-5 btn btn-primary">
                Login
              </button>
              <router-link to="/account/forgotpassword" class="ml-3">
                Need help logging in?
              </router-link>
              <!-- <a href="javascript:void(0)" class="ml-3"
                >Need help logging in?</a
              > -->
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/FormLayout.css'
import api from '../../api/http-common.js'
import BtnSaving from '../../components/button-saving.vue'
import { useProfileStore } from '@/stores/profile'
import { useTaskStore } from '@/stores/task'
import { useConfigStore } from '@/stores/config'
import { storeToRefs } from 'pinia'

export default {
  name: 'LandingPage',
  components: {
    BtnSaving
  },
  setup() {
    const profileStore = useProfileStore()
    const taskStore = useTaskStore()
    const configStore = useConfigStore()

    const { currentPatientAssociated } = storeToRefs(profileStore)
    const { getUrlLinkInfo, getTaskInfo } = storeToRefs(taskStore)

    return {
      profileStore,
      taskStore,
      configStore,
      currentPatientAssociated,
      getUrlLinkInfo,
      getTaskInfo
    }
  },
  data() {
    return {
      isSaving: false,
      loginForm: {
        userName: '',
        password: ''
      },
      patientList: [],
      selectedPatient: null,
      profileAuthInfo: null,
      attachPatientInfo: null,
      linkInfo: null,
      confirmLink: false
    }
  },
  methods: {
    setIsLoading(value) {
      this.configStore.setIsLoading(value)
    },
    setProfileAuthInfo(info) {
      this.profileStore.setProfileAuthInfo(info)
    },
    setProfilePatientAssociated(patients) {
      this.profileStore.setProfilePatientAssociated(patients)
    },
    setProfileCurrentPatient(patient) {
      this.profileStore.setCurrentPatient(patient)
    },
    async login() {
      this.isSaving = true
      const userData = await this.$auth.login(
        this.loginForm.userName,
        this.loginForm.password
      )
      if (!userData) {
        this.$swal({
          toast: true,
          position: 'top-end',
          title: 'Authentication Failed',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'error'
        })
        this.isSaving = false
        return
      }
      // get url link info
      if (this.getUrlLinkInfo) {
        const pLookup = await api.task.request.patientLookup({
          facilityId: this.getUrlLinkInfo.facilityID,
          patientId: this.getUrlLinkInfo.patientID
        })
        if (!pLookup.data) {
          // get patient info
          const patientInfo_ = await api.task.request.getPatient({
            facilityId: this.getUrlLinkInfo.facilityID,
            patientId: this.getUrlLinkInfo.patientID
          })

          // insert patient info
          if (patientInfo_.data) {
            await api.auth.request.insertUserPatient({
              patientPortalUserID: userData.id,
              facilityId: this.getUrlLinkInfo.facilityID,
              patientId: this.getUrlLinkInfo.patientID,
              firstName: patientInfo_.data.firstName,
              lastName: patientInfo_.data.lastName
            })
          }
        }
      }

      const resp = await api.auth.request.getLink(this.$route.query.key)
      this.linkInfo = resp.data

      this.profileAuthInfo = userData
      const patientAssosicated = await api.auth.request.getUserPatient(
        this.profileAuthInfo.id
      )

      if (this.$route.query.key) {
        const getPatientResp = await api.auth.request.getPatient({
          facilityId: this.linkInfo.facilityID,
          patientId: this.linkInfo.patientID
        })
        this.attachPatientInfo = getPatientResp.data

        // Check if account already exist
        const isPatientExist = patientAssosicated.data.find(
          (el) =>
            el.patientID === this.linkInfo.patientID &&
            el.facilityID === this.linkInfo.facilityID
        )
        // console.log('isPatientExist', isPatientExist)
        if (isPatientExist) {
          this.patientList = patientAssosicated.data
          // eslint-disable-next-line no-undef
          $('#patientSelection').modal({
            show: true,
            backdrop: 'static'
          })
          return
        }
        console.log('attachPatientInfo', this.attachPatientInfo)
        // eslint-disable-next-line no-undef
        $('#addPatientModal').modal({
          show: true,
          backdrop: 'static'
        })
        return
      }

      if (patientAssosicated.data.length > 1) {
        this.patientList = patientAssosicated.data
        // eslint-disable-next-line no-undef
        $('#patientSelection').modal({
          show: true,
          backdrop: 'static'
        })
      } else {
        await this.setProfileAuthInfo(this.profileAuthInfo)
        this.setProfilePatientAssociated(patientAssosicated.data)
        await this.setProfileCurrentPatient(patientAssosicated.data[0])
        this.isSaving = false
        this.$auth.completeAuth()
        this.gotoTask() // added by Rizza Herrero 05/05/2021
        // this.$router.push('/') commented out by Rizza Herrero 05/05/2021
      }
    },
    async patientSelect(patient) {
      if (patient) {
        this.selectedPatient = patient
      }
      this.setProfilePatientAssociated(this.patientList)
      await this.setProfileCurrentPatient(this.selectedPatient)
      // eslint-disable-next-line no-undef
      $('#patientSelection').modal('hide')
      await this.setProfileAuthInfo(this.profileAuthInfo)
      this.isSaving = false
      this.$auth.completeAuth()
      this.gotoTask() // added by Rizza Herrero 05/05/2021
      // this.$router.push('/') commented out by Rizza Herrero 05/05/2021
    },
    async patientAttach() {
      if (this.confirmLink) {
        await api.auth.request.insertUserPatient({
          patientPortalUserID: this.profileAuthInfo.id,
          facilityId: this.linkInfo.facilityID,
          patientId: this.linkInfo.patientID,
          firstName: this.attachPatientInfo.firstName,
          lastName: this.attachPatientInfo.lastName
        })
        // eslint-disable-next-line no-undef
        $('#addPatientModal').modal('hide')
      }

      const patientAssosicated = await api.auth.request.getUserPatient(
        this.profileAuthInfo.id
      )

      if (patientAssosicated.data.length > 1) {
        this.patientList = patientAssosicated.data
        // eslint-disable-next-line no-undef
        $('#patientSelection').modal({
          show: true,
          backdrop: 'static'
        })
      } else {
        await this.setProfileAuthInfo(this.profileAuthInfo)
        this.setProfilePatientAssociated(patientAssosicated.data)
        await this.setProfileCurrentPatient(patientAssosicated.data[0])
        this.isSaving = false
        this.$auth.completeAuth()
        this.gotoTask() // added by Rizza Herrero 05/05/2021
        // this.$router.push('/') commented out by Rizza Herrero 05/05/2021
      }
    },
    async gotoTask() {
      const res = await api.patient.request.gettasks({
        facilityId: this.currentPatientAssociated.facilityID,
        patientId: this.currentPatientAssociated.patientID
      })
      const taskList = res.data
      let taskRes
      if (taskList.length === 1) {
        switch (taskList[0].taskType) {
          case 'MSG':
            taskRes = await api.task.request.getSpecificTask(taskList[0].taskID)

            this.setCurrentMsgInfo({
              id: parseInt(taskRes.data.info),
              subject: ''
            })
            this.setMsgCurrentPage('Detail')
            this.$router.push({ path: '/menu/messages' })
            break
          case 'STMT':
            taskRes = await api.task.request.getSpecificTask(taskList[0].taskID)
            this.setBillingStatementTask(taskRes.data)
            this.$router.push({ path: '/menu/statement' })
            break
          case 'FORM':
            if (taskList[0].taskID > 0) {
              const info = JSON.parse(taskList[0].info)
              const routeData = this.$router.resolve({
                name: 'HandlerForm',
                query: {
                  i: info.FacilityFormID,
                  t: info.FormName,
                  p: info.Data.PatientName,
                  pid: taskList[0].patientID,
                  tid: taskList[0].taskID
                }
              })
              // window.open(routeData.href, '_blank')
              const isMobileDevice = window.navigator.userAgent
                .toLowerCase()
                .includes('mobi')
              if (isMobileDevice) {
                window.location.href = routeData.href
              } else {
                const newWindow = window.open(routeData.href, '_blank')
                setTimeout(function () {
                  newWindow.document.title = info.Action + ': ' + info.FormName
                }, 100)
              }
            } else {
              await this.setTaskCurrentTaskType(taskList[0].taskType)
              await this.$router.push({ path: '/task' })
            }
            break
          case 'INS':
            var taskinfo = JSON.parse(taskList[0].info)
            taskinfo.TaskType = taskList[0].taskType
            taskinfo.TaskID = taskList[0].taskID
            this.setTaskInfo(JSON.stringify(taskinfo))
            await this.setTaskCurrentTaskType(taskList[0].taskType)
            await this.$router.push({ path: '/task' })
            break
          case 'CH':
            this.setTaskInfo('')
            this.setTaskItem(taskList[0])
            await this.setTaskCurrentTaskType(taskList[0].taskType)
            await this.$router.push({ path: '/task' })
            break
          default:
            await this.setTaskCurrentTaskType(taskList[0].taskType)
            await this.$router.push({ path: '/task' })
            break
        }
      } else {
        this.$router.push('/')
      }
    }
    // async insertUserPatient() {
    //   let urllinkInfo = this.getUrlLinkInfo
    //   if (urllinkInfo) {
    //     // Insert User Patient
    //     await api.auth.request.insertUserPatient({
    //       patientPortalUserID: this.profileAuthInfo.id,
    //       facilityId: urllinkInfo.facilityID,
    //       patientId: urllinkInfo.patientID,
    //       firstName: this.attachPatientInfo.firstName,
    //       lastName: this.attachPatientInfo.lastName
    //     })
    //   }
    // }
  },
  mounted() {
    // Check if already login
    // if (this.$auth.isAuthenticated()) {
    //   this.gotoTask()
    // }
    // localStorage.clear()
    // this.$auth.logout()
  }
}
</script>

<style scoped></style>
