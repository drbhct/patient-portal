<template>
  <div>
    <form class="form-horizontal m-lg-4" @submit.prevent="updatePatientInfo">
      <h3>Patient Information</h3>
      <div class="form-group row">
        <label class="col-lg-2 control-label text-lg-right text-xl-right pt-2" for="firstname">First Name:</label>
        <div class="col-lg-4 col-xl-4">
          <input type="text" class="form-control" id="inputDefault" v-model="form.firstName" required>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-lg-2 control-label text-lg-right text-xl-right pt-2" for="inputDefault">Last Name:</label>
        <div class="col-lg-4 col-xl-4">
          <input type="text" class="form-control" id="lastname" v-model="form.lastName" required>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-lg-2 control-label text-lg-right text-xl-right pt-2" for="inputDefault">Nickname :</label>
        <div class="col-lg-4 col-xl-4">
          <input type="text" class="form-control" id="nickname" v-model="form.nickName">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-lg-2 control-label text-lg-right text-xl-right pt-2" for="inputDefault">Email:</label>
        <div class="col-lg-4 col-xl-4">
          <input type="email" disabled pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" class="form-control" id="email" v-model="form.email" required>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-12 col-lg-6 col-xl-6">
          <div class="checkbox-custom checkbox-default">
            <input type="checkbox" v-model="form.paperStmt">
            <label>Opt out of paper statements</label>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-lg-2">
        </div>
        <div class="col-lg-4 col-xl-4">
          <button class="btn btn-primary btn-w-160" type="submit">UPDATE</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import api from '../../api/http-common.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        patientId: '',
        facilityId: '',
        firstName: '',
        lastName: '',
        nickName: '',
        email: '',
        paperStmt: false
      }
    }
  },
  computed: {
    ...mapGetters(['getProfileAuthInfo', 'currentPatientAssociated'])
  },
  methods: {
    ...mapActions(['setProfileCurrentPatient']),
    async getPatientInfo () {
      this.isLoading = true
      const patientInfo = await api.task.request.getPatient({
        facilityId: this.currentPatientAssociated.facilityID,
        patientId: this.currentPatientAssociated.patientID
      })

      this.form = patientInfo.data
      this.form.facilityId = this.currentPatientAssociated.facilityID
      this.form.patientId = this.form.id
      this.paperStmt = this.form.paperStmt
      this.isLoading = false
    },
    async updatePatientInfo () {
      await api.task.request.updatePatient(this.form)

      const patientAssosicated = await api.auth.request.getUserPatient(
        this.getProfileAuthInfo.id
      )
      const patientList = patientAssosicated.data
      const patientSelected = patientList.find(x => x.patientID === this.form.patientId)

      await this.setProfileCurrentPatient(patientSelected)
      await this.updatePatientField()

      this.$swal({
        position: 'top-center',
        title: 'Patient Info updated',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
        icon: 'success'
      })
    },
    async updatePatientField () {
      const param = {
        facilityId: this.form.facilityId,
        patientId: this.form.patientId,
        field: 'PaperStmt',
        value: this.form.paperStmt
      }
      await api.task.request.updatePatientField(param)
    }
  },
  mounted () {
    if (this.getProfileAuthInfo.id) {
      this.getPatientInfo()
    }
  }
}
</script>
<style scoped>
  .btn-w-160 {
    width: 160px !important;
  }
</style>
