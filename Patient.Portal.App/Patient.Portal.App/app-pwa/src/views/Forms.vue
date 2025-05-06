<template>
  <div class="form">
    <div class="col-12">
      <component v-bind:is="currentPage"></component>
    </div>
  </div>
</template>

<script>
import { useFormStore } from '@/stores/form'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const formStore = useFormStore()
    const { currentPage } = storeToRefs(formStore)

    return {
      currentPage
    }
  }
}
</script>
