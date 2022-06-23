<template>
  <div class="inner-wrapper">
    <section role="main" class="content-body">
      <header :class="checkMenuHeader" class="menu-header text-left" v-if="currentRouteName !== 'contact'">
        <div class="menu-header-title">
          <i :class="menuIcon" aria-hidden="true"></i>
          <span class="h-title">{{ title }}</span>
        </div>
      </header>

      <div class="content">
        <div class="row">
          <div class="col-lg-2 col-xl-2 col-md-2">
            <!-- start: sidebar -->
            <aside id="sidebar-left" class="sidebar-left sidebar-width">
              <div class="nano">
                <div class="nano-content">
                  <nav
                    id="menu"
                    class="nav-main sidebar-padding"
                    role="navigation"
                  >
                    <ul class="nav nav-main">
                      <li
                        v-if="currentRouteName !== 'messages'"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Messages"
                      >
                        <router-link
                          to="/menu/messages"
                          class="nav-link bg-blue sidebar-w"
                          v-on:click.native="closeSidebar"
                        >
                          <i class="far fa-comment" aria-hidden="true"></i>
                          <span>Messages</span>
                        </router-link>
                      </li>
                      <li
                        v-if="currentRouteName !== 'documents'"
                        data-toggle="tooltip"
                        title="Documents"
                      >
                        <router-link
                          to="/menu/documents"
                          class="nav-link bg-green sidebar-w"
                          v-on:click.native="closeSidebar"
                        >
                          <i class="fas fa-file" aria-hidden="true"></i>
                          <span>Documents</span>
                        </router-link>
                      </li>
                      <li
                        v-if="currentRouteName !== 'appointments'"
                        data-toggle="tooltip"
                        title="Appointments"
                        data-placement="right"
                      >
                        <router-link
                          to="/menu/appointments"
                          class="nav-link bg-orange sidebar-w"
                          v-on:click.native="closeSidebar"
                        >
                          <i class="far fa-calendar" aria-hidden="true"></i>
                          <span>Appointments</span>
                        </router-link>
                      </li>
                      <!--<li
                        v-if="currentRouteName !== 'billing'"
                        data-toggle="tooltip"
                        title="Billing"
                        data-placement="right"
                      >
                        <router-link
                          to="/menu/billing"
                          class="nav-link bg-success sidebar-w"
                          v-on:click.native="closeSidebar"
                        >
                          <i class="fas fa-dollar-sign" aria-hidden="true"></i>
                        </router-link>
                      </li>-->
                      <li
                        v-if="currentRouteName !== 'profile'"
                        data-toggle="tooltip"
                        title="Profile"
                        data-placement="right"
                      >
                        <router-link
                          to="/menu/profile"
                          class="nav-link bg-purple sidebar-w"
                          v-on:click.native="closeSidebar"
                        >
                          <i class="fas fa-user" aria-hidden="true"></i>
                           <span>Profile</span>
                        </router-link>
                      </li>
                      <li
                        v-if="currentRouteName !== 'tasks'"
                        data-toggle="tooltip"
                        title="Tasks"
                        data-placement="right"
                      >
                        <router-link
                          to="/menu/tasks"
                          class="nav-link bg-red sidebar-w"
                          v-on:click.native="closeSidebar"
                        >
                          <i class="fas fa-tasks" aria-hidden="true"></i>
                           <span>Tasks</span>
                        </router-link>
                      </li>
                      <li
                        data-toggle="tooltip"
                        title="Home"
                        data-placement="right"
                      >
                        <router-link
                          to="/"
                          class="nav-link bg-gray sidebar-w"
                          v-on:click.native="closeSidebar"
                        >
                          <i class="fas fa-home" aria-hidden="true"></i>
                           <span>Home</span>
                        </router-link>
                      </li>
                      <li
                        data-toggle="tooltip"
                        title="Logout"
                        data-placement="right"
                      >
                        <a
                          href="javascript:void(0)"
                          @click="logout"
                          class="nav-link bg-dark sidebar-w"
                          title="Logout"
                        >
                          <i class="fas fa-sign-out-alt" aria-hidden="true"></i>
                           <span>Logout</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </aside>
            <!-- end: sidebar -->
          </div>
          <div class="col-lg-10 col-xl-10 col-md-8 content-custom mb-4">
            <!-- start: page -->
            <router-view></router-view>
            <!-- end: page -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    isAuthenticated () {
      return this.$auth.isAuthenticated
    },
    currentRouteName () {
      let route = this.$route.name
      if (route) {
        route = route.toLowerCase()
      }
      return route
    },
    title () {
      switch (this.currentRouteName) {
        case 'statement':
          return 'Patient Statement'
        case 'viewpdf':
          return 'Patient Statement File'
        default:
          return this.currentRouteName
      }
    },
    checkMenuHeader: function () {
      if (this.currentRouteName === 'messages') {
        // this.setCurrentMsgInfo({})
        // this.setMsgCurrentPage('List')
        return 'bg-blue'
      }
      if (this.currentRouteName === 'documents') {
        return 'bg-green'
      }
      if (this.currentRouteName === 'appointments') {
        return 'bg-orange'
      }
      if (this.currentRouteName === 'billing') {
        return 'bg-success'
      }
      if (this.currentRouteName === 'profile') {
        return 'bg-purple'
      }
      if (this.currentRouteName === 'tasks') {
        return 'bg-red'
      }
      if (this.currentRouteName === 'statement') {
        return 'bg-red'
      }
      if (this.currentRouteName === 'viewpdf') {
        return 'bg-green'
      }
      return ''
    },
    menuIcon: function () {
      if (this.currentRouteName === 'messages') {
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
      if (this.currentRouteName.toLowerCase() === 'statement') {
        return 'fas fa-tasks'
      }
      if (this.currentRouteName === 'viewpdf') {
        return 'fas fa-file'
      }
      return ''
    }
  },
  methods: {
    ...mapActions(['logoutApp', 'setMsgCurrentPage', 'setCurrentMsgInfo']),
    closeSidebar () {
      // console.log('closing sidebar')
      document
        .getElementsByTagName('html')[0]
        .classList.remove('sidebar-left-opened')
    },
    async logout () {
      this.$auth.logout()
      this.$router.push('/account/login')
    }
  }
}
</script>
<style scoped>
.tooltip {
  display: block !important;
  z-index: 10000;
}
.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}
.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}
.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}
.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}
.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.tooltip[x-placement^="right"] {
  margin-left: 5px;
}
.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
.tooltip[x-placement^="left"] {
  margin-right: 5px;
}
.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
}
.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}
.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}
.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}

.sidebar-width {
  width: 190px !important;
}

.content-custom {
  padding-top: 30px;
  padding-right: 50px;
  margin-left: auto;
  margin-right: auto;
}

.sidebar-padding {
  padding: 15px;
  background: #f6f6f6;
  width: 190px;
}

.sidebar-w {
  width:100%;
  /* width: 60px;  */
}

ul.nav-main li {
  padding-bottom: 10px !important;
}

.bg-blue {
  background: #007bff;
  color: #fff;
}
.bg-orange {
  background: #ffa500;
  color: #fff;
}
.bg-green {
  background: #93c47d;
  color: #fff;
}
.bg-purple {
  background: #6a5acd;
  color: #fff;
}
.bg-red {
  background: #f08080;
  color: #fff;
}
.bg-success {
  color: #fff !important;
}

.bg-gray {
  background: #b3b3b3;
  color: white !important;
}

a.bg-blue:hover,
a.bg-blue:focus,
button.bg-blue:hover,
button.bg-blue:focus {
  background: #0063cc !important;
}

a.bg-orange:hover,
a.bg-orange:focus,
button.bg-orange:hover,
button.bg-orange:focus {
  background: #cc8500 !important;
}

a.bg-green:hover,
a.bg-green:focus,
button.bg-green:hover,
button.bg-green:focus {
  background: #669966 !important;
}

a.bg-purple:hover,
a.bg-purple:focus,
button.bg-purple:hover,
button.bg-purple:focus {
  background: #3e309c !important;
}

a.bg-red:hover,
a.bg-red:focus,
button.bg-red:hover,
button.bg-red:focus {
  background: #ea4848 !important;
}

a.bg-gray:hover,
a.bg-gray:focus,
button.bg-gray:hover,
button.bg-gray:focus {
  background: #8c8c8c !important;
}

/*HEADER*/
.menu-header {
  color: white !important;
  height: 60px;
  padding-left: 20px;
}

.menu-header-title {
  padding-top: 15px;
  font-size: 24px;
  text-transform: capitalize;
}

.h3-margin-top {
  margin-top: auto;
}

.h-title {
  padding-left: 20px;
  font-weight: 600;
  font-size: 18px;
}

html.sidebar-left-big-icons
  .sidebar-left
  .nano
  .nav-main
  > li:hover
  > ul.nav-children {
  display: block;
}

html.sidebar-left-big-icons .sidebar-left .nano .nav-main > li:hover > a {
  background: none;
}

/* Header Mobile */
@media only screen and (max-width: 767px) {
  .menu-header {
    margin-top: 50px;
    height: 50px;
  }

  .menu-header-title {
    padding-top: 15px;
    font-size: 20px;
  }

  .h-title {
    padding-left: 20px;
    font-weight: 600;
    font-size: 16px;
  }

  .content-custom {
    padding-right: 15px !important;
    padding-bottom: 20px !important;
  }
}
</style>
