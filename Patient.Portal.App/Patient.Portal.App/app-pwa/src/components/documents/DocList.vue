<template>
  <div class="form">
    <loading :active.sync="getIsLoading" :can-cancel="false"></loading>
    <table class="table mb-5 tbl-bordered table-striped">
      <thead>
        <tr class="border_bottom">
          <th>File Name</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in doclist" :key="item.fileID">
          <td><a href="menu/documents" @click="onclick(item.url)">{{ item.description }}</a></td>
          <td><span>{{ date(item.fileDate) }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../../api/http-common.js'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data () {
    return {
      doclist: null,
      dt: null
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
  methods: {
    date: function (date) {
      return moment(date).format('MM/DD/YYYY')
    },
    onclick (url) {
      window.open(url)
    }
  },
  async mounted () {
    const res = await api.patient.request.getattachmentlist({
      facilityId: this.currentPatientAssociated.facilityID,
      patientId: this.currentPatientAssociated.patientID
    })
    this.doclist = res.data
  }
}
</script>
<style scoped>
</style>
