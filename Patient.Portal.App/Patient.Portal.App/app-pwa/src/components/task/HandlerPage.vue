<template>
  <Survey :survey='survey'/>
</template>

<script>
import 'survey-core/defaultV2.min.css'
import api from '../../api/http-common.js'
import { mapGetters } from 'vuex'
import { Survey } from 'survey-vue-ui'
import { Model, slk } from 'survey-core'
import { SurveyPDF } from 'survey-pdf'

slk(
  'ZjI3MDkwMDYtNDkxNC00MmJkLTg4NDUtMjFhYjIyMDM5MWQxOzE9MjAyNS0wMy0wNCwyPTIwMjUtMDMtMDQsND0yMDI1LTAzLTA0'
)

export default {
  data () {
    return {
      survey: null,
      surveyJson: null,
      patientName: '',
      pdfFilename: '',
      pdfDocOptions: {
        fontSize: 12,
        htmlRenderAs: 'image'
      }
    }
  },
  components: {
    Survey
  },
  computed: {
    ...mapGetters(['currentPatientAssociated'])
  },
  methods: {
    alertResults (sender) {
      // const results = JSON.stringify(sender.data)
      setTimeout(() => {
        window.opener.location.reload()
        window.close()
      }, 3000)
    },
    complete () {
      const queryData = this.$route.query
      const surveyPdf = new SurveyPDF(this.surveyJson, this.pdfDocOptions)
      if (surveyPdf) {
        surveyPdf.data = this.survey.data
        surveyPdf.raw('dataurlstring').then(async (dataurlstring) => {
          var base64 = dataurlstring.split('base64,')[1]
          var fileID = await api.task.request.uploadPatientForm({
            facilityId: this.currentPatientAssociated.facilityID,
            patientId: queryData.pid,
            description: this.surveyJson.title,
            base64: base64
          })

          if (fileID) {
            console.log(fileID)
            await api.task.request.insertPatientForm({
              facilityformId: queryData.i,
              patientid: queryData.pid,
              data: JSON.stringify(surveyPdf.data)
            })

            await api.task.request.updateTaskComplete({
              facilityId: this.currentPatientAssociated.facilityID,
              id: queryData.tid,
              patientId: queryData.pid
            })

            window.opener.location.reload()

            setTimeout(() => {
              window.close()
            }, 2000)
          }
        })
      }
    },
    async loadData () {
      const queryData = this.$route.query
      if (queryData) {
        var res = await api.task.request.getFacilityFormJsonQueryObj({
          facilityformid: queryData.i,
          patientId: queryData.pid
        })
        var objData = JSON.parse(res.data.data)
        var el = objData.pages[0].elements
        var itemIndex = el.findIndex(x => x.name === 'patientName')
        if (itemIndex) {
          el[itemIndex].defaultValue = queryData.p
        }
        this.surveyJson = objData
        this.pdfFilename = objData.title
        objData.completedHtml = '<span style="font-size: 32px; font-weight: bolder">Thank you for completing the form</span>'
        return objData
      } else {
        return null
      }
    },
    savePdf () {
      const surveyPdf = new SurveyPDF(this.surveyJson, this.pdfDocOptions)
      if (surveyPdf) {
        surveyPdf.data = this.survey.data
        surveyPdf.save(this.pdfFilename)
      }
    }
  },
  async mounted() {
    const x = await this.loadData()
    this.survey = new Model(x)
    this.survey.onCompleting.add(this.complete)
    this.survey.addNavigationItem({
      id: 'pdf-export',
      title: 'Save as PDF',
      action: () => this.savePdf(this.survey.data)
    })
    this.survey.onUpdateQuestionCssClasses.add(function (_, options) {
      if (options.question.name === 'patientTypedSignature') {
        options.cssClasses.root += ' scriptedSignatureInput'
      }
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

.scriptedSignatureInput {
  font-family: 'Great Vibes', cursive !important;
  font-size: 18px !important;
  font-weight: 550;
}
</style>
