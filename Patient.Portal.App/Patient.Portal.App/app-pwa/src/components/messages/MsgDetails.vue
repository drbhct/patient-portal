<template>
  <div>
    <a href="javascript:void(0)" @click="setMsgCurrentPage('List')">
      <i class="fas fa-angle-left"></i>
      Back to Messages
    </a>
    <div class="content-with-menu-container" data-mailbox data-mailbox-view="email">
      <div class="inner-body mailbox-email">
        <div class="mailbox-email-header mb-2">
          <h3 class="mailbox-email-subject m-0 font-weight-semibold">
            {{ getMsgInfo.subject }}
          </h3>
        </div>
        <div class="mailbox-email-container">
          <div class="mailbox-email-screen pt-2">
            <div v-for="(msg, index) in msgThread" :key="msg.id" class="card mb-2">
              <div class="card-header" :class="{ collapsed:  index !== msgThread.length - 1 }" data-toggle="collapse" :data-target="'#collapse-'+ index">
                <div class="card-actions">
                  <a href="#" class="card-action card-action-toggle" :class="{ collapsed:  index !== msgThread.length - 1 }" data-toggle="collapse" :data-target="'#collapse-'+ index"></a>
                  <a v-if="!msg.fromPatient" href="javascript:void(0)" @click="reply" class="fas fa-reply modal-basic"></a>
                </div>
                <p class="card-title"> {{ getFromName(msg) }} <i class="fas fa-angle-right fa-fw"></i> {{ getToName(msg) }} </p>
                <span class="m-0"><small>{{ date(msg.entryDate) }}</small></span>
              </div>
              <div :id="'collapse-'+ index" class="card-body collapse" :class="{ show:  index == msgThread.length - 1 }">
                <p>{{msg.messageText}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="modalReply" class="modal fade" tabindex="-1" role="dialog">
      <form @submit.prevent="send">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="card-title">Re: {{ getMsgInfo.subject }}</h2>
            </div>
            <div class="modal-body">
              <div class="form-group row pt-2">
                <label class="col-lg-12 control-label" for="textareaDefault">Message</label>
                <div class="col-lg-12">
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
import api from '../../api/http-common.js'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
export default {
  data () {
    return {
      msgThread: [],
      form: {
        message: ''
      }
    }
  },
  methods: {
    ...mapActions(['setMsgCurrentPage']),
    async loadMessages () {
      const response = await api.msg.request.getMessageThread({
        facilityId: this.currentPatientAssociated.facilityID,
        patientId: this.currentPatientAssociated.patientID,
        parentId: this.getMsgInfo.id
      })
      this.msgThread = response.data
      this.msgThread.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
    },
    getFromName (msgInfo) {
      if (msgInfo.fromPatient) {
        return msgInfo.fromName
      } else {
        return this.currentPatientAssociated.officeName
      }
    },
    getToName (msgInfo) {
      if (msgInfo.fromPatient) {
        return this.currentPatientAssociated.officeName
      } else {
        return msgInfo.fromName
      }
    },
    date: function (date) {
      return moment(date).format('MMMM DD, YYYY @ h:mm a')
    },
    reply () {
      // eslint-disable-next-line no-undef
      $('#modalReply').modal({
        show: true,
        backdrop: 'static'
      })
    },
    cancel () {
      // eslint-disable-next-line no-undef
      $('#modalReply').modal('hide')
    },
    async send () {
      const params = {
        facilityId: this.currentPatientAssociated.facilityID,
        patientId: this.currentPatientAssociated.patientID,
        parentId: this.getMsgInfo.id,
        message: this.form.message
      }
      await api.msg.request.insertMessageReply(params)
      this.loadMessages()
      this.cancel()
    }
  },
  computed: {
    ...mapGetters(['getMsgInfo', 'getProfilePatientAssociated', 'currentPatientAssociated'])
  },
  async mounted () {
    this.loadMessages()
  }
}
</script>

<style scoped>
  .btn-w-120 {
    width: 120px !important;
    margin-right:5px;
    margin-left: 5px;
  }
  .card-action-toggle:before {
    content: "\f0d7";
  }

  .collapsed .card-action-toggle:before {
    content: "\f0d8";
  }

</style>
