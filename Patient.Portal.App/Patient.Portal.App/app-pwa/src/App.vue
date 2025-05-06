<template>
  <div>
    <loading v-model:active="getIsLoading" :can-cancel="false"></loading>
    <section class="body">
      <!-- start: header -->
      <header class="header">
        <div class="logo-container d-inline">
          <!-- <a href="/" class="logo" v-if="!isAuthenticated">
            <img src="/img/Healthcore Logo White (Transparent).png" height="35" alt="Porto Admin" />
          </a> -->
          <div class="d-none d-sm-inline-block" v-if="isAuthenticated && currentPatientAssociated">
            <span class="office-name">{{ currentPatientAssociated.officeName }}</span>
          </div>
          <div class="d-sm-none d-inline" v-if="isAuthenticated && currentPatientAssociated">
            <span class="office-name-m">{{ currentPatientAssociated.officeName }}</span>
          </div>
          <!-- Begin: Task Office Name -->
          <div class="d-none d-sm-inline-block" v-if="showTaskOfficeName && getTaskOfficeName">
            <span class="office-name">{{ getTaskOfficeName }}</span>
          </div>
          <div class="d-sm-none d-inline" v-if="showTaskOfficeName && getTaskOfficeName">
            <span class="office-name-m">{{ getTaskOfficeName }}</span>
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
          v-if="isAuthenticated"
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
              v-if="getProfilePatientAssociated && getProfilePatientAssociated.length > 0"
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
                  @click="selectPatient(patient)"
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
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
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

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'
import { useConfigStore } from '@/stores/config'
import { useRoute, useRouter } from 'vue-router'
// Vue-loading-overlay v6.x is Vue 3 compatible
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useMessageStore } from '@/stores/message'

// App name is defined through the filename in Vue 3
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const profileStore = useProfileStore()
const configStore = useConfigStore()
const messageStore = useMessageStore()

// Create refs for component state
const currentChannel = ref('')
const pubNubMsg = ref({
  channel: '',
  msg: []
})

const version = computed(() => '1.9.21') // Fortis payment integration

const getIsLoading = computed(() => configStore.isLoading)
const getProfileAuthInfo = computed(() => profileStore.getProfileAuthInfo)
const getProfilePatientAssociated = computed(
  () => profileStore.getProfilePatientAssociated
)
const currentPatientAssociated = computed(
  () => profileStore.currentPatientAssociated
)
const getTaskOfficeName = computed(() => configStore.getTaskOfficeName)

const currentRouteName = computed(() => {
  let routeName = route.name
  if (routeName) {
    routeName = routeName.toLowerCase()
  }
  return routeName
})

const newPubnubMsg = async (msg) => {
  const msgJson = JSON.parse(msg.message)
  const result = await configStore.showSwalToast({
    toast: true,
    text: 'Click ok to view',
    position: 'top-end',
    title: 'New Message',
    timerProgressBar: true,
    timer: 10000,
    icon: 'info'
  })

  if (result.isConfirmed) {
    messageStore.setCurrentMsgInfo({
      id: parseInt(msgJson.messageId),
      subject: ''
    })
    messageStore.setCurrentPage('Detail')
    router.push({ path: '/menu/messages' })
  }
}

watch(currentPatientAssociated, (val, oldVal) => {
  // Use isAuthenticated as a property, not a method
  if (!authStore.isAuthenticated) {
    return
  }
  if (oldVal) {
    currentChannel.value = `ch-portal-msg-${oldVal.facilityID}-${oldVal.patientID}`
    const pnInstance = configStore.pnGetInstance()
    pnInstance.unsubscribe({ channels: [currentChannel.value] })
  }
  if (val) {
    const pnInstance = configStore.pnGetInstance()
    currentChannel.value = `ch-portal-msg-${val.facilityID}-${val.patientID}`
    pnInstance.subscribe({ channels: [currentChannel.value] })
    pubNubMsg.value.channel = currentChannel.value
    pubNubMsg.value.msg = configStore.pnGetMessage(
      currentChannel.value,
      newPubnubMsg
    )
  }
})

const selectPatient = (patient) => {
  profileStore.setCurrentPatient(patient)
}

const logout = () => {
  authStore.logout()
}

// This was previously unused, now removed
// const showHeader = computed(() => {
//   switch (currentRouteName.value) {
//     case 'landing':
//     case 'account':
//     case 'createaccount':
//     case 'task':
//       return false
//     default:
//       return true
//   }
// })

const showMobileMenu = computed(() => {
  switch (route.path.toLowerCase()) {
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
})

const showTaskOfficeName = computed(() => {
  if (route.path.toLowerCase() !== '/task') {
    return false
  }
  if (authStore.isAuthenticated) {
    return false
  }
  return true
})

// Renamed from isAuth to more clearly indicate its purpose
const isAuthenticated = computed(() => authStore.isAuthenticated)

const showFooterMenu = computed(() => {
  switch (route.path.toLowerCase()) {
    case '/task':
      return false
    default:
      return true
  }
})

// Log version info on startup
console.info('%c Patient Portal v' + version.value, 'background:green')
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

@media (min-width: 424px) and (max-width: 448px) {
  .office-name-m {
    font-size: 1.4rem;
  }
}
@media (min-width: 399px) and (max-width: 423px) {
  .office-name-m {
    font-size: 1.3rem;
  }
}
@media (min-width: 374px) and (max-width: 398px) {
  .office-name-m {
    font-size: 1.2rem;
  }
}
</style>
