<template>
  <div>
    <loading :active.sync="getIsLoading" :can-cancel="false"></loading>
    <section class="body">
      <!-- start: header -->
      <header class="header">
        <div class="logo-container d-inline" v-if="getProfileAuthInfo">
          <!--<a href="../2.3.0" class="logo">
            <img src="img/Healthcore Logo White (Transparent).png" height="35" alt="Porto Admin" />
          </a>-->
          <div class="d-none d-sm-inline-block" v-if="currentPatientAssociated">
            <span class="office-name">{{ currentPatientAssociated.officeName }}</span>
          </div>
          <div class="d-sm-none d-inline" v-if="currentPatientAssociated">
            <span class="office-name-m">{{ currentPatientAssociated.officeName }}</span>
          </div>
          <div class="d-md-none toggle-sidebar-left"
               data-toggle-class="sidebar-left-opened"
               data-target="html"
               data-fire-event="sidebar-left-opened"
               v-show="showMobileMenu">
            <i class="fas fa-bars" aria-label="Toggle sidebar"></i>
          </div>
        </div>

        <div class="header-right d-sm-block d-md-block d-lg-block" v-if="currentPatientAssociated" >
          <!-- <div class="logged-info d-none d-sm-block" v-if="getProfileAuthInfo">
            <span>Signed in as {{ getProfileAuthInfo.firstName }} {{ getProfileAuthInfo.lastName }}</span>
          </div> -->
          <div id="userbox" class="userbox">
            <a href="#" data-toggle="dropdown" aria-expanded="false">
              <div class="profile-info">
                <span class="name font-weight-600 text-white">{{ currentPatientAssociated.firstName }} {{ currentPatientAssociated.lastName }}</span>
              </div>
              <i class="fa custom-caret"></i>
            </a>
            <div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(-8px, 35px, 0px);">
              <ul class="list-unstyled mb-2">
                <li class="divider"></li>
                <li v-for="patient in getProfilePatientAssociated" :key="patient.id" v-on:click="selectPatient(patient)">
                  <a class="font-weight-600 text-white" role="menuitem" tabindex="-1">{{patient.firstName}} {{patient.lastName}}</a>
                </li>
              </ul>
            </div>
          </div>
          <span class="separator" v-if="currentPatientAssociated"></span>
          <div class="float-right">
            <ul class="notifications">
              <li>
                <a href="javascript:void(0)" class="nav-link" @click="logout" title="Logout" v-if="currentPatientAssociated">
                  <i class="fas fa-sign-out-alt fa-2x"></i>
                </a>
              </li>
              <li>
                <a href="#" class="nav-link" v-if="getProfileAuthInfo">
                  <i class="fas fa-question-circle fa-2x"></i>
                </a>
              </li>
            </ul>
            <div class="logged-info d-none d-sm-block" v-if="getProfileAuthInfo">
              <span class="font-weight-600">Signed in as {{ getProfileAuthInfo.firstName }} {{ getProfileAuthInfo.lastName }}</span>
            </div>
          </div>
        </div>
      </header>
      <!-- end: header -->
      <router-view></router-view>
      <a class="scroll-to-top hidden-mobile visible" href="#">
        <i class="fas fa-chevron-up"></i>
      </a>
    </section>
    <section class="main-footer">
      <div class="footer-section text-center">
        <div>
          <a class="footer-link" href="#">Contact</a> <span class="font-weight-bold">|</span>
          <a class="footer-link" href="#">Support</a> <span class="font-weight-bold">|</span>
          <a class="footer-link" href="#">Terms</a> <span class="font-weight-bold">|</span>
          <a class="footer-link" href="#">Privacy</a>
        </div>
        <span class="m-footer__copyright">
          Copyright {{ new Date().getFullYear() }} &copy; Phunkey Inc. All rights reserved.
        </span>
      </div>
    </section>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Loading
  },
  computed: {
    version () {
      return '0.0.12' // USER STORY #17422 Patient Portal NPH with updates on 17491
    },
    ...mapGetters(['getIsLoading', 'getProfileAuthInfo', 'getProfilePatientAssociated', 'currentPatientAssociated']),
    currentRouteName () {
      let route = this.$route.name
      if (route) {
        route = route.toLowerCase()
      }
      return route
    },
    showHeader () {
      switch (this.currentRouteName) {
        case 'landing':
        case 'account':
        case 'createaccount':
        case 'task':
          return false
        default:
          return true
      }
    },
    showMobileMenu () {
      switch (this.$route.path.toLowerCase()) {
        case '/account/create':
        case '/account/landing':
        case '/account/login':
        case '/account/requestpin':
        case '/account/forgotpassword':
        case '/account/forgotusername':
        case '/task':
          return false
        default:
          return true
      }
    }
  },
  methods: {
    ...mapActions(['logoutApp', 'setProfileCurrentPatient', 'setIsLoading']),
    async logout () {
      this.$cookies.remove('user')
      localStorage.removeItem('config')
      await this.logoutApp()
      this.$router.push('/account/login')
    },
    async selectPatient (patient) {
      const me = this
      this.setIsLoading(true)
      await this.setProfileCurrentPatient(patient)
      setTimeout(function () { me.setIsLoading(false) }, 500)
      // eslint-disable-next-line no-undef
      // this.$router.push('/')
    }
  },
  mounted () {
    console.info('%c Patient Portal v' + this.version, 'background:green')
  }
}
</script>
<style scoped>
  .office-name {
    color: #ffffff;
    font-size: 30px;
    font-weight: 600;
    margin: 10px 0 0 15px;
    vertical-align: middle;
    line-height: 1.8;
  }
  .office-name-m {
    color: #ffffff;
    font-size: 24px;
    font-weight: 600;
    margin: 10px 0 0 15px;
    vertical-align: middle;
    line-height: 2.2;
  }
  .nav-link {
    display: block;
    padding: 0.5rem 0rem;
  }
  .notifications {
    padding-right: 1.5rem;
    margin-left: 5rem;
  }
  html.header-dark .header .separator {
    background-image: linear-gradient(#F6F6F6 60%, #EDEDED);
  }
  .userbox {
    margin:0;
  }
  .userbox.show .dropdown-menu {
    padding: 30px 10px 0
  }
</style>
