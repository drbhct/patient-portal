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
            <div v-if="!isLoading">
              <div class="row">
                <div class="col-lg-6 mx-auto text-center">
                  <h4 class="label f-weight-550">
                    Please answer these questions about yourself
                  </h4>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">
                    Select one condition for Immediate Family Health History
                  </label>
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
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">
                    {{ famCondition.question }}
                  </label>
                  <div class="row">
                    <div class="col-lg-6">
                    <multiselect
                      v-model="famCondition.family"
                      :options="familySelection"
                      :multiple="false"
                    />
                  </div>
                  <div class="col-lg-6">
                    <multiselect
                      v-model="famCondition.stat"
                      :options="statusSelection"
                      :multiple="false"
                    />
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="col-12">
                <content-placeholders :rounded="true" :centered="true">
                  <content-placeholders-text :lines="5" />
                </content-placeholders>
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
              <btn-saving :is-saving="isSaving" />
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
import BtnSaving from '../button-saving.vue'
export default {
  components: {
    Multiselect,
    BtnSaving
  },
  data () {
    return {
      isLoading: false,
      isSaving: false,
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
      'getTaskCurrentTaskType',
      'currentPatientAssociated'
    ]),
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
      const currentIndex = this.getTaskPreviousTaskType.findIndex(
        (c) => c === this.getTaskCurrentTaskType
      )
      let prevPage = ''
      if (currentIndex === -1) {
        prevPage = this.getTaskPreviousTaskType[
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
    },
    async submit () {
      this.isSaving = true
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

      // console.log('payload >', payload)

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
      if (this.familyHistoryData.length > 0) {
        await promMultipleDelete
      }
      if (payload.length > 0) {
        await promMultipleInsert
      }

      this.isSaving = false
      this.setTaskCurrentTaskType('NphThankyou')
    }
  },
  async mounted () {
    this.isLoading = true
    const familyHistoryData = await api.task.request.getCaseHistoryFamilyHealthHistory(
      {
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryId: this.getTaskCurrentCaseHistoryId
      }
    )
    this.familyHistoryData = familyHistoryData.data

    // Construct data
    this.familyHistoryData.forEach((el) => {
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

    this.isLoading = false
  }
}
</script>

<style>
</style>
