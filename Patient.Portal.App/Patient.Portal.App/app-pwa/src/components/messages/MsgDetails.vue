<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>Message Details</h2>
          <button class="btn btn-secondary" @click="goBack">
            Back to Messages
          </button>
        </div>

        <div v-if="isLoading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else-if="!message" class="alert alert-info">
          Message not found.
        </div>
        <div v-else>
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">{{ message.subject }}</h5>
              <div class="message-meta mb-4">
                <div class="row">
                  <div class="col-md-6">
                    <strong>From:</strong> {{ message.from }}
                  </div>
                  <div class="col-md-6">
                    <strong>Date:</strong> {{ formatDate(message.date) }}
                  </div>
                </div>
              </div>
              <div class="message-content">
                {{ message.content }}
              </div>
            </div>
          </div>

          <div
            v-if="message.replies && message.replies.length > 0"
            class="card"
          >
            <div class="card-body">
              <h5 class="card-title">Replies</h5>
              <div
                v-for="reply in message.replies"
                :key="reply.id"
                class="reply-item mb-4"
              >
                <div class="message-meta mb-2">
                  <div class="row">
                    <div class="col-md-6">
                      <strong>From:</strong> {{ reply.from }}
                    </div>
                    <div class="col-md-6">
                      <strong>Date:</strong> {{ formatDate(reply.date) }}
                    </div>
                  </div>
                </div>
                <div class="message-content">
                  {{ reply.content }}
                </div>
              </div>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-body">
              <h5 class="card-title">Reply to Message</h5>
              <form @submit.prevent="sendReply">
                <div class="form-group">
                  <textarea
                    class="form-control"
                    v-model="replyContent"
                    rows="5"
                    required
                    maxlength="8000"
                    placeholder="Type your reply here..."
                    style="resize: none"
                  ></textarea>
                </div>
                <div class="text-center">
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg"
                    :disabled="isSending"
                  >
                    {{ isSending ? 'Sending...' : 'Send Reply' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useMessageStore } from '@/stores/message'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const messageStore = useMessageStore()

const isLoading = ref(false)
const isSending = ref(false)
const message = ref(null)
const replyContent = ref('')

const loadMessage = async () => {
  isLoading.value = true
  try {
    const result = await messageStore.getMessageDetails(route.params.id)
    message.value = result
  } catch (error) {
    console.error('Error loading message:', error)
    toast.error('Failed to load message details')
  } finally {
    isLoading.value = false
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const sendReply = async () => {
  if (!replyContent.value.trim()) {
    toast.error('Please enter a reply message')
    return
  }

  isSending.value = true
  try {
    await messageStore.replyToMessage({
      messageId: message.value.id,
      content: replyContent.value
    })
    toast.success('Reply sent successfully')
    replyContent.value = ''
    await loadMessage()
  } catch (error) {
    console.error('Error sending reply:', error)
    toast.error('Failed to send reply')
  } finally {
    isSending.value = false
  }
}

const goBack = () => {
  router.push('/messages')
}

onMounted(() => {
  loadMessage()
})
</script>

<style scoped>
.message-meta {
  color: #6c757d;
  font-size: 0.9rem;
}
.message-content {
  white-space: pre-wrap;
  line-height: 1.5;
}
.reply-item {
  padding: 1rem;
  border-left: 3px solid #e9ecef;
}
.form-group {
  margin-bottom: 1.5rem;
}
</style>
