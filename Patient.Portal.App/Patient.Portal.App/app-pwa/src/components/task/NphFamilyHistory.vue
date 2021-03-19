<template>
  <section role="main">
    <form
      class="mt-5 mr-2 ml-2 justify-content-md-center"
      @submit.prevent="submit"
    >
      <div class="col">
        <section class="card">
          <header class="card-header"></header>
          <div class="card-body">
            <div class="form-horizontal">
              <div class="row">
                <div class="col-lg-12 text-center">
                  <h4>Please answer these questions about yourself</h4>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  Select one condition for Immediate Family Health History
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.condition"
                    :options="conditionSelection"
                    :multiple="true"
                    @select="selectChange"
                    @remove="removeChange"
                  />
                </div>
              </div>

              <div
                class="form-group row"
                v-for="famCondition in form.familyCondition"
                :key="famCondition.question"
              >
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  {{ famCondition.question }}
                </label>
                <div class="col-lg-3">
                  <multiselect
                    v-model="famCondition.family"
                    :options="familySelection"
                    :multiple="false"
                  />
                </div>
                <div class="col-lg-3">
                  <multiselect
                    v-model="famCondition.stat"
                    :options="statusSelection"
                    :multiple="false"
                  />
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer"></footer>
        </section>
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
        condition: [],
        familyCondition: []
      },
      familyHistoryData: null
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
    conditionSelection () {
      return [
        'Cancer',
        'Stroke',
        'Thyroid problems',
        'Asthma',
        'Heart attack',
        'HIV',
        'Angina/Chest pain',
        'Diabetes',
        'Arthritis',
        'Nothing significant',
        'Unknown'
      ]
    },
    familySelection () {
      return [
        'Father',
        'Mother',
        'Brother',
        'Sister',
        'Grandfather',
        'Grandmother',
        'Son',
        'Daughter'
      ]
    },
    statusSelection () {
      return ['Past', 'Present']
    }
  },
  watch: {
    'form.condition': function (val) {
      //   console.log('val', val)
    }
  },
  methods: {
    ...mapActions(['setTaskCurrentTaskType']),
    selectChange (selected) {
      switch (selected) {
        case 'Nothing significant':
        case 'Unknown':
          setTimeout(() => {
            this.form.condition = [selected]
            this.form.familyCondition = []
          }, 1500)
          break
        default:
          this.form.familyCondition.push({
            question: selected,
            family: [],
            stat: []
          })
          break
      }
    },
    removeChange (remove) {
      if (remove === 'Nothing significant' || remove === 'Unknown') {
        this.form.familyCondition = []
        return
      }
      this.form.familyCondition = this.form.familyCondition.filter(
        (x) => x.question !== remove
      )
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
    },
    async submit () {
      // alert('payload!')
      const payload = []
      this.form.familyCondition.forEach((el, index) => {
        payload.push({
          facilityId: this.currentPatientAssociated.facilityID,
          caseHistoryId: this.getTaskCurrentCaseHistoryId,
          id: index,
          description: el.question,
          relation: el.family,
          present: el.stat === 'Present',
          notPresent: false,
          past: el.stat === 'Past',
          unknown: el.question === 'Unknown'
        })
      })

      console.log('payload >', payload)

      const promMultipleInsert = new Promise((resolve, reject) => {
        payload.forEach(async (el, index, arr) => {
          await api.task.request.updateCaseHistoryFamilyHealthHistory(el)
          if (index === arr.length - 1) {
            resolve()
          }
        })
      })

      const promMultipleDelete = new Promise((resolve, reject) => {
        this.familyHistoryData.forEach(async (el, index, arr) => {
          await api.task.request.deleteCaseHistoryFamilyHealthHistory({
            facilityId: this.currentPatientAssociated.facilityID,
            id: el.id
          })
          if (index === arr.length - 1) {
            resolve()
          }
        })
      })
      await promMultipleDelete
      await promMultipleInsert

      this.setTaskCurrentTaskType('NphThankyou')
    }
  },
  async mounted () {
    const familyHistoryData = await api.task.request.getCaseHistoryFamilyHealthHistory(
      {
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryId: this.getTaskCurrentCaseHistoryId
      }
    )
    this.familyHistoryData = familyHistoryData.data

    // Construct data
    this.familyHistoryData.forEach(el => {
      this.form.condition.push(el.description)
      let stat = ''
      if (el.past) {
        stat = 'Past'
      }
      if (el.present) {
        stat = 'Present'
      }

      this.form.familyCondition.push({
        family: el.relation,
        question: el.description,
        stat: stat
      })
    })
  }
}
</script>

<style>
</style>
