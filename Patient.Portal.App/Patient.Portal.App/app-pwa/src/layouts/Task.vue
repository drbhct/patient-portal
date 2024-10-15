<template>
  <div>
    <div class="content-body">
      <div class="row mt-5 mr-2 ml-2 justify-content-md-center">
        <h2 v-if="!initialize">Initializing App ...</h2>
        <h2 v-if="initialize && (hasAccount || keyExpired)">{{ message }}</h2>
      </div>
      <keep-alive>
        <component v-bind:is="getTaskCurrentTaskType" v-if="initialize" :link-info="linkInfo"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import api from '../api/http-common.js'
import { mapGetters, mapActions } from 'vuex'
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
    NphInsurance: () => import('../components/task/NphInsurance.vue'),
    ResetPassword: () => import('../components/task/ResetPassword.vue'),
    Statement: () => import('../components/billing/TaskStatement.vue')
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
    ...mapGetters(['getTaskCurrentTaskType']),
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
  methods: {
    ...mapActions([
      'setTaskCurrentTaskType',
      'setTaskOfficeName',
      'setTaskCode',
      'setTaskIsAccessOnly',
      'setBillingStatementTask',
      'setFacilityInfo',
      'setTaskInfo',
      'setUrlLinkInfo'
    ])
  },
  async mounted() {
    console.log('task.vue mounted')
    const apiRes = await api.auth.request.apiLogin()
    // NOTE: Temporary will be move to cookies soon!
    // localStorage.setItem('config', apiRes.data.token)
    sessionStorage.setItem('config', apiRes.data.token)
    if (!this.key) {
      if (this.$auth.isAuthenticated()) {
        this.setTaskCurrentTaskType('PatientInfo')
        this.initialize = true
        return
      } else {
        this.$router.push({ path: '/account/login' })
      }
    }

    // NOTE: This is via task key>account>task type
    const resp = await api.auth.request.getLink(this.key)
    this.linkInfo = resp.data
    if (!this.linkInfo) {
      this.initialize = true
      this.keyExpired = true

      setTimeout(() => {
        this.$router.push({ path: '/account/login' })
      }, 5000)
    } else {
      this.setUrlLinkInfo(resp.data)
    }
    // Get Task
    let taskRes
    if (this.linkInfo.patientID > 0) {
      taskRes = await api.task.request.gettask({
        facilityId: this.linkInfo.facilityID,
        patientId: this.linkInfo.patientID
      })
      this.task = taskRes.data.find((el) => el.taskID === this.linkInfo.taskID)
      // added by Rizza Herrero 10/10/2024
      if (this.task.taskType === 'INS') {
        if (this.task.info !== '') {
          var taskinfo = JSON.parse(this.task.info)
          taskinfo.TaskType = this.task.taskType
          taskinfo.TaskID = this.task.taskID
          this.setTaskInfo(JSON.stringify(taskinfo))
        } else {
          this.setTaskInfo('')
        }
        await this.setTaskCurrentTaskType(this.task.taskType)
      }
      // added by Rizza Herrero 10/10/2024 end
    } else {
      taskRes = await api.task.request.getSpecificTask(this.linkInfo.taskID)
      this.task = taskRes.data
    }

    const pLookup = await api.task.request.patientLookup({
      facilityId: this.linkInfo.facilityID,
      patientId: this.linkInfo.patientID
    })
    if (pLookup.data) {
      this.initialize = true
      this.hasAccount = true
      setTimeout(() => {
        this.$router.push({ path: '/account/login' })
      }, 5000)
    } else {
      this.initialize = true

      const facilityInfo = await api.auth.request.getFacilityInfo(
        this.linkInfo.facilityID
      )
      this.setFacilityInfo(facilityInfo)
      await this.setTaskOfficeName(facilityInfo.officeName)

      if (!this.task) {
        this.hasAccount = false
        this.setTaskIsAccessOnly(true)
        this.setTaskCurrentTaskType('CreateAccount')
        return
      }
      console.log('this.task.taskType>', this.task.taskType)
      console.log('task>', this.task.taskType === 'NPH')
      this.setTaskCode(this.task.taskType)
      switch (this.task.taskType) {
        case 'NPH':
        case 'AANPH':
        case 'CH':
        case 'AACH':
          console.log('it is nph')
          this.setTaskCurrentTaskType('CreateAccount')
          break
        case 'STMT':
          this.hasAccount = false
          this.setTaskIsAccessOnly(true)
          this.setTaskIsAccessOnly('/menu/statement')
          this.setBillingStatementTask(taskRes.data)
          this.setTaskCurrentTaskType('CreateAccount')
          // taskRes = await api.task.request.getSpecificTask(this.task.taskID)
          // this.setBillingStatementTask(taskRes.data)
          // this.setTaskCurrentTaskType('Statement')
          // this.$router.push({ path: '/menu/statement' })
          break
        case 'RESETPWD':
          this.setTaskCurrentTaskType('ResetPassword')
          break
        case 'INS':
          
          this.$router.push({ path: '/account/login' })
          break
        default:
          console.warn('Unable to recognise task type ' + this.task.taskType)
          break
      }
    }
  }
}
</script>
