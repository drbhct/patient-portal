<template>
  <section role="main">
    <form
      @submit.prevent="submit2"
      class="mt-5 mr-2 ml-2 justify-content-md-center"
    >
      <div class="col">
        <section class="card">
          <header class="card"></header>
          <div class="card-body">
            <div class="" v-if="!isLoading">
              <div class="row text-center f-weight-550">
                <div class="col-lg-12 text-center">
                  <h3 class="label f-weight-550">
                    Thank you! We look forward to seeing you.
                  </h3>
                  <h4 class="label f-weight-550">
                    {{ currentPatientAssociated.officeName }}
                  </h4>
                </div>
              </div>
              <!-- <div
                class="form-group row"
                v-for="q in form.questions"
                :key="q.code"
              >
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">{{ q.question }}</label>
                  <multiselect
                    :searchable="false"
                    v-model="q.answer"
                    :options="yesNoSelection"
                    :multiple="false"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-lg-12 text-center">
                  <h3 class="label f-weight-550">
                    The doctor will ask you for details during your visit.
                  </h3>
                </div>
              </div> -->
            </div>
            <div v-else>
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
                  @click="prev"
                  v-if="getTaskPreviousTaskType"
                >
                  Back
                </button>
                <btn-saving
                  :is-saving="isSaving"
                  :loading-text="'Completing...'"
                  :display-text="'Continue'"
                />
              </div>
            </div>
          </footer>
        </section>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/task'
import BtnSaving from '../button-saving.vue'
import api from '../../api/http-common.js'

const router = useRouter()
const taskStore = useTaskStore()

const isLoading = ref(false)
const isSaving = ref(false)

// Computed properties
const currentPatientAssociated = computed(
  () => taskStore.currentPatientAssociated
)
const getTaskCurrentCaseHistoryId = computed(
  () => taskStore.currentCaseHistoryId
)
const getTaskCurrentTaskType = computed(() => taskStore.currentTaskType)
const getTaskPreviousTaskType = computed(() => taskStore.previousTaskType)
const TaskInfo = computed(() => {
  const taskInfo = taskStore.taskInfo
  return taskInfo ? JSON.parse(taskInfo) : undefined
})
const TaskItem = computed(() => taskStore.taskItem)
const yesNoSelection = computed(() => ['Yes', 'No'])

// Methods
const submit = async () => {
  if (TaskInfo.value) {
    if (TaskInfo.value.TaskType === 'INS') {
      await api.task.request.updateTaskComplete({
        facilityId: currentPatientAssociated.value.facilityID,
        id: TaskInfo.value.TaskID,
        patientId: currentPatientAssociated.value.patientID
      })
      isSaving.value = false
    } else {
      await api.task.request.updateCaseHistoryComplete({
        facilityId: currentPatientAssociated.value.facilityID,
        caseHistoryId: getTaskCurrentCaseHistoryId.value
      })
    }
  } else {
    if (TaskItem.value) {
      await api.task.request.updateTaskComplete({
        facilityId: currentPatientAssociated.value.facilityID,
        id: TaskItem.value.taskID,
        patientId: currentPatientAssociated.value.patientID
      })
    }
    await api.task.request.updateCaseHistoryComplete({
      facilityId: currentPatientAssociated.value.facilityID,
      caseHistoryId: getTaskCurrentCaseHistoryId.value
    })
  }
  isSaving.value = false
}

const submit2 = async () => {
  await router.push({ path: '/' })
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
  taskStore.setTaskCurrentTaskType({
    back: true,
    page: prevPage,
    removePage: getTaskCurrentTaskType.value
  })
}

onMounted(async () => {
  isLoading.value = true
  // Complete the task without having submit button clicked
  await submit()
})
</script>

<style></style>
