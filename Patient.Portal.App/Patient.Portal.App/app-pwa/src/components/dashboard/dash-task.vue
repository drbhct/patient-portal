<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-4">Tasks & Reminders</h5>

      <div v-if="isLoading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else-if="!tasks.length" class="text-muted">No pending tasks</div>
      <div v-else>
        <div v-for="task in tasks" :key="task.id" class="mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h6 class="mb-1">{{ task.title }}</h6>
              <p class="mb-0 text-muted">
                {{ task.description }}
              </p>
              <p class="mb-0 text-muted">Due: {{ formatDate(task.dueDate) }}</p>
            </div>
            <div class="d-flex gap-2">
              <button
                class="btn btn-sm btn-outline-primary"
                @click="viewTask(task)"
                :disabled="isProcessing === task.id"
              >
                View Details
              </button>
              <button
                class="btn btn-sm btn-outline-success"
                @click="completeTask(task)"
                :disabled="
                  isProcessing === task.id || task.status === 'completed'
                "
              >
                {{
                  isProcessing === task.id ? 'Processing...' : 'Mark Complete'
                }}
              </button>
            </div>
          </div>
          <hr v-if="!isLast(task)" class="my-3" />
        </div>
      </div>

      <div class="mt-4">
        <div class="d-flex gap-2">
          <button class="btn btn-primary flex-grow-1" @click="viewAllTasks">
            View All Tasks
          </button>
          <button
            class="btn btn-outline-primary"
            @click="refreshTasks"
            :disabled="isLoading"
          >
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useTaskStore } from '@/stores/task'

const router = useRouter()
const toast = useToast()
const taskStore = useTaskStore()

const isLoading = ref(false)
const isProcessing = ref(null)
const tasks = ref([])

const loadTasks = async () => {
  isLoading.value = true
  try {
    const result = await taskStore.getPendingTasks()
    tasks.value = result
  } catch (error) {
    console.error('Error loading tasks:', error)
    toast.error('Failed to load tasks')
  } finally {
    isLoading.value = false
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const isLast = (task) => {
  return tasks.value[tasks.value.length - 1].id === task.id
}

const viewTask = (task) => {
  router.push(`/tasks/${task.id}`)
}

const completeTask = async (task) => {
  isProcessing.value = task.id
  try {
    await taskStore.completeTask(task.id)
    const index = tasks.value.findIndex((t) => t.id === task.id)
    if (index !== -1) {
      tasks.value[index].status = 'completed'
    }
    toast.success('Task marked as complete')
  } catch (error) {
    console.error('Error completing task:', error)
    toast.error('Failed to complete task')
  } finally {
    isProcessing.value = null
  }
}

const viewAllTasks = () => {
  router.push('/tasks')
}

const refreshTasks = () => {
  loadTasks()
}

onMounted(() => {
  loadTasks()
})
</script>

<style scoped>
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
.card-title {
  color: #2c3e50;
  font-weight: 600;
}
.btn-outline-primary,
.btn-outline-success {
  border-width: 2px;
}
.gap-2 {
  gap: 0.5rem;
}
.flex-grow-1 {
  flex-grow: 1;
}
</style>
