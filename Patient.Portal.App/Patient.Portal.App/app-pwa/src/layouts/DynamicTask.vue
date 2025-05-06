<template>
  <div>
    <div class="content-body">
      <div class="row mt-5 mr-2 ml-2 justify-content-md-center">
        <h2 v-if="!initialize">Initializing App ...</h2>
        <h2 v-if="initialize && (hasAccount || keyExpired)">{{ message }}</h2>
      </div>
      <keep-alive>
        <component
          v-bind:is="getTaskCurrentTaskType"
          v-if="initialize"
          :link-info="linkInfo"
        ></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import api from '../api/http-common.js'
import { useTaskStore } from '@/stores/task'
import { useConfigStore } from '@/stores/config'
import { storeToRefs } from 'pinia'
import '../assets/FormLayout.css'

export default {
  components: {
    // Lazy Loading components
    CreateAccount: () => import('../views/account/Create.vue'),
    PatientInfo: () => import('../components/task/PatientInfo.vue'),
    NphComplaintLocation: () =>
      import('../components/task/NphComplaintLocation.vue'),
    NphComplaintQuestions: () =>
      import('../components/task/NphComplaintQuestions.vue'),
    NphAutoAccident: () => import('../components/task/NphAutoAccident.vue'),
    NphQuestion: () => import('../components/task/NphQuestion.vue'),
    NphPersonalHistory: () =>
      import('../components/task/NphPersonalHistory.vue'),
    NphFamilyHistory: () => import('../components/task/NphFamilyHistory.vue'),
    NphThankyou: () => import('../components/task/NphThankyou.vue'),
    NphInsurance: () => import('../components/task/NphInsurance.vue')
  },
  setup() {
    const taskStore = useTaskStore()
    const configStore = useConfigStore()
    const { getTaskCurrentTaskType } = storeToRefs(taskStore)

    return {
      taskStore,
      configStore,
      getTaskCurrentTaskType
    }
  },
  data() {
    return {
      initialize: false,
      linkInfo: null,
      task: null,
      module: null,
      hasAccount: false,
      keyExpired: false
    }
  },
  computed: {
    key() {
      return this.$route.query.key
    },
    message() {
      if (this.keyExpired && this.initialize) {
        return 'Link key expired. Redirecting to login page...'
      }
      if (this.initialize && this.hasAccount) {
        return 'Patient Link Account found. Redirecting to login page ...'
      }
      return ''
    }
  },
  async mounted() {
    try {
      await this.taskStore.initializeTask()
      this.initialize = true
    } catch (error) {
      console.error('Error initializing task:', error)
      this.$toast.error('Failed to initialize task')
    }
  }
}
</script>
