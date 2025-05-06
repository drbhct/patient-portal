<template>
  <div class="form task-w m-2">
    <!-- <h3>{{ FormTitle }}</h3> -->
    <handler-form></handler-form>
  </div>
</template>
<script>
import HandlerForm from '@/components/task/HandlerPage.vue'
export default {
  components: {
    HandlerForm
  },
  computed: {
    FormTitle() {
      const queryData = this.$route.query
      return queryData.t
    }
  }
}
</script>
<style scoped>
  .task-w {
    width: 98%;
    padding-top: 2rem;
    margin-top: 2rem !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  @media only screen and (max-width: 841px) {
    .task-w {
      width: 100%;
    }
  }
</style>
