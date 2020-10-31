<template>
  <div>
    <a href="javascript:void(0)" @click="setMsgCurrentPage('List')">
      <i class="fas fa-angle-left"></i>
      Back to Messages
    </a>
    <div class="row mx-1">
      <h3>{{ this.getMsgInfo.subject }}</h3>
      <br />
      <div class="col-md-10">
        <p class="mt-4" style="white-space:pre-wrap">
          {{ this.getMsgInfo.messageText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions(['setMsgCurrentPage'])
  },
  computed: {
    ...mapGetters(['getMsgInfo'])
  }
}
</script>

<style>
</style>
