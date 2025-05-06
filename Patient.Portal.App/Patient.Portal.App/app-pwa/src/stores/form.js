import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormStore = defineStore('form', () => {
  const currentPage = ref('FormList')
  const currentForm = ref(null)
  const isLoading = ref(false)

  const setCurrentPage = (page) => {
    currentPage.value = page
  }

  const setCurrentForm = (form) => {
    currentForm.value = form
  }

  const setIsLoading = (value) => {
    isLoading.value = value
  }

  return {
    currentPage,
    currentForm,
    isLoading,
    setCurrentPage,
    setCurrentForm,
    setIsLoading
  }
})
