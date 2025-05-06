<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>Messages</h2>
          <button class="btn btn-primary" @click="createNewMessage">
            New Message
          </button>
        </div>

        <div v-if="isLoading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else-if="!messages.length" class="alert alert-info">
          No messages available.
        </div>
        <div v-else>
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>From</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="message in messages" :key="message.id">
                      <td>
                        <a href="#" @click.prevent="viewMessage(message)">
                          {{ message.subject }}
                        </a>
                      </td>
                      <td>{{ message.from }}</td>
                      <td>{{ formatDate(message.date) }}</td>
                      <td>
                        <span
                          :class="{
                            'badge badge-success': message.status === 'read',
                            'badge badge-warning': message.status === 'unread'
                          }"
                        >
                          {{ message.status }}
                        </span>
                      </td>
                      <td>
                        <button
                          class="btn btn-sm btn-danger"
                          @click="deleteMessage(message)"
                          :disabled="isDeleting === message.id"
                        >
                          {{
                            isDeleting === message.id ? 'Deleting...' : 'Delete'
                          }}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useMessageStore } from '@/stores/message'

const router = useRouter()
const toast = useToast()
const messageStore = useMessageStore()

const isLoading = ref(false)
const isDeleting = ref(null)
const messages = ref([])

const loadMessages = async () => {
  isLoading.value = true
  try {
    const result = await messageStore.getMessages()
    messages.value = result
  } catch (error) {
    console.error('Error loading messages:', error)
    toast.error('Failed to load messages')
  } finally {
    isLoading.value = false
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const viewMessage = (message) => {
  router.push(`/messages/${message.id}`)
}

const createNewMessage = () => {
  router.push('/messages/create')
}

const deleteMessage = async (message) => {
  if (!confirm('Are you sure you want to delete this message?')) {
    return
  }

  isDeleting.value = message.id
  try {
    await messageStore.deleteMessage(message.id)
    messages.value = messages.value.filter((m) => m.id !== message.id)
    toast.success('Message deleted successfully')
  } catch (error) {
    console.error('Error deleting message:', error)
    toast.error('Failed to delete message')
  } finally {
    isDeleting.value = null
  }
}

onMounted(() => {
  loadMessages()
})
</script>

<style scoped>
.table th {
  font-weight: 600;
}
.badge {
  padding: 0.5em 0.75em;
}
</style>
