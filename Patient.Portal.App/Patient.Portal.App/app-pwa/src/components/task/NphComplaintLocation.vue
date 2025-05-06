<template>
  <section role="main">
    <form
      class="mt-5 mr-2 ml-2 justify-content-md-center"
      @submit.prevent="next"
    >
      <div class="col">
        <section class="card">
          <header class="card-header">
            <h2 class="card-title"></h2>
          </header>
          <div class="card-body" id="frmBody">
            <div v-if="!isLoading">
              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                    >Please select up to 4 regions that pertain to your
                    visit</label
                  >
                  <multiselect
                    :searchable="false"
                    v-model="form.regions"
                    :options="regionsLocation"
                    :group-select="true"
                    :multiple="true"
                    @select="selectChange"
                    :max="4"
                  >
                    <template #maxElements>
                      Maximum of 4 regions selected. Remove a region to select
                      another.
                    </template>
                  </multiselect>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">Primary Complaint</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.complaint1"
                    disabled
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">2nd Complaint</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.complaint2"
                    disabled
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">3rd Complaint</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.complaint3"
                    disabled
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">4th Complaint</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.complaint4"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div v-if="isLoading">
              <div class="col-12">
                <content-placeholders :rounded="true" :centered="true">
                  <content-placeholders-text :lines="5" />
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
                  v-if="getTaskPreviousTaskType"
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
import Multiselect from 'vue-multiselect'
import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import api from '../../api/http-common.js'
import btnSaving from '../button-saving.vue'
import { useTaskStore } from '@/stores/task'
import { storeToRefs } from 'pinia'

export default {
  components: {
    Multiselect,
    btnSaving
  },
  setup() {
    const taskStore = useTaskStore()
    const { getTaskPreviousTaskType, getTaskCurrentTaskType, getTaskInfo } =
      storeToRefs(taskStore)

    return {
      taskStore,
      getTaskPreviousTaskType,
      getTaskCurrentTaskType,
      getTaskInfo
    }
  },
  data() {
    return {
      isLoading: true,
      isSaving: false,
      form: {
        regions: [],
        complaint1: '',
        complaint2: '',
        complaint3: '',
        complaint4: ''
      },
      problems: [],
      forDelete: null
    }
  },
  watch: {
    'form.regions'() {
      this.problems = []
      this.form.complaint1 = ''
      this.form.complaint2 = ''
      this.form.complaint3 = ''
      this.form.complaint4 = ''

      for (let i = 0; i < this.form.regions.length; i++) {
        const region = this.form.regions[i]
        const ctr = i + 1
        const name = 'complaint' + ctr
        this.form[name] = region

        this.problems.push({
          id: 0,
          ordinal: ctr,
          region
        })
      }
    }
  },
  computed: {
    regionsLocation() {
      return [
        'Neck',
        'Lower Back',
        'Mid Back',
        'Head',
        'Jaw',
        'Shoulder',
        'Arm',
        'Elbow',
        'Wrist',
        'Hand',
        'Upper Back',
        'Hip',
        'Leg',
        'Knee',
        'Ankle',
        'Foot'
      ]
    }
  },
  methods: {
    setTaskCurrentTaskType(type) {
      this.taskStore.setCurrentTaskType(type)
    },
    setTaskInfo(info) {
      this.taskStore.setTaskInfo(info)
    },
    selectChange(selected) {
      if (!this.form.complaint1) {
        this.form.complaint1 = selected
        return
      }
      if (!this.form.complaint2) {
        this.form.complaint2 = selected
        return
      }
      if (!this.form.complaint3) {
        this.form.complaint3 = selected
        return
      }
      if (!this.form.complaint4) {
        this.form.complaint4 = selected
      }
    },
    async next() {
      if (this.form.regions.length === 0) {
        this.$swal({
          text: 'Please select a region that pertains to your visit.',
          position: 'top-center',
          title: 'Error',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'error'
        })
        return
      }
      this.isSaving = true
      if (this.forDelete.length > 0) {
        for await (const result of this.forDelete) {
          await api.task.request.deleteCaseHistoryProblem({
            facilityId: this.currentPatientAssociated.facilityID,
            caseHistoryProblemId: result.id
          })
        }
      }

      const promMultipleInsert = new Promise((resolve, reject) => {
        this.problems.forEach(async (el, index, arr) => {
          await api.task.request.insertCaseHistoryProblem({
            facilityId: this.currentPatientAssociated.facilityID,
            caseHistoryId: this.getTaskCurrentCaseHistoryId,
            ordinal: el.ordinal,
            region: el.region,
            name: ''
          })
          console.log('insertCaseHistoryProblem')
          console.log(arr)
          if (index === arr.length - 1) {
            resolve()
          }
        })
      })

      await promMultipleInsert

      const problems = await api.task.request.getCaseHistoryProblems({
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryId: this.getTaskCurrentCaseHistoryId
      })

      const oats = await api.task.request.getCaseHistoryOats({
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryId: this.getTaskCurrentCaseHistoryId
      })
      await this.setTaskCurrentCaseHistoryOats(oats.data)
      await this.setTaskCurrentCaseHistoryProblems(problems.data)
      this.isSaving = false
      await this.setTaskCurrentTaskType('NphComplaintQuestions')
    },
    async previous() {
      const currentIndex = this.getTaskPreviousTaskType.findIndex(
        (c) => c === this.getTaskCurrentTaskType
      )
      let prevPage = ''
      if (currentIndex === -1) {
        prevPage =
          this.getTaskPreviousTaskType[this.getTaskPreviousTaskType.length - 1]
      } else {
        prevPage = this.getTaskPreviousTaskType[currentIndex - 1]
      }

      this.setTaskCurrentTaskType({
        back: true,
        page: prevPage,
        removePage: this.getTaskCurrentTaskType
      })
    }
  },
  async mounted() {},
  async activated() {
    this.form = {
      regions: [],
      complaint1: '',
      complaint2: '',
      complaint3: '',
      complaint4: ''
    }

    this.isLoading = true
    const result = await api.task.request.getCaseHistoryProblems({
      facilityId: this.currentPatientAssociated.facilityID,
      caseHistoryId: this.getTaskCurrentCaseHistoryId
    })
    this.form.regions = []
    this.forDelete = result.data
    if (this.forDelete.length > 0) {
      this.forDelete.forEach((el) => {
        this.form.regions.push(el.region)
        switch (el.ordinal) {
          case 1:
            this.form.complaint1 = el.region
            break
          case 2:
            this.form.complaint2 = el.region
            break
          case 3:
            this.form.complaint3 = el.region
            break
          case 4:
            this.form.complaint4 = el.region
            break
        }
      })
    }
    this.isLoading = false

    setTimeout(() => {
      const el = document.getElementById('frmBody')
      el.scrollIntoView({ behavior: 'smooth' })
    }, 1000)
  }
}
</script>
