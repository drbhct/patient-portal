<template>
  <div class="row mx-1">
    <table class="table table-responsive-md mb-5">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr>
          <td>1</td>
          <td>
            <a href="javascript:void(0)" @click="setMsgCurrentPage('Detail')">Missed Appointment 1/12/2010</a>
          </td>
          <td>1/13/2020</td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <a href="javascript:void(0)" @click="setMsgCurrentPage('Detail')">Update Contact Information</a>
          </td>
          <td>12/13/2020</td>
        </tr> -->
        <tr v-for="msg in messages" :key="'msg'+msg.id">
          <td><a href="javascript:void(0)" @click="viewMsg(msg)">{{ msg.subject }}</a></td>
          <td>{{ formatData(msg.date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import api from '../../api/http-common.js'
export default {
  data () {
    return {
      messages: []
    }
  },
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
    const response = await api.msg.request.getMessageList({
      facilityId: this.currentPatientAssociated.facilityID,
      patientId: this.currentPatientAssociated.patientID
    })
    this.messages = response.data
  }
}
</script>

<style scoped>

</style>
