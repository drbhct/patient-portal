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
          <header class="card-header">
            <h2 class="card-title">
              Problem {{ currentProblemIndex + 1 }} of
              {{ getTaskCurrentCaseHistoryProblems.length }}
            </h2>
          </header>
          <div class="card-body" id="cardBody" v-if="form">
            <div v-if="!isLoading">
              <div class="row">
                <div class="col-lg-12">
                  <h5>
                    Field(s) with <strong style="color: red">*</strong> are
                    required.
                  </h5>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550" id="refDescribe"
                    ><strong style="color: red; margin-right: 5px">*</strong
                    >Please choose the area that best describes where your
                    <strong style="color: red">{{
                      currentProblem.region
                    }}</strong>
                    pain occurs:</label
                  >
                  <multiselect
                    :searchable="false"
                    v-model="form.describe"
                    :options="complaintLocations"
                    :group-select="false"
                    :multiple="true"
                    @select="describeSelectChange"
                    @remove="selectRemove"
                    :max="form.describeSelectLimit"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="showSpecifyDescribe">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550" id="firstQuestion"
                    >Please specify best describes where your
                    <strong style="color: red">{{
                      currentProblem.region
                    }}</strong>
                    pain occurs</label
                  >
                  <input
                    type="text"
                    v-model="form.describeOther"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                    >Please indicate the date your symptoms first
                    occurred.</label
                  >
                  <datepicker
                    v-model="form.dateOccured"
                    :bootstrap-styling="true"
                    :clear-button="true"
                    :format="'MMMM dd, yyyy'"
                    :disabled-dates="disabledDates"
                  ></datepicker>
                  <span class="help-block">Leave field empty if not sure</span>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550" id="refExpPain"
                    ><strong style="color: red; margin-right: 5px">*</strong>How
                    often do you experience this
                    <strong style="color: red">{{
                      currentProblem.region
                    }}</strong>
                    pain?</label
                  >
                  <multiselect
                    :searchable="false"
                    v-model="form.expPain"
                    :options="expPains"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">
                    <strong style="color: red; margin-right: 5px">*</strong>
                    Using the slide, rate the intensity of your
                    <strong style="color: red">{{
                      currentProblem.region
                    }}</strong>
                    pain now:
                  </label>
                  <div class="mt-4">
                    <vue-slider
                      v-model="form.paintIntensity"
                      :max="10"
                      :tooltip="'always'"
                    ></vue-slider>
                    <span>0 = No pain, 10 = Excruciating pain</span>
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-lg-12 text-center">
                  <h4 class="label f-weight-550">
                    <strong style="color: red; margin-right: 5px">*</strong>
                    If your pain radiates or travels, please indicate where.
                  </h4>
                </div>
              </div>
              <div class="col-lg-6 mx-auto text-center">
                <button
                  class="btn"
                  :class="{
                    'btn-primary': radiateIsNone,
                    'btn-default': !radiateIsNone
                  }"
                  type="reset"
                  @click="radiateIsNone = !radiateIsNone"
                >
                  None
                </button>
              </div>
              <div
                class="form-group row"
                v-for="radiatesQuestion in form.radiatesQuestionsAndAnswer"
                :key="'rad' + radiatesQuestion.question"
              >
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">{{
                    radiatesQuestion.question
                  }}</label>
                  <multiselect
                    :searchable="false"
                    v-model="radiatesQuestion.answer"
                    :options="radiatesSelections"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" id="refPainSensation">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                    ><strong style="color: red; margin-right: 5px">*</strong>How
                    would you best describe the sensation of your pain?</label
                  >
                  <multiselect
                    :searchable="false"
                    v-model="form.painQuality"
                    :options="painQualitySelection"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550" id="refExpPainImprovement"
                    ><strong style="color: red; margin-right: 5px">*</strong
                    >Over the past/weeks/months this complaint is</label
                  >
                  <multiselect
                    :searchable="false"
                    v-model="form.painQualityImprovement"
                    :options="painQualityImprovementSelection"
                    :multiple="false"
                  ></multiselect>
                </div>
              </div>
              <hr />
              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">
                    <strong style="color: red; margin-right: 5px">*</strong>
                    What aggravates your pain or makes it feel worse?
                  </label>
                  <multiselect
                    :searchable="false"
                    v-model="form.painFactor"
                    :options="painFactorSelection"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">
                    <strong style="color: red; margin-right: 5px">*</strong>
                    What relieves the pain?</label
                  >
                  <multiselect
                    :searchable="false"
                    v-model="form.painFactorImprovement"
                    :options="painFactorImprovementSelection"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
              <hr />

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                    ><strong style="color: red; margin-right: 5px">*</strong>
                    How much does your problem interfere with work?
                  </label>
                  <multiselect
                    :searchable="false"
                    v-model="form.painInterference"
                    :options="painInterferenceSelection"
                    :multiple="false"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                    ><strong style="color: red; margin-right: 5px">*</strong>
                    Have you seen anyone for your pain?</label
                  >
                  <multiselect
                    :searchable="false"
                    v-model="form.painInterferenceHelp"
                    :options="painInterferenceHelpSelection"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
              <hr />
              <div class="row" v-if="currentOat">
                <div class="col-lg-12 text-center">
                  <h4 class="label f-weight-550">
                    Regarding your
                    <strong style="color: red">{{
                      currentProblem.region
                    }}</strong
                    >. Please answer the following questions about how your pain
                    is affecting your daily activities:
                  </h4>
                </div>
              </div>
              <div
                class="form-group row"
                v-for="oatQ in form.oatQuestions"
                :key="oatQ.id"
              >
                <div class="col-lg-5 mx-auto">
                  <label class="label f-weight-550"
                    ><strong
                      style="color: red; margin-right: 5px"
                      :id="oatQ.description"
                      >*</strong
                    >{{ oatQ.description }}</label
                  >
                  <multiselect
                    :searchable="false"
                    v-model="oatQ.selectedAnswer"
                    :options="oatQ.answerList"
                    :label="'description'"
                    :multiple="false"
                  ></multiselect>
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
          <footer class="card-footer">
            <div class="row justify-content-end">
              <div class="col-sm-9">
                <button
                  class="btn btn-default mr-2"
                  @click="previous"
                  v-if="getTaskPreviousTaskType"
                  type="reset"
                >
                  Back
                </button>
                <btn-saving :is-saving="isSaving" />
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
import { mapGetters, mapActions } from 'vuex'
import BtnSaving from '../button-saving.vue'
export default {
  components: {
    Multiselect,
    Datepicker,
    VueSlider,
    BtnSaving
  },
  data() {
    return {
      isSaving: false,
      isLoading: false,
      radiateIsNone: false,
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
        painInterferenceHelp: [],
        oatQuestions: []
      },
      complaint: '',
      disabledDates: {
        from: moment().add(1, 'day').startOf('day').toDate()
      },
      currentProblemIndex: 0,
      oatAnswerList: [],
      apiSubmitForm: {
        caseProblems: [],
        oatQuestionAndAnswerPayload: []
      },
      currentOat: null,
      formHistory: []
    }
  },
  computed: {
    ...mapGetters([
      'getTaskCurrentCaseHistoryProblems',
      'getProfilePatientAssociated',
      'getTaskCurrentCaseHistoryOats',
      'getTaskCurrentCaseHistoryId',
      'getTaskPreviousTaskType',
      'getTaskCurrentCaseHistoryFormValues',
      'getTaskCurrentTaskType',
      'currentPatientAssociated',
      'getTaskCode',
      'getTaskInfo'
    ]),
    TaskInfo() {
      return JSON.parse(this.getTaskInfo)
    },
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
      return ['Left', 'Right', 'Both', 'None']
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
        'Other',
        'None'
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
        'Sitting',
        'None'
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
        'Other',
        'None'
      ]
    }
  },
  methods: {
    ...mapActions([
      'setTaskCurrentTaskType',
      'setTaskCurrentCaseHistoryComplaintFormVal'
    ]),
    selectChange(selected) {},
    selectRemove(removed) {},
    describeSelectChange(selected) {
      if (selected === 'Other') {
        this.form.describeSelectLimit = 1
      } else {
        this.form.describeSelectLimit = 4
      }
    },
    validateForm() {
      if (this.form.describe.length === 0) {
        return {
          result: false,
          msg: `Please choose the area that best describes where your ${this.currentProblem.region} pain occurs`,
          reference: 'refDescribe'
        }
      }
      if (!this.form.expPain) {
        return {
          result: false,
          msg: `Please answer how often do you experience this ${this.currentProblem.region} pain?`,
          reference: 'refExpPain'
        }
      }

      const hasAnswerRadiates = this.form.radiatesQuestionsAndAnswer.filter(
        (el) => el.answer !== ''
      )

      if (hasAnswerRadiates.length === 0 && !this.radiateIsNone) {
        return {
          result: false,
          msg: 'Please answer where pain radiates or travels otherwise set the None button.'
        }
      }

      if (this.form.painQuality.length === 0) {
        return {
          result: false,
          msg: 'Please answer how would you best describe the sensation of your pain?',
          reference: 'refPainSensation'
        }
      }
      if (!this.form.painQualityImprovement) {
        return {
          result: false,
          msg: 'Please answer over the past/weeks/months this complaint is?',
          reference: 'refExpPainImprovement'
        }
      }

      // TODO: Aggravates checking
      if (this.form.painFactor.length === 0) {
        return {
          result: false,
          msg: 'Please answer what aggravates your pain or makes it feel worse.',
          reference: 'refExpPainImprovement'
        }
      }

      // TODO: What relieves pain checking
      if (this.form.painFactorImprovement.length === 0) {
        return {
          result: false,
          msg: 'Please answer what relieves the pain.',
          reference: 'refExpPainImprovement'
        }
      }

      // TODO: How much does your problem interfere checking
      if (this.form.painInterference.length === 0) {
        return {
          result: false,
          msg: 'Please answer how much your problem interferes with work.',
          reference: 'refExpPainImprovement'
        }
      }

      // TODO: Have you seen anyone checking
      if (this.form.painInterferenceHelp.length === 0) {
        return {
          result: false,
          msg: 'Please answer have you seen anyone for your pain.',
          reference: 'refExpPainImprovement'
        }
      }
      const noAnswerOat = this.form.oatQuestions.find(
        (el) => !el.selectedAnswer
      )
      if (noAnswerOat) {
        return {
          result: false,
          msg: `Please answer ${noAnswerOat.description} regarding your ${this.currentProblem.region}.`,
          reference: noAnswerOat.description
        }
      }

      return {
        result: true,
        msg: 'Validation complete',
        reference: ''
      }
    },
    async submit() {
      this.isSaving = true

      // Validation
      const isValid = this.validateForm()
      if (!isValid.result) {
        this.$swal({
          text: isValid.msg,
          position: 'top-center',
          title: 'Error',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'error'
        })

        setTimeout(() => {
          const el = document.getElementById(isValid.reference)
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 3000)
        this.isSaving = false
        return
      }

      // Name Payload
      this.form.describe.forEach((el) => {
        this.apiSubmitForm.caseProblems.push({
          facilityId: this.currentPatientAssociated.facilityID,
          caseHistoryProblemId: this.currentProblem.id,
          fieldName: 'Name',
          value: el
        })
      })

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
        value: this.form.painQualityImprovement
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
      if (this.form.painInterference.length > 0) {
        this.apiSubmitForm.caseProblems.push({
          facilityId: this.currentPatientAssociated.facilityID,
          caseHistoryProblemId: this.currentProblem.id,
          fieldName: 'Work',
          value: this.form.painInterference
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

      // oats payload
      const oatQuestionAndAnswer = []
      this.form.oatQuestions.forEach((el) => {
        oatQuestionAndAnswer.push({
          oatId: el.oatID,
          Question: el.description,
          Answer: el.selectedAnswer.description
        })
      })

      this.apiSubmitForm.oatQuestionAndAnswerPayload.push({
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryProblemId: this.currentProblem.id,
        questionList: oatQuestionAndAnswer
      })

      const promMultipleInsert = new Promise((resolve, reject) => {
        this.apiSubmitForm.caseProblems.forEach(async (el, index, arr) => {
          await api.task.request.updateCaseHistoryProblemValue(el)
          if (index === arr.length - 1) {
            resolve()
          }
        })
      })

      const oatsInsert = new Promise((resolve, reject) => {
        this.apiSubmitForm.oatQuestionAndAnswerPayload.forEach(
          async (el, index, arr) => {
            await api.task.request.updateCaseHistoryProblemOats(el)
            if (index === arr.length - 1) {
              resolve()
            }
          }
        )
      })

      await Promise.all([promMultipleInsert, oatsInsert])

      this.isSaving = false
      const isExist = this.formHistory.find(
        (c) =>
          c.complaint === this.complaint &&
          c.patientId === this.currentPatientAssociated.patientID
      )
      if (!isExist) {
        this.formHistory.push({
          complaint: this.complaint,
          form: this.form,
          patientId: this.currentPatientAssociated.patientID
        })
      } else {
        // isExist.form = this.form
        this.form = isExist.form
      }
      this.setTaskCurrentCaseHistoryComplaintFormVal(
        JSON.parse(JSON.stringify(this.formHistory))
      )
      if (
        this.currentProblemIndex !==
        this.getTaskCurrentCaseHistoryProblems.length - 1
      ) {
        // this.form.describe = []
        this.currentProblemIndex += 1
        this.complaint = JSON.parse(JSON.stringify(this.currentProblem.region))

        await this.initializeData()

        const exist = this.formHistory.find(
          (c) =>
            c.complaint === this.complaint &&
            c.patientId === this.currentPatientAssociated.patientID
        )
        if (exist) {
          this.form = exist.form
        }
        setTimeout(() => {
          const el = document.getElementById('cardBody')
          el.scrollIntoView({ behavior: 'smooth' })
          // console.log('should be scrolling to top!')
        }, 1000)
        return
      }

      // this.form.describe = []
      switch (this.getTaskCode) {
        case 'CH':
        case 'AACH':
          this.setTaskCurrentTaskType('NphThankyou')
          break
        default:
          this.setTaskCurrentTaskType('NphPersonalHistory')
          break
      }
    },
    async previous() {
      if (this.currentProblemIndex === 0) {
        const currentIndex = this.getTaskPreviousTaskType.findIndex(
          (c) => c === this.getTaskCurrentTaskType
        )
        let prevPage = ''
        if (currentIndex === -1) {
          prevPage =
            this.getTaskPreviousTaskType[
              this.getTaskPreviousTaskType.length - 1
            ]
        } else {
          prevPage = this.getTaskPreviousTaskType[currentIndex - 1]
        }
        this.setTaskCurrentTaskType({
          back: true,
          page: prevPage,
          removePage: this.getTaskCurrentTaskType
        })
      } else {
        this.currentProblemIndex -= 1
        this.complaint = JSON.parse(JSON.stringify(this.currentProblem.region))

        await this.initializeData()
        const oldForm = this.formHistory.find(
          (c) => c.complaint === this.complaint
        )
        if (oldForm) {
          this.form = oldForm.form
        }
        setTimeout(() => {
          const el = document.getElementById('cardBody')
          el.scrollIntoView({ behavior: 'smooth' })
          // console.log('should be scrolling to top!')
        }, 1000)
      }
    },
    async initializeData() {
      this.isLoading = true
      // Force clear form fields
      this.form = {
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
        painInterferenceHelp: [],
        oatQuestions: []
      }
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
          break
      }

      this.currentOat = this.getTaskCurrentCaseHistoryOats.find(
        (el) => el.caseHistoryProblemID === this.currentProblem.id
      )

      if (!this.currentOat) {
        this.form.oatQuestions = []
        this.isLoading = false
        return
      }

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

      // note: Cross cutting concerns for custom selection data
      const check = respAnswerList.data[0]
      switch (check.description) {
        case 'DIFFICULTY':
          this.oatAnswerList = [
            { description: 'Extreme difficulty' },
            { description: 'Quite a bit of difficulty' },
            { description: 'Moderate difficulty' },
            { description: 'A little bit of difficulty' },
            { description: 'No difficulty' }
          ]
          break
        case 'VAS':
          this.oatAnswerList = [
            { description: '10' },
            { description: '9' },
            { description: '8' },
            { description: '7' },
            { description: '6' },
            { description: '5' },
            { description: '4' },
            { description: '3' },
            { description: '2' },
            { description: '1' },
            { description: '0' }
          ]
          break
        default:
          this.oatAnswerList = respAnswerList.data
          break
      }

      // Reconstruct oat data
      oatQuestions.forEach((el) => {
        switch (check.description) {
          case 'DIFFICULTY':
          case 'VAS':
            el.answerList = this.oatAnswerList
            break
          default: {
            const answerList = this.oatAnswerList.filter(
              (ansEl) => ansEl.oatQuestionID === el.id
            )
            el.answerList = answerList
            break
          }
        }

        el.selectedAnswer = ''
      })
      this.form.oatQuestions = oatQuestions

      this.isLoading = false
    }
  },
  async mounted() {},
  async activated() {
    await this.initializeData()
    if (this.getTaskCurrentCaseHistoryFormValues) {
      // this.formHistory = this.getTaskCurrentCaseHistoryFormValues
      this.formHistory = JSON.parse(
        JSON.stringify(this.getTaskCurrentCaseHistoryFormValues)
      )
      // this.formHistory.text = ''
      const isExist = this.formHistory.find(
        (c) =>
          c.complaint === this.complaint &&
          c.patientId === this.currentPatientAssociated.patientID
      )
      if (isExist) {
        this.form = JSON.parse(JSON.stringify(isExist.form))
      }
    }

    setTimeout(() => {
      const el = document.getElementById('cardBody')
      el.scrollIntoView({ behavior: 'smooth' })
      // console.log('should be scrolling to top!')
    }, 1000)
  }
}
</script>
