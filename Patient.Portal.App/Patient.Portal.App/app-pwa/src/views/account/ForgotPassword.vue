<template>
  <div>
    <div class="row justify-content-md-center mt-5 mx-1">
      <div class="col-lg-4 mt-4">
        <section class="card card-featured mb-4">
          <header class="card-header">
            <h2 class="card-title">Request New Password</h2>
          </header>
          <div class="card-body">
            <form @submit.prevent="forgotPassword">
              <div class="form-group">
                <label>If an email address is connected to your account, we will send an email message containing a link to reset your password.</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Username"
                  v-model="form.userName"
                  required
                />
              </div>
              <div class="form-goup">
                  <button type="submit" class="btn btn-primary">NEXT</button>
              </div>
              <div class="form-group">
                  <router-link to="/account/landing">Return to Login</router-link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        userName: ''
      }
    }
  },
  methods: {
    forgotPassword () {
      alert('Forgot UserName!')
    }
  }
}
</script>

<style>
</style>
