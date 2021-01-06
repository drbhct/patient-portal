<template>
  <div>
    <div class="content-body">
        <div class="row mt-5 mr-2 ml-2 justify-content-md-center">
            <h2 v-if="!initialize">Initializing App ...</h2>
            <h2 v-if="initialize && (hasAccount || keyExpired)">{{ message }}</h2>
        </div>
        <component v-bind:is="module" v-if="initialize" :link-info="linkInfo"></component>
    </div>
  </div>
</template>
<script>
import api from '../api/http-common.js'
export default {
  components: {
    // Lazy Loading components
    CreateAccount: () => import('../views/account/Create.vue'),
    PatientInfo: () => import('../components/task/PatientInfo.vue')
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
  async mounted () {
    const apiRes = await api.auth.request.apiLogin()
    // NOTE: Temporary will be move to cookies soon!
    localStorage.setItem('config', apiRes.data.token)

    if (!this.key) {
      this.module = 'PatientInfo'
      this.initialize = true
      return
    }
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
      switch (this.task.taskType) {
        case 'NPH':
          this.module = 'CreateAccount'
          break
      }
    }
  }
}
</script>
