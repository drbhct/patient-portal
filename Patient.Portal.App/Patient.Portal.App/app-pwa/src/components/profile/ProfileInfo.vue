<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h2>Profile Information</h2>
        <div v-if="isLoading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else-if="!profileInfo" class="alert alert-info">
          No profile information available.
        </div>
        <div v-else>
          <form @submit.prevent="updateProfile">
            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title">Personal Information</h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="firstName">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        v-model="profile.firstName"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="lastName">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        v-model="profile.lastName"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="dateOfBirth">Date of Birth</label>
                      <input
                        type="date"
                        class="form-control"
                        id="dateOfBirth"
                        v-model="profile.dateOfBirth"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="gender">Gender</label>
                      <select
                        class="form-control"
                        id="gender"
                        v-model="profile.gender"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title">Contact Information</h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="profile.email"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="phone">Phone</label>
                      <input
                        type="tel"
                        class="form-control"
                        id="phone"
                        v-model="profile.phone"
                        required
                      />
                    </div>
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
const profileInfo = ref(null)

const profile = ref({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  phone: ''
})

const loadProfile = async () => {
  isLoading.value = true
  try {
    const info = await profileStore.getProfileInfo()
    profileInfo.value = info
    profile.value = {
      firstName: info.firstName,
      lastName: info.lastName,
      dateOfBirth: info.dateOfBirth,
      gender: info.gender,
      email: info.email,
      phone: info.phone
    }
  } catch (error) {
    console.error('Error loading profile:', error)
    toast.error('Failed to load profile information')
  } finally {
    isLoading.value = false
  }
}

const updateProfile = async () => {
  isSaving.value = true
  try {
    await profileStore.updateProfile(profile.value)
    toast.success('Profile updated successfully')
    await loadProfile()
  } catch (error) {
    console.error('Error updating profile:', error)
    toast.error('Failed to update profile')
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>
