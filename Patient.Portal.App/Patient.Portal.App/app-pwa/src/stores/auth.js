import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { handleApiError, handleApiSuccess } from '@/utils/apiErrorHandler'

export const useAuthStore = defineStore('auth',
  () => {
    const router = useRouter()

    // State
    const user = ref(null)
    const token = ref(localStorage.getItem('token'))
    const isLoading = ref(false)
    const error = ref(null)

    // Getters
    const isAuthenticated = computed(() => !!token.value)
    const userFullName = computed(() =>
      user.value ? `${user.value.firstName} ${user.value.lastName}` : ''
    )

    // Actions
    const login = async (credentials) => {
      isLoading.value = true
      error.value = null
      try {
        // Development mode mock login
        // In production, this would be replaced with a real API call
        if (import.meta.env.DEV) {
          // Simple validation for development
          if (!credentials.userName || !credentials.password) {
            throw new Error('Username and password are required')
          }

          // Mock successful login
          console.log('DEV MODE: Mock login successful', credentials.userName)
          
          // Create mock token and user data
          const mockToken = 'mock-jwt-token-' + Date.now()
          const mockUser = {
            id: 1,
            firstName: 'Test',
            lastName: 'User',
            email: credentials.userName,
            role: 'patient'
          }
          
          token.value = mockToken
          user.value = mockUser
          localStorage.setItem('token', mockToken)
          handleApiSuccess('Login successful (Development Mode)')
          router.push('/')
          return { token: mockToken, user: mockUser }
        }
        
        // Production mode - real API call
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
        if (!response.ok) throw new Error('Failed to login')
        const data = await response.json()
        token.value = data.token
        user.value = data.user
        localStorage.setItem('token', data.token)
        handleApiSuccess('Login successful')
        router.push('/')
        return data
      } catch (err) {
        handleApiError(err, 'Failed to login')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    const logout = () => {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      router.push('/login')
    }

    const register = async (userData) => {
      isLoading.value = true
      error.value = null
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })
        if (!response.ok) throw new Error('Failed to register')
        const data = await response.json()
        handleApiSuccess('Registration successful')
        return data
      } catch (err) {
        handleApiError(err, 'Failed to register')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    const forgotPassword = async (email) => {
      isLoading.value = true
      error.value = null
      try {
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        })
        if (!response.ok) { throw new Error('Failed to process forgot password request') }
        handleApiSuccess('Password reset instructions sent to your email')
      } catch (err) {
        handleApiError(err, 'Failed to process forgot password request')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    const resetPassword = async ({ token, password }) => {
      isLoading.value = true
      error.value = null
      try {
        const response = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token, password })
        })
        if (!response.ok) throw new Error('Failed to reset password')
        handleApiSuccess('Password reset successful')
      } catch (err) {
        handleApiError(err, 'Failed to reset password')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    const updateProfile = async (profileData) => {
      isLoading.value = true
      error.value = null
      try {
        const response = await fetch('/api/auth/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`
          },
          body: JSON.stringify(profileData)
        })
        if (!response.ok) throw new Error('Failed to update profile')
        const data = await response.json()
        user.value = { ...user.value, ...data }
        handleApiSuccess('Profile updated successfully')
        return data
      } catch (err) {
        handleApiError(err, 'Failed to update profile')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    const changePassword = async (passwordData) => {
      isLoading.value = true
      error.value = null
      try {
        const response = await fetch('/api/auth/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`
          },
          body: JSON.stringify(passwordData)
        })
        if (!response.ok) throw new Error('Failed to change password')
        handleApiSuccess('Password changed successfully')
      } catch (err) {
        handleApiError(err, 'Failed to change password')
        throw err
      } finally {
        isLoading.value = false
      }
    }

    const checkAuth = async () => {
      if (!token.value) return false

      isLoading.value = true
      error.value = null
      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        })
        if (!response.ok) throw new Error('Failed to verify authentication')
        const data = await response.json()
        user.value = data
        return true
      } catch (err) {
        token.value = null
        user.value = null
        localStorage.removeItem('token')
        return false
      } finally {
        isLoading.value = false
      }
    }

    return {
    // State
      user,
      token,
      isLoading,
      error,
      // Getters
      isAuthenticated,
      userFullName,
      // Actions
      login,
      logout,
      register,
      forgotPassword,
      resetPassword,
      updateProfile,
      changePassword,
      checkAuth
    }
  }, {
    persist: {
      key: 'auth',
      storage: localStorage,
      paths: ['user', 'token']
    }
  })
