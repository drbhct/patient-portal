<template>
  <form class="form-horizontal m-lg-4" @submit.prevent="updateUser">
    <h3>My Information</h3>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="firstname">First Name:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="inputDefault" v-model="form.firstName" required>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">Last Name:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="lastname" v-model="form.lastName" required>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">Nick Name:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="nickname" v-model="form.nickName">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">Email:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="email" pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" class="form-control" id="email" v-model="form.email" required>
      </div>
    </div>
    <!--<div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">Address:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="address" v-model="form.address" required>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">City:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="city" v-model="form.city" required>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">State:</label>
      <div class="col-lg-4 col-xl-4">
        <select v-model="form.state" class="form-control">
          <option v-for="state in usStates"
                  :key="state.code"
                  :value="state.code">
            {{ state.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">Zip:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="zip" v-model="form.zip" required>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">Home Phone:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="zip" v-model="form.homePhone" :required="form.cellPhone === ''"
               v-mask="'(###) ###-####'">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">Mobile Phone:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="zip" v-model="form.cellPhone" :required="form.homePhone === ''"
               v-mask="'(###) ###-####'">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">Work Phone:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="zip" v-model="form.workPhone"
               v-mask="'(###) ###-####'">
      </div>
    </div>-->
    <div class="form-group row">
      <div class="col-lg-2">
      </div>
      <div class="col-lg-4 col-xl-4">
        <button class="btn btn-primary btn-w-160" type="submit">UPDATE</button>
      </div>
    </div>
  </form>
</template>
<script>
import api from '../../api/http-common.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        id: '',
        firstName: '',
        lastName: '',
        nickName: '',
        email: ''
        // address: '',
        // state: '',
        // city: '',
        // zip: '',
        // homePhone: '',
        // cellPhone: '',
        // workPhone: ''
      },
      usStates: []
    }
  },
  computed: {
    ...mapGetters(['getProfileAuthInfo'])
  },
  methods: {
    ...mapActions(['setProfileMyInfo']),
    async updateUser () {
      const response = await api.auth.request.updateUser(this.form)
      console.log('response>', response.data)
      this.setProfileMyInfo(this.form)
      this.$swal({
        position: 'top-center',
        title: 'Profile info updated',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
        icon: 'success'
      })
    },
    async getUsStates () {
      const result = await api.task.request.getUsStates()
      this.usStates = result.data
    }
  },
  mounted () {
    if (this.getProfileAuthInfo.id) {
      this.form = {
        id: this.getProfileAuthInfo.id,
        firstName: this.getProfileAuthInfo.firstName,
        lastName: this.getProfileAuthInfo.lastName,
        nickName: this.getProfileAuthInfo.nickName,
        email: this.getProfileAuthInfo.email
      }
    }
  }
}
</script>
<style scoped>
  .btn-w-160 {
    width: 160px !important;
  }
</style>
