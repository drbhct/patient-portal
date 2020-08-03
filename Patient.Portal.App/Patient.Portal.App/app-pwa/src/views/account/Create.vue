<template>
  <div>
    <div class="row mt-5 mr-2 ml-2 justify-content-md-center">
      <div class="col-lg-5">
        <div class="row mb-3 justify-content-md-center">
          <div class="col-xl-8 mb-5">
            <img
              src="img/Healthcore Logo White (Transparent).png"
              alt
              height="80"
              class="img-fluid"
            />
          </div>
          <div class="col-xl-8 mb-3">
            <section class="card card-featured-left card-featured-secondary">
              <div class="card-body">
                <form @submit.prevent="submitForm">
                  <span>
                    <h3>Account Setup</h3>
                  </span>
                  <!-- to error: add class "has-danger" -->
                  <div class="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input
                      v-model="form.userName"
                      type="text"
                      class="form-control form-control"
                      placeholder="User Name"
                      maxlength="50"
                      minlength="8"
                      required
                    />
                  </div>
                  <div class="form-group mb-4">
                    <label>Password</label>
                    <div class="input-group mb-3">
                      <span class="input-group-prepend">
                        <span class="input-group-text" @click="showPassword = !showPassword">
                          <i
                            :class="{'far fa-eye':!showPassword, 'far fa-eye-slash': showPassword}"
                          ></i>
                        </span>
                      </span>
                      <input
                        v-model="form.password"
                        @input="checkPassword"
                        :type="showPassword? 'text': 'password'"
                        class="form-control"
                        placeholder="Password"
                        maxlength="50"
                        minlength="8"
                        required
                      />
                    </div>
                    <ul>
                      <li v-bind:class="{ is_valid: contains_eight_characters }">8 Characters</li>
                      <li v-bind:class="{ is_valid: contains_number }">Contains Number</li>
                      <li v-bind:class="{ is_valid: contains_uppercase }">Contains Uppercase</li>
                      <li
                        v-bind:class="{ is_valid: contains_special_character }"
                      >Contains Special Character</li>
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
                            :class="{'far fa-eye':!showConfirmPassword, 'far fa-eye-slash': showConfirmPassword}"
                          ></i>
                        </span>
                      </span>
                      <input
                        v-model="form.confirmPassword"
                        :type="showConfirmPassword? 'text': 'password'"
                        class="form-control"
                        placeholder="Confirm Password"
                        maxlength="50"
                        minlength="8"
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" class="mb-1 mt-1 mr-5 btn btn-primary">Create Account</button>
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
export default {
  data () {
    return {
      form: {
        userName: '',
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
    submitForm () {
      alert('In progress')
    }
  }
}
</script>

<style>
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
