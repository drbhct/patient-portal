<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-4">Quick Access</h5>

      <div class="row g-4">
        <div class="col-6 col-md-4">
          <div class="menu-item" @click="navigateTo('/appointments')">
            <div class="menu-icon">
              <i class="fas fa-calendar-alt"></i>
            </div>
            <div class="menu-text">Appointments</div>
          </div>
        </div>

        <div class="col-6 col-md-4">
          <div class="menu-item" @click="navigateTo('/messages')">
            <div class="menu-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="menu-text">Messages</div>
          </div>
        </div>

        <div class="col-6 col-md-4">
          <div class="menu-item" @click="navigateTo('/documents')">
            <div class="menu-icon">
              <i class="fas fa-file-alt"></i>
            </div>
            <div class="menu-text">Documents</div>
          </div>
        </div>

        <div class="col-6 col-md-4">
          <div class="menu-item" @click="navigateTo('/billing')">
            <div class="menu-icon">
              <i class="fas fa-credit-card"></i>
            </div>
            <div class="menu-text">Billing</div>
          </div>
        </div>

        <div class="col-6 col-md-4">
          <div class="menu-item" @click="navigateTo('/profile')">
            <div class="menu-icon">
              <i class="fas fa-user"></i>
            </div>
            <div class="menu-text">Profile</div>
          </div>
        </div>

        <div class="col-6 col-md-4">
          <div class="menu-item" @click="navigateTo('/tasks')">
            <div class="menu-icon">
              <i class="fas fa-tasks"></i>
            </div>
            <div class="menu-text">Tasks</div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <div class="d-flex justify-content-between align-items-center">
          <div class="text-muted">
            Last updated: {{ formatDateTime(lastUpdated) }}
          </div>
          <button
            class="btn btn-outline-primary"
            @click="refreshData"
            :disabled="isRefreshing"
          >
            <i class="fas fa-sync-alt"></i>
            {{ isRefreshing ? 'Refreshing...' : 'Refresh' }}
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
import { useDashboardStore } from '@/stores/dashboard'

const router = useRouter()
const toast = useToast()
const dashboardStore = useDashboardStore()

const isRefreshing = ref(false)
const lastUpdated = ref(new Date())

const navigateTo = (path) => {
  router.push(path)
}

const formatDateTime = (date) => {
  return new Date(date).toLocaleString()
}

const refreshData = async () => {
  isRefreshing.value = true
  try {
    await dashboardStore.refreshDashboardData()
    lastUpdated.value = new Date()
    toast.success('Dashboard data refreshed')
  } catch (error) {
    console.error('Error refreshing dashboard data:', error)
    toast.error('Failed to refresh dashboard data')
  } finally {
    isRefreshing.value = false
  }
}

onMounted(() => {
  refreshData()
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
.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.menu-item:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
}
.menu-icon {
  font-size: 2rem;
  color: #0d6efd;
  margin-bottom: 0.5rem;
}
.menu-text {
  font-weight: 500;
  color: #2c3e50;
}
.btn-outline-primary {
  border-width: 2px;
}
</style>
