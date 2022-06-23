<template>
  <div class="">
    <div class="col-lg-12" v-if="file.fileName">
      <h1>
        Statement {{ statementInfo.StatementDate }}
        <span
          title="Download File"
          class="ml-2"
          style="cursor: pointer"
          @click="printStatement"
          ><i class="fa-solid fa-print"></i
        ></span>
      </h1>
      <hr />
      <div id="printArea">
        <pdf :src="file.fileObj" :page="1">
          <template slot="loading"> loading content here... </template>
        </pdf>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../api/http-common.js'
import pdf from 'pdfvuer'
import printjs from 'print-js'
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
    ]),
    statementInfo () {
      if (!this.getBillingTaskStatement) {
        return null
      }

      const info = JSON.parse(this.getBillingTaskStatement.info)
      return info
    }
  },
  methods: {
    printStatement () {
      // this.$htmlToPaper('printArea')
      printjs({
        printable: this.file.base64,
        type: 'pdf',
        base64: true
      })
    }
  },
  async mounted () {
    const fileResponse = await api.patient.request.downloadfilebase64({
      facilityId: this.currentPatientAssociated.facilityID,
      id: this.$route.query.fileId
    })

    this.file.fileName = fileResponse.data.originalFileName
    this.file.fileObj = 'data:image/;base64,' + fileResponse.data.base64String
    this.file.base64 = fileResponse.data.base64String
  }
}
</script>

<style>
</style>
