<template>
  <div class="row mx-1 justify-content-md-center">
    <div v-if="isLoading">
      <h3>Fetching messages ...</h3>
    </div>
    <div v-if="!isLoading" class="col-md-12">
      <table class="table table-responsive-md mb-5" v-if="messages.length>0">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="msg in messages" :key="'msg' + msg.id">
            <td>
              <a href="javascript:void(0)" @click="viewMsg(msg)">{{
                msg.subject
              }}</a>
            </td>
            <td>{{ formatData(msg.date) }}</td>
          </tr>
        </tbody>
      </table>
      <h3 v-else>Message list empty..</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import api from '../../api/http-common.js'
export default {
  data () {
    return {
      messages: [],
      isLoading: false
    }
  },
  components: {},
  methods: {
    ...mapActions(['setMsgCurrentPage', 'setCurrentMsgInfo']),
    formatData (dayVal) {
      return moment(dayVal).format('MM/DD/YYYY')
    },
    viewMsg (msgInfo) {
      this.setCurrentMsgInfo(msgInfo)
      this.setMsgCurrentPage('Detail')
    }
  },
  computed: {
    ...mapGetters(['getProfilePatientAssociated']),
    currentPatientAssociated () {
      if (this.getProfilePatientAssociated.length === 0) {
        return null
      }
      return this.getProfilePatientAssociated[0]
    }
  },
  async mounted () {
    this.isLoading = true
    const response = await api.msg.request.getMessageList({
      facilityId: this.currentPatientAssociated.facilityID,
      patientId: this.currentPatientAssociated.patientID
    })
    this.isLoading = false
    this.messages = response.data
  }
}
</script>

<style scoped>
</style>
