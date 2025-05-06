<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h2>Communication Preferences</h2>
        <div v-if="isLoading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else-if="!commInfo" class="alert alert-info">
          No communication preferences available.
        </div>
        <div v-else>
          <form @submit.prevent="updatePreferences">
            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title">Notification Preferences</h5>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="emailNotifications"
                      v-model="preferences.emailNotifications"
                    />
                    <label
                      class="custom-control-label"
                      for="emailNotifications"
                    >
                      Receive email notifications
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="smsNotifications"
                      v-model="preferences.smsNotifications"
                    />
                    <label class="custom-control-label" for="smsNotifications">
                      Receive SMS notifications
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="appNotifications"
                      v-model="preferences.appNotifications"
                    />
                    <label class="custom-control-label" for="appNotifications">
                      Receive in-app notifications
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title">Statement Preferences</h5>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="paperStatements"
                      v-model="preferences.paperStatements"
                    />
                    <label class="custom-control-label" for="paperStatements">
                      Receive paper statements
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="electronicStatements"
                      v-model="preferences.electronicStatements"
                    />
                    <label
                      class="custom-control-label"
                      for="electronicStatements"
                    >
                      Receive electronic statements
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
                {{ isSaving ? 'Saving...' : 'Save Preferences' }}
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
const commInfo = ref(null)

const preferences = ref({
  emailNotifications: false,
  smsNotifications: false,
  appNotifications: false,
  paperStatements: false,
  electronicStatements: false
})

const loadPreferences = async () => {
  isLoading.value = true
  try {
    const info = await profileStore.getCommInfo()
    commInfo.value = info
    preferences.value = {
      emailNotifications: info.emailNotifications,
      smsNotifications: info.smsNotifications,
      appNotifications: info.appNotifications,
      paperStatements: info.paperStatements,
      electronicStatements: info.electronicStatements
    }
  } catch (error) {
    console.error('Error loading preferences:', error)
    toast.error('Failed to load communication preferences')
  } finally {
    isLoading.value = false
  }
}

const updatePreferences = async () => {
  isSaving.value = true
  try {
    await profileStore.updateCommInfo(preferences.value)
    toast.success('Communication preferences updated successfully')
    await loadPreferences()
  } catch (error) {
    console.error('Error updating preferences:', error)
    toast.error('Failed to update communication preferences')
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  loadPreferences()
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
