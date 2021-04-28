<template>
  <form class="form-horizontal m-lg-4" @submit.prevent="updatePatientCommOption">
    <h3>Communication Preferences</h3>
    <div class="form-group row pt-lg-4 pt-md-4 pt-2">
      <div class="col-12 col-lg-6 col-xl-6">
        <h4>Appointment Reminders</h4>
      </div>
    </div>
    <div class="form-group row" v-if="commOptions">
      <div class="col-12 col-lg-6 col-xl-6">
        <div class="checkbox-custom checkbox-default">
          <input type="checkbox" v-model="commOptions.sendEmail">
          <label>Send via Email</label>
        </div>
      </div>
    </div>
    <div class="form-group row" v-if="commOptions">
      <div class="col-12 col-lg-6 col-xl-6">
        <div class="checkbox-custom checkbox-default">
          <input type="checkbox" v-model="commOptions.sendSms" :disabled="commOptions.callMobilePhone || commOptions.callHomePhone">
          <label>Send via Text Message</label>
        </div>
      </div>
    </div>
    <div class="form-group row" v-if="commOptions">
      <div class="col-12 col-lg-6 col-xl-6">
        <div class="checkbox-custom checkbox-default">
          <input type="checkbox" v-model="commOptions.callHomePhone" :disabled="commOptions.sendSms || commOptions.callMobilePhone">
          <label>Call Home</label>
        </div>
      </div>
    </div>
    <div class="form-group row" v-if="commOptions">
      <div class="col-12 col-lg-6 col-xl-6">
        <div class="checkbox-custom checkbox-default">
          <input type="checkbox" v-model="commOptions.callMobilePhone" :disabled="commOptions.sendSms || commOptions.callHomePhone">
          <label>Call Mobile</label>
        </div>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-xl-2 col-lg-3 control-label text-lg-right pt-2" for="emailadd">Confirm Email Address:</label>
      <div class="col-lg-6 col-xl-4">
        <input type="text" class="form-control" id="inputDefault" v-model="emailadd" required>
      </div>
      <div class="col-lg-1 col-xl-1">
        <i v-if="emailadd === commOptions.email" class="fas fa-check bg-check-green"></i>
        <i v-if="emailadd !== commOptions.email && emailadd !== ''" class="fas fa-times bg-check-red"></i>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-xl-2 col-lg-3 control-label text-lg-right pt-2" for="mobilenum">Confirm Mobile Phone:</label>
      <div class="col-lg-6 col-xl-4">
        <input type="text" class="form-control" id="inputDefault" v-model="mobilenum" required>
      </div>
      <div class="col-lg-1 col-xl-1">
        <i v-if="mobilenum === commOptions.mobilePhone" class="fas fa-check bg-check-green"></i>
        <i v-if="mobilenum !== commOptions.mobilePhone && mobilenum !== ''" class="fas fa-times bg-check-red"></i>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-12 col-lg-6 col-xl-6">
        <button class="btn btn-primary btn-w-160" type="submit">UPDATE</button>
      </div>
    </div>
  </form>
</template>
<script>
import api from '../../api/http-common.js'
import { mapGetters } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      commOptions: null,
      emailadd: '',
      mobilenum: ''
    }
  },
  computed: {
    ...mapGetters(['getProfilePatientAssociated', 'currentPatientAssociated'])
  },
  methods: {
    async updatePatientCommOption () {
      // TODO: Add validation
      // Reminder of the only acceptable combinations:
      // SendSMS
      // SendSMS + SendEmail
      // SendEmail
      // CallMobilePhone
      // CallMobilePhone + SendEmail
      // CallHomePhone
      // CallHomePhone + SendEmail
      if (this.commOptions.email === this.emailadd) {
        if (this.commOptions.mobilePhone === this.mobilenum) {
          this.commOptions.facilityId = this.currentPatientAssociated.facilityID
          const result = await api.auth.request.updatePatientCommOptions(this.commOptions)
          if (result.data) {
            this.$swal({
              position: 'top',
              title: 'Comm Info update successful',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1000,
              icon: 'success'
            })
          } else {
            this.$swal({
              position: 'top',
              title: 'Comm Info update error',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1000,
              icon: 'error'
            })
          }
        } else {
          this.$swal({
            position: 'top',
            title: 'Invalid Mobile Phone',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1000,
            icon: 'error'
          })
        }
      } else {
        this.$swal({
          position: 'top',
          title: 'Invalid Email Address',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1000,
          icon: 'error'
        })
      }
    }
  },
  async mounted () {
    const res = await api.auth.request.getPatientCommOptions({
      facilityId: this.currentPatientAssociated.facilityID,
      patientId: this.currentPatientAssociated.patientID
    })

    this.commOptions = res.data
  }
}
</script>
<style scoped>
  h4 {
    font-weight: 600 !important;
  }
  .btn-w-160 {
    width: 160px !important;
  }
  .bg-check-green {
    color: #00e600 !important;
    line-height:2.5;
  }
  .bg-check-red {
    color: #ff3300 !important;
    line-height: 2.5;
  }
</style>
