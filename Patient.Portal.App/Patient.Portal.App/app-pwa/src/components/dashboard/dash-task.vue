<template>
  <div class="form-horizontal">
    <div class="header-t-text d-block">
      My Task List
    </div>
    <div class="d-block">
      <img class="dash-divider" src="img/line-divider-transparent-1_edited.png" />
    </div>
    <div class="form-group row mb-3">
      <div class="col-12 col-lg-8 col-xl-8">
        <table class="w-100">
          <tbody>
            <tr v-for="(item, index) in taskslist" :key="item.taskID">
              <td class="dash-task-col-title">{{(index + 1)}}) {{ setTitle(item.taskType )}}</td>
              <td class="dash-task-col-action">
                <button class="mb-1 mt-1 mr-1 btn btn-sm btn-primary dash-task-btn" @click="gotoTask(item)">
                  {{ setButton(item.taskType )}}
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr v-if="taskslist.length === 0">
              <td colspan="2">
                <span>No tasks found.</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../api/http-common.js'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  data () {
    return {
      taskslist: null,
      dt: null
    }
  },
  computed: {
    ...mapGetters(['getProfilePatientAssociated', 'currentPatientAssociated'])
  },
  methods: {
    ...mapActions(['setTaskCurrentTaskType', 'setCurrentMsgInfo', 'setMsgCurrentPage', 'setTaskCode']),
    setTitle (val) {
      switch (val) {
        case 'NPH':
          return 'Health History'
        case 'MSG':
          return 'Message'
        default:
          return ''
      }
    },
    setButton (val) {
      switch (val) {
        case 'NPH':
          return 'GO TO HEALTH HISTORY'
        case 'MSG':
          return 'GO TO MESSAGE'
        default:
          return ''
      }
    },
    async gotoTask (task) {
      let taskRes
      this.setTaskCode(task.taskType)
      switch (task.taskType) {
        case 'NPH':
          await this.setTaskCurrentTaskType(task.taskType)
          await this.$router.push({ path: '/task' })
          break
        case 'MSG':
          taskRes = await api.task.request.getSpecificTask(task.taskID)
          this.setCurrentMsgInfo({ id: parseInt(taskRes.data.info), subject: '' })
          this.setMsgCurrentPage('Detail')
          this.$router.push({ path: '/menu/messages' })
          break
        default:
          break
      }
    },
    date: function (date) {
      return moment(date).format('dddd  MM/DD/YYYY @ h:mm:ss a')
    }
  },
  async mounted () {
    const res = await api.patient.request.gettasks({
      facilityId: this.currentPatientAssociated.facilityID,
      patientId: this.currentPatientAssociated.patientID
    })
    this.taskslist = res.data
  }
}
</script>
<style scoped>
  .dash-divider {
    height: 4px;
    margin-bottom: 10px;
    width: 70%;
  }
  /* IPAD */
@media only screen and (max-width: 768px) {
  .dash-divider {
    width: 100%;
  }
}
  /* ----------- iPhone 6, 7, 8 ----------- */
  @media only screen and (max-device-width: 375px) and (orientation: portrait) {
    .dash-divider {
      width: 100%;
    }
  }
  @media only screen and (max-device-width: 667px) and (orientation: landscape) {
    .dash-divider {
      width: 100%;
    }
  }
  /* ----------- iPhone Plus ----------- */
  @media only screen and (max-device-width: 414px) and (orientation: portrait) {
    .dash-divider {
      width: 100%;
    }
  }
  @media only screen and (device-width: 736px) and (orientation: landscape) {
    .dash-divider {
      width: 100%;
    }
  }

  /*IPHONE X */
  @media only screen and (max-device-width: 375px) and (orientation: portrait) {
    .dash-divider {
      width: 100%;
    }
  }
  @media only screen and (device-width: 812px) and (orientation: landscape) {
    .dash-divider {
      width: 100%;
    }
  }
  /* ----------- iPhone 5, 5S, 5C and 5SE ----------- */
  @media only screen and (max-device-width: 320px) and (orientation: portrait) {
    .dash-divider {
      width: 100%;
    }
  }

  @media only screen and (max-device-width: 568px) and (orientation: landscape) {
    .dash-divider {
      width: 100% !important;
    }
  }
</style>
