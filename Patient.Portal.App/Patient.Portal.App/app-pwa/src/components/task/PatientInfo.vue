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
            <div class="form-horizontal" v-if="!isLoading">
              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >First Name <span style="color: red">*</span></label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.firstName"
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Last Name <span style="color: red">*</span></label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.lastName"
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Middle Initial</label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.middleInitial"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Nick Name</label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.nickName"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Email <span style="color: red">*</span></label
                >
                <div class="col-lg-6">
                  <input
                    type="email"
                    class="form-control"
                    v-model="form.email"
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Address 1</label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.address"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Address 2</label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.address2"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >City</label
                >
                <div class="col-lg-6">
                  <input type="text" class="form-control" v-model="form.city" />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >State</label
                >
                <div class="col-lg-6">
                  <select v-model="form.state" class="form-control">
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
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Zip Code</label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.zip"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Home Phone <span style="color: red">*</span></label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.homePhone"
                    required
                    v-mask="'(###)-###-####'"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Mobile Phone <span style="color: red">*</span></label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.cellPhone"
                    required
                    v-mask="'(###)-###-####'"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Date of Birth <span style="color: red">*</span></label
                >
                <div class="col-lg-6">
                  <datepicker
                    v-model="form.dob"
                    :input-class="'form-control'"
                    :format="'MMMM dd, yyyy'"
                  ></datepicker>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Gender <span style="color: red">*</span></label
                >
                <div class="col-lg-6">
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
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Employment <span style="color: red">*</span></label
                >
                <div class="col-lg-6">
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
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Marital Status <span style="color: red">*</span></label
                >
                <div class="col-lg-6">
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
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Emergency Contact</label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.emerContact"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Emergency Relation</label
                >
                <div class="col-lg-6">
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
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Emergency Phone</label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.emerPhone"
                    v-mask="'(###)-###-####'"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Is today's visit due to an auto accident?</label
                >
                <div class="col-lg-6">
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
                <button
                  type="reset"
                  class="btn btn-default mr-2"
                  @click="previous"
                  v-if="
                    getTaskPreviousTaskType &&
                    getTaskPreviousTaskType !== getTaskCurrentTaskType
                  "
                >
                  Back
                </button>
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
        { id: 'F', value: 'Female' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getProfilePatientAssociated',
      'getTaskPreviousTaskType',
      'getTaskCurrentTaskType'
    ]),
    currentPatientAssociated () {
      if (this.getProfilePatientAssociated.length === 0) {
        return null
      }
      return this.getProfilePatientAssociated[0]
    }
  },
  watch: {
    currentPatientAssociated: async function (val) {
      // if (val) {
      //   await this.getUsStates()
      //   await this.getPatientInfo()
      //   this.isLoading = false
      // }
    }
  },
  methods: {
    ...mapActions(['setTaskCurrentTaskType', 'setTaskCurrentCaseHistoryId']),
    toggle (val) {
      this.isAutoAccident = val
    },
    async previous () {
      // this.setTaskCurrentTaskType(this.getTaskPreviousTaskType)
      await this.$router.push({ path: '/' })
    },
    async savePatientInfo () {
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
      if (this.isAutoAccident) {
        this.setTaskCurrentTaskType('NphAutoAccident')
      } else {
        this.setTaskCurrentTaskType('NphComplaintLocation')
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
  }
}
</script>
