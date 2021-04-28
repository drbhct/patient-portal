<template>
  <div>
    <div class="row mt-5 mr-2 ml-2 justify-content-md-center">
      <div class="col-lg-5">
        <div class="row mb-3 justify-content-md-center">
          <div class="col-xl-8 mb-3">
            <section class="card card-featured card-featured-primary mb-4 mt-4">
              <header class="card-header">
                <h2 class="card-title">Account Setup</h2>
              </header>
              <div class="card-body">
                <form @submit.prevent="submitForm">
                  <div class="form-group">
                    <div class="alert alert-info" role="alert">
                      <p><i class="fas fa-info-circle mr-1"></i>Create account for patient <strong>{{ patientInfo.firstName }} {{ patientInfo.lastName }}</strong>.<br>
                        Click <strong>Login instead</strong> if you wish to associate patient to existing user.
                      </p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input
                      v-model="form.email"
                      type="email"
                      class="form-control form-control"
                      placeholder="Email"
                      required
                      autocomplete="username"
                    />
                  </div>
                  <div class="form-group mb-4">
                    <label>Password</label>
                    <div class="input-group mb-3">
                      <span class="input-group-prepend">
                        <span
                          class="input-group-text"
                          @click="showPassword = !showPassword"
                        >
                          <i
                            :class="{
                              'far fa-eye': !showPassword,
                              'far fa-eye-slash': showPassword,
                            }"
                          ></i>
                        </span>
                      </span>
                      <input
                        v-model="form.password"
                        @input="checkPassword"
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control"
                        placeholder="Password"
                        maxlength="50"
                        minlength="8"
                        required
                        autocomplete="new-password"
                      />
                    </div>
                    <ul>
                      <li
                        v-bind:class="{ is_valid: contains_eight_characters }"
                      >
                        8 Characters
                      </li>
                      <li v-bind:class="{ is_valid: contains_number }">
                        Contains Number
                      </li>
                      <li v-bind:class="{ is_valid: contains_uppercase }">
                        Contains Uppercase
                      </li>
                      <li
                        v-bind:class="{ is_valid: contains_special_character }"
                      >
                        Contains Special Character
                      </li>
                    </ul>
                  </div>
                  <div class="form-group mb-4">
                    <label>Confirm Password</label>
                    <div class="input-group mb-3">
                      <span class="input-group-prepend">
                        <span
                          class="input-group-text"
                          @click="showConfirmPassword = !showConfirmPassword"
                        >
                          <i
                            :class="{
                              'far fa-eye': !showConfirmPassword,
                              'far fa-eye-slash': showConfirmPassword,
                            }"
                          ></i>
                        </span>
                      </span>
                      <input
                        v-model="form.confirmPassword"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        class="form-control"
                        placeholder="Confirm Password"
                        maxlength="50"
                        minlength="8"
                        required
                        autocomplete="new-password"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <btn-saving :is-saving="isSaving" />
                    <!-- <button type="submit" class="mb-1 mt-1 mr-5 btn btn-primary">Create Account</button> -->
                  </div>
                  <div class="form-group">
                    <h5>
                      Existing account?
                      <a href="javascript:void(0)" @click="gotoLogin">Login instead</a>
                    </h5>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BtnSaving from '../../components/button-saving.vue'
import api from '../../api/http-common.js'
import { mapActions } from 'vuex'
export default {
  components: {
    BtnSaving
  },
  props: {
    linkInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isSaving: false,
      form: {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        MobilePhone: ''
      },
      showPassword: false,
      showConfirmPassword: false,
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      patientInfo: null
    }
  },
  computed: {
    key () {
      return this.$route.query.key
    }
  },
  methods: {
    ...mapActions([
      'setIsLoading',
      'setProfileAuthInfo',
      'setTaskCurrentTaskType',
      'setProfilePatientAssociated',
      'setProfileCurrentPatient'
    ]),
    checkPassword () {
      this.password_length = this.form.password.length
      const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/

      if (this.password_length > 8) {
        this.contains_eight_characters = true
      } else {
        this.contains_eight_characters = false
      }

      this.contains_number = /\d/.test(this.form.password)
      this.contains_uppercase = /[A-Z]/.test(this.form.password)
      this.contains_special_character = format.test(this.form.password)

      if (
        this.contains_eight_characters === true &&
        this.contains_special_character === true &&
        this.contains_uppercase === true &&
        this.contains_number === true
      ) {
        this.valid_password = true
      } else {
        this.valid_password = false
      }
    },
    async submitForm () {
      if (!this.valid_password) {
        let error = ''
        if (!this.contains_eight_characters) {
          error = 'Password should have a minimum length of 8 characters.'
        }
        if (!this.contains_number) {
          error = 'Password should contain at least 1 number.'
        }
        if (!this.contains_uppercase) {
          error = 'Password should contain at least 1 upper case.'
        }
        if (!this.contains_special_character) {
          error = 'Password should contain at least 1 special character.'
        }
        this.$swal({
          position: 'top',
          title: 'Password error',
          text: error,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'error'
        })
        return
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.$swal({
          position: 'top',
          title: 'Password error',
          text: 'Confirm password doest not match.',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'error'
        })
        return
      }

      const exist = await api.auth.request.isUserExists(this.form.email)
      if (exist.data) {
        this.$swal({
          position: 'top',
          title: 'Email is already in used.',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'error'
        })
        return
      }

      this.isSaving = true

      const getPatientResp = await api.auth.request.getPatient({
        facilityId: this.linkInfo.facilityID,
        patientId: this.linkInfo.patientID
      })
      const patientInfo = getPatientResp.data
      const insertUserRes = await api.auth.request.insertUser({
        email: this.form.email,
        pwd: this.form.password,
        firstName: patientInfo.firstName,
        lastName: patientInfo.lastName,
        nickName: patientInfo.nickName,
        mobilePhone: patientInfo.cellPhone
      })

      if (this.linkInfo) {
        await api.auth.request.insertUserPatient({
          patientPortalUserID: insertUserRes.data,
          facilityId: this.linkInfo.facilityID,
          patientId: this.linkInfo.patientID,
          firstName: patientInfo.firstName,
          lastName: patientInfo.lastName
        })
      }

      const response = await api.auth.request.validateUserNoToken({
        username: this.form.email,
        password: this.form.password,
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        MobilePhone: this.form.mobilePhone
      })
      await this.setProfileAuthInfo(response.data)
      const patientAssosicated = await api.auth.request.getUserPatient(
        insertUserRes.data
      )
      this.setProfilePatientAssociated(patientAssosicated.data)
      this.setProfileCurrentPatient(patientAssosicated.data[0])

      setTimeout(() => {
        this.isSaving = false
        this.setTaskCurrentTaskType('PatientInfo')
      }, 2000)
      // this.$router.push('/')
    },
    async gotoLogin () {
      this.$auth.logout()
      this.$router.push({ path: '/account/login', query: { key: this.key } })
    }
  },
  async mounted () {
    const getPatientResp = await api.auth.request.getPatient({
      facilityId: this.linkInfo.facilityID,
      patientId: this.linkInfo.patientID
    })

    this.patientInfo = getPatientResp.data
  }
}
</script>

<style scoped>
ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

li {
  margin-bottom: 8px;
  color: #525f7f;
  position: relative;
}

/* Checkmark & Strikethrough --------- */

.is_valid {
  color: rgba(136, 152, 170, 0.8);
  text-decoration: line-through;
  text-decoration-color: green;
}
.is_valid:before {
  width: 100%;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
