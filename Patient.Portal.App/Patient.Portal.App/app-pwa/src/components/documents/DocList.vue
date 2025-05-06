<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h2 class="mb-4">Documents</h2>

        <div v-if="isLoading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else-if="!documents.length" class="alert alert-info">
          No documents available.
        </div>
        <div v-else>
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Document Name</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="doc in documents" :key="doc.id">
                      <td>{{ doc.name }}</td>
                      <td>{{ doc.type }}</td>
                      <td>{{ formatDate(doc.date) }}</td>
                      <td>
                        <div class="btn-group">
                          <button
                            class="btn btn-sm btn-primary"
                            @click="viewDocument(doc)"
                            :disabled="isLoading"
                          >
                            View
                          </button>
                          <button
                            class="btn btn-sm btn-secondary"
                            @click="downloadDocument(doc)"
                            :disabled="isLoading"
                          >
                            Download
                          </button>
                          <button
                            class="btn btn-sm btn-danger"
                            @click="deleteDocument(doc)"
                            :disabled="isDeleting === doc.id"
                          >
                            {{
                              isDeleting === doc.id ? 'Deleting...' : 'Delete'
                            }}
                          </button>
                        </div>
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
import { useDocumentStore } from '@/stores/document'

const router = useRouter()
const toast = useToast()
const documentStore = useDocumentStore()

const isLoading = ref(false)
const isDeleting = ref(null)
const documents = ref([])

const loadDocuments = async () => {
  isLoading.value = true
  try {
    const result = await documentStore.getDocuments()
    documents.value = result
  } catch (error) {
    console.error('Error loading documents:', error)
    toast.error('Failed to load documents')
  } finally {
    isLoading.value = false
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const viewDocument = (doc) => {
  router.push(`/documents/${doc.id}`)
}

const downloadDocument = async (doc) => {
  try {
    await documentStore.downloadDocument(doc.id)
    toast.success('Document downloaded successfully')
  } catch (error) {
    console.error('Error downloading document:', error)
    toast.error('Failed to download document')
  }
}

const deleteDocument = async (doc) => {
  if (!confirm('Are you sure you want to delete this document?')) {
    return
  }

  isDeleting.value = doc.id
  try {
    await documentStore.deleteDocument(doc.id)
    documents.value = documents.value.filter((d) => d.id !== doc.id)
    toast.success('Document deleted successfully')
  } catch (error) {
    console.error('Error deleting document:', error)
    toast.error('Failed to delete document')
  } finally {
    isDeleting.value = null
  }
}

onMounted(() => {
  loadDocuments()
})
</script>

<style scoped>
.table th {
  font-weight: 600;
}
.btn-group {
  gap: 0.5rem;
}
</style>
