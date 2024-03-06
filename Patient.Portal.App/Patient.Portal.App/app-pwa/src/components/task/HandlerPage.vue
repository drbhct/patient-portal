<template>
  <Survey :survey='survey'/>
</template>

<script>
import 'survey-core/defaultV2.min.css'
import api from '../../api/http-common.js'
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
  methods: {
    alertResults (sender) {
      const results = JSON.stringify(sender.data)
      alert(results)
    },
    async loadData () {
      const queryData = this.$route.query
      if (queryData) {
        var res = await api.task.request.getFacilityFormJson(queryData.i)
        var el = res.data.pages[0].elements
        var itemIndex = el.findIndex(x => x.name === 'patientName')
        if (itemIndex) {
          el[itemIndex].defaultValue = queryData.p
        }
        // var obj = {
        //   elements: el
        // }
        // this.surveyJson = obj
        this.surveyJson = res.data
        this.pdfFilename = res.data.title
        return res.data
      } else {
        return null
      }
    },
    savePdf () {
      console.log('savepdf')
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
    this.survey.onComplete.add(this.alertResults)
    this.survey.addNavigationItem({
      id: 'pdf-export',
      title: 'Save as PDF',
      action: () => this.savePdf(this.survey.data)
    })
  }
}
</script>

<style>
</style>
