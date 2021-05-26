<template>
  <div class="col-10">
    <!--<a href="javascript:void(0)" @click="setMsgCurrentPage('List')">
      <i class="fas fa-angle-left"></i>
      Back to Messages
    </a>-->
    <section class="card">
      <header class="card-header">
        <div class="card-actions">
          <a href="#" class="card-action card-action-toggle" data-card-toggle=""></a>
          <a href="#" class="card-action card-action-dismiss" data-card-dismiss=""></a>
        </div>
      </header>
      <div class="card-body">
        <form class="form-horizontal form-bordered" method="get">
          <div class="form-group row">
            <label class="col-lg-2 control-label text-lg-right pt-2" for="textareaDefault">Subject</label>
            <div class="col-lg-6">
              <input type="text" class="form-control" id="subject" v-model="form.subject" required>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 control-label text-lg-right pt-2" for="textareaAutosize">Message</label>
            <div class="col-lg-6">
              <textarea class="form-control" rows="8" id="textareaAutosize" v-model="form.message" data-plugin-textarea-autosize="" style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 89px;"></textarea>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
// import api from '../../api/http-common.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      form: {
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    ...mapActions(['setMsgCurrentPage'])
  },
  computed: {
    ...mapGetters(['getMsgInfo', 'getProfilePatientAssociated', 'currentPatientAssociated'])
  },
  mounted () {
  }
}
</script>

<style scoped>
  .btn-w-120 {
    width: 120px !important;
    margin-right: 5px;
    margin-left: 5px;
  }
</style>
