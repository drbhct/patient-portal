<template>
  <section role="main">
    <form
      class="mt-5 mr-2 ml-2 justify-content-md-center"
      @submit.prevent="submit"
    >
      <div class="col">
        <section class="card">
          <header class="card-header"></header>
          <div class="card-body" id="frmBody">
            <div class="form-horizontal" v-if="!isLoading">
              <div class="row">
                <div class="col-lg-12 text-center">
                  <h4 class="label f-weight-550">
                    Please answer these questions about yourself
                  </h4>
                </div>
              </div>
              <div
                class="form-group row"
                v-for="infoQandA in form.infoQuestion"
                :key="infoQandA.question"
              >
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">
                    {{ infoQandA.question }}
                  </label>
                  <multiselect
                    :searchable="false"
                    v-model="infoQandA.answer"
                    :options="infoQandA.selections"
                    :multiple="false"
                  />
                </div>
              </div>

              <hr />

              <div class="row">
                <div class="col-lg-6 mx-auto">
                  <div class="label f-weight-550 text-center">
                    <h4>
                      Please indicate the following condition(s) that apply to
                      you
                    </h4>
                    <h4>
                      Present = you have this now Past = if you have had in the
                      past
                    </h4>
                  </div>
                </div>
              </div>

              <div class="row">
                <div
                  class="col-lg-6"
                  v-for="condition in form.conditionQandA"
                  :key="condition.question"
                >
                  <div class="form-group row mb-2">
                    <div class="col-lg-6 mx-auto">
                      <label class="label f-weight-550">
                        {{ condition.question }}
                      </label>
                      <multiselect
                        :searchable="false"
                        v-model="condition.answer"
                        :options="conditionApplySelection"
                        :multiple="true"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <div class="row">
                <div class="col-lg-12 text-center">
                  <h4 class="label f-weight-550">Have you ever taken</h4>
                </div>
              </div>

              <div
                class="form-group row"
                v-for="medQandA in form.medicineInfoQuestion"
                :key="medQandA.question"
              >
                <div class="col-lg-6 mx-auto">
                  <div>
                    <label class="label f-weight-550">
                      {{ medQandA.question }}
                    </label>
                    <multiselect
                      :searchable="false"
                      v-model="medQandA.answer"
                      :options="yesNoSelection"
                      :multiple="false"
                    />
                  </div>
                  <div v-if="medQandA.answer === 'Yes'">
                    <label class="label f-weight-550">
                      Select Year {{ medQandA.question }} taken</label
                    >
                    <multiselect
                      :searchable="false"
                      v-model="medQandA.year"
                      :options="medicineYearSelection"
                      :multiple="false"
                      :placeholder="'Select year'"
                    />
                  </div>
                </div>
              </div>

              <div
                class="form-group row"
                v-for="medQandA in form.medicineInfo2Question"
                :key="medQandA.question"
              >
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">
                    {{ medQandA.question }}
                  </label>
                  <multiselect
                    :searchable="false"
                    v-model="medQandA.answer"
                    :options="yesNoSelection"
                    :multiple="false"
                    v-if="medQandA.code !== 'LastMenstrualPeriod'"
                  />
                  <datepicker
                    v-model="medQandA.answer"
                    :format="'MMMM dd, yyyy'"
                    v-if="medQandA.code === 'LastMenstrualPeriod'"
                    :clear-button="true"
                    :bootstrap-styling="true"
                    :disabled-dates="disabledDates"
                  ></datepicker>
                  <span
                    class="help-block"
                    v-if="medQandA.code === 'LastMenstrualPeriod'"
                    >Leave field empty if not sure.</span
                  >
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

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from '@vuepic/vue-datepicker'
import Multiselect from 'vue-multiselect'
import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import BtnSaving from '../button-saving.vue'
import { useTaskStore } from '@/stores/task'

const router = useRouter()
const taskStore = useTaskStore()

// State
const isLoading = ref(false)
const isSaving = ref(false)
const disabledDates = ref({
  from: new Date()
})

const form = ref({
  infoQuestion: [],
  conditionQandA: [
    { question: 'Fatigue', answer: [] },
    { question: 'Seizures', answer: [] },
    { question: 'Fever', answer: [] },
    { question: 'Depression', answer: [] },
    { question: 'Chills', answer: [] },
    { question: 'Dizziness', answer: [] },
    { question: 'Tremors', answer: [] },
    { question: 'Memory Loss', answer: [] },
    { question: 'Night Sweats', answer: [] },
    { question: 'Hot Joints', answer: [] },
    { question: 'Fainting', answer: [] },
    { question: 'Muscle Weakness', answer: [] },
    { question: 'Joint Swelling', answer: [] },
    { question: 'Loss of Coordination', answer: [] },
    { question: 'Lumps/Masses', answer: [] },
    { question: 'Difficulty of Speech', answer: [] }
  ],
  medicineInfoQuestion: [
    { question: 'Insulin', answer: '', year: '', code: 'Insulin' },
    { question: 'Cortizone', answer: '', year: '', code: 'Cortisone' },
    {
      question: 'Male/Female Hormones',
      answer: '',
      year: '',
      code: 'MaleFemaleHormones'
    },
    {
      question: 'Blood Pressure',
      answer: '',
      year: '',
      code: 'BloodPressure'
    },
    {
      question: 'Tranquilizer/Sedative',
      answer: '',
      year: '',
      code: 'TranquilizersSedatives'
    }
  ],
  medicineInfo2Question: [
    {
      question: 'Are you taking any medications?',
      answer: '',
      code: 'Medications'
    },
    {
      question: 'Are you taking any nutritional supplement?',
      answer: '',
      code: 'NutritionalSupplements'
    },
    {
      question: 'Have you had any surgeries?',
      answer: '',
      code: 'Surgeries'
    },
    {
      question: 'When was your last menstrual period?',
      answer: '',
      code: 'LastMenstrualPeriod'
    }
  ]
})

// Computed properties
const getTaskPreviousTaskType = computed(() => taskStore.previousTaskType)
const yesNoSelection = computed(() => ['Yes', 'No'])
const medicineYearSelection = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 50 }, (_, i) => currentYear - i)
})
const conditionApplySelection = computed(() => ['Present', 'Past'])

// Methods
const loadQuestions = async () => {
  isLoading.value = true
  try {
    const response = await taskStore.getPersonalHistoryQuestions()
    form.value.infoQuestion = response
  } catch (error) {
    console.error('Error loading questions:', error)
  } finally {
    isLoading.value = false
  }
}

const submit = async () => {
  isSaving.value = true
  try {
    await taskStore.savePersonalHistory(form.value)
    router.push('/task/complaint')
  } catch (error) {
    console.error('Error saving personal history:', error)
  } finally {
    isSaving.value = false
  }
}

const prev = () => {
  router.push('/task/insurance')
}

onMounted(() => {
  loadQuestions()
})
</script>

<style scoped>
.label {
  margin-bottom: 0.5rem;
}
.f-weight-550 {
  font-weight: 550;
}
.help-block {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
