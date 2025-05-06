<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h2>Login Information</h2>
        <div v-if="isLoading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else-if="!loginInfo" class="alert alert-info">
          No login information available.
        </div>
        <div v-else>
          <form @submit.prevent="updateLoginInfo">
            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title">Change Password</h5>
                <div class="form-group">
                  <label for="currentPassword">Current Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="currentPassword"
                    v-model="password.current"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="newPassword">New Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="newPassword"
                    v-model="password.new"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    v-model="password.confirm"
                    required
                  />
                </div>
              </div>
            </div>

            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title">Security Settings</h5>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="twoFactor"
                      v-model="security.twoFactor"
                    />
                    <label class="custom-control-label" for="twoFactor">
                      Enable Two-Factor Authentication
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="rememberDevice"
                      v-model="security.rememberDevice"
                    />
                    <label class="custom-control-label" for="rememberDevice">
                      Remember this device for 30 days
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <button
                type="submit"
                class="btn btn-primary btn-lg"
                :disabled="isSaving"
              >
                {{ isSaving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useProfileStore } from '@/stores/profile'

const toast = useToast()
const profileStore = useProfileStore()

const isLoading = ref(false)
const isSaving = ref(false)
const loginInfo = ref(null)

const password = ref({
  current: '',
  new: '',
  confirm: ''
})

const security = ref({
  twoFactor: false,
  rememberDevice: false
})

const loadLoginInfo = async () => {
  isLoading.value = true
  try {
    const info = await profileStore.getLoginInfo()
    loginInfo.value = info
    security.value = {
      twoFactor: info.twoFactor,
      rememberDevice: info.rememberDevice
    }
  } catch (error) {
    console.error('Error loading login info:', error)
    toast.error('Failed to load login information')
  } finally {
    isLoading.value = false
  }
}

const updateLoginInfo = async () => {
  if (password.value.new !== password.value.confirm) {
    toast.error('New passwords do not match')
    return
  }

  isSaving.value = true
  try {
    await profileStore.updateLoginInfo({
      currentPassword: password.value.current,
      newPassword: password.value.new,
      security: security.value
    })
    toast.success('Login information updated successfully')
    password.value = {
      current: '',
      new: '',
      confirm: ''
    }
    await loadLoginInfo()
  } catch (error) {
    console.error('Error updating login info:', error)
    toast.error('Failed to update login information')
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  loadLoginInfo()
})
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
.custom-control {
  margin-bottom: 0.5rem;
}
</style>
