<template>
    <div class="row pb-4">
      <div class="col col-xl-8 col-xl-8">
        <!--<p class="dash-appt-title">Upcoming appointments</p>-->
        <div class="header-t-text d-block">
          Upcoming appointments
        </div>
        <ul class="list-unstyled list-text-aligned-right">
          <li v-for="item in applist" :key="item.index">{{ date(item) }}</li>
        </ul>
        <span v-if="applist.length === 0"> No upcoming appointments.</span>
      </div>
    </div>
</template>
<script>
import api from '../../api/http-common.js'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data () {
    return {
      applist: [],
      dt: []
    }
  },
  computed: {
    ...mapGetters(['getProfilePatientAssociated', 'currentPatientAssociated'])
  },
  methods: {
    date: function (date) {
      return moment(date).format('dddd  MM/DD/YYYY @ h:mm a')
    }
  },
  async mounted () {
    if (this.currentPatientAssociated) {
      const res = await api.patient.request.getpatientfutureappts({
        facilityId: this.currentPatientAssociated.facilityID,
        patientId: this.currentPatientAssociated.patientID
      })
      this.applist = res.data
    }
  }
}
</script>
