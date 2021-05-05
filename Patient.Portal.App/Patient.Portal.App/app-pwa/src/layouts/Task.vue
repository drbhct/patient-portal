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
    NphComplaintLocation: () => import('../components/task/NphComplaintLocation.vue'),
    NphComplaintQuestions: () => import('../components/task/NphComplaintQuestions.vue'),
    NphAutoAccident: () => import('../components/task/NphAutoAccident.vue'),
    NphQuestion: () => import('../components/task/NphQuestion.vue'),
    NphPersonalHistory: () => import('../components/task/NphPersonalHistory.vue'),
    NphFamilyHistory: () => import('../components/task/NphFamilyHistory.vue'),
    NphThankyou: () => import('../components/task/NphThankyou.vue')
  },
  data () {
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
    key () {
      return this.$route.query.key
    },
    message () {
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
    ...mapActions(['setTaskCurrentTaskType', 'setTaskOfficeName'])
  },
  async mounted () {
    const apiRes = await api.auth.request.apiLogin()
    // NOTE: Temporary will be move to cookies soon!
    localStorage.setItem('config', apiRes.data.token)

    if (!this.key) {
      // For testing at the moment
      // this.module = 'PatientInfo'
      // this.module = 'NphAutoAccident'
      this.setTaskCurrentTaskType('PatientInfo')
      this.initialize = true
      return
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
      // Get Task
      const taskRes = await api.task.request.gettask({
        facilityId: this.linkInfo.facilityID,
        patientId: this.linkInfo.patientID
      })
      this.task = taskRes.data.find(el => el.taskID === this.linkInfo.taskID)
      console.log('this.task.taskType', this.task.taskType)
      const facilityInfo = await api.auth.request.getFacilityInfo(this.linkInfo.facilityID)
      await this.setTaskOfficeName(facilityInfo.officeName)
      console.log('facilityInfo', facilityInfo)
      switch (this.task.taskType) {
        case 'NPH':

          this.setTaskCurrentTaskType('CreateAccount')
          break
      }
    }
  }
}
</script>
