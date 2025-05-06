<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title mb-4">Billing & Payments</h2>

            <LoadingOverlay
              :show="isLoading"
              message="Loading billing information..."
            />

            <div v-if="error" class="alert alert-danger" role="alert">
              <i class="fas fa-exclamation-circle me-2"></i>
              {{ error }}
              <button
                class="btn btn-link p-0 ms-2"
                @click="loadBillingData"
                :disabled="isLoading"
              >
                Try Again
              </button>
            </div>

            <div v-else-if="!isLoading">
              <div class="row">
                <div class="col-md-6 mb-4">
                  <div class="card h-100">
                    <div class="card-body">
                      <h5 class="card-title">Account Summary</h5>
                      <div class="account-summary">
                        <div class="summary-item">
                          <span class="label">Current Balance</span>
                          <span class="value"
                            >${{
                              formatAmount(accountSummary.currentBalance)
                            }}</span
                          >
                        </div>
                        <div class="summary-item">
                          <span class="label">Last Payment</span>
                          <span class="value"
                            >${{
                              formatAmount(accountSummary.lastPayment)
                            }}</span
                          >
                        </div>
                        <div class="summary-item">
                          <span class="label">Last Payment Date</span>
                          <span class="value">{{
                            formatDate(accountSummary.lastPaymentDate)
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 mb-4">
                  <div class="card h-100">
                    <div class="card-body">
                      <h5 class="card-title">Quick Actions</h5>
                      <div class="d-grid gap-2">
                        <button
                          class="btn btn-primary"
                          @click="makePayment"
                          :disabled="isLoading"
                          aria-label="Make a payment"
                        >
                          <i
                            class="fas fa-credit-card me-2"
                            aria-hidden="true"
                          ></i>
                          Make a Payment
                        </button>
                        <button
                          class="btn btn-outline-primary"
                          @click="viewStatements"
                          :disabled="isLoading"
                          aria-label="View statements"
                        >
                          <i
                            class="fas fa-file-invoice me-2"
                            aria-hidden="true"
                          ></i>
                          View Statements
                        </button>
                        <button
                          class="btn btn-outline-primary"
                          @click="managePaymentMethods"
                          :disabled="isLoading"
                          aria-label="Manage payment methods"
                        >
                          <i class="fas fa-wallet me-2" aria-hidden="true"></i>
                          Manage Payment Methods
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div class="card-body">
                      <div
                        class="d-flex justify-content-between align-items-center mb-4"
                      >
                        <h5 class="card-title mb-0">Recent Transactions</h5>
                        <div class="d-flex gap-2">
                          <div class="input-group" style="width: 200px">
                            <input
                              type="date"
                              class="form-control"
                              v-model="dateRange.start"
                              :max="dateRange.end"
                              @change="loadTransactions"
                            />
                            <span class="input-group-text">to</span>
                            <input
                              type="date"
                              class="form-control"
                              v-model="dateRange.end"
                              :min="dateRange.start"
                              @change="loadTransactions"
                            />
                          </div>
                          <button
                            class="btn btn-outline-primary"
                            @click="exportTransactions"
                            :disabled="isLoading"
                            aria-label="Export transactions"
                          >
                            <i
                              class="fas fa-download me-2"
                              aria-hidden="true"
                            ></i>
                            Export
                          </button>
                        </div>
                      </div>

                      <div v-if="!recentTransactions.length" class="text-muted">
                        No recent transactions
                      </div>
                      <div v-else>
                        <div class="table-responsive">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="transaction in recentTransactions"
                                :key="transaction.id"
                              >
                                <td>{{ formatDate(transaction.date) }}</td>
                                <td>{{ transaction.description }}</td>
                                <td>${{ formatAmount(transaction.amount) }}</td>
                                <td>
                                  <span
                                    class="badge"
                                    :class="getStatusClass(transaction.status)"
                                  >
                                    {{ transaction.status }}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    class="btn btn-sm btn-link"
                                    @click="viewTransaction(transaction)"
                                    :aria-label="`View details for transaction ${transaction.id}`"
                                  >
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div
                          class="d-flex justify-content-between align-items-center mt-4"
                        >
                          <div class="text-muted">
                            Showing {{ paginationInfo.start }} to
                            {{ paginationInfo.end }} of
                            {{ paginationInfo.total }} transactions
                          </div>
                          <nav aria-label="Transaction pagination">
                            <ul class="pagination mb-0">
                              <li
                                class="page-item"
                                :class="{ disabled: currentPage === 1 }"
                              >
                                <button
                                  class="page-link"
                                  @click="changePage(currentPage - 1)"
                                  :disabled="currentPage === 1"
                                  aria-label="Previous page"
                                >
                                  <i
                                    class="fas fa-chevron-left"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </li>
                              <li
                                v-for="page in totalPages"
                                :key="page"
                                class="page-item"
                                :class="{ active: currentPage === page }"
                              >
                                <button
                                  class="page-link"
                                  @click="changePage(page)"
                                  :aria-label="`Go to page ${page}`"
                                >
                                  {{ page }}
                                </button>
                              </li>
                              <li
                                class="page-item"
                                :class="{
                                  disabled: currentPage === totalPages
                                }"
                              >
                                <button
                                  class="page-link"
                                  @click="changePage(currentPage + 1)"
                                  :disabled="currentPage === totalPages"
                                  aria-label="Next page"
                                >
                                  <i
                                    class="fas fa-chevron-right"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBillingStore } from '@/stores/billing'
import LoadingOverlay from '@/components/shared/LoadingOverlay.vue'
import { handleApiError, handleApiSuccess } from '@/utils/apiErrorHandler'

const router = useRouter()
const billingStore = useBillingStore()

const isLoading = ref(false)
const error = ref(null)
const accountSummary = ref({
  currentBalance: 0,
  lastPayment: 0,
  lastPaymentDate: null
})
const recentTransactions = ref([])
const currentPage = ref(1)
const itemsPerPage = 10
const totalItems = ref(0)
const dateRange = ref({
  start: new Date(new Date().setMonth(new Date().getMonth() - 1))
    .toISOString()
    .split('T')[0],
  end: new Date().toISOString().split('T')[0]
})

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const paginationInfo = computed(() => ({
  start: (currentPage.value - 1) * itemsPerPage + 1,
  end: Math.min(currentPage.value * itemsPerPage, totalItems.value),
  total: totalItems.value
}))

const loadBillingData = async () => {
  isLoading.value = true
  error.value = null
  try {
    // Destructure but only use what we need
    const [summary] = await Promise.all([
      billingStore.getAccountSummary(),
      loadTransactions()
    ])
    accountSummary.value = summary
  } catch (err) {
    error.value = 'Failed to load billing information'
    handleApiError(err, error.value)
  } finally {
    isLoading.value = false
  }
}

const loadTransactions = async () => {
  try {
    const result = await billingStore.getRecentTransactions({
      page: currentPage.value,
      perPage: itemsPerPage,
      startDate: dateRange.value.start,
      endDate: dateRange.value.end
    })
    recentTransactions.value = result.items
    totalItems.value = result.total
    return result
  } catch (err) {
    handleApiError(err, 'Failed to load transactions')
    return { items: [], total: 0 }
  }
}

const changePage = async (page) => {
  currentPage.value = page
  await loadTransactions()
}

const formatAmount = (amount) => {
  return amount.toFixed(2)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const getStatusClass = (status) => {
  const classes = {
    completed: 'bg-success',
    pending: 'bg-warning',
    failed: 'bg-danger'
  }
  return classes[status.toLowerCase()] || 'bg-secondary'
}

const makePayment = () => {
  router.push('/billing/payment')
}

const viewStatements = () => {
  router.push('/billing/statements')
}

const managePaymentMethods = () => {
  router.push('/billing/payment-methods')
}

const viewTransaction = (transaction) => {
  router.push(`/billing/transactions/${transaction.id}`)
}

const exportTransactions = async () => {
  try {
    const blob = await billingStore.exportTransactions({
      startDate: dateRange.value.start,
      endDate: dateRange.value.end
    })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transactions-${dateRange.value.start}-to-${dateRange.value.end}.csv`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
    handleApiSuccess('Transactions exported successfully')
  } catch (err) {
    handleApiError(err, 'Failed to export transactions')
  }
}

onMounted(() => {
  loadBillingData()
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

.account-summary {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #dee2e6;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item .label {
  color: #6c757d;
}

.summary-item .value {
  font-weight: 600;
  color: #2c3e50;
}

.badge {
  padding: 0.5em 0.75em;
  font-weight: 500;
}

.table th {
  font-weight: 600;
  color: #2c3e50;
}

.table td {
  vertical-align: middle;
}

.btn-link {
  color: #0d6efd;
  text-decoration: none;
  padding: 0;
}

.btn-link:hover {
  text-decoration: underline;
}

.pagination {
  margin-bottom: 0;
}

.page-link {
  color: #0d6efd;
  border: 1px solid #dee2e6;
  padding: 0.375rem 0.75rem;
}

.page-link:hover {
  color: #0a58ca;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  background-color: #fff;
  border-color: #dee2e6;
}

.input-group-text {
  background-color: #f8f9fa;
  border-color: #ced4da;
}

.form-control:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>
