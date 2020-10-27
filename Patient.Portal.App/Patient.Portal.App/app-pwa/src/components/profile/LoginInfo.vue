<template>
  <form class="form-horizontal m-lg-4">
    <h3>Login Information</h3>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-left pt-4" for="inputDefault">User Name:</label>
      <label class="col-lg-2 control-label text-lg-left pt-4" for="inputDefault">{{this.username}}</label>
    </div>
    <div class="form-group row">
      <img class="dash-divider" src="img/line-divider-transparent-1_edited.png" />
    </div>
    <div class="form-group row">
      <div class="col-12">
        <span class="header-d-text">Password</span>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-12 col-md-4 col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter New Password">
      </div>
    </div>
    <div class="form-group row">
      <div class="col-12 col-md-4 col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Confirm New Password">
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-6">
        <button class="btn btn-primary">UPDATE PASSWORD</button>
      </div>
    </div>
  </form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      username: ''
    }
  },
  computed: {
    ...mapGetters(['getProfileAuthInfo'])
  },
  methods: {
    ...mapActions(['setProfileMyInfo'])
  },
  mounted () {
    if (this.getProfileAuthInfo.id) {
      this.username = this.getProfileAuthInfo.email
    }
  }
}
</script>
<style scoped>
  .dash-divider {
    width: 100%;
    height: 4px;
    margin-bottom: 10px;
  }
  h4 {
    font-weight: 600 !important;
  }
 </style>
