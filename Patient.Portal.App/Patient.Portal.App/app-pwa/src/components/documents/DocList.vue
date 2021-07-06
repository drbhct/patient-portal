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
          <!--<td><a :href="getfile(item.fileID)" target="_blank">{{ item.description }}</a></td>-->
          <td><a @click.prevent="getfile(item.fileID)" href="">{{ item.description }}</a></td>
          <td><span>{{ date(item.fileDate) }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import api from '../../api/http-common.js'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  components: {
    Loading
  },
  data () {
    return {
      doclist: null,
      dt: null
    }
  },
  computed: {
    ...mapGetters(['getProfilePatientAssociated', 'getIsLoading', 'currentPatientAssociated'])
  },
  methods: {
    date: function (date) {
      return moment(date).format('MM/DD/YYYY')
    },
    async getfile (fileID) {
      const file = await api.patient.request.downloadfilebase64({
        facilityId: this.currentPatientAssociated.facilityID,
        id: fileID
      })
      const a = document.createElement('a')
      a.href = 'data:application/octet-stream;base64,' + file.data.base64String
      a.download = file.data.originalFileName // File name Here
      a.click()
      URL.revokeObjectURL(a)
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
