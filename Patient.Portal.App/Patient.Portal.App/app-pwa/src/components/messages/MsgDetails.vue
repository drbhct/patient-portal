<template>
  <div>
    <a href="javascript:void(0)" @click="setMsgCurrentPage('List')">
      <i class="fas fa-angle-left"></i>
      Back to Messages
    </a>
    <div class="row mx-1">
      <h3>{{ this.getMsgInfo.subject }}</h3>
    </div>
    <div class="row mx-1">
      <div class="col-md-10">
        <p class="mt-4" style="white-space:pre-wrap">
          {{ this.getMsgInfo.messageText }}
        </p>
      </div>
    </div>
    <!--<div class="row text-md-right text-lg-right text-xl-rigth center">
      <div class="col-lg-10 col-md-10">
        <button class="btn btn-default btn-w-120">
          <i class="fas fa-archive"></i>
          <span> ARCHIVE</span>
        </button>
        <button class="btn btn-primary btn-w-120">
          <i class="fas fa-reply"></i>
          <span> REPLY</span>
        </button>
      </div>
    </div>-->
  </div>
</template>

<script>
import api from '../../api/http-common.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions(['setMsgCurrentPage'])
  },
  computed: {
    ...mapGetters(['getMsgInfo', 'getProfilePatientAssociated', 'currentPatientAssociated'])
  },
  mounted () {
    if (!this.getMsgInfo.read) {
      api.msg.request.setMessageAsRead({
        facilityId: this.currentPatientAssociated.facilityID,
        id: this.getMsgInfo.id
      })
    }
  }
}
</script>

<style scoped>
  .btn-w-120 {
    width: 120px !important;
    margin-right:5px;
    margin-left: 5px;
  }
</style>
