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
          <div class="card-body">
            <div class="form-horizontal">
              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Please select up to 4 regions that pertain to your
                  visit</label
                >
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.regions"
                    :options="regionsLocation"
                    :group-select="true"
                    :multiple="true"
                    @select="selectChange"
                    @remove="selectRemove"
                    :max="4"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Primary Complaint</label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.complaint1"
                    disabled
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >2nd Complaint</label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.complaint2"
                    disabled
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >3rd Complaint</label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.complaint3"
                    disabled
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >4th Complaint</label
                >
                <div class="col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.complaint4"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <div class="row justify-content-end">
              <div class="col-sm-9">
                <button type="reset" class="btn btn-default mr-2" @click="previous" v-if="getTaskPreviousTaskType">Back</button>
                <button class="btn btn-primary mr-2" type="submit">
                  Next
                </button>

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
        regions: [],
        complaint1: '',
        complaint2: '',
        complaint3: '',
        complaint4: ''
      },
      problems: []
    }
  },
  watch: {
    'form.complaint1': function (val) {
      if (!val) {
        const index = this.problems.findIndex((el) => el.ordinal === 1)
        if (index >= 0) {
          this.problems.splice(index, 1)
        }
        return
      }
      if (val) {
        const existing = this.problems.find((el) => el.ordinal === 1)
        if (!existing) {
          this.problems.push({
            id: 0,
            ordinal: 1,
            region: val
          })
        } else {
          existing.region = val
        }
      }
    },
    'form.complaint2': function (val) {
      if (!val) {
        const index = this.problems.findIndex((el) => el.ordinal === 2)
        if (index >= 0) {
          this.problems.splice(index, 1)
        }
        return
      }

      const existing = this.problems.find((el) => el.ordinal === 2)
      if (!existing) {
        this.problems.push({
          id: 0,
          ordinal: 2,
          region: val
        })
      } else {
        existing.region = val
      }
    },
    'form.complaint3': function (val) {
      if (!val) {
        const index = this.problems.findIndex((el) => el.ordinal === 3)
        if (index >= 0) {
          this.problems.splice(index, 1)
        }
        return
      }
      const existing = this.problems.find((el) => el.ordinal === 3)
      if (!existing) {
        this.problems.push({
          id: 0,
          ordinal: 3,
          region: val
        })
      }
    },
    'form.complaint4': function (val) {
      if (!val) {
        const index = this.problems.findIndex((el) => el.ordinal === 4)
        if (index >= 0) {
          this.problems.splice(index, 1)
        }
        return
      }
      const existing = this.problems.find((el) => el.ordinal === 4)
      if (!existing) {
        this.problems.push({
          id: 0,
          ordinal: 4,
          region: val
        })
      } else {
        existing.region = val
      }
    }
  },
  computed: {
    ...mapGetters([
      'getProfilePatientAssociated',
      'getTaskCurrentCaseHistoryId',
      'getTaskPreviousTaskType'
    ]),
    currentPatientAssociated () {
      if (this.getProfilePatientAssociated.length === 0) {
        return null
      }
      return this.getProfilePatientAssociated[0]
    },
    regionsLocation () {
      return [
        'Head',
        'Jaw',
        'Neck',
        'Shoulder',
        'Arm',
        'Elbow',
        'Wrist',
        'Hand',
        'Upper Back',
        'Mid Back',
        'Lower Back',
        'Hip',
        'Leg',
        'Knee',
        'Ankle',
        'Foot'
      ]
    }
  },
  methods: {
    ...mapActions(['setTaskCurrentCaseHistoryProblems', 'setTaskCurrentTaskType', 'setTaskCurrentCaseHistoryOats']),
    selectChange (selected) {
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
    selectRemove (removed) {
      if (this.form.complaint1 === removed) {
        this.form.complaint1 = ''
        return
      }
      if (this.form.complaint2 === removed) {
        this.form.complaint2 = ''
        return
      }
      if (this.form.complaint3 === removed) {
        this.form.complaint3 = ''
        return
      }
      if (this.form.complaint4 === removed) {
        this.form.complaint4 = ''
      }
    },
    async next () {
      const promMultipleInsert = new Promise((resolve, reject) => {
        this.problems.forEach(async (el, index, arr) => {
          await api.task.request.insertCaseHistoryProblem({
            facilityId: this.currentPatientAssociated.facilityID,
            caseHistoryId: this.getTaskCurrentCaseHistoryId,
            ordinal: el.ordinal,
            region: el.region,
            name: ''
          })
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

      const oats = await api.task.request.getCaseHistoryOats({ facilityId: this.currentPatientAssociated.facilityID, caseHistoryId: this.getTaskCurrentCaseHistoryId })
      await this.setTaskCurrentCaseHistoryOats(oats.data)
      await this.setTaskCurrentCaseHistoryProblems(problems.data)
      await this.setTaskCurrentTaskType('NphComplaintQuestions')
    },
    async previous () {
      this.setTaskCurrentTaskType(this.getTaskPreviousTaskType)
    }
  },
  async mounted () {
    const result = await api.task.request.getCaseHistoryProblems({
      facilityId: this.currentPatientAssociated.facilityID,
      caseHistoryId: this.getTaskCurrentCaseHistoryId
    })
    const problems = result.data
    if (problems.length > 0) {
      problems.forEach(async el => {
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
        await api.task.request.deleteCaseHistoryProblem({
          facilityId: this.currentPatientAssociated.facilityID,
          caseHistoryProblemId: el.id
        })
      })
    }
  }
}
</script>
