<template>
  <div>
    <div class="content-body">
        <div class="row mt-5 mr-2 ml-2 justify-content-md-center" v-if="!initialize">
            <h2 v-if="!initialize && !hasAccount">Initializing App ...</h2>
            <h2 v-if="hasAccount">Patient Link Account found. Redirecting to login page ...</h2>

        </div>
        <component v-bind:is="module" v-if="initialize"></component>
    </div>
  </div>
</template>
<script>
import api from '../api/http-common.js'
import CreateAccount from '../views/account/Create.vue'
export default {
  components: {
    CreateAccount
  },
  data () {
    return {
      initialize: false,
      linkInfo: null,
      task: null,
      module: null,
      hasAccount: false
    }
  },
  computed: {
    key () {
      return this.$route.query.key
    }
  },
  async mounted () {
    const apiRes = await api.auth.request.apiLogin()
    // NOTE: Temporary will be move to cookies soon!
    localStorage.setItem('config', apiRes.data.token)

    const resp = await api.auth.request.getLink(this.key)
    this.linkInfo = resp.data

    const pLookup = await api.task.request.patientLookup({
      facilityId: this.linkInfo.facilityID,
      patientId: this.linkInfo.patientID
    })
    if (pLookup.data) {
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
