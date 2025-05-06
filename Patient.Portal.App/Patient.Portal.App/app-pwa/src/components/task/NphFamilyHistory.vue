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
                    Select one condition for immediate family health history
                  </label>
                  <multiselect
                    :searchable="false"
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
                v-for="(famCondition, index) in form.familyCondition"
                :key="famCondition.question"
              >
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550 me-5">
                    {{ famCondition.question }}
                  </label>
                  <span
                    style="margin-left: 10px; cursor: pointer"
                    @click="addSameConditionToFam(famCondition)"
                  >
                    <i class="fa-solid fa-person-circle-plus"></i>
                    Add Family
                  </span>
                  <span
                    style="margin-left: 10px; cursor: pointer"
                    @click="removeFamCondition(famCondition, index)"
                  >
                    <i class="fa-solid fa-person-circle-xmark"></i>
                    Remove
                  </span>
                  <div class="row">
                    <div class="col-lg-6">
                      <multiselect
                        :searchable="false"
                        v-model="famCondition.family"
                        :options="familySelection"
                        :multiple="false"
                      />
                    </div>
                    <div class="col-lg-6">
                      <multiselect
                        :searchable="false"
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

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/task'
import BtnSaving from '../button-saving.vue'
import Multiselect from 'vue-multiselect'
import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'

const router = useRouter()
const taskStore = useTaskStore()

const isLoading = ref(false)
const isSaving = ref(false)
const form = ref({})

const loadFamilyHistory = async () => {
  try {
    const response = await taskStore.getFamilyHistory()
    form.value = response.data
  } catch (error) {
    console.error('Error fetching family history:', error)
  }
}

const saveFamilyHistory = async () => {
  isSaving.value = true
  try {
    await taskStore.saveFamilyHistory(form.value)
    router.push('/task/thankyou')
  } catch (error) {
    console.error('Error saving family history:', error)
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  loadFamilyHistory()
})

const conditionSelection = [
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

const familySelection = [
  'Father',
  'Mother',
  'Brother',
  'Sister',
  'Grandfather',
  'Grandmother',
  'Son',
  'Daughter'
]

const statusSelection = ['Past', 'Present']

const addSameConditionToFam = (famCondition) => {
  form.value.familyCondition.push({
    question: famCondition.question,
    family: [],
    stat: []
  })
}

const removeFamCondition = (famCondition, index) => {
  form.value.familyCondition.splice(index, 1)

  const containsQuestion = form.value.familyCondition.find(
    (el) => el.question === famCondition.question
  )
  if (!containsQuestion) {
    form.value.condition = form.value.condition.filter(
      (el) => el !== famCondition.question
    )
  }
}

const selectChange = (selected) => {
  switch (selected) {
    case 'Nothing significant':
    case 'Unknown':
      setTimeout(() => {
        form.value.condition = [selected]
        form.value.familyCondition = []
      }, 1500)
      break
    default:
      form.value.familyCondition.push({
        question: selected,
        family: [],
        stat: []
      })
      break
  }
}

const removeChange = (remove) => {
  if (remove === 'Nothing significant' || remove === 'Unknown') {
    form.value.familyCondition = []
    return
  }
  form.value.familyCondition = form.value.familyCondition.filter(
    (x) => x.question !== remove
  )
}

const prev = () => {
  const currentIndex = getTaskPreviousTaskType.value.findIndex(
    (c) => c === getTaskCurrentTaskType.value
  )
  let prevPage = ''
  if (currentIndex === -1) {
    prevPage =
      getTaskPreviousTaskType.value[getTaskPreviousTaskType.value.length - 1]
  } else {
    prevPage = getTaskPreviousTaskType.value[currentIndex - 1]
  }
  setTaskCurrentTaskType({
    back: true,
    page: prevPage,
    removePage: getTaskCurrentTaskType.value
  })
}

const submit = async () => {
  try {
    await saveFamilyHistory()
  } catch (error) {
    console.error('Error submitting family history:', error)
  }
}
</script>

<style></style>
