<template>
  <div class="form task-w m-2 m-lg-4">
    <dash-task></dash-task>
  </div>
</template>
<script>
import DashTask from '@/components/dashboard/dash-task.vue'
export default {
  components: {
    DashTask
  }
}
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
