<template>
  <form class="form-horizontal m-lg-4" @submit.prevent="updateLogInfo" ref="pwdForm">
    <h3>Login Information</h3>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-left pt-4" for="inputDefault"
        >User Name:</label
      >
      <label
        class="col-lg-2 control-label text-lg-left pt-4"
        for="inputDefault"
        >{{ this.username }}</label
      >
    </div>
    <div class="form-group row">
      <img
        class="dash-divider"
        src="img/line-divider-transparent-1_edited.png"
      />
    </div>
    <div class="form-group row">
      <div class="col-12">
        <span class="header-d-text">Password</span>
      </div>
    </div>
    <div class="form-group row">
      <ul>
        <li v-bind:class="{ is_valid: contains_eight_characters }">
          8 Characters
        </li>
        <li v-bind:class="{ is_valid: contains_number }">Contains Number</li>
        <li v-bind:class="{ is_valid: contains_uppercase }">
          Contains Uppercase
        </li>
        <li v-bind:class="{ is_valid: contains_special_character }">
          Contains Special Character
        </li>
        <li v-bind:class="{ is_valid: matchConfirm }" v-if="form.confirmPassword">
          Confirm Password Match
        </li>
      </ul>
    </div>
    <div class="form-group row">
      <div class="col-12 col-md-4 col-lg-4 col-xl-4">
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
            autcomplete="false"
          />
        </div>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-12 col-md-4 col-lg-4 col-xl-4">
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
            autcomplete="false2"
          />
        </div>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-6">
        <button class="btn btn-primary" type="submit" :disabled="!valid_password || !matchConfirm">UPDATE PASSWORD</button>
      </div>
    </div>
  </form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import api from '../../api/http-common.js'
export default {
  data () {
    return {
      username: '',
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
      valid_password: false
    }
  },
  computed: {
    ...mapGetters(['getProfileAuthInfo']),
    matchConfirm () {
      return this.form.password === this.form.confirmPassword
    }
  },
  methods: {
    ...mapActions(['setProfileMyInfo']),
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
    async updateLogInfo () {
      if (this.valid_password) {
        const response = await api.auth.request.updateUserPwd({
          id: this.getProfileAuthInfo.id,
          pwd: this.form.password
        })
        if (response.data) {
          this.$swal({
            position: 'top',
            title: 'Password update successful',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'success'
          })
          this.$refs.pwdForm.reset()
        } else {
          this.$swal({
            position: 'top',
            title: 'Password update failed',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'error'
          })
        }
      }
    }
  },
  mounted () {
    if (this.getProfileAuthInfo.id) {
      this.username = this.getProfileAuthInfo.email
    }
  }
}
</script>
<style scoped>
.dash-divider {
  width: 100%;
  height: 4px;
  margin-bottom: 10px;
}
h4 {
  font-weight: 600 !important;
}

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
