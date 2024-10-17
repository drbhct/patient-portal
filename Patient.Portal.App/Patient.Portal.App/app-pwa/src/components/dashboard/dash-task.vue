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
              <td class="dash-task-col-title">{{ (index + 1) }}) {{ setTitle(item.taskType, item) }}</td>
              <td class="dash-task-col-action">
                <button class="mb-1 mt-1 mr-1 btn btn-sm btn-primary dash-task-btn" @click="gotoTask(item)">
                  {{ setButton(item.taskType, item) }}
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
  data() {
    return {
      taskslist: [],
      dt: []
    }
  },
  computed: {
    ...mapGetters(['getProfilePatientAssociated', 'currentPatientAssociated'])
  },
  methods: {
    ...mapActions(['setTaskCurrentTaskType', 'setCurrentMsgInfo', 'setMsgCurrentPage', 'setTaskCode', 'setBillingStatementTask', 'setTaskInfo', 'setTaskItem']),
    setTitle(val, item) {
      switch (val) {
        case 'NPH':
        case 'AANPH':
        case 'CH':
        case 'AACH':
          return 'Health History'
        case 'MSG':
          return 'Message'
        case 'STMT':
          return 'Statement'
        case 'FORM':
          var info = JSON.parse(item.info)
          return info.Action
        case 'INS':
          return 'Insurance Information'
        default:
          return ''
      }
    },
    setButton(val, item) {
      switch (val) {
        case 'NPH':
        case 'AANPH':
        case 'CH':
        case 'AACH':
          return 'GO TO HEALTH HISTORY'
        case 'MSG':
          return 'GO TO MESSAGE'
        case 'STMT':
          return 'PAY STATEMENT'
        case 'FORM':
          var info = JSON.parse(item.info)
          return info.FormName.toUpperCase()
        case 'INS':
          var info2 = JSON.parse(item.info)
          return info2.Description.toUpperCase()
        default:
          return ''
      }
    },
    async gotoTask(task) {
      let taskRes
      this.setTaskCode(task.taskType)
      switch (task.taskType) {
        case 'NPH':
        case 'AANPH':
        case 'INS':
        case 'AACH':
          if (task.info !== '') {
            var taskinfo = JSON.parse(task.info)
            taskinfo.TaskType = task.taskType
            taskinfo.TaskID = task.taskID
            this.setTaskInfo(JSON.stringify(taskinfo))
          } else {
            this.setTaskInfo('')
          }
          await this.setTaskCurrentTaskType(task.taskType)
          await this.$router.push({ path: '/task' })
          break
        case 'CH':
          this.setTaskInfo('')
          this.setTaskItem(task)
          await this.setTaskCurrentTaskType(task.taskType)
          await this.$router.push({ path: '/task' })
          break
        case 'MSG':
          taskRes = await api.task.request.getSpecificTask(task.taskID)
          await api.task.request.updateTaskComplete({
            facilityId: this.currentPatientAssociated.facilityID,
            id: task.taskID,
            patientId: this.currentPatientAssociated.patientID
          })
          this.setCurrentMsgInfo({ id: parseInt(taskRes.data.info), subject: '' })
          this.setMsgCurrentPage('Detail')
          this.$router.push({ path: '/menu/messages' })
          break
        case 'STMT':
          taskRes = await api.task.request.getSpecificTask(task.taskID)
          this.setBillingStatementTask(taskRes.data)
          this.$router.push({ path: '/menu/statement' })
          break
        case 'FORM':
          var info = JSON.parse(task.info)
          var routeData = this.$router.resolve({ name: 'HandlerForm', query: { i: info.FacilityFormID, t: info.FormName, p: info.Data.PatientName, pid: task.patientID, tid: task.taskID } })
          // window.open(routeData.href, '_blank')

          var newWindow = window.open(routeData.href, '_blank')
          newWindow.addEventListener('beforeunload', this.refreshParentWindow)

          setTimeout(function () {
            newWindow.document.title = info.Action + ': ' + info.FormName
          }, 100)

          break
        default:
          break
      }
    },
    date: function (date) {
      return moment(date).format('dddd  MM/DD/YYYY @ h:mm:ss a')
    },
    async loadTasks() {
      if (this.currentPatientAssociated) {
        alert('loading task list')
        const res = await api.patient.request.gettasks({
          facilityId: this.currentPatientAssociated.facilityID,
          patientId: this.currentPatientAssociated.patientID
        })
        this.taskslist = res.data
      }
    },
    async refreshParentWindow() {
      alert('refreshParentWindow')
      window.location.reload()
    }
  },
  async mounted() {
    console.log('dash-task mounted')
    this.loadTasks()
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
