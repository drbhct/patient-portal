<template>
  <div>
    <div class="row justify-content-md-center mt-5 mx-1">
      <div class="col-lg-4 mt-4">
        <section class="card card-featured mb-4">
          <header class="card-header">
            <!-- <div class="card-actions">
              <a href="#" class="card-action card-action-toggle" data-card-toggle></a>
              <a href="#" class="card-action card-action-dismiss" data-card-dismiss></a>
            </div>-->

            <h2 class="card-title">Request PIN</h2>
            <!-- <p class="card-subtitle">Subtitle</p> -->
          </header>
          <div class="card-body">
            <form @submit.prevent="requestPin">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                  v-model="form.firstName"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Last Name"
                  v-model="form.LastName"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="date"
                  class="form-control"
                  placeholder="Date of Birth"
                  v-model="form.dob"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email Address"
                  v-model="form.email"
                  required
                />
              </div>
              <div class="form-goup text-center">
                  <button type="submit" class="btn btn-primary">REQUEST NEW PIN</button>
              </div>
              <div class="form-group text-center mt-2">
                  <router-link to="/account/login">Return to Login</router-link>
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
        firstName: '',
        lastName: '',
        dob: '',
        email: ''
      }
    }
  },
  methods: {
    requestPin () {
      alert('Requesting PIN!')
    }
  }
}
</script>

<style>
</style>
