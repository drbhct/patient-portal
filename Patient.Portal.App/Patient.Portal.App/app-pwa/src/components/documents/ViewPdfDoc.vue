<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>View Document</h2>
          <button class="btn btn-secondary" @click="goBack">
            Back to Documents
          </button>
        </div>

        <div v-if="isLoading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else-if="!document" class="alert alert-info">
          Document not found.
        </div>
        <div v-else>
          <div class="card">
            <div class="card-body">
              <div class="document-info mb-4">
                <h5 class="card-title">{{ document.name }}</h5>
                <div class="row">
                  <div class="col-md-6">
                    <strong>Type:</strong> {{ document.type }}
                  </div>
                  <div class="col-md-6">
                    <strong>Date:</strong> {{ formatDate(document.date) }}
                  </div>
                </div>
              </div>

              <div class="document-viewer">
                <iframe
                  v-if="documentUrl"
                  :src="documentUrl"
                  width="100%"
                  height="600"
                  frameborder="0"
                ></iframe>
                <div v-else class="alert alert-warning">
                  Unable to load document preview.
                </div>
              </div>

              <div class="text-center mt-4">
                <button
                  class="btn btn-primary"
                  @click="downloadDocument"
                  :disabled="isDownloading"
                >
                  {{ isDownloading ? 'Downloading...' : 'Download Document' }}
                </button>
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
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useDocumentStore } from '@/stores/document'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const documentStore = useDocumentStore()

const isLoading = ref(false)
const isDownloading = ref(false)
const document = ref(null)
const documentUrl = ref(null)

const loadDocument = async () => {
  isLoading.value = true
  try {
    const result = await documentStore.getDocumentDetails(route.params.id)
    document.value = result
    documentUrl.value = await documentStore.getDocumentUrl(result.id)
  } catch (error) {
    console.error('Error loading document:', error)
    toast.error('Failed to load document')
  } finally {
    isLoading.value = false
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const downloadDocument = async () => {
  isDownloading.value = true
  try {
    await documentStore.downloadDocument(document.value.id)
    toast.success('Document downloaded successfully')
  } catch (error) {
    console.error('Error downloading document:', error)
    toast.error('Failed to download document')
  } finally {
    isDownloading.value = false
  }
}

const goBack = () => {
  router.push('/documents')
}

onMounted(() => {
  loadDocument()
})
</script>

<style scoped>
.document-info {
  color: #6c757d;
}
.document-viewer {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  overflow: hidden;
}
</style>
