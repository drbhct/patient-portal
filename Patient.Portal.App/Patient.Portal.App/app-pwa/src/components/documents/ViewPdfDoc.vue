<template>
  <div class="">
    <div class="col-lg-12" v-if="file.fileName">
      <h1>{{ file.fileName }}</h1>
      <pdf :src="file.fileObj" :page="1">
        <template slot="loading"> loading content here... </template>
      </pdf>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../api/http-common.js'
import pdf from 'pdfvuer'
export default {
  data () {
    return {
      file: {
        fileName: '',
        fileObj: ''
      }
    }
  },
  components: {
    pdf
  },
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

    this.file.fileName = fileResponse.data.originalFileName
    this.file.fileObj = 'data:image/;base64,' + fileResponse.data.base64String
  }
}
</script>

<style>
</style>
