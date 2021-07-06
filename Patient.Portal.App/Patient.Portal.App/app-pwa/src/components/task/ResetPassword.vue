<template>
  <section role="main">
    <form
      @submit.prevent="submit"
      class="mt-5 mr-2 ml-2 justify-content-md-center"
    >
      <div class="col">
        <div class="row justify-content-md-center">
          <div class="col-xl-5">
            <section class="card">
              <header class="card-header">
                <h2 class="card-title">Reset Password</h2>
              </header>
              <div class="card-body">
                <div class="form-group">
                  <div class="alert alert-info" role="alert">
                    <p>
                      <i class="fas fa-info-circle mr-1"></i>
                      Please type your new password
                    </p>
                  </div>
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
                    <li v-bind:class="{ is_valid: contains_eight_characters }">
                      8 Characters
                    </li>
                    <li v-bind:class="{ is_valid: contains_number }">
                      Contains Number
                    </li>
                    <li v-bind:class="{ is_valid: contains_uppercase }">
                      Contains Uppercase
                    </li>
                    <li v-bind:class="{ is_valid: contains_special_character }">
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
              </div>
              <div class="card-footer">
                <div class="form-group">
                  <btn-saving :is-saving="isSaving" />
                  <!-- <button type="submit" class="mb-1 mt-1 mr-5 btn btn-primary">Create Account</button> -->
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import api from '../../api/http-common.js'
import BtnSaving from '../../components/button-saving.vue'
export default {
  components: {
    BtnSaving
  },
  data () {
    return {
      linkInfo: null,
      isSaving: false,
      form: {
        password: '',
        confirmPassword: ''
      },
      showPassword: false,
      showConfirmPassword: false,
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      task: null
    }
  },
  computed: {
    key () {
      return this.$route.query.key
    }
  },
  methods: {
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
    async submit () {
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

      const payload = {
        id: this.task.userID,
        pwd: this.form.password
      }

      try {
        const response = await api.auth.request.updateUserPwd(payload)

        if (!response.data) {
          this.$swal({
            position: 'top',
            title: 'Password update failed.',
            text: 'Unable to update the user password. Please try again.',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'error'
          })
          return
        }

        this.$swal({
          position: 'top',
          title: 'Password update successful.',
          text: 'Successfully updated the password. Redirecting now to login.',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 5000,
          icon: 'success'
        })

        await this.$router.push({ path: '/account/login' })
      } catch (ex) {
        this.$swal({
          position: 'top',
          title: 'Exception Error',
          text: 'Error has occured while updating password.',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'error'
        })
      }
    }
  },
  async mounted () {
    const resp = await api.auth.request.getLink(this.key)
    this.linkInfo = resp.data
    if (!this.linkInfo) {
      setTimeout(() => {
        this.$router.push({ path: '/account/login' })
      }, 5000)
    }
    const response = await api.task.request.getSpecificTask(
      this.linkInfo.taskID
    )
    this.task = response.data
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
