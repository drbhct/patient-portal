<template>
  <div class="inner-wrapper">
    <section role="main" class="content-body">
      <header :class="checkMenuHeader" class="menu-header text-left">
        <div class="menu-header-title ">
          <i class="far fa-calendar" aria-hidden="true"></i>
          <span class="h-title">{{currentRouteName}}</span>
        </div>
      </header>

      <div class="content">
        <div class="row">
          <div class="col-lg-1 col-xl-1">
            <!-- start: sidebar -->
            <aside id="sidebar-left" class="sidebar-left">
              <div class="nano">
                <div class="nano-content">
                  <nav id="menu" class="nav-main sidebar-padding" role="navigation">
                    <ul class="nav nav-main">
                      <li v-if="currentRouteName !== 'messages'">
                        <router-link to="/menu/messages" class="nav-link bg-blue sidebar-w">
                          <i class="far fa-comment" aria-hidden="true"></i>
                        </router-link>
                      </li>
                      <li v-if="currentRouteName !== 'documents'">
                        <router-link to="/menu/documents" class="nav-link bg-green sidebar-w">
                          <i class="fas fa-file" aria-hidden="true"></i>
                        </router-link>
                      </li>
                      <li v-if="currentRouteName !== 'appointments'">
                        <router-link to="/menu/appointments" class="nav-link bg-orange sidebar-w">
                          <i class="far fa-calendar" aria-hidden="true"></i>
                        </router-link>
                      </li>
                      <li v-if="currentRouteName !== 'billing'">
                        <router-link to="/menu/billing" class="nav-link bg-success sidebar-w">
                          <i class="fas fa-dollar-sign" aria-hidden="true"></i>
                        </router-link>
                      </li>
                      <li v-if="currentRouteName !== 'profile'">
                        <router-link to="/menu/profile" class="nav-link bg-purple sidebar-w">
                          <i class="fas fa-user" aria-hidden="true"></i>
                        </router-link>
                      </li>
                      <li v-if="currentRouteName !== 'tasks'">
                        <router-link to="/menu/tasks" class="nav-link bg-red sidebar-w">
                          <i class="fas fa-tasks" aria-hidden="true"></i>
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/" class="nav-link bg-gray sidebar-w">
                          <i class="fas fa-home" aria-hidden="true"></i>
                        </router-link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </aside>
            <!-- end: sidebar -->
          </div>
          <div class="col-lg-11 col-xl-11">
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
export default {
  computed: {
    currentRouteName () {
      let route = this.$route.name
      if (route) {
        route = route.toLowerCase()
      }
      return route
    },
    checkMenuHeader: function () {
      if (this.currentRouteName === 'messages') {
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
      return ''
    }
  }
}
</script>
<style scoped>
  .sidebar-padding {
    padding: 15px;
    background: #f6f6f6;
    width:90px;
  }

  .sidebar-w {
    width: 60px;
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
    background: #90ee90;
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

  a.bg-blue:hover, a.bg-blue:focus, button.bg-blue:hover, button.bg-blue:focus {
    background: #0063cc !important;
  }

  a.bg-orange:hover, a.bg-orange:focus, button.bg-orange:hover, button.bg-orange:focus {
    background: #cc8500 !important;
  }

  a.bg-green:hover, a.bg-green:focus, button.bg-green:hover, button.bg-green:focus {
    background: #4fe34f !important;
  }

  a.bg-purple:hover, a.bg-purple:focus, button.bg-purple:hover, button.bg-purple:focus {
    background: #3e309c !important;
  }

  a.bg-red:hover, a.bg-red:focus, button.bg-red:hover, button.bg-red:focus {
    background: #ea4848 !important;
  }

  a.bg-gray:hover, a.bg-gray:focus, button.bg-gray:hover, button.bg-gray:focus {
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
    text-transform:capitalize;
  }

  .h3-margin-top {
    margin-top: auto;
  }

  .h-title {
    padding-left: 20px;
    font-weight: 600;
    font-size:18px;
  }

  html.sidebar-left-big-icons .sidebar-left .nano .nav-main > li:hover > ul.nav-children {
    display: block;
  }

  html.sidebar-left-big-icons .sidebar-left .nano .nav-main > li:hover > a {
    background: none;
  }

  /* Header Mobile */
  @media only screen and (max-width: 767px) {
    .menu-header {
      margin-top:50px;
      height:50px;
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
  }
</style>
