<template>
  <div>
    <form class="form-horizontal m-lg-4" @submit.prevent="updateUser">
      <h3>Login Information</h3>
      <div class="form-group row">
        <label class="col-lg-2 col-md-4 control-label text-lg-right text-md-right pt-2" for="inputDefault">User Name:</label>
        <label class="col-lg-2 col-md-6 control-label text-lg-left pt-2"
               for="inputDefault">{{ this.username }}</label>
      </div>
      <div class="form-group row">
        <label class="col-lg-2 col-md-4 control-label text-lg-right text-md-right pt-2" for="firstname">First Name:</label>
        <div class="col-lg-4 col-md-6 col-xl-4">
          <input type="text" class="form-control" id="firstname" v-model="firstname" required>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-lg-2 col-md-4 control-label text-lg-right text-md-right pt-2" for="lastname">Last Name:</label>
        <div class="col-lg-4 col-md-6 col-xl-4">
          <input type="text" class="form-control" id="lastname" v-model="lastname" required>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-lg-2 col-md-4 control-label text-lg-right text-md-right pt-2" for="phoneNum">Phone Number:</label>
        <div class="col-lg-4 col-md-6 col-xl-4">
          <input type="text" class="form-control" id="phoneNum" v-model="phonenumber" v-mask="'(###) ###-####'">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-lg-2 col-md-4 control-label text-lg-right text-md-right pt-2"></label>
        <div class="col-lg-4 col-md-6 col-xl-4">
          <button class="btn btn-primary btn-w-160" type="submit">UPDATE</button>
          <button class="btn btn-primary btn-w-160 ml-2" type="button" @click="modalPwd">UPDATE EMAIL</button>
        </div>
      </div>
      <div class="form-group row">
        <img class="dash-divider"
             src="img/line-divider-transparent-1_edited.png" />
      </div>
    </form>
    <form class="form-horizontal m-lg-4" @submit.prevent="updatePassword" ref="pwdForm">
      <div class="form-group row">
        <div class="col-12">
          <span class="header-d-text">Password</span>
        </div>
      </div>
      <div class="form-group row pl-lg-5 pl-md-5 pl-xl-5">
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
      <div class="form-group row pl-lg-5 pl-md-5 pl-xl-5">
        <div class="col-12 col-md-8 col-lg-6 col-xl-4">
          <div class="input-group mb-3">
            <span class="input-group-prepend">
              <span class="input-group-text"
                    @click="showPassword = !showPassword">
                <i :class="{
                  'far fa-eye': !showPassword,
                  'far fa-eye-slash': showPassword,
                }"></i>
              </span>
            </span>
            <input v-model="form.password"
                   @input="checkPassword"
                   :type="showPassword ? 'text' : 'password'"
                   class="form-control"
                   placeholder="Password"
                   maxlength="50"
                   minlength="8"
                   required
                   autcomplete="false" />
          </div>
        </div>
      </div>
      <div class="form-group row pl-lg-5 pl-md-5 pl-xl-5">
        <div class="col-12 col-md-8 col-lg-6 col-xl-4">
          <div class="input-group mb-3">
            <span class="input-group-prepend">
              <span class="input-group-text"
                    @click="showConfirmPassword = !showConfirmPassword">
                <i :class="{
                  'far fa-eye': !showConfirmPassword,
                  'far fa-eye-slash': showConfirmPassword,
                }"></i>
              </span>
            </span>
            <input v-model="form.confirmPassword"
                   :type="showConfirmPassword ? 'text' : 'password'"
                   class="form-control"
                   placeholder="Confirm Password"
                   maxlength="50"
                   minlength="8"
                   required
                   autcomplete="false2" />
          </div>
        </div>
      </div>
      <div class="form-group row pl-lg-5 pl-md-5 pl-xl-5">
        <div class="col-lg-6">
          <button class="btn btn-primary" type="submit" :disabled="!valid_password || !matchConfirm">UPDATE PASSWORD</button>
        </div>
      </div>
    </form>
    <div id="modalUserPwd" class="modal fade" tabindex="-1" role="dialog">
      <form @submit.prevent="setPwd">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="card-title">Update User Credentials</h2>
            </div>
            <div class="modal-body">
              <div class="form-group row pt-2">
                <label class="col-lg-4 control-label text-lg-right pt-2" for="textareaDefault">Email:</label>
                <div class="col-lg-8">
                  <input type="email" pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" maxlength="100" class="form-control" id="useremail" v-model="userEmail" required>
                </div>
              </div>
              <div class="form-group row pt-2">
                <label class="col-lg-4 control-label text-lg-right pt-2" for="textareaDefault">Password:</label>
                <div class="col-lg-8">
                  <input type="password" maxlength="100" class="form-control" id="userpwd" v-model="userPwd" required>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="col-md-12 text-right">
                <button class="btn btn-primary modal-confirm mr-2" type="submit">Submit</button>
                <button class="btn btn-default" type="reset" @click="cancelPwd">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
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
      firstname: '',
      lastname: '',
      phonenumber: '',
      userEmail: '',
      userPwd: '',
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
    ...mapActions(['setProfileAuthInfo']),
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
    setPwd () {
      this.updateEmail()
      this.cancelPwd()
    },
    cancelPwd () {
      // eslint-disable-next-line no-undef
      $('#modalUserPwd').modal('hide')
    },
    modalPwd () {
      // eslint-disable-next-line no-undef
      $('#modalUserPwd').modal({
        show: true,
        backdrop: 'static'
      })
    },
    async updateEmail () {
      await api.auth.request.updateUserEmail({
        id: this.getProfileAuthInfo.id,
        email: this.userEmail,
        pwd: this.userPwd
      })
      this.form.email = this.userEmail

      // GET USER INFO
      const profileAuthInfo = await api.auth.request.getUser(
        this.userEmail
      )
      this.setProfileAuthInfo(profileAuthInfo.data)

      this.$swal({
        position: 'top-center',
        title: 'User Email Updated',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
        icon: 'success'
      })
    },
    async updatePassword () {
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
    },
    async updateUser () {
      // UPDATE USER
      const param = {
        id: this.getProfileAuthInfo.id,
        firstName: this.firstname,
        lastName: this.lastname,
        nickName: this.getProfileAuthInfo.nickName
      }
      await api.auth.request.updateUser(param)

      // UPDATE USER MOBILE PHONE
      const mobParam = {
        id: this.getProfileAuthInfo.id,
        mobilePhone: this.phonenumber
      }
      await api.auth.request.updateUserMobilephone(mobParam)

      // GET USER INFO
      const profileAuthInfo = await api.auth.request.getUser(
        this.getProfileAuthInfo.email
      )
      this.setProfileAuthInfo(profileAuthInfo.data)

      this.$swal({
        position: 'top-center',
        title: 'Profile info updated',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
        icon: 'success'
      })
    }
  },
  mounted () {
    if (this.getProfileAuthInfo.id) {
      this.firstname = this.getProfileAuthInfo.firstName
      this.lastname = this.getProfileAuthInfo.lastName
      this.username = this.getProfileAuthInfo.email
      this.phonenumber = this.getProfileAuthInfo.mobilePhone
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
