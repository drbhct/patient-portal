<template>
  <section role="main">
    <form class="mt-5 mr-2 ml-2 justify-content-md-center" @submit.prevent="submit">
      <div class="col">
        <section class="card">
          <header class="card-header"></header>
          <div class="card-body">
            <div class="form-horizontal" v-if="!isLoading">
              <div class="row">
                <div class="col-lg-12 text-center">
                  <h4>Please answer these questions about yourself</h4>
                </div>
              </div>
              <div class="form-group row" v-for="infoQandA in form.infoQuestion" :key="infoQandA.question">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  {{ infoQandA.question }}
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="infoQandA.answer"
                    :options="infoQandA.selections"
                    :multiple="false"
                  />
                </div>
              </div>

              <hr />

              <div class="row">
                <div class="col-lg-12 text-center">
                  <h4>
                    Please indicate the following condition(s) that apply to you
                  </h4>
                  <h4>
                    Present = you have this now Past = if you have had in the
                    past
                  </h4>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6" v-for="condition in form.conditionQandA" :key="condition.question">
                  <div class="form-group row mb-2">
                    <label class="col-lg-3 control-label text-lg-right pt-2">
                      {{ condition.question }}
                    </label>
                    <div class="col-lg-6">
                      <multiselect
                        v-model="condition.answer"
                        :options="conditionApplySelection"
                        :multiple="true"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr>
              <div class="row">
                <div class="col-lg-12 text-center">
                  <h4>
                    Have you ever taken
                  </h4>
                </div>
              </div>

              <div class="form-group row" v-for="medQandA in form.medicineInfoQuestion" :key="medQandA.question">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  {{ medQandA.question }}
                </label>
                <div :class="{ 'col-lg-3': medQandA.answer === 'Yes', 'col-lg-6': medQandA.answer !== 'Yes' }">
                  <multiselect
                    v-model="medQandA.answer"
                    :options="yesNoSelection"
                    :multiple="false"
                  />
                </div>
                <div class="col-lg-3" v-if="medQandA.answer === 'Yes'">
                  <multiselect
                    v-model="medQandA.year"
                    :options="medicineYearSelection"
                    :multiple="false"
                    :placeholder="'Select year'"
                  />
                </div>
              </div>

              <div class="form-group row" v-for="medQandA in form.medicineInfo2Question" :key="medQandA.question">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  {{ medQandA.question }} {{ medQandA.code }}
                </label>
                <div class="col-lg-6" >
                  <multiselect
                    v-model="medQandA.answer"
                    :options="yesNoSelection"
                    :multiple="false"
                    v-if="medQandA.code !=='LastMenstrualPeriod'"
                  />
                  <datepicker
                    v-model="medQandA.answer"
                    :format="'MMMM dd, yyyy'"
                    v-if="medQandA.code ==='LastMenstrualPeriod'"
                    :clear-button="true"
                    :bootstrap-styling="true"
                    :disabled-dates="disabledDates"
                  ></datepicker>
                  <span class="help-block" v-if="medQandA.code ==='LastMenstrualPeriod'">Leave field empty if not sure</span>
                </div>
              </div>

              <hr>

              <div class="row">
                <div class="col-lg-12 text-center">
                  <h4>
                    Demographics
                  </h4>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  What languages do you speak?
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.language"
                    :options="languageList"
                    :multiple="false"
                    :label="'description'"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  Ethnicity
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.ethnicity"
                    :options="ethnicilityList"
                    :multiple="false"
                    :label="'description'"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  Which category describes your race?
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.race"
                    :options="raceList"
                    :multiple="false"
                    :label="'description'"
                  />
                </div>
              </div>

            </div>
            <div v-else>
              <div class="col-12">
                <content-placeholders :rounded="true" :centered="true">
                  <content-placeholders-text :lines="30" />
                </content-placeholders>
              </div>
            </div>
          </div>
          <footer class="card-footer"></footer>
        </section>
        <footer class="card-footer">
            <div class="row justify-content-end">
              <div class="col-sm-9">
                <button type="reset" class="btn btn-default mr-2" @click="prev" v-if="getTaskPreviousTaskType">Back</button>
                <btn-saving :is-saving="isSaving"/>
              </div>
            </div>
          </footer>
      </div>
    </form>
  </section>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import Multiselect from 'vue-multiselect'
import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import api from '../../api/http-common.js'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import btnSaving from '../button-saving.vue'
export default {
  components: {
    Multiselect,
    btnSaving,
    Datepicker
  },
  data () {
    return {
      disabledDates: {
        from: new Date()
      },
      isLoading: false,
      isSaving: false,
      form: {
        infoQuestion: [],
        conditionQandA: [
          { question: 'Fatigue', answer: [] },
          { question: 'Seizures', answer: [] },
          { question: 'Fever', answer: [] },
          { question: 'Depression', answer: [] },
          { question: 'Chills', answer: [] },
          { question: 'Dizziness', answer: [] },
          { question: 'Tremors', answer: [] },
          { question: 'Mempry Loss', answer: [] },
          { question: 'Night Sweats', answer: [] },
          { question: 'Hot Joints', answer: [] },
          { question: 'Fainting', answer: [] },
          { question: 'Muscle Weakness', answer: [] },
          { question: 'Joint Swelling', answer: [] },
          { question: 'Loss of Coordination', answer: [] },
          { question: 'Lumps/Masses', answer: [] },
          { question: 'Difficulty of Speeech', answer: [] }
        ],
        medicineInfoQuestion: [
          { question: 'Insulin', answer: '', year: '', code: 'Insulin' },
          { question: 'Cortizone', answer: '', year: '', code: 'Cortisone' },
          { question: 'Male/Female Hormones', answer: '', year: '', code: 'MaleFemaleHormones' },
          { question: 'Blood Pressure', answer: '', year: '', code: 'BloodPressure' },
          { question: 'Tranquilizer/Sedative', answer: '', year: '', code: 'TranquilizersSedatives' }
        ],
        medicineInfo2Question: [
          { question: 'Are you taking any medications?', answer: '', code: 'Medications' },
          { question: 'Are you taking any nutritional supplement?', answer: '', code: 'NutritionalSupplements' },
          { question: 'Have you had any surgeries?', answer: '', code: 'Surgeries' },
          { question: 'Have you any hospitalization?', answer: '', code: 'Hospitalization' },
          { question: 'Have you had any significant past trauma?', answer: '', code: 'SignificantPastTrauma' },
          { question: 'Do you have a pacemaker', answer: '', code: 'Pacemaker' }
        ],
        language: null,
        ethnicity: null,
        race: null
      },
      patientInfo: null,
      medicineYearSelection: [],
      ethnicilityList: [],
      raceList: [],
      languageList: []

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
    numOfChildrenSelection: function () {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    excerciseSelection: function () {
      return ['Never', 'Rarely', 'Occasionally', 'Moderately', 'Regularly']
    },
    excerciseIntensitySelection: function () {
      return ['Low', 'Medium', 'High', 'Competition']
    },
    sufficientRestSelection: function () {
      return ['Never', 'Rarely', 'Occasionally', 'Sometimes', 'Often']
    },
    hourOfSleepSelection: function () {
      return ['Less than 6', '6 to 8', '8 to 10', 'More than 10']
    },
    wellBalancedDietSelection: function () {
      return ['Never', 'Rarely', 'Sometimes', 'Often']
    },
    smokeSelection: function () {
      return [
        'No',
        'Occasionally',
        '1 to 2 packs',
        '2 to 3 packs',
        '4 or more'
      ]
    },
    caffeinSelection: function () {
      return [
        'No',
        'Occasionally',
        '1 to 2 Drinks',
        '2 to 3 Drinks',
        '4 or more'
      ]
    },
    alcoholSelection: function () {
      return [
        'No',
        'Occasionally',
        '1 to 2 Drinks',
        '2 to 3 Drinks',
        '4 or more'
      ]
    },
    drugsSelection: function () {
      return ['Yes', 'No']
    },
    yesNoSelection: function () {
      return ['Yes', 'No']
    },
    conditionApplySelection: function () {
      return ['Present', 'Past']
    }
  },
  methods: {
    ...mapActions(['setTaskCurrentTaskType']),
    prev () {
      const currentIndex = this.getTaskPreviousTaskType.findIndex(c => c === this.getTaskCurrentTaskType)
      let prevPage = ''
      if (currentIndex === -1) {
        prevPage = this.getTaskPreviousTaskType[this.getTaskPreviousTaskType.length - 1]
      } else {
        prevPage = this.getTaskPreviousTaskType[currentIndex - 1]
      }
      this.setTaskCurrentTaskType(prevPage)
    },
    async submit () {
      this.isSaving = true
      // info payloads
      const infoPayload = {
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryId: this.getTaskCurrentCaseHistoryId,
        questions: []
      }
      this.form.infoQuestion.forEach(el => {
        infoPayload.questions.push({
          description: el.code,
          answer: el.answer
        })
      })

      // console.log('infoPayload>', infoPayload)

      // case condition payloads
      const caseConditionPayload = {
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryId: this.getTaskCurrentCaseHistoryId,
        conditions: []
      }
      this.form.conditionQandA.forEach(el => {
        const isPresent = el.answer.find(c => c === 'Present') !== undefined
        const isPast = el.answer.find(c => c === 'Past') !== undefined
        caseConditionPayload.conditions.push({
          description: el.question,
          past: isPast,
          present: isPresent,
          notPresent: false
        })
      })
      // console.log('caseConditionPayload>', caseConditionPayload)

      // medicine info payloads
      const medicineInfoPayload = {
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryId: this.getTaskCurrentCaseHistoryId,
        questions: []
      }
      this.form.medicineInfoQuestion.forEach(el => {
        medicineInfoPayload.questions.push({
          description: el.code,
          answer: el.answer === 'Yes' ? `${el.answer},${el.year}` : el.answer
        })
      })

      const medicineInfo2Payload = {
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryId: this.getTaskCurrentCaseHistoryId,
        questions: []
      }
      this.form.medicineInfo2Question.forEach(el => {
        if (el.code === 'LastMenstrualPeriod') {
          if (el.answer) {
            el.answer = moment(el.answer).format('YYYY-MM-DD')
          }
        }
        medicineInfo2Payload.questions.push({
          description: el.code,
          answer: el.answer
        })
      })

      // console.log('medicineInfoPayload>', medicineInfoPayload)
      // console.log('medicineInfo2Payload>', medicineInfo2Payload)

      let ethnicity = ''
      let race = ''
      let lang = ''
      let declineEthnicity = false
      let declineRace = false
      let declineLanguage = false
      if (this.form.ethnicity) {
        ethnicity = this.form.ethnicity.code
        declineEthnicity = this.form.ethnicity.description === 'Decline to Answer'
      }
      if (this.form.race) {
        race = this.form.race.code
        declineRace = this.form.race.description === 'Decline to Answer'
      }
      if (this.form.language) {
        lang = this.form.language.code
        declineLanguage = this.form.language.description === 'Decline to Answer'
      }
      // Demographics payload
      const demographicsPayload = {
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryId: this.getTaskCurrentCaseHistoryId,
        ethnicity: ethnicity,
        races: race,
        languages: lang,
        declineEthnicity: declineEthnicity,
        declineRace: declineRace,
        declineLanguage: declineLanguage
      }
      // console.log('demographicsPayload>', demographicsPayload)

      // info questions
      await api.task.request.updateCaseHistoryQuestions(infoPayload)
      // condition questions
      await api.task.request.clearCaseHistoryConditions({
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryId: this.getTaskCurrentCaseHistoryId
      })
      await api.task.request.updateCaseHistoryConditions(caseConditionPayload)
      // medicine questions
      await api.task.request.updateCaseHistoryQuestions(medicineInfoPayload)
      await api.task.request.updateCaseHistoryQuestions(medicineInfo2Payload)
      // demographics questions
      await api.task.request.updateCaseHistoryDemographic(demographicsPayload)

      this.isSaving = false
      this.setTaskCurrentTaskType('NphFamilyHistory')
    }
  },
  async mounted () {
    this.isLoading = true
    const patientInfo = await api.task.request.getPatient({
      facilityId: this.currentPatientAssociated.facilityID,
      patientId: this.currentPatientAssociated.patientID
    })

    this.patientInfo = patientInfo.data

    // Construct info questionaire
    this.form.infoQuestion = [
      { question: 'Number of Children?', code: 'NumberOfChildren', answer: '', selections: this.numOfChildrenSelection },
      { question: 'Exercise Frequency? ', code: 'ExerciseFrequency', answer: '', selections: this.excerciseSelection },
      { question: 'Exercise Intensity Level? ', code: 'ExerciseIntensity', answer: '', selections: this.excerciseIntensitySelection },
      { question: 'Sufficient Rest? ', code: 'SufficientRest', answer: '', selections: this.sufficientRestSelection },
      { question: 'Hours of Sleep? ', code: 'HoursOfSleep', answer: '', selections: this.hourOfSleepSelection },
      { question: 'Well balanced diet? ', code: 'WellBalancedDiet', answer: '', selections: this.wellBalancedDietSelection },
      { question: 'Do you smoke? ', code: 'Smoke', answer: '', selections: this.smokeSelection },
      { question: 'Do you drink caffeinated beverages? ', code: 'CaffeinatedDrinks', answer: '', selections: this.caffeinSelection },
      { question: 'Do you drink alcoholic beverages? ', code: 'AlcoholicDrinks', answer: '', selections: this.alcoholSelection },
      { question: 'Have you ever used street drugs? ', code: 'StreetDrugs', answer: '', selections: this.drugsSelection }
    ]
    // console.log('this.patientInfo', this.patientInfo)
    // console.log('this.patientInfo.dob', this.patientInfo.dob)
    // Fetch medicine info year
    let dobYear = moment(this.patientInfo.dob).year()
    const medicineYearSelection = []
    const currentYear = new Date().getFullYear()
    while (dobYear < currentYear) {
      medicineYearSelection.push(dobYear)
      dobYear += 1
    }
    this.medicineYearSelection = medicineYearSelection

    // Construct medicine info questionaire form
    if (this.patientInfo.sex === 'F') {
      this.form.medicineInfoQuestion.push(
        { question: 'Birth Control', answer: '', year: '', code: 'BirthControl' }
      )
      this.form.medicineInfo2Question.push(
        { question: 'Are you pregnant?', answer: '', code: 'Pregnant' }
      )
      this.form.medicineInfo2Question.push(
        { question: 'Date of last menstrual period?', answer: '', code: 'LastMenstrualPeriod' }
      )
    }

    let ethnicilityList = await api.task.request.getEthnicityList(this.currentPatientAssociated.facilityID)
    ethnicilityList = ethnicilityList.data
    ethnicilityList.push({
      code: 'Decline',
      description: 'Decline to Answer',
      display: true
    })
    this.ethnicilityList = ethnicilityList

    let languageList = await api.task.request.getLanguageList(this.currentPatientAssociated.facilityID)
    languageList = languageList.data.filter(el => el.display)
    languageList.push({
      code: 'Other',
      description: 'Other',
      display: true
    })
    languageList.push({
      code: 'Decline',
      description: 'Decline to Answer',
      display: true
    })
    this.languageList = languageList

    let raceList = await api.task.request.getRaceList(this.currentPatientAssociated.facilityID)
    raceList = raceList.data
    raceList.push({
      code: 'Decline',
      description: 'Decline to Answer',
      display: true
    })
    this.raceList = raceList

    const caseHistoryQuestions = await api.task.request.getCaseHistoryQuestions({
      facilityId: this.currentPatientAssociated.facilityID,
      caseHistoryId: this.getTaskCurrentCaseHistoryId
    })
    const hasAnswerQuestions = caseHistoryQuestions.data.filter(el => el.answer !== '')
    hasAnswerQuestions.forEach(el => {
      const update = this.form.infoQuestion.find(infoEl => infoEl.code === el.description)
      if (update) {
        update.answer = el.answer
      }

      const medInfo = this.form.medicineInfoQuestion.find(medInfoEl => medInfoEl.code === el.description)
      if (medInfo) {
        const ansArr = el.answer.split(',')
        if (ansArr.length > 1) {
          medInfo.year = ansArr[1]
        }
        // console.log('ansArr[0]>', ansArr[0])
        medInfo.answer = ansArr[0]
      }

      const medInfo2 = this.form.medicineInfo2Question.find(medInfoEl => medInfoEl.code === el.description)
      if (medInfo2) {
        if (medInfo2.description === 'LastMenstrualPeriod') {
          el.answer = moment(el.answer)
        }
        medInfo2.answer = el.answer
      }
    })

    let demographicsData = await api.task.request.getCaseHistoryDemographic({
      facilityId: this.currentPatientAssociated.facilityID,
      caseHistoryId: this.getTaskCurrentCaseHistoryId
    })
    demographicsData = demographicsData.data
    // console.log('demographicsData>', demographicsData)

    if (demographicsData.languages) {
      const findLang = this.languageList.find(el => el.code === demographicsData.languages)
      this.form.language = findLang
    }
    if (demographicsData.ethnicity) {
      const findEthnicity = this.ethnicilityList.find(el => el.code === demographicsData.ethnicity)
      this.form.ethnicity = findEthnicity
    }
    if (demographicsData.races) {
      const findRace = this.raceList.find(el => el.code === demographicsData.races)
      this.form.race = findRace
    }

    const conditionsData = await api.task.request.getCaseHistoryConditions({
      facilityId: this.currentPatientAssociated.facilityID,
      caseHistoryId: this.getTaskCurrentCaseHistoryId
    })

    conditionsData.data.forEach(el => {
      const condQandA = this.form.conditionQandA.find(c => c.question === el.description)
      if (condQandA) {
        if (el.present) {
          condQandA.answer.push('Present')
        }
        if (el.past) {
          condQandA.answer.push('Past')
        }
      }
    })

    this.isLoading = false

    const el = document.getElementsByClassName('form-horizontal')
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style>
</style>
