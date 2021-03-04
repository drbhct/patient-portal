<template>
  <section role="main">
    <form
      action=""
      class="mt-5 mr-2 ml-2 justify-content-md-center"
      v-if="currentProblem"
      @submit.prevent="submit"
    >
      <div class="col">
        <section class="card">
          <header class="card-header"><h2 class="card-title"></h2></header>
          <div class="card-body">
            <div class="form-vertical">
              <div class="form-group row">
                <label
                  class="col-lg-4 control-label text-lg-right pt-2"
                  id="firstQuestion"
                  ><strong style="color: red; margin-right: 5px">*</strong
                  >Please choose the area that best describes where your
                  <strong style="color: red">{{
                    currentProblem.region
                  }}</strong>
                  pain occurs</label
                >
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.describe"
                    :options="complaintLocations"
                    :group-select="true"
                    :multiple="true"
                    @select="describeSelectChange"
                    @remove="selectRemove"
                    :max="form.describeSelectLimit"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="showSpecifyDescribe">
                <label
                  class="col-lg-4 control-label text-lg-right pt-2"
                  id="firstQuestion"
                  >Please specify best describes where your
                  <strong style="color: red">{{
                    currentProblem.region
                  }}</strong>
                  pain occurs</label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    v-model="form.describeOther"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2"
                  >Please indicate the date your symptoms first occurred</label
                >
                <div class="col-lg-6">
                  <!-- <div class="input-group mb-3">
                    <datepicker
                      v-model="form.dateOccured"
                      :input-class="'form-control'"
                      :format="'MMMM dd, yyyy'"
                      :disabled-dates="disabledDates"
                    ></datepicker>
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="button">
                        Not Sure
                      </button>
                    </div>
                  </div> -->
                  <datepicker
                    v-model="form.dateOccured"
                    :input-class="'form-control'"
                    :format="'MMMM dd, yyyy'"
                    :disabled-dates="disabledDates"
                  ></datepicker>
                  <span class="help-block">Leave field empty if not sure</span>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2"
                  ><strong style="color: red; margin-right: 5px">*</strong>How
                  often do you experience this
                  <strong style="color: red">{{
                    currentProblem.region
                  }}</strong>
                  pain?</label
                >
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.expPain"
                    :options="expPains"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  <strong style="color: red; margin-right: 5px">*</strong>
                  Using the slide, rate the intensity of your primary problem
                  pain now 0 = None 1 = Minimal 2 = Very Mild 3 = Mild 4 = Mild
                  to Moderate 5 = Moderate 6 = Moderate to Severe 7 = Mildly
                  Severe, Restricts Some Activity 8 = Severe, Limits Most
                  Activity 9 = Very Severe 10 = Excruciating
                </label>
                <div class="col-lg-6 pt-2" style="padding-top: 40px !important">
                  <vue-slider
                    v-model="form.paintIntensity"
                    :max="10"
                    :tooltip="'always'"
                  ></vue-slider>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-lg-12 text-center">
                  <h4>
                    If your pain radiates or travels, please indicate
                  where
                  </h4>
                </div>
              </div>
              <div
                class="form-group row"
                v-for="radiatesQuestion in form.radiatesQuestionsAndAnswer"
                :key="'rad' + radiatesQuestion.question"
              >
                <label class="col-lg-4 control-label text-lg-right pt-2">{{
                  radiatesQuestion.question
                }}</label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="radiatesQuestion.answer"
                    :options="radiatesSelections"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2"
                  ><strong style="color: red; margin-right: 5px">*</strong>How
                  would you best describe the sensation of your pain?</label
                >
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.painQuality"
                    :options="painQualitySelection"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2"
                  ><strong style="color: red; margin-right: 5px">*</strong>Over
                  the past/weeks/months this complaint is</label
                >
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.painQualityImprovement"
                    :options="painQualityImprovementSelection"
                    :multiple="false"
                  ></multiselect>
                </div>
              </div>
              <hr />
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2"
                  >What aggravates your pain or makes it feel worse?
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.painFactor"
                    :options="painFactorSelection"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2"
                  >What relieves the pain?</label
                >
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.painFactorImprovement"
                    :options="painFactorImprovementSelection"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
              <hr />

              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2"
                  >How much does your problem interfere with work?
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.painInterference"
                    :options="painInterferenceSelection"
                    :multiple="false"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2"
                  >Have you seen anyone for your pain?</label
                >
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.painInterferenceHelp"
                    :options="painInterferenceHelpSelection"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-lg-12 text-center">
                  <h4>
                    Regarding your <strong style="color: red">{{
                    currentProblem.region
                  }}</strong>. Please answer the following questions
                    about how your pain is affecting your daily activities:
                  </h4>
                </div>
              </div>
              <div
                class="form-group row"
                v-for="oatQ in oatQuestions"
                :key="oatQ.id"
              >
                <label class="col-lg-4 control-label text-lg-right pt-2"><strong style="color: red; margin-right: 5px">*</strong>{{
                  oatQ.description
                }}</label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="oatQ.selectedAnswer"
                    :options="oatQ.answerList"
                    :label="'description'"
                    :multiple="false"
                  ></multiselect>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <div class="row justify-content-end">
              <div class="col-sm-9">
                <button class="btn btn-primary mr-2" type="submit">
                  {{ buttonText }}
                </button>
                <button class="btn btn-default">Reset</button>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </form>
  </section>
</template>

<script>
import api from '../../api/http-common.js'
import Multiselect from 'vue-multiselect'
import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import Datepicker from 'vuejs-datepicker'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  components: {
    Multiselect,
    Datepicker,
    VueSlider
  },
  data () {
    return {
      form: {
        describe: [],
        describeOther: '',
        describeSelectLimit: 4,
        dateOccured: null,
        expPain: '',
        paintIntensity: 0,
        radiatesQuestionsAndAnswer: [],
        painQuality: [],
        painQualityImprovement: '',
        painFactor: [],
        painFactorImprovement: [],
        painInterference: '',
        painInterferenceHelp: []
      },
      complaint: '',
      disabledDates: {
        from: new Date()
      },
      currentProblemIndex: 0,
      oatQuestions: [],
      oatAnswerList: [],
      apiSubmitForm: {
        namePayload: []
      },
      currentOat: null
    }
  },
  computed: {
    ...mapGetters([
      'getTaskCurrentCaseHistoryProblems',
      'getProfilePatientAssociated',
      'getTaskCurrentCaseHistoryOats',
      'getTaskCurrentCaseHistoryId'
    ]),
    buttonText: function () {
      if (
        this.currentProblemIndex !==
        this.getTaskCurrentCaseHistoryProblems.length - 1
      ) {
        return 'Next'
      } else {
        return 'Submit'
      }
    },
    currentPatientAssociated () {
      if (this.getProfilePatientAssociated.length === 0) {
        return null
      }
      return this.getProfilePatientAssociated[0]
    },
    currentProblem: function () {
      if (this.getTaskCurrentCaseHistoryProblems.length === 0) {
        return null
      }

      return this.getTaskCurrentCaseHistoryProblems[this.currentProblemIndex]
    },
    // currentOat: function () {
    //   const oat = this.getTaskCurrentCaseHistoryOats.find(el => el.caseHistoryProblemID === this.currentProblem.id)
    //   return oat
    // },
    showSpecifyDescribe: function () {
      const isOther = this.form.describe.find((el) => el === 'Other')
      if (isOther) {
        return true
      } else {
        return false
      }
    },
    complaintLocations: function () {
      switch (this.complaint) {
        case 'Ankle':
          return [
            'Left Ankle',
            'Left Front',
            'Left Outside',
            'Right Ankle',
            'Right Front',
            'Right Outside',
            'Front of Both',
            'Outside of Both',
            'Both',
            'Other'
          ]
        case 'Arm':
          return [
            'Left Arm',
            'Left Upper',
            'Left Lower',
            'Right Arm',
            'Right Upper',
            'Right Lower',
            'Upper of Both',
            'Lower of Both',
            'Both',
            'Other'
          ]
        case 'Elbow':
          return [
            'Left Elbow',
            'Left Inside',
            'Left Outside',
            'Right Elbow',
            'Right Inside',
            'Right Outside',
            'Inside of Both',
            'Outside of Both',
            'Both',
            'Other'
          ]
        case 'Foot':
          return [
            'Left Foot',
            'Left Top',
            'Left Bottom',
            'Right Foot',
            'Right Top',
            'Right Bottom',
            'Top of Both',
            'Bottom of Both',
            'Both',
            'Other'
          ]
        case 'Hand':
          return [
            'Left Hand',
            'Left Palm',
            'Left Back',
            'Right Hand',
            'Right Palm',
            'Right Back',
            'Palms of Both',
            'Back of Both',
            'Both',
            'Other'
          ]
        case 'Hip':
          return [
            'Left Hip',
            'Left Front',
            'Left Outside',
            'Right Hip',
            'Right Front',
            'Right Outside',
            'Back of Hip',
            'Front of Hip',
            'Both',
            'Other'
          ]
        case 'Head':
          return [
            'Left Side',
            'Right Side',
            'Left Temple',
            'Right Temple',
            'Back Of Head',
            'All Over',
            'Other'
          ]
        case 'Jaw':
          return [
            'Left Side',
            'Right Side',
            'Left TMJ',
            'Right TMJ',
            'Lower Jaw',
            'Entire Jaw',
            'Other'
          ]
        case 'Knee':
          return [
            'Left Knee',
            'Left Front',
            'Left Outside',
            'Right Knee',
            'Right Front',
            'Right Outside',
            'Front of Both',
            'Outside of Both',
            'Both',
            'Other'
          ]
        case 'Leg':
          return [
            'Left Leg',
            'Left Front',
            'Left Outside',
            'Right Leg',
            'Right Front',
            'Right Outside',
            'Front of Both',
            'Outside of Both',
            'Both',
            'Other'
          ]
        case 'Lower Back':
          return [
            'Left Lower Side',
            'Left Lower Spine',
            'Left Lower Back',
            'Right Lower Side',
            'Right Lower Spine',
            'Right Lower Back',
            'Spine',
            'Entire Lower Back',
            'Other'
          ]
        case 'Mid Back':
          return [
            'Left Side',
            'Left Mid Spine',
            'Left Back',
            'Right Side',
            'Right Mid Spine',
            'Right Back',
            'Mid Spine',
            'Entire Mid Back',
            'Other'
          ]
        case 'Neck':
          return [
            'Left Side',
            'Left Upper',
            'Left Lower',
            'Right Side',
            'Right Upper',
            'Right Lower',
            'Upper Portion',
            'Lower Portion',
            'Entire Neck',
            'Other'
          ]
        case 'Shoulder':
          return ['Left Shoulder', 'Right Shoulder', 'Both Shoulders']
        case 'Upper Back':
          return [
            'Left Side',
            'Left Upper',
            'Left Lower',
            'Right Side',
            'Right Upper',
            'Right Lower',
            'Upper Portion',
            'Lower Portion',
            'Middle Portion',
            'Entire Back',
            'Other'
          ]
        case 'Wrist':
          return [
            'Left Wrist',
            'Left Inside',
            'Left Outside',
            'Right Wrist',
            'Right Inside',
            'Right Outside',
            'Inside of Both',
            'Outside of Both',
            'Both'
          ]
        default:
          return []
      }
    },
    radiatesSelections: function () {
      return ['Left', 'Right', 'Both']
    },
    expPains: function () {
      return [
        'Occasional pain (25% of the day)',
        'Intermittent pain (50% of the day)',
        'Frequent pain (75% of the day)',
        'Constant pain (100% of the day)',
        'No pain'
      ]
    },
    painQualitySelection: function () {
      return [
        'Inflexible',
        'Stiffness',
        'Spasms',
        'Cramps',
        'Sharp',
        'Stabbing',
        'Aching',
        'Pins & Needles',
        'Pounding',
        'Shooting',
        'Burning',
        'Dull',
        'Tingling/Numb',
        'Throbbing',
        'Crawling',
        'Stinging'
      ]
    },
    painQualityImprovementSelection: function () {
      return ['Improving', 'Getting worse', 'About the same']
    },
    painFactorSelection: function () {
      return [
        'Carrying',
        'Crawling',
        'Coughing',
        'Driving',
        'Exercising',
        'Getting In/Out of Car',
        'Getting out of bed',
        'Lifting',
        'Looking side/side',
        'Looking up/down',
        'Pulling',
        'Pushing',
        'Repetitive Movement',
        'Sneezing',
        'Straining at BM',
        'Standing',
        'Sitting',
        'Stooping',
        'Stress',
        'Walking',
        'Other'
      ]
    },
    painFactorImprovementSelection: function () {
      return [
        'Resting',
        'Shower',
        'Medication',
        'Heat',
        'Ice',
        'Stretching',
        'Chiropractic',
        'Massage',
        'Sitting'
      ]
    },
    painInterferenceSelection: function () {
      return [
        'Can do unlimited work',
        'Can do usual work but no extra',
        'Can do 50% of usual work',
        'Can do 25% of usual work',
        'Cannot work'
      ]
    },
    painInterferenceHelpSelection: function () {
      return [
        'Chiropractor',
        'ER Doctor',
        'Massage Therapist',
        'Neurologist',
        'Orthopedist',
        'Physical Therapist',
        'Primary Care Doctor',
        'Other'
      ]
    }
  },
  methods: {
    selectChange (selected) {},
    selectRemove (removed) {},
    describeSelectChange (selected) {
      if (selected === 'Other') {
        this.form.describeSelectLimit = 1
      } else {
        this.form.describeSelectLimit = 4
      }
    },
    async submit () {
      // Name Payload
      this.form.describe.forEach((el) => {
        this.apiSubmitForm.caseProblems.push({
          facilityId: this.currentPatientAssociated.facilityID,
          caseHistoryProblemId: this.currentProblem.id,
          fieldName: 'Name',
          value: el
        })
      })
      this.form.describe = []

      // Onset Payload
      let onSetVal = 'Not Sure'
      if (this.form.dateOccured) {
        onSetVal = moment(this.form.dateOccured).format('MM/DD/YYYY')
      }
      this.apiSubmitForm.caseProblems.push({
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryProblemId: this.currentProblem.id,
        fieldName: 'Onset',
        value: onSetVal
      })

      // Frequency Payload
      this.apiSubmitForm.caseProblems.push({
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryProblemId: this.currentProblem.id,
        fieldName: 'Frequency',
        value: this.form.expPain
      })

      // Intensity Payload
      this.apiSubmitForm.caseProblems.push({
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryProblemId: this.currentProblem.id,
        fieldName: 'CurrentSeverity',
        value: this.form.paintIntensity
      })

      // Symptoms/Radiates payload
      const hasAnswerRadiates = this.form.radiatesQuestionsAndAnswer.filter(
        (el) => el.answer !== ''
      )
      if (hasAnswerRadiates.length > 0) {
        let radiateStr = ''
        hasAnswerRadiates.forEach((el, index, arr) => {
          let lastStr = ''
          if (index < arr.length - 1) {
            lastStr = ','
          }
          radiateStr += `${el.question}-${el.answer}${lastStr}`
        })

        this.apiSubmitForm.caseProblems.push({
          facilityId: this.currentPatientAssociated.facilityID,
          caseHistoryProblemId: this.currentProblem.id,
          fieldName: 'Symptoms',
          value: radiateStr
        })
      }

      // Pain Quality Paload
      this.apiSubmitForm.caseProblems.push({
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryProblemId: this.currentProblem.id,
        fieldName: 'Qualities',
        value: this.form.painQuality.join()
      })

      // Progress payload
      this.apiSubmitForm.caseProblems.push({
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryProblemId: this.currentProblem.id,
        fieldName: 'Progress',
        value: this.form.painQualityImprovement[0]
      })

      // Pain factory payload
      if (this.form.painFactor.length > 0) {
        this.apiSubmitForm.caseProblems.push({
          facilityId: this.currentPatientAssociated.facilityID,
          caseHistoryProblemId: this.currentProblem.id,
          fieldName: 'Aggs',
          value: this.form.painFactor.join()
        })
      }

      if (this.form.painFactor.length > 0) {
        this.apiSubmitForm.caseProblems.push({
          facilityId: this.currentPatientAssociated.facilityID,
          caseHistoryProblemId: this.currentProblem.id,
          fieldName: 'Relief',
          value: this.form.painFactorImprovement.join()
        })
      }

      // Inteference payload
      if (this.form.painQualityImprovement.length > 0) {
        this.apiSubmitForm.caseProblems.push({
          facilityId: this.currentPatientAssociated.facilityID,
          caseHistoryProblemId: this.currentProblem.id,
          fieldName: 'Work',
          value: this.form.painQualityImprovement[0]
        })
      }

      // Inteference help payload
      if (this.form.painInterferenceHelp.length > 0) {
        this.apiSubmitForm.caseProblems.push({
          facilityId: this.currentPatientAssociated.facilityID,
          caseHistoryProblemId: this.currentProblem.id,
          fieldName: 'OtherProv',
          value: this.form.painInterferenceHelp.join()
        })
      }

      if (
        this.currentProblemIndex !==
        this.getTaskCurrentCaseHistoryProblems.length - 1
      ) {
        this.currentProblemIndex += 1
        this.complaint = this.currentProblem.region

        await this.initializeData()
        const el = document.getElementById('firstQuestion')
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    async initializeData () {
      this.complaint = this.currentProblem.region

      // Create Radiatest question and answer
      switch (this.complaint) {
        case 'Ankle':
          this.form.radiatesQuestionsAndAnswer = [
            { question: 'Lower Leg', answer: '' },
            { question: 'Foot', answer: '' }
          ]
          break
        case 'Elbow':
          this.form.radiatesQuestionsAndAnswer = [
            { question: 'Upper Arm', answer: '' },
            { question: 'Forearm', answer: '' },
            { question: 'Wrist', answer: '' },
            { question: 'Hand', answer: '' }
          ]
          break
        case 'Foot':
          this.form.radiatesQuestionsAndAnswer = [
            { question: 'Ankle', answer: '' },
            { question: 'Leg', answer: '' }
          ]
          break
        case 'Hand':
          this.form.radiatesQuestionsAndAnswer = [
            { question: 'Wrist', answer: '' },
            { question: 'Forearm', answer: '' },
            { question: 'Elbow', answer: '' }
          ]
          break
        case 'Head':
          this.form.radiatesQuestionsAndAnswer = [
            { question: 'Temple', answer: '' },
            { question: 'Eyes', answer: '' },
            { question: 'Jaw', answer: '' },
            { question: 'Forehead', answer: '' },
            { question: 'Back of head', answer: '' },
            { question: 'Top of head', answer: '' }
          ]
          break
        case 'Hip':
          this.form.radiatesQuestionsAndAnswer = [
            { question: 'Lower Back', answer: '' },
            { question: 'Buttock', answer: '' },
            { question: 'Thigh', answer: '' },
            { question: 'Groin', answer: '' },
            { question: 'Knee', answer: '' }
          ]
          break
        case 'Jaw':
          this.form.radiatesQuestionsAndAnswer = [
            { question: 'Temple', answer: '' },
            { question: 'Face', answer: '' },
            { question: 'Neck', answer: '' }
          ]
          break
        case 'Knee':
          this.form.radiatesQuestionsAndAnswer = [
            { question: 'Thigh', answer: '' },
            { question: 'Lower Leg', answer: '' }
          ]
          break
        case 'Lower Back':
          this.form.radiatesQuestionsAndAnswer = [
            { question: 'Mid back', answer: '' },
            { question: 'Buttock', answer: '' },
            { question: 'Hip', answer: '' },
            { question: 'Groin', answer: '' },
            { question: 'Thigh', answer: '' },
            { question: 'Knee', answer: '' },
            { question: 'Lower Leg', answer: '' },
            { question: 'Ankle', answer: '' },
            { question: 'Foot', answer: '' }
          ]
          break
        case 'Mid Back':
          this.form.radiatesQuestionsAndAnswer = [
            { question: 'Upper back', answer: '' },
            { question: 'Ribs', answer: '' },
            { question: 'Chest', answer: '' },
            { question: 'Lower back', answer: '' }
          ]
          break
        case 'Neck':
          this.form.radiatesQuestionsAndAnswer = [
            { question: 'Head', answer: '' },
            { question: 'Traps', answer: '' },
            { question: 'Shoulder', answer: '' },
            { question: 'Upper arm', answer: '' },
            { question: 'Elbow', answer: '' },
            { question: 'Forearm', answer: '' },
            { question: 'Wrist', answer: '' },
            { question: 'Hand', answer: '' }
          ]
          break
        case 'Shoulder':
          this.form.radiatesQuestionsAndAnswer = [
            { question: 'Traps', answer: '' },
            { question: 'Neck', answer: '' },
            { question: 'Upper arm', answer: '' },
            { question: 'Elbow', answer: '' },
            { question: 'Forearm', answer: '' },
            { question: 'Wrist', answer: '' },
            { question: 'Hand', answer: '' }
          ]
          break
        case 'Upper Back':
          this.form.radiatesQuestionsAndAnswer = [
            { question: 'Neck', answer: '' },
            { question: 'Shoulder', answer: '' },
            { question: 'Chest', answer: '' },
            { question: 'Mid back', answer: '' }
          ]
          break
        case 'Wrist':
          this.form.radiatesQuestionsAndAnswer = [
            { question: 'Elbow', answer: '' },
            { question: 'Forearm', answer: '' },
            { question: 'Hand', answer: '' }
          ]
          return ['Elbow', 'Forearm', 'Hand']
        // default:
        //   return []
      }

      this.currentOat = this.getTaskCurrentCaseHistoryOats.find(
        (el) => el.caseHistoryProblemID === this.currentProblem.id
      )

      // Get oat questions
      const response = await api.task.request.getCaseHistoryOatQuestions({
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryId: this.getTaskCurrentCaseHistoryId,
        oatId: this.currentOat.oatID,
        caseHistoryProblemId: this.currentOat.caseHistoryProblemID
      })

      const oatQuestions = response.data

      const respAnswerList = await api.task.request.getOatAnswerList({
        facilityId: this.currentPatientAssociated.facilityID,
        oatId: this.currentOat.oatID
      })

      this.oatAnswerList = respAnswerList.data

      // Reconstruct oat data
      oatQuestions.forEach((el) => {
        const answerList = this.oatAnswerList.filter(
          (ansEl) => ansEl.oatQuestionID === el.id
        )
        el.answerList = answerList
        el.selectedAnswer = ''
      })
      this.oatQuestions = oatQuestions
    }
  },
  async mounted () {
    await this.initializeData()
  }
}
</script>
