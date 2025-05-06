<template>
  <div class="form">
    <div class="col-12">
      <component v-bind:is="currentPage"></component>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const authStore = useAuthStore()
    const { currentPage } = storeToRefs(authStore)

    return {
      currentPage
    }
  }
}
</script>
