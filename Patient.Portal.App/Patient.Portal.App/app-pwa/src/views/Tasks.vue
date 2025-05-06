<template>
  <div class="form task-w m-2 m-lg-4">
    <dash-task></dash-task>
  </div>
</template>
<script setup>
import DashTask from '@/components/dashboard/dash-task.vue'
// Define a multi-word component name to satisfy ESLint
const __filename = 'TasksView'
</script>
<style scoped>
.task-w {
  width: 50%;
}

@media only screen and (max-width: 767px) {
  .task-w {
    width: 80%;
  }
}
</style>
