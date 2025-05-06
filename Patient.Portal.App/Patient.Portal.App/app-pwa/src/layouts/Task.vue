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
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '../api/http-common.js'
import { useTaskStore } from '@/stores/task'
import { useConfigStore } from '@/stores/config'
import { useAuthStore } from '@/stores/auth'
import '../assets/FormLayout.css'

export default {
  name: 'TaskLayout',
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
    NphInsurance: () => import('../components/task/NphInsurance.vue'),
    ResetPassword: () => import('../components/task/ResetPassword.vue'),
    Statement: () => import('../components/billing/TaskStatement.vue')
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const taskStore = useTaskStore()
    const configStore = useConfigStore()
    const authStore = useAuthStore()

    const initialize = ref(false)
    const linkInfo = ref(null)
    const task = ref(null)
    const module = ref(null)
    const hasAccount = ref(false)
    const keyExpired = ref(false)

    const key = computed(() => route.query.key)
    const message = computed(() => {
      if (keyExpired.value && initialize.value) {
        return 'Link key expired. Redirecting to login page...'
      }
      if (initialize.value && hasAccount.value) {
        return 'Patient Link Account found. Redirecting to login page ...'
      }
      return ''
    })

    const getTaskCurrentTaskType = computed(() => taskStore.currentTaskType)

    async function initializeTask() {
      console.log('task.vue mounted')
      const apiRes = await api.auth.request.apiLogin()
      sessionStorage.setItem('config', apiRes.data.token)

      if (!key.value) {
        if (authStore.isAuthenticated()) {
          taskStore.setCurrentTaskType('PatientInfo')
          initialize.value = true
          return
        } else {
          router.push({ path: '/account/login' })
        }
      }

      const resp = await api.auth.request.getLink(key.value)
      linkInfo.value = resp.data
      if (!linkInfo.value) {
        initialize.value = true
        keyExpired.value = true

        setTimeout(() => {
          router.push({ path: '/account/login' })
        }, 5000)
      } else {
        taskStore.setUrlLinkInfo(resp.data)
      }

      let taskRes
      if (linkInfo.value.patientID > 0) {
        taskRes = await api.task.request.gettask({
          facilityId: linkInfo.value.facilityID,
          patientId: linkInfo.value.patientID
        })
        task.value = taskRes.data.find(
          (el) => el.taskID === linkInfo.value.taskID
        )
        if (task.value && task.value.taskType === 'INS') {
          if (task.value.info !== '') {
            const taskinfo = JSON.parse(task.value.info)
            taskinfo.TaskType = task.value.taskType
            taskinfo.TaskID = task.value.taskID
            taskStore.setTaskInfo(JSON.stringify(taskinfo))
          } else {
            taskStore.setTaskInfo('')
          }
          await taskStore.setCurrentTaskType(task.value.taskType)
        }
      } else {
        taskRes = await api.task.request.getSpecificTask(linkInfo.value.taskID)
        task.value = taskRes.data
      }

      const pLookup = await api.task.request.patientLookup({
        facilityId: linkInfo.value.facilityID,
        patientId: linkInfo.value.patientID
      })
      if (pLookup.data) {
        initialize.value = true
        hasAccount.value = true
        setTimeout(() => {
          router.push({ path: '/account/login' })
        }, 5000)
      } else {
        initialize.value = true

        const facilityInfo = await api.auth.request.getFacilityInfo(
          linkInfo.value.facilityID
        )
        taskStore.setFacilityInfo(facilityInfo)
        await taskStore.setOfficeName(facilityInfo.officeName)

        if (!task.value || taskRes.data.taskID === 0) {
          hasAccount.value = false
          taskStore.setIsAccessOnly(true)
          taskStore.setCurrentTaskType('CreateAccount')
          return
        }
        console.log('this.task.taskType>', task.value.taskType)
        console.log('task>', task.value.taskType === 'NPH')
        taskStore.setTaskCode(task.value.taskType)
        switch (task.value.taskType) {
          case 'NPH':
          case 'AANPH':
          case 'CH':
          case 'AACH':
            console.log('it is nph')
            taskStore.setCurrentTaskType('CreateAccount')
            break
          case 'STMT':
            hasAccount.value = false
            taskStore.setIsAccessOnly(true)
            taskStore.setIsAccessOnly('/menu/statement')
            taskStore.setBillingStatementTask(taskRes.data)
            taskStore.setCurrentTaskType('CreateAccount')
            break
          case 'RESETPWD':
            taskStore.setCurrentTaskType('ResetPassword')
            break
          case 'INS':
            router.push({ path: '/account/login' })
            break
          default:
            console.warn('Unable to recognise task type ' + task.value.taskType)
            break
        }
      }
    }

    return {
      initialize,
      linkInfo,
      task,
      module,
      hasAccount,
      keyExpired,
      key,
      message,
      getTaskCurrentTaskType,
      initializeTask
    }
  }
}
</script>
