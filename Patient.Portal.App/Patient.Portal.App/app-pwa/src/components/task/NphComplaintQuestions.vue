<template>
  <section class="panel">
    <div class="panel-body">
      <form @submit.prevent="saveInfo">
        <section class="panel">
          <div class="panel-body">
            <div v-if="!isLoading">
              <div v-for="oatQ in form.oatQandA" :key="oatQ.description">
                <div class="row">
                  <div class="col-lg-5 mx-auto">
                    <label class="label f-weight-550">
                      <strong
                        style="color: red; margin-right: 5px"
                        :id="oatQ.description"
                        >*</strong
                      >
                      {{ oatQ.description }}
                    </label>
                    <multiselect
                      :searchable="false"
                      v-model="oatQ.selectedAnswer"
                      :options="oatQ.answerList"
                      :label="'description'"
                      :multiple="false"
                    ></multiselect>
                  </div>
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
          <footer class="card-footer">
            <div class="row justify-content-end">
              <div class="col-sm-9">
                <button
                  class="btn btn-default mr-2"
                  @click="previous"
                  v-if="getTaskPreviousTaskType"
                  type="reset"
                >
                  Back
                </button>
                <btn-saving :is-saving="isSaving" />
              </div>
            </div>
          </footer>
        </section>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Multiselect from 'vue-multiselect'
import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import BtnSaving from '../button-saving.vue'
import { useTaskStore } from '@/stores/task'

const router = useRouter()
const taskStore = useTaskStore()

const isLoading = ref(false)
const isSaving = ref(false)
const form = ref({
  oatQandA: []
})

// Computed properties
const getTaskPreviousTaskType = computed(() => taskStore.previousTaskType)

// Methods
const loadQuestions = async () => {
  isLoading.value = true
  try {
    const response = await taskStore.getOatQuestions()
    form.value.oatQandA = response
  } catch (error) {
    console.error('Error loading questions:', error)
  } finally {
    isLoading.value = false
  }
}

const saveInfo = async () => {
  isSaving.value = true
  try {
    await taskStore.saveOatAnswers(form.value.oatQandA)
    router.push('/task/thankyou')
  } catch (error) {
    console.error('Error saving answers:', error)
  } finally {
    isSaving.value = false
  }
}

const previous = () => {
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
</style>
