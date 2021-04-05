<template>
  <div class="inner-wrapper">
    <section role="main" class="content-body">
      <header class="card-header text-center">
        <div class="d-none d-sm-block">
          <h3 v-if="getProfileAuthInfo">{{ currentPatientAssociated.firstName }} {{ currentPatientAssociated.lastName }}</h3>
        </div>
        <div class="pb-3 d-lg-none d-md-none d-sm-none">
          <select v-model="selectedPatient" @change="selectPatient()" class="form-control">
            <option v-for="patient in getProfilePatientAssociated"
                    :value="patient"
                    :key="patient.id">
              {{ patient.firstName }} {{ patient.lastName }}
            </option>
          </select>
        </div>

        <!-- <div class="d-block d-sm-none btn-div-new">
          <button type="button" class="mb-1 mt-1 mr-1 btn btn-lg btn-new">MAKE NEW APPOINTMENT</button>
        </div> -->

        <!-- start: page DASHBOARD MENU-->
          <dash-menu></dash-menu>
        <!-- end: page -->
      </header>

      <div class="w-100" />

      <div class="container d-lg-flex d-md-flex pt-4">
        <div class="col-12 col-md-6 col-lg-6 col-xl-6">
          <dash-task v-if="getProfilePatientAssociated.length>0"></dash-task>
          <img class="dash-divider" src="img/line-divider-transparent-1_edited.png" />
          <dash-appointments v-if="getProfilePatientAssociated.length>0"></dash-appointments>
        </div>
        <div class="col-12 col-md-6 col-lg-6 col-xl-6 offset-lg-2 offset-xl-2">
          <div class="d-block d-sm-none">
            <img class="dash-divider" src="img/line-divider-transparent-1_edited.png" />
          </div>
          <!-- <div class="col-12 d-none d-sm-block">
            <button type="button" class="mb-1 mt-1 mr-1 btn btn-new">MAKE NEW APPOINTMENT</button>
          </div> -->

          <div class="col-12 col-md-12 col-lg-6 col-xl-6">
            <dash-welcome></dash-welcome>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DashTask from '@/components/dashboard/dash-task.vue'
import DashAppointments from '@/components/dashboard/dash-appointments.vue'
import DashWelcome from '@/components/dashboard/dash-welcome.vue'
import DashMenu from '@/components/dashboard/dash-menu.vue'
import { mapGetters, mapActions } from 'vuex'
// eslint-disable-next-line no-unused-vars
import api from '../api/http-common.js'
export default {
  name: 'Dashboard',
  components: {
    DashTask,
    DashAppointments,
    DashWelcome,
    DashMenu
  },
  data () {
    return {
      selectedPatient: null
    }
  },
  computed: {
    ...mapGetters(['getProfileAuthInfo', 'getProfilePatientAssociated', 'currentPatientAssociated'])
  },
  methods: {
    ...mapActions(['setProfilePatientAssociated', 'setProfileCurrentPatient', 'setIsLoading']),
    async selectPatient () {
      const me = this
      this.setIsLoading(true)
      console.log(this.selectedPatient)
      await this.setProfileCurrentPatient(this.selectedPatient)
      setTimeout(function () { me.setIsLoading(false) }, 500)
    }
  },
  async mounted () {
    const patientAssosicated = await api.auth.request.getUserPatient(this.getProfileAuthInfo.id)
    this.setProfilePatientAssociated(patientAssosicated.data)
    this.selectedPatient = this.currentPatientAssociated
  }
}
</script>

<style scoped>
/* Add here all your CSS customizations */

.btn-new {
  background-color: #ffc266;
  border-color: black;
  font-weight: 600;
}

.dash-divider {
  width: 70%;
  height: 4px;
  margin-bottom: 10px;
}
/* Header Mobile */
@media only screen and (max-width: 767px) {
  .container {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  .dash-divider {
    width: 100%;
  }

  .list-text-aligned {
    text-align: left !important;
  }

  .card {
    background: transparent !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: none !important;
    width: 100px !important;
    height: 100px !important;
    padding: 0 5px 0 5px !important;
    margin-left: -5px !important;
  }

  .card-header {
    padding-top: 70px !important;
  }

  .card-body {
    padding: 0 !important;
  }

  /* Header Dark */
  html.dark .header,
  html.header-dark .header {
    background: #0c529c !important;
    border-bottom-color: #0c529c !important;
    border-top-color: #0c529c !important;
  }

  html.dark .header .logo-container,
  html.header-dark .header .logo-container {
    background: #0c529c;
    border-bottom-color: #0c529c;
    border-top-color: #0c529c;
  }

  html.dark .header .header-right,
  html.header-dark .header .header-right {
    background: #0c529c; /*modified by Rizza Herrero*/
    font-size: 10px; /* added by Rizza Herrero */
  }

  .header .logo-container {
    height: 60px;
    left: 0;
    position: static;
    right: 0;
    top: 0;
    z-index: 99;
  }

  .header .header-right {
    background: #fff;
    float: right !important;
    height: 0 !important;
    margin-top: 0 !important;
    width: unset !important;
  }

  .btn-div-new {
    padding-bottom: 10px !important;
  }

  .btn.btn-lg {
    font-size: 1rem;
    padding: 1rem 4rem;
    font-weight: 600;
  }

  .btn-new {
    background-color: #ffc266;
    border-color: black;
  }
}
/* IPAD */
@media only screen and (max-width: 768px) {
  .dash-divider {
    width: 100%;
  }
}
/* ----------- iPhone 5, 5S, 5C and 5SE ----------- */
@media only screen and (max-device-width: 320px) {
  .dash-divider {
    width: 100%;
  }
  .btn.btn-lg {
    font-size: 1rem;
    padding: 1rem 2rem;
    font-weight: 600;
  }
}
  /* ----------- iPhone Plus ----------- */
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) {
    .dash-divider {
      width: 100%;
    }
  }

  /* Landscape IPHONE X */
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    .dash-divider {
      width: 100%;
    }
  }
</style>
