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
                      <p>
                        <i class="fas fa-info-circle mr-1"></i>Create account
                        for patient
                        <strong
                          >{{ patientInfo.firstName }}
                          {{ patientInfo.lastName }}</strong
                        >.<br />
                        <strong
                          ><a href="javascript:void(0)" @click="gotoLogin"
                            >LOG IN</a
                          ></strong
                        >
                        if you wish to associate a patient to an existing user.
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
                      id="em"
                      tabindex="0"
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
                              'far fa-eye-slash': showPassword
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
                        At least 8 characters
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
                              'far fa-eye-slash': showConfirmPassword
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
                      <a href="javascript:void(0)" @click="gotoLogin"
                        >Login instead</a
                      >
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
import { useTaskStore } from '@/stores/task'
import { useProfileStore } from '@/stores/profile'
import { useConfigStore } from '@/stores/config'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

export default {
  name: 'CreateAccount',
  components: {
    BtnSaving
  },
  props: {
    linkInfo: {
      type: Object,
      required: true
    }
  },
  setup() {
    const taskStore = useTaskStore()
    const profileStore = useProfileStore()
    const configStore = useConfigStore()
    const authStore = useAuthStore()

    const { getTaskIsAccessOnly, getTaskIsAccessOnlyRoute } =
      storeToRefs(taskStore)

    return {
      taskStore,
      profileStore,
      configStore,
      authStore,
      getTaskIsAccessOnly,
      getTaskIsAccessOnlyRoute
    }
  },
  data() {
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
    key() {
      return this.$route.query.key
    }
  },
  methods: {
    setIsLoading(value) {
      this.configStore.setIsLoading(value)
    },
    setProfileAuthInfo(info) {
      this.profileStore.setProfileAuthInfo(info)
    },
    setTaskCurrentTaskType(type) {
      this.taskStore.setCurrentTaskType(type)
    },
    setProfilePatientAssociated(patients) {
      this.profileStore.setProfilePatientAssociated(patients)
    },
    setProfileCurrentPatient(patient) {
      this.profileStore.setCurrentPatient(patient)
    },
    checkPassword() {
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
    async submitForm() {
      try {
        await this.authStore.createAccount(this.form)
        this.$toast.success('Account created successfully')
        await this.gotoLogin()
      } catch (error) {
        console.error('Error creating account:', error)
        this.$toast.error('Failed to create account')
      }
    },
    async gotoLogin() {
      this.$router.push('/account/login')
    }
  },
  async mounted() {
    const getPatientResp = await api.auth.request.getPatient({
      facilityId: this.linkInfo.facilityID,
      patientId: this.linkInfo.patientID
    })

    this.patientInfo = getPatientResp.data

    setTimeout(() => {
      document.getElementById('em').focus()
    }, 500)
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
