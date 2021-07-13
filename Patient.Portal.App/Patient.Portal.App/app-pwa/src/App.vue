<template>
  <div>
    <loading :active.sync="getIsLoading" :can-cancel="false"></loading>
    <section class="body">
      <!-- start: header -->
      <header class="header">
        <div class="logo-container d-inline">
          <!-- <a href="/" class="logo" v-if="!$auth.isAuthenticated()">
            <img src="img/Healthcore Logo White (Transparent).png" height="35" alt="Porto Admin" />
          </a> -->
          <div class="d-none d-sm-inline-block" v-if="$auth.isAuthenticated()">
            <span class="office-name" v-if="currentPatientAssociated">{{
              currentPatientAssociated.officeName
            }}</span>
          </div>
          <div class="d-sm-none d-inline" v-if="$auth.isAuthenticated()">
            <span class="office-name-m" v-if="currentPatientAssociated">{{
              currentPatientAssociated.officeName
            }}</span>
          </div>
          <!-- Begin: Task Office Name -->
          <div class="d-none d-sm-inline-block" v-if="showTaskOfficeName">
            <span class="office-name" v-if="getTaskOfficeName">{{
              getTaskOfficeName
            }}</span>
          </div>
          <div class="d-sm-none d-inline" v-if="showTaskOfficeName">
            <span class="office-name-m" v-if="getTaskOfficeName">{{
              getTaskOfficeName
            }}</span>
          </div>
          <!-- End: Task Office Name -->
          <div
            class="d-md-none toggle-sidebar-left"
            data-toggle-class="sidebar-left-opened"
            data-target="html"
            data-fire-event="sidebar-left-opened"
            v-show="showMobileMenu"
          >
            <i class="fas fa-bars" aria-label="Toggle sidebar"></i>
          </div>
        </div>

        <div
          class="header-right d-sm-block d-md-block d-lg-block"
          v-if="$auth.isAuthenticated()"
        >
          <!-- <div class="logged-info d-none d-sm-block" v-if="getProfileAuthInfo">
            <span>Signed in as {{ getProfileAuthInfo.firstName }} {{ getProfileAuthInfo.lastName }}</span>
          </div> -->
          <div id="userbox" class="userbox">
            <a href="#" data-toggle="dropdown" aria-expanded="false">
              <div class="profile-info">
                <span
                  class="name font-weight-600 text-white"
                  v-if="currentPatientAssociated"
                  >{{ currentPatientAssociated.firstName }}
                  {{ currentPatientAssociated.lastName }}</span
                >
              </div>
              <i class="fa custom-caret"></i>
            </a>
            <div
              v-if="getProfilePatientAssociated.length > 0"
              class="dropdown-menu"
              x-placement="bottom-start"
              style="
                position: absolute;
                will-change: transform;
                top: 0px;
                left: 0px;
                transform: translate3d(-8px, 35px, 0px);
              "
            >
              <ul class="list-unstyled mb-2">
                <li class="divider"></li>
                <li
                  v-for="patient in getProfilePatientAssociated"
                  :key="patient.id"
                  v-on:click="selectPatient(patient)"
                >
                  <a
                    class="font-weight-600 text-white"
                    role="menuitem"
                    tabindex="-1"
                    >{{ patient.firstName }} {{ patient.lastName }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <span
            class="separator"
            v-if="currentPatientAssociated && currentRouteName !== 'landing'"
          ></span>
          <div class="float-right">
            <ul class="notifications">
              <li>
                <a
                  href="javascript:void(0)"
                  class="nav-link"
                  @click="logout"
                  title="Logout"
                  v-if="
                    currentPatientAssociated && currentRouteName !== 'landing'
                  "
                >
                  <i class="fas fa-sign-out-alt fa-2x"></i>
                </a>
              </li>
              <!--<li>
                <a
                  href="#"
                  class="nav-link"
                  v-if="
                    currentPatientAssociated && currentRouteName !== 'landing'
                  "
                >
                  <i class="fas fa-question-circle fa-2x"></i>
                </a>
              </li>-->
            </ul>
            <div
              class="logged-info d-none d-sm-block"
              v-if="getProfileAuthInfo"
            >
              <span class="font-weight-600"
                >Signed in as {{ getProfileAuthInfo.firstName }}
                {{ getProfileAuthInfo.lastName }}</span
              >
            </div>
          </div>
        </div>
      </header>
      <!-- end: header -->
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <!-- <a class="scroll-to-top hidden-mobile visible" href="javascript:void(0)">
        <i class="fas fa-chevron-up"></i>
      </a> -->
    </section>
    <section class="main-footer" v-if="showFooterMenu">
      <div class="footer-section text-center">
        <div>
          <a class="footer-link" href="/contact">Contact Us</a>
          <span class="font-weight-bold">|</span>
          <!--<a class="footer-link isDisabled" href="#">Support</a> <span class="font-weight-bold">|</span>-->
          <a class="footer-link isDisabled" href="#">Terms</a>
          <span class="font-weight-bold">|</span>
          <a class="footer-link isDisabled" href="#">Privacy</a>
        </div>
        <span class="m-footer__copyright">
          Copyright {{ new Date().getFullYear() }} &copy; Phunkey Inc. All
          rights reserved.
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
  data () {
    return {
      currentChannel: '',
      pubNubMsg: {
        channel: '',
        msg: []
      }
    }
  },
  watch: {
    currentPatientAssociated: function (val, oldVal) {
      if (!this.$auth.isAuthenticated()) {
        return
      }
      if (oldVal) {
        this.currentChannel = `ch-portal-msg-${oldVal.facilityID}-${oldVal.patientID}`
        const pnInstance = this.$pnGetInstance()
        pnInstance.unsubscribe({ channels: [this.currentChannel] })
      }
      if (val) {
        const pnInstance = this.$pnGetInstance()

        this.currentChannel = `ch-portal-msg-${val.facilityID}-${val.patientID}`
        pnInstance.subscribe({ channels: [this.currentChannel] })

        this.pubNubMsg.channel = this.currentChannel

        this.pubNubMsg.msg = this.$pnGetMessage(
          this.currentChannel,
          this.newPubnubMsg
        )
      }
    },
    isAuth: function (val, oldVal) {
      if (val && this.$auth.isAuthenticated()) {
        const pnInstance = this.$pnGetInstance()

        this.currentChannel = `ch-portal-msg-${this.currentPatientAssociated.facilityID}-${this.currentPatientAssociated.patientID}`

        pnInstance.subscribe({ channels: [this.currentChannel] })

        this.pubNubMsg.channel = this.currentChannel

        this.pubNubMsg.msg = this.$pnGetMessage(
          this.currentChannel,
          this.newPubnubMsg
        )
      }
      if (!val && !this.$auth.isAuthenticated()) {
        this.currentChannel = `ch-portal-msg-${this.currentPatientAssociated.facilityID}-${this.currentPatientAssociated.patientID}`
        const pnInstance = this.$pnGetInstance()
        pnInstance.unsubscribe({ channels: [this.currentChannel] })
      }
    }
  },
  computed: {
    version () {
      return '0.0.15' // Bug fixes on card #17509 and other updates
    },
    ...mapGetters([
      'getIsLoading',
      'getProfileAuthInfo',
      'getProfilePatientAssociated',
      'currentPatientAssociated',
      'getTaskOfficeName'
    ]),
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
    },
    showTaskOfficeName () {
      if (this.$route.path.toLowerCase() !== '/task') {
        return false
      }
      if (this.$auth.isAuthenticated()) {
        return false
      }
      return true
    },
    isAuth () {
      return this.$auth.logged
    },
    showFooterMenu () {
      switch (this.$route.path.toLowerCase()) {
        case '/task':
          return false
        default:
          return true
      }
    }
  },
  methods: {
    ...mapActions(['logoutApp', 'setProfileCurrentPatient', 'setIsLoading', 'setCurrentMsgInfo', 'setMsgCurrentPage']),
    async newPubnubMsg (msg) {
      // console.log('newPubnubMsg>', msg)
      const msgJson = JSON.parse(msg.message)
      // console.log('newPubnubMsg>actual msg>', msgJson)
      const result = await this.$swal({
        toast: true,
        text: 'Click ok to view',
        position: 'top-end',
        title: 'New Message',
        // showConfirmButton: false,
        timerProgressBar: true,
        timer: 10000,
        icon: 'info'
      })

      // console.log('swal>result>', result)
      if (result.isConfirmed) {
        this.setCurrentMsgInfo({ id: parseInt(msgJson.messageId), subject: '' })
        this.setMsgCurrentPage('Detail')
        this.$router.push({ path: '/menu/messages' })
      }
    },
    newPubnubPresence (ps) {
      // console.log('ps>', ps)
    },
    async logout () {
      this.$auth.logout()
      this.$router.push('/account/login')
    },
    async selectPatient (patient) {
      const me = this
      this.setIsLoading(true)
      await this.setProfileCurrentPatient(patient)
      setTimeout(function () {
        me.setIsLoading(false)
        me.$router.push('/')
      }, 500)
    }
  },
  created () {
    console.info('%c Patient Portal v' + this.version, 'background:green')
    // console.log('this.$auth', this.$auth.isAuthenticated())
    // if (this.$auth.isAthenticated()) {
    //   if (this.$route.path === '/account/login') {
    //     this.$auth.logout()
    //     console.log('isAut', this.$auth.isAthenticated())
    //   }
    // }
  }
}
</script>
<style scoped>
.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.slide-up-enter {
  transform: translateY(10px);
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.2s ease;
}
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
    /*padding-right: 1.5rem;*/
    /*margin-left: 5rem;*/
    margin-left: 7rem;
  }
html.header-dark .header .separator {
  background-image: linear-gradient(#f6f6f6 60%, #ededed);
}
.userbox {
  margin: 0;
}
.userbox.show .dropdown-menu {
  padding: 30px 10px 0;
}

.isDisabled {
  color: currentColor;
  cursor: not-allowed;
  opacity: 0.5;
  text-decoration: none;
}
</style>
