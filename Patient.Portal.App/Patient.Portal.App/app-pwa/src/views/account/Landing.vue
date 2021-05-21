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
        <form @submit.prevent="patientSelect">
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
              <div class="form-group">
                <label class="label f-weight-550">Patient</label>
                <select v-model="selectedPatient" required class="form-control">
                  <option
                    v-for="patient in patientList"
                    :value="patient"
                    :key="patient.id"
                  >
                    {{ patient.firstName }} {{ patient.lastName }}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Select</button>
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
                <label class="label f-weight-550">Username</label>
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
              <button type="submit" class="mb-1 mt-1 mr-5 btn btn-primary">
                Login
              </button>
              <a href="javascript:void(0)" class="ml-3">Need help logging in?</a>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
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
  computed: {
    ...mapGetters(['currentPatientAssociated'])
  },
  methods: {
    ...mapActions([
      'setIsLoading',
      'setProfileAuthInfo',
      'setProfilePatientAssociated',
      'setProfileCurrentPatient',
      'setTaskCurrentTaskType'
    ]),
    async login () {
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
        return
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
          (el) => el.patientID === this.attachPatientInfo.id
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
        this.$auth.completeAuth()
        this.gotoTask() // added by Rizza Herrero 05/05/2021
        // this.$router.push('/') commented out by Rizza Herrero 05/05/2021
      }
    },
    async patientSelect () {
      this.setProfilePatientAssociated(this.patientList)
      await this.setProfileCurrentPatient(this.selectedPatient)
      // eslint-disable-next-line no-undef
      $('#patientSelection').modal('hide')
      await this.setProfileAuthInfo(this.profileAuthInfo)
      this.$auth.completeAuth()
      this.gotoTask() // added by Rizza Herrero 05/05/2021
      // this.$router.push('/') commented out by Rizza Herrero 05/05/2021
    },
    async patientAttach () {
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
        this.$auth.completeAuth()
        this.gotoTask() // added by Rizza Herrero 05/05/2021
        // this.$router.push('/') commented out by Rizza Herrero 05/05/2021
      }
    },
    async gotoTask () {
      const res = await api.patient.request.gettasks({
        facilityId: this.currentPatientAssociated.facilityID,
        patientId: this.currentPatientAssociated.patientID
      })
      const taskList = res.data
      if (taskList.length === 1) {
        await this.setTaskCurrentTaskType(taskList[0].taskType)
        await this.$router.push({ path: '/task' })
      } else {
        this.$router.push('/')
      }
    }
  },
  mounted () {
    // Check if already login
    if (this.$auth.isAuthenticated()) {
      this.gotoTask()
    }
    // localStorage.clear()
    // this.$auth.logout()
  }
}
</script>

<style>
</style>
