<template>
  <div class="mx-1">
    <h1>View File</h1>
    <div class="col-lg-12"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../api/http-common.js'
export default {
  computed: {
    ...mapGetters([
      'currentPatientAssociated',
      'getBillingTaskStatement',
      'getProfileAuthInfo'
    ])
  },
  async mounted () {
    const fileResponse = await api.patient.request.downloadfilebase64({
      facilityId: this.currentPatientAssociated.facilityID,
      id: this.$route.query.fileId
    })
    console.log('fileResponse>', fileResponse)
  }
}
</script>

<style>
</style>
