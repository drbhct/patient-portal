<template>
  <Survey :survey='survey'/>
</template>

<script>
import 'survey-core/defaultV2.min.css'
import api from '../../api/http-common.js'
import { Survey } from 'survey-vue-ui'
import { Model } from 'survey-core'
export default {
  data () {
    return {
      survey: null
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
      this.formTitle = queryData.t
      var res = await api.task.request.getFacilityFormJson(queryData.i)
      var obj = {
        elements: res.data.pages[0].elements
      }
      this.surveyJson = obj
      return obj
    }
  },
  async mounted() {
    const x = await this.loadData()
    const survey_ = new Model(x)
    survey_.onComplete.add(this.alertResults)
    this.survey = survey_
  }
}
</script>

<style>
</style>
