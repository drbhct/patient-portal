<template>
  <div>
    <div class="modal" tabindex="-1" role="dialog" id="patientSelection">
      <div class="modal-dialog" role="document">
        <form @submit.prevent="patientSelect">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title label">Multiple Patient(s)</h5>
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

    <div class="row mt-5 mr-2 ml-2">
      <div class="col-lg-6 mt-5">
        <div class="row mb-3 justify-content-md-center">
          <div class="col-xl-8 mb-3">
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
                  <a href="#" class="ml-3">Need help logging in?</a>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div class="col-lg-5 mb-5 mt-5 d-none d-sm-block">
        <img
          data-src="holder.js/100px250"
          class="img-fluid"
          alt="100%x250"
          src="img/stock office.jpg"
          data-holder-rendered="true"
        />
      </div>
    </div>
    <div class="row mt-5 mr-2 ml-2">
      <div class="col-lg-5 mb-5 order-2 order-sm-1">
        <div class="row mb-3 justify-content-md-center">
          <div class="col-xl-8 mb-5">
            <p class="text-left">Your Patient Portal</p>
            <p class="text-justify">
              Access health information online, instead of over the phone or in
              person. The patient portal allows you to:
            </p>
            <span class="text-left ml-3">
              <ul>
                <li>Keep contact information current</li>
                <li>Request appointments</li>
                <li>Pay statements and view</li>
                <li>Access documents</li>
                <li>And much more</li>
              </ul>
            </span>
            <p class="text-left">
              If you have any questions or concerns, please feel free to contact
              us. Were here to help!
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-5 mb-5 order-1 order-sm-2">
        <div class="row mb-3 justify-content-md-center">
          <div class="col-xl-8 mb-5">
            <span class="text-center">
              <h2>Office Information</h2>
            </span>
            <p class="text-center">
              <strong>Phone:</strong> (702) 555-1212
              <br />
              <strong>Office Hours:</strong> 9 am - 5 pm M-F
            </p>
            <p class="text-center">
              1234 Main St.
              <br />Cleveland, OH 444142 <br />44142
            </p>
          </div>
          <div class="col-xl-8 mb-5">
            <iframe
              width="520"
              height="400"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              id="gmap_canvas"
              src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=%20General%20Trias+(Demo)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
            <a href="https://www.embed-map.net/">add google map</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/FormLayout.css'
import api from '../../api/http-common.js'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      patientList: [],
      selectedPatient: null
    }
  },
  methods: {
    ...mapActions([
      'setIsLoading',
      'setProfileAuthInfo',
      'setProfilePatientAssociated',
      'setProfileCurrentPatient'
    ]),
    async login () {
      this.setIsLoading(true)

      const apiRes = await api.auth.request.apiLogin()
      // this.$cookies.set('user', apiRes.data, 60 * 60 * 12)
      localStorage.setItem('config', apiRes.data.token)

      const response = await api.auth.request.validateUser(
        this.loginForm,
        apiRes.data.token
      )
      this.setIsLoading(false)

      if (!response.data) {
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
      // this.$swal({
      //   position: 'top',
      //   title: 'Authentication Success',
      //   showConfirmButton: false,
      //   timerProgressBar: true,
      //   timer: 1000,
      //   icon: 'success'
      // })

      await this.setProfileAuthInfo(response.data)
      const patientAssosicated = await api.auth.request.getUserPatient(
        response.data.id
      )
      if (patientAssosicated.data.length > 1) {
        this.patientList = patientAssosicated.data
        // eslint-disable-next-line no-undef
        $('#patientSelection').modal({
          show: true,
          backdrop: 'static'
        })
      } else {
        this.setProfilePatientAssociated(patientAssosicated.data)
        await this.setProfileCurrentPatient(patientAssosicated.data[0])
        this.$router.push('/')
      }
    },
    async patientSelect () {
      this.setProfilePatientAssociated(this.patientList)
      await this.setProfileCurrentPatient(this.selectedPatient)
      // eslint-disable-next-line no-undef
      $('#patientSelection').modal('hide')
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
