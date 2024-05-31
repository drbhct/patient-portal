<template>
  <section role="main">
    <form
      @submit.prevent="savePatientInfo"
      class="mt-5 mr-2 ml-2 justify-content-md-center"
    >
      <div class="col">
        <section class="card">
          <header class="card-header">
            <h2 class="card-title">Please confirm your information</h2>
          </header>
          <div class="card-body">
            <div v-if="!isLoading">
              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >First Name <span style="color: red">*</span></label
                >
                <input
                    type="text"
                    class="form-control"
                    v-model="form.firstName"
                    required
                  />
                </div>

              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >Last Name <span style="color: red">*</span></label
                >
                <input
                    type="text"
                    class="form-control"
                    v-model="form.lastName"
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >Middle Initial</label
                >
                <input
                    type="text"
                    class="form-control"
                    v-model="form.middleInitial"
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >Nickname</label
                >
                <input
                    type="text"
                    class="form-control"
                    v-model="form.nickName"
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >Email <span style="color: red">*</span></label
                >
                <input
                    type="email"
                    class="form-control"
                    v-model="form.email"
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">Address 1 <span style="color: red">*</span> </label>
                <input
                    type="text"
                    class="form-control"
                    v-model="form.address"
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >Address 2</label
                >
                <input
                    type="text"
                    class="form-control"
                    v-model="form.address2"
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >City <span style="color: red">*</span> </label
                >
                <input type="text" class="form-control" v-model="form.city" required />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >State <span style="color: red">*</span> </label
                >
                <select v-model="form.state" class="form-control" required>
                    <option
                      v-for="state in usStates"
                      :key="state.code"
                      :value="state.code"
                    >
                      {{ state.name }}
                    </option>
                  </select>
                </div>

              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >Zip Code <span style="color: red">*</span> </label
                >
                <input
                    type="text"
                    class="form-control"
                    v-model="form.zip"
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >Home Phone <span v-show="form.cellPhone === ''" style="color: red">*</span></label
                >
                <input
                    type="text"
                    class="form-control"
                    v-model="form.homePhone"
                    :required ="form.cellPhone === ''"
                    v-mask="'(###) ###-####'"
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                   <label class="label f-weight-550"
                  >Mobile Phone <span v-show="form.homePhone === ''" style="color: red">*</span></label
                >
                <input
                    type="text"
                    class="form-control"
                    v-model="form.cellPhone"
                    :required ="form.homePhone === ''"
                    v-mask="'(###) ###-####'"
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >Date of Birth <span style="color: red">*</span></label
                >
                <datepicker
                    v-model="form.dob"
                    :input-class="'form-control'"
                    :format="'MMMM dd, yyyy'"
                    :id="'dpicker'"
                    :required="true"
                    :typeable="false"
                    :disabled-dates="disabledDates"
                    onkeydown="return false"
                  ></datepicker>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >Gender <span style="color: red">*</span></label
                >
                <select class="form-control" v-model="form.sex">
                    <option
                      v-for="gender in genderList"
                      :value="gender.id"
                      :key="gender.value"
                    >
                      {{ gender.value }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >Employment <span style="color: red">*</span></label
                >
                <select
                    class="form-control"
                    v-model="form.employStatID"
                    required
                  >
                    <option
                      v-for="employ in employmentList"
                      :value="employ.id"
                      :key="employ.value"
                    >
                      {{ employ.value }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                   <label class="label f-weight-550"
                  >Marital Status <span style="color: red">*</span></label
                >
                <select v-model="form.maritalStatID" class="form-control">
                    <option
                      v-for="marital in statusList"
                      :key="marital.value"
                      :value="marital.id"
                    >
                      {{ marital.value }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >Emergency Contact</label
                >
                <input
                    type="text"
                    class="form-control"
                    v-model="form.emerContact"
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >Emergency Relation</label
                >
                <select class="form-control" v-model="form.emerRelation">
                    <option
                      v-for="relation in relationList"
                      :value="relation"
                      :key="relation"
                    >
                      {{ relation }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >Emergency Phone</label
                >
                <input
                    type="text"
                    class="form-control"
                    v-model="form.emerPhone"
                    v-mask="'(###)-###-####'"
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                  >Is today's visit due to an auto accident?</label
                >
                <div class="form-check">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="question"
                      :checked="isAutoAccident"
                      @click="toggle(true)"
                    />
                    <label class="form-check-label">Yes</label>
                  </div>
                  <div class="form-check">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="question"
                      :checked="!isAutoAccident"
                      @click="toggle(false)"
                    />
                    <label class="form-check-label">No</label>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isLoading">
              <div class="col-12">
                <content-placeholders :rounded="true" :centered="true">
                  <content-placeholders-text :lines="20" />
                </content-placeholders>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <div class="row justify-content-end">
              <div class="col-sm-9">
                <!-- <button
                  type="reset"
                  class="btn btn-default mr-2"
                  @click="previous"
                  v-if="
                    getTaskPreviousTaskType &&
                    getTaskPreviousTaskType !== getTaskCurrentTaskType
                  "
                >
                  Back
                </button> -->
                <btn-saving :is-saving="isSaving"/>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </form>
  </section>
</template>

<script>
// import moment from 'moment'
import api from '../../api/http-common.js'
import Datepicker from 'vuejs-datepicker'
import { mapGetters, mapActions } from 'vuex'
import btnSaving from '../button-saving.vue'
export default {
  components: {
    Datepicker,
    btnSaving
  },
  data () {
    return {
      isRequired: true,
      isLoading: true,
      isSaving: false,
      portalId: null,
      caseHistoryId: null,
      form: {
        firstName: '',
        lastName: '',
        middleInitial: '',
        nickName: '',
        email: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        homePhone: '',
        cellPhone: '',
        dob: '',
        sex: '',
        employment: '',
        maritalStatID: '',
        emerContact: '',
        emerRelation: '',
        emerPhone: ''
      },
      isAutoAccident: false,
      usStates: [],
      relationList: [
        'SPOUSE',
        'CHILD',
        'MOTHER',
        'FATHER',
        'BROTHER',
        'SISTER',
        'AUNT',
        'UNCLE',
        'COUSIN',
        'FRIEND',
        'OTHER'
      ],
      employmentList: [
        { id: 0, value: '' },
        { id: 1, value: 'Employed' },
        { id: 2, value: 'Full Time Student' },
        { id: 3, value: 'Part Time Student' },
        { id: 4, value: 'Retired' },
        { id: 5, value: 'Other' }
      ],
      statusList: [
        { id: 0, value: '' },
        { id: 1, value: 'Single' },
        { id: 2, value: 'Married' },
        { id: 3, value: 'Other' },
        { id: 4, value: 'Divorced' },
        { id: 5, value: 'Widowed' },
        { id: 6, value: 'Child' }
      ],
      genderList: [
        { id: 'M', value: 'Male' },
        { id: 'F', value: 'Female' },
        { id: 'X', value: 'Non-Binary' }
      ],
      disabledDates: {
        ranges: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'getProfilePatientAssociated',
      'getTaskPreviousTaskType',
      'getTaskCurrentTaskType',
      'currentPatientAssociated',
      'getTaskCode',
      'getTaskInfo'
    ]),
    TaskInfo() {
      return JSON.parse(this.getTaskInfo)
    }
  },
  methods: {
    ...mapActions(['setTaskCurrentTaskType', 'setTaskCurrentCaseHistoryId', 'setTaskInfo']),
    toggle (val) {
      this.isAutoAccident = val
    },
    async previous () {
      // this.setTaskCurrentTaskType(this.getTaskPreviousTaskType)
      await this.$router.push({ path: '/' })
    },
    async savePatientInfo() {
      var givenDate = this.form.dob
      var todaysDate = new Date()

      if (givenDate > todaysDate) {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Date of Birth!'
        })
      } else {
        this.isSaving = true
        await api.task.request.updatePatient(this.form)
        let result = await api.task.request.findIncompleteCaseHistory({
          facilityId: this.currentPatientAssociated.facilityID,
          patientId: this.currentPatientAssociated.patientID
        })
        if (!result.data) {
          result = await api.task.request.insertCaseHistory({
            facilityId: this.currentPatientAssociated.facilityID,
            patientId: this.currentPatientAssociated.patientID,
            aa: this.isAutoAccident
          })
        }

        await this.setTaskCurrentCaseHistoryId(result.data)
        this.isSaving = false
        if (this.TaskInfo.Action === 'INSINFO') {
          const taskinfo = this.TaskInfo
          taskinfo.CurrentTaskType = this.isAutoAccident ? 'NphAutoAccident' : 'NphComplaintLocation'
          this.setTaskInfo(JSON.stringify(taskinfo))
          this.setTaskCurrentTaskType('NphInsurance')
        } else if (this.isAutoAccident) {
          this.setTaskCurrentTaskType('NphAutoAccident')
        } else {
          this.setTaskCurrentTaskType('NphComplaintLocation')
        }
      }
    },
    async getPatientInfo (patientId) {
      const patientInfo = await api.task.request.getPatient({
        facilityId: this.currentPatientAssociated.facilityID,
        patientId: this.currentPatientAssociated.patientID
      })

      this.form = patientInfo.data
      this.form.facilityId = this.currentPatientAssociated.facilityID
      this.form.patientId = this.form.id
      switch (this.getTaskCode) {
        case 'AANPH':
        case 'AACH':
          this.isAutoAccident = true
          break
      }
      this.isLoading = false
    },
    async getUsStates () {
      const result = await api.task.request.getUsStates()
      this.usStates = result.data
    }
  },
  async mounted () {
    await this.getUsStates()
    await this.getPatientInfo()
    this.isLoading = false
    document.getElementById('dpicker').removeAttribute('readonly')

    var obj = {}

    var fromDate = new Date()
    var futureDate = new Date(new Date().getFullYear() + 50, 0, 1)

    obj.from = fromDate
    obj.to = futureDate

    this.disabledDates.ranges.push(obj)
    this.disabledDates.from = fromDate
  }
}
</script>
