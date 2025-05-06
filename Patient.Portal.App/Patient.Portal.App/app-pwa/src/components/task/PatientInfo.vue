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
                  <label class="label f-weight-550">Middle Initial</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.middleInitial"
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">Nickname</label>
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
                  <label class="label f-weight-550"
                    >Address 1 <span style="color: red">*</span>
                  </label>
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
                  <label class="label f-weight-550">Address 2</label>
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
                    >City <span style="color: red">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.city"
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                    >State <span style="color: red">*</span>
                  </label>
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
                    >Zip Code <span style="color: red">*</span>
                  </label>
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
                    >Home Phone
                    <span v-show="form.cellPhone === ''" style="color: red"
                      >*</span
                    ></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.homePhone"
                    :required="form.cellPhone === ''"
                    v-mask="'(###) ###-####'"
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550"
                    >Mobile Phone
                    <span v-show="form.homePhone === ''" style="color: red"
                      >*</span
                    ></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.cellPhone"
                    :required="form.homePhone === ''"
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
                  >
                  </datepicker>
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
                  <label class="label f-weight-550">Emergency Contact</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.emerContact"
                  />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-lg-6 mx-auto">
                  <label class="label f-weight-550">Emergency Relation</label>
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
                  <label class="label f-weight-550">Emergency Phone</label>
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
                  <h5 class="h5">Is this a result of:</h5>
                  <div class="pl-2">
                    <label
                      class="label fw-500 pr-2 text-right"
                      style="width: 120px"
                      >Auto Accident:</label
                    >
                    <div class="form-check form-check-inline">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="aaquestion"
                        :checked="isAutoAccident"
                        @click="isAutoAccident = true"
                      />
                      <label class="form-check-label check-inline">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="aaquestion"
                        :checked="!isAutoAccident"
                        @click="isAutoAccident = false"
                      />
                      <label class="form-check-label">No</label>
                    </div>
                  </div>
                  <div class="pl-2">
                    <label
                      class="label fw-500 pr-2 text-right"
                      style="width: 120px"
                      >Work Injury:</label
                    >
                    <div class="form-check form-check-inline">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="wiquestion"
                        :checked="isWorkInjury"
                        @click="isWorkInjury = true"
                      />
                      <label class="form-check-label check-inline">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="wiquestion"
                        :checked="!isWorkInjury"
                        @click="isWorkInjury = false"
                      />
                      <label class="form-check-label">No</label>
                    </div>
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
                <btn-saving :is-saving="isSaving" />
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
import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from '@vuepic/vue-datepicker'
import { useTaskStore } from '@/stores/task'
import { useProfileStore } from '@/stores/profile'
import BtnSaving from '../button-saving.vue'

const router = useRouter()
const taskStore = useTaskStore()
const profileStore = useProfileStore()

const isLoading = ref(false)
const isSaving = ref(false)
const isAutoAccident = ref(false)
const isWorkInjury = ref(false)
const form = ref({
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
  dob: null,
  sex: '',
  employStatID: '',
  maritalStatID: '',
  emerContact: '',
  emerRelation: '',
  emerPhone: ''
})

// Computed properties
const currentPatientAssociated = computed(
  () => profileStore.currentPatientAssociated
)
const getTaskPreviousTaskType = computed(() => taskStore.previousTaskType)
const getTaskCurrentTaskType = computed(() => taskStore.currentTaskType)
const getTaskCode = computed(() => taskStore.taskCode)
const TaskInfo = computed(() => {
  const taskInfo = taskStore.taskInfo
  return taskInfo ? JSON.parse(taskInfo) : null
})

// Methods
const toggle = (val) => {
  isAutoAccident.value = val
}

const previous = async () => {
  await router.push({ path: '/' })
}

const savePatientInfo = async () => {
  const givenDate = form.value.dob
  const todaysDate = new Date()

  if (givenDate > todaysDate) {
    alert('Date of birth cannot be in the future')
    return
  }

  isSaving.value = true
  try {
    await taskStore.savePatientInfo({
      ...form.value,
      isAutoAccident: isAutoAccident.value,
      isWorkInjury: isWorkInjury.value
    })
    router.push('/task/insurance')
  } catch (error) {
    console.error('Error saving patient info:', error)
  } finally {
    isSaving.value = false
  }
}

onMounted(async () => {
  isLoading.value = true
  try {
    const response = await taskStore.getPatientInfo()
    form.value = response.data
    isAutoAccident.value = response.data.aa
    isWorkInjury.value = response.data.wc
  } catch (error) {
    console.error('Error loading patient info:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.h5 {
  font-size: 1.1em !important;
  font-weight: 600;
  letter-spacing: normal;
  line-height: 18px;
  color: black;
}

.fw-500 {
  font-weight: 550;
}
</style>
