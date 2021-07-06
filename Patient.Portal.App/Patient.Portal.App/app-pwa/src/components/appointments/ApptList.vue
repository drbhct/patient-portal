<template>
  <div class="form">
    <table id="tblDemo" class="table tbl-bordered table-striped pt-4 w-100">
      <thead>
        <tr class="text-center">
          <td class="header-text">Appointments</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in applist" :key="item.index">
          <td>{{ date(item) }}</td>
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
      applist: null,
      dt: null
    }
  },
  computed: {
    ...mapGetters(['getProfilePatientAssociated', 'currentPatientAssociated'])
  },
  methods: {
    date: function (date) {
      return moment(date).format('dddd MM/DD/YYYY @ h:mm a')
    }
  },
  async mounted () {
    const res = await api.patient.request.getpatientfutureappts({
      facilityId: this.currentPatientAssociated.facilityID,
      patientId: this.currentPatientAssociated.patientID
    })
    const data = res.data
    this.applist = data.map(date => new Date(date))
    this.applist = this.applist.sort(function (a, b) {
      return a - b
    })
    // eslint-disable-next-line no-undef
    // setTimeout(function () { $('#tblDemo').DataTable({ bFilter: false, bInfo: false }) }, 300)
  }
}
</script>
<style scoped>
  .header-text {
    font-size: 16px;
    font-weight: 600 !important;
  }
</style>
