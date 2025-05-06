<template>
  <div>
    <div class="row justify-content-md-center mt-5 mx-1">
      <div class="col-lg-4 mt-4">
        <section class="card card-featured mb-4">
          <header class="card-header">
            <h2 class="card-title">REQUEST NEW PASSWORD</h2>
          </header>
          <div class="card-body">
            <form @submit.prevent="forgotPassword">
              <div class="form-group">
                <label
                  >If an email address is connected to your account, we will
                  send an email message containing a link to reset your
                  password.</label
                >
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter Email"
                  v-model="form.userName"
                  required
                />
              </div>
              <div class="form-goup">
                <btn-saving :is-saving="isSaving" />
                <router-link to="/account/login" class="ml-3">
                  Return to login
                </router-link>
              </div>
              <!-- <div class="form-group text-center mt-2">
                  <router-link to="/account/forgotusername">Forgot Username?</router-link>
              </div> -->
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/http-common.js'
import BtnSaving from '../../components/button-saving.vue'
import { useAuthStore } from '@/stores/auth'

export default {
  components: {
    BtnSaving
  },
  setup() {
    const authStore = useAuthStore()
    return {
      authStore
    }
  },
  data() {
    return {
      isSaving: false,
      form: {
        userName: ''
      }
    }
  },
  methods: {
    async forgotPassword() {
      try {
        this.isSaving = true
        await this.authStore.forgotPassword(this.form.userName)
        this.$toast.success('Password reset instructions sent to your email')
        this.form.userName = ''
      } catch (error) {
        console.error('Error requesting password reset:', error)
        this.$toast.error('Failed to send password reset instructions')
      } finally {
        this.isSaving = false
      }
    }
  },
  async mounted() {
    const apiRes = await api.auth.request.apiLogin()
    // NOTE: Temporary will be move to cookies soon!
    // localStorage.setItem('config', apiRes.data.token)
    sessionStorage.setItem('config', apiRes.data.token)
  }
}
</script>

<style></style>
