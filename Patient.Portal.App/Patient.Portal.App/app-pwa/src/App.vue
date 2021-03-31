<template>
  <div>
    <loading :active.sync="getIsLoading" :can-cancel="false"></loading>
    <section class="body">
      <!-- start: header -->
      <header class="header">
        <div class="logo-container d-inline">
          <!--<a href="../2.3.0" class="logo">
            <img src="img/Healthcore Logo White (Transparent).png" height="35" alt="Porto Admin" />
          </a>-->
          <div class="d-none d-sm-inline-block">
            <span class="office-name">{{ currentPatientAssociated.officeName }}</span>
          </div>
          <div class="d-md-none d-inline">
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

        <div class="header-right" v-show="showMobileMenu">
          <nav class="header-nav2">
            <ul class="nav">
              <li>
                <a href="javascript:void(0)" class="nav-link" @click="logout" title="Logout" v-if="getProfileAuthInfo">
                  <i class="fas fa-sign-out-alt fa-2x"></i>
                </a>
              </li>
              <li>
                <a href="#" class="nav-link" v-if="getProfileAuthInfo">
                  <i class="fas fa-question-circle fa-2x"></i>
                </a>
              </li>
            </ul>
          </nav>
          <div class="logged-info d-none d-sm-block" v-if="getProfileAuthInfo">
            <span>Signed in as {{ getProfileAuthInfo.firstName }} {{ getProfileAuthInfo.lastName }}</span>
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
      return '0.0.9' // Nph task
    },
    ...mapGetters(['getIsLoading', 'getProfileAuthInfo', 'getProfilePatientAssociated']),
    currentRouteName () {
      let route = this.$route.name
      if (route) {
        route = route.toLowerCase()
      }
      return route
    },
    currentPatientAssociated () {
      if (this.getProfilePatientAssociated.length === 0) {
        return null
      }
      return this.getProfilePatientAssociated[0]
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
    ...mapActions(['logoutApp']),
    async logout () {
      this.$cookies.remove('user')
      localStorage.removeItem('config')
      await this.logoutApp()
      this.$router.push('/account/login')
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
</style>
