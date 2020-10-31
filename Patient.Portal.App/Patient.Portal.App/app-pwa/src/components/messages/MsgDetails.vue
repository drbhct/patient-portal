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
import api from '../../api/http-common.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions(['setMsgCurrentPage'])
  },
  computed: {
    ...mapGetters(['getMsgInfo', 'getProfilePatientAssociated']),
    currentPatientAssociated () {
      if (this.getProfilePatientAssociated.length === 0) {
        return null
      }
      return this.getProfilePatientAssociated[0]
    }
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

<style>
</style>
