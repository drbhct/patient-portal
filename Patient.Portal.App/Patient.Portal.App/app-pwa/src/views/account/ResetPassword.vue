<template>
  <!-- No changes to template section -->
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  setup() {
    const authStore = useAuthStore()
    return {
      authStore
    }
  },
  methods: {
    async resetPassword() {
      try {
        await this.authStore.resetPassword({
          key: this.key,
          password: this.form.password
        })
        this.$toast.success('Password reset successfully')
        this.$router.push('/account/login')
      } catch (error) {
        console.error('Error resetting password:', error)
        this.$toast.error('Failed to reset password')
      }
    }
  },
  async mounted() {
    try {
      await this.authStore.validateResetKey(this.key)
    } catch (error) {
      console.error('Error validating reset key:', error)
      this.$toast.error('Invalid or expired reset link')
      this.$router.push('/account/login')
    }
  }
}
</script>
