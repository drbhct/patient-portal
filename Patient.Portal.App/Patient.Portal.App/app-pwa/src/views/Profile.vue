<template>
  <div class="form">
    <div class="col-12 col-lg-12 col-xl-12 col-align-center">
      <button :disabled="true" type="button" class="mb-4 mt-2 mr-2 btn btn-mar">
        <i class="fas fa-user fa-2x"></i>
        <span class="btn-title">My Info</span>
      </button>
      <button type="button" class="mb-4 mt-2 mr-2 btn btn-mar">
        <i class="fas fa-lock fa-2x"></i>
        <span class="btn-title">Login Info</span>
      </button>
      <button type="button" class="mb-4 mt-2 mr-2 btn btn-mar disabled">
        <i class="fas fa-comments fa-2x"></i>
        <span class="btn-title">Comm Info</span>
      </button>
      <button type="button" class="mb-4 mt-2 mr-2 btn btn-mar disabled">
        <i class="fas fa-dollar-sign fa-2x"></i>
        <span class="btn-title">Payment</span>
      </button>
    </div>
    <img class="dash-divider" src="img/line-divider-transparent-1_edited.png" />
    <div class="col-12 col-lg-8 col-xl-8">
      <component v-bind:is="getProfileCurrentPage"></component>
    </div>
  </div>
</template>
<script>
import MyInfo from '../components/profile/ProfileInfo.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    MyInfo
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getProfileCurrentPage']),
    isDisabled: function (val) {
      if (val === this.getProfileCurrentPage()) {
        return 'far fa-comment'
      }
      if (this.currentRouteName === 'documents') {
        return 'fas fa-file'
      }
      if (this.currentRouteName === 'appointments') {
        return 'far fa-calendar'
      }
      if (this.currentRouteName === 'billing') {
        return 'fas fa-dollar-sign'
      }
      if (this.currentRouteName === 'profile') {
        return 'fas fa-user'
      }
      if (this.currentRouteName === 'tasks') {
        return 'fas fa-tasks'
      }
      return ''
    }
  }
}
</script>
<style scoped>
  .col-align-center {
    text-align:left !important;
  }
  .btn-mar {
    background-color: #990026;
    color: white;
    height: 80px;
    width: 90px;
    display: inline-grid;
    padding-top: 15px;
    text-align: center;
    border-radius: 4px;
    margin:0 10px 0 10px;
  }
  .btn-title {
    font-size:12px;
  }
  .dash-divider {
    width: 100%;
    height: 4px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  /* Mobile */
  @media only screen and (max-width: 767px) {
    .col-align-center {
      text-align: center !important;
    }
    .btn-mar {
      background-color: #990026;
      color: white;
      height: 70px;
      width: 78px;
      display: inline-grid;
      padding-top: 10px;
      text-align: center;
      border-radius: 4px;
      margin: 0;
    }
    .btn-title {
      font-size: 11px;
      width:60px;
      text-align:center;
    }
  }
  /* ----------- iPhone 5, 5S, 5C and 5SE ----------- */
  @media only screen and (max-device-width: 320px) {
    .col-align-center {
      text-align: center !important;
    }
    .dash-divider {
      width: 320px;
      height: 4px;
      margin-top:0;
    }
    .btn-mar {
      background-color: #990026;
      color: white;
      height: 60px;
      width: 64px;
      display: inline-grid;
      padding: 10px 0 0 0;
      text-align: center;
      border-radius: 4px;
      margin: 0;
    }

    .btn-title {
      font-size: 11px;
      width: 60px;
      text-align: center;
    }
  }
  /* ----------- iPhone Plus ----------- */
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) {
    .dash-divider {
      width: 415px;
      height: 4px;
    }
  }
</style>
