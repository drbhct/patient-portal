<template>
  <section role="main">
    <form
      @submit.prevent="submit"
      class="mt-5 mr-2 ml-2 justify-content-md-center"
    >
      <div class="col">
        <section class="card">
          <header class="card"></header>
          <div class="card-body">
            <div class="form-horizontal">

              <div class="form-group row" v-for="q in form.questions" :key="q.code">
                <label
                  class="col-lg-3 control-label text-lg-right pt-2"
                >{{ q.question }}</label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="q.answer"
                    :options="yesNoSelection"
                    :multiple="false"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-lg-12 text-center">
                  <h3>The doctor will ask you for details during your visit. </h3>
                </div>
              </div>

            </div>
          </div>
          <footer class="card-footer">
            <div class="row justify-content-end">
              <div class="col-sm-9">
                <button
                  type="reset"
                  class="btn btn-default mr-2"
                  @click="prev"
                  v-if="getTaskPreviousTaskType"
                >
                  Back
                </button>
                <button class="btn btn-primary mr-2" type="submit">Next</button>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </form>
  </section>
</template>

<script>
import Multiselect from 'vue-multiselect'
import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import api from '../../api/http-common.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Multiselect
  },
  data () {
    return {
      form: {
        questions: [
          { code: 'SeenChiropractor', question: 'Have you ever seen a chiropractor before?', answer: '' },
          { code: 'DoctorToKnow', question: 'Is there anything else you want the doctor to know?', answer: '' }
        ],
        seenChiro: null,
        otherInquiry: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'getProfilePatientAssociated',
      'getTaskCurrentCaseHistoryId',
      'getTaskPreviousTaskType',
      'getTaskCurrentTaskType'
    ]),
    currentPatientAssociated () {
      if (this.getProfilePatientAssociated.length === 0) {
        return null
      }
      return this.getProfilePatientAssociated[0]
    },
    yesNoSelection () {
      return ['Yes', 'No']
    }
  },
  methods: {
    ...mapActions(['setTaskCurrentTaskType']),
    async submit () {
      const payload = {
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryId: this.getTaskCurrentCaseHistoryId,
        questions: []
      }
      this.form.questions.forEach(c => {
        payload.questions.push({
          description: c.code,
          answer: c.answer
        })
      })
      console.log('payload>', payload)
      await api.task.request.updateCaseHistoryQuestions(payload)
    },
    prev () {
      const currentIndex = this.getTaskPreviousTaskType.findIndex(c => c === this.getTaskCurrentTaskType)
      let prevPage = ''
      if (currentIndex === -1) {
        prevPage = this.getTaskPreviousTaskType[this.getTaskPreviousTaskType.length - 1]
      } else {
        prevPage = this.getTaskPreviousTaskType[currentIndex - 1]
      }
      this.setTaskCurrentTaskType(prevPage)
    }
  },
  async mounted () {
    const caseHistoryQuestions = await api.task.request.getCaseHistoryQuestions({
      facilityId: this.currentPatientAssociated.facilityID,
      caseHistoryId: this.getTaskCurrentCaseHistoryId
    })

    const record = caseHistoryQuestions.data.filter(c => c.description === 'SeenChiropractor' || c.description === 'DoctorToKnow')
    console.log('record', record)
    record.forEach(c => {
      const update = this.form.questions.find(x => x.code === c.description)
      console.log('update', update)
      if (update) {
        update.answer = c.answer
      }
    })
  }
}
</script>

<style>
</style>
