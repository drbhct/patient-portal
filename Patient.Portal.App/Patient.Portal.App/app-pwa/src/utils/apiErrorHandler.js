import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export const handleApiError = (error, customMessage = 'An error occurred') => {
  const toast = useToast()
  const router = useRouter()
  const authStore = useAuthStore()

  console.error('API Error:', error)

  // Handle different error types
  if (error.response) {
    const { status, data } = error.response

    switch (status) {
      case 400:
        toast.error(data.message || 'Invalid request')
        break
      case 401:
        toast.error('Session expired. Please log in again.')
        authStore.logout()
        router.push('/login')
        break
      case 403:
        toast.error('You do not have permission to perform this action')
        break
      case 404:
        toast.error('Resource not found')
        break
      case 422:
        // Handle validation errors
        if (data.errors) {
          Object.values(data.errors).forEach((messages) => {
            messages.forEach((message) => toast.error(message))
          })
        } else {
          toast.error(data.message || 'Validation failed')
        }
        break
      case 429:
        toast.error('Too many requests. Please try again later')
        break
      case 500:
        toast.error('Server error. Please try again later')
        break
      default:
        toast.error(customMessage)
    }
  } else if (error.request) {
    // Network error
    toast.error('Network error. Please check your connection')
  } else {
    // Other errors
    toast.error(customMessage)
  }

  // Log error to monitoring service
  // TODO: Implement error logging service
  // logError(error)
}

export const handleApiSuccess = (message = 'Operation successful') => {
  const toast = useToast()
  toast.success(message)
}

export const handleApiWarning = (message) => {
  const toast = useToast()
  toast.warning(message)
}

export const handleApiInfo = (message) => {
  const toast = useToast()
  toast.info(message)
}
