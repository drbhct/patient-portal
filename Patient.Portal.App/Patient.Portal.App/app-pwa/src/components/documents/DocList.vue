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
          <!--<td><a :href="onclick(item.fileID)" target="_blank">{{ item.description }}</a></td>-->
          <td><a @click.prevent="onclick(item.fileID, item.originalFileName)" href="#">{{ item.description }}</a></td>
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
    async onclick (fileID, filename) {
      const file = await api.patient.request.downloadfile({
        facilityId: this.currentPatientAssociated.facilityID,
        id: fileID
      })
      const blob = new Blob([file])
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = filename
      link.click()
      URL.revokeObjectURL(link.href)
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
