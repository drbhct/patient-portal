<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>New Message</h2>
          <button class="btn btn-secondary" @click="goBack">
            Back to Messages
          </button>
        </div>

        <div class="card">
          <div class="card-body">
            <form @submit.prevent="sendMessage">
              <div class="form-group">
                <label for="subject">Subject</label>
                <input
                  type="text"
                  class="form-control"
                  id="subject"
                  v-model="form.subject"
                  required
                  maxlength="100"
                />
              </div>

              <div class="form-group">
                <label for="message">Message</label>
                <textarea
                  class="form-control"
                  id="message"
                  v-model="form.message"
                  rows="10"
                  required
                  maxlength="8000"
                  style="resize: none"
                ></textarea>
              </div>

              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  :disabled="isSending"
                >
                  {{ isSending ? 'Sending...' : 'Send Message' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useMessageStore } from '@/stores/message'

const router = useRouter()
const toast = useToast()
const messageStore = useMessageStore()

const isSending = ref(false)
const form = ref({
  subject: '',
  message: ''
})

const sendMessage = async () => {
  isSending.value = true
  try {
    await messageStore.createMessage(form.value)
    toast.success('Message sent successfully')
    router.push('/messages')
  } catch (error) {
    console.error('Error sending message:', error)
    toast.error('Failed to send message')
  } finally {
    isSending.value = false
  }
}

const goBack = () => {
  router.push('/messages')
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}
</style>
