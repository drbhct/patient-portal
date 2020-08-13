<template>
  <div>
    <div class="row justify-content-md-center mt-5 mx-1">
      <div class="col-lg-4 mt-4">
        <section class="card card-featured mb-4">
          <header class="card-header">
            <h2 class="card-title">FORGOT USERNAME</h2>
          </header>
          <div class="card-body">
            <form @submit.prevent="forgetUserName">
              <div class="form-group">
                <label>If an email address is connected to your account, request an email message containing your username.</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter Email Address"
                  v-model="form.email"
                  required
                />
              </div>
              <div class="form-goup text-center">
                  <button type="submit" class="btn btn-primary">SEND MY USERNAME</button>
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
        email: ''
      }
    }
  },
  methods: {
    forgetUserName () {
      alert('Forgot UserName!')
    }
  }
}
</script>

<style>
</style>
