<template>
  <div class="row mx-1 justify-content-md-center">
    <div v-if="isLoading">
      <h3>Fetching messages ...</h3>
    </div>
    <div v-if="!isLoading" class="col-12 text-right pt-2 pb-4">
      <div v-if="msgCount > 0" class="checkbox-custom checkbox-default float-left">
        <input type="checkbox" @change="showArchive">
        <label>Show Archived Messages</label>
      </div>
      <button :title="btnTooltip" class="btn btn-primary btn-w-160" @click="createMsg">Create Message</button>
    </div>
    <div v-if="!isLoading" class="col-md-12">
      <table class="table mb-5" v-if="messages.length > 0">
        <thead>
          <tr>
            <th>Subject</th>
            <th>From</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="msg in filteredList" :key="'msg' + msg.id">
            <td :class="!msg.read ? 'font-weight-bold' : 'font-weight-normal'">
              <a href="javascript:void(0)" @click="viewMsg(msg)">
                {{ msg.subject }}
              </a>
            </td>
            <td :class="!msg.read ? 'font-weight-bold' : 'font-weight-normal'">{{ getFromName(msg) }}</td>
            <td>{{ formatData(msg.date) }}</td>
            <td>
              <a href="javascript:void(0)" @click="archive(msg.id)" title="Archive">
                <i class="fas fa-archive"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <h3 v-else>Message list empty..</h3>
    </div>
    <div id="modalCreateMsg" class="modal fade" tabindex="-1" role="dialog">
      <form @submit.prevent="send">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="card-title">New Message</h2>
            </div>
            <div class="modal-body">
              <div class="form-group row pt-2">
                <label class="col-lg-2 control-label text-lg-right pt-2" for="textareaDefault">Subject</label>
                <div class="col-lg-10">
                  <input type="text" maxlength="100" class="form-control" id="subject" v-model="form.subject" required>
                </div>
              </div>
              <div class="form-group row pt-2">
                <label class="col-lg-2 control-label text-lg-right pt-2" for="textareaDefault">Message</label>
                <div class="col-lg-10">
                  <textarea required maxlength="8000" class="form-control" rows="10" id="textareaAutosize" v-model="form.message" data-plugin-textarea-autosize="" style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 150px;"></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="col-md-12 text-right">
                <button class="btn btn-primary modal-confirm mr-2" type="submit">Send</button>
                <button class="btn btn-default" type="reset" @click="cancel">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import api from '../../api/http-common.js'
export default {
  data () {
    return {
      messages: [],
      isLoading: false,
      IsshowArchive: false,
      msgCount: 0,
      form: {
        subject: '',
        message: ''
      }
    }
  },
  components: {},
  methods: {
    ...mapActions(['setMsgCurrentPage', 'setCurrentMsgInfo']),
    async loadMessages () {
      this.isLoading = true
      const response = await api.msg.request.getMessageList({
        facilityId: this.currentPatientAssociated.facilityID,
        patientId: this.currentPatientAssociated.patientID,
        includeArchived: true
      })
      this.isLoading = false
      this.messages = response.data
    },
    async getMessagesCount () {
      const response = await api.msg.request.getArchivedMessageCount({
        facilityId: this.currentPatientAssociated.facilityID,
        patientId: this.currentPatientAssociated.patientID
      })
      this.msgCount = response.data
    },
    async archive (id) {
      const params = {
        facilityId: this.currentPatientAssociated.facilityID,
        id: id
      }
      await api.msg.request.archiveMessage(params)
      this.getMessagesCount()
      this.loadMessages()
    },
    async send () {
      const params = {
        facilityId: this.currentPatientAssociated.facilityID,
        patientId: this.currentPatientAssociated.patientID,
        subject: this.form.subject,
        message: this.form.message
      }
      await api.msg.request.insertMessage(params)
      this.loadMessages()
      this.cancel()
    },
    formatData (dayVal) {
      return moment(dayVal).format('MM/DD/YYYY')
    },
    viewMsg (msgInfo) {
      this.setCurrentMsgInfo(msgInfo)
      this.setMsgCurrentPage('Detail')
    },
    createMsg () {
      // this.setMsgCurrentPage('Create')
      // eslint-disable-next-line no-undef
      $('#modalCreateMsg').modal({
        show: true,
        backdrop: 'static'
      })
    },
    getFromName (msgInfo) {
      if (msgInfo.fromPatient) {
        return msgInfo.fromName
      } else {
        return this.currentPatientAssociated.officeName
      }
    },
    showArchive (e) {
      if (e.target.checked) {
        this.IsshowArchive = true
      } else {
        this.IsshowArchive = false
      }
      this.getMessagesCount()
    },
    cancel () {
      // eslint-disable-next-line no-undef
      $('#modalCreateMsg').modal('hide')
    }
  },
  computed: {
    ...mapGetters(['getProfilePatientAssociated', 'currentPatientAssociated']),
    filteredList: function () {
      const me = this
      return this.messages.filter(function (x) {
        if (me.IsshowArchive) {
          return x.parentID === 0
        } else {
          return x.parentID === 0 && x.archived === false
        }
      })
    },
    btnTooltip: function () {
      return 'Send message to ' + this.currentPatientAssociated.officeName
    }
  },
  async mounted () {
    this.getMessagesCount()
    this.loadMessages()
  }
}
</script>

<style scoped>
</style>
