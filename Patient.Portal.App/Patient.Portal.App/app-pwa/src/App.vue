<template>
  <section class="body">
    <!-- start: header -->
    <header class="header">
      <div class="logo-container">
        <a href="../2.3.0" class="logo">
          <img src="img/Healthcore Logo White (Transparent).png" height="35" alt="Porto Admin" />
        </a>
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

      <div class="header-right" v-show="showMobileMenu">
        <nav class="header-nav2">
          <ul class="nav">
            <li>
              <a href="#" class="nav-link">
                <i class="fas fa-sign-out-alt fa-2x"></i>
              </a>
            </li>
            <li>
              <a href="#" class="nav-link">
                <i class="fas fa-question-circle fa-2x"></i>
              </a>
            </li>
          </ul>
        </nav>
        <div class="logged-info d-none d-sm-block">
          <span>Signed in as Baker Mayfield</span>
        </div>
      </div>
    </header>
    <!-- end: header -->
    <router-view></router-view>
    <a class="scroll-to-top hidden-mobile visible" href="#">
      <i class="fas fa-chevron-up"></i>
    </a>

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
    showHeader () {
      switch (this.currentRouteName) {
        case 'landing':
        case 'account':
        case 'createaccount':
          return false
        default:
          return true
      }
    },
    showMobileMenu () {
      switch (this.$route.fullPath.toLowerCase()) {
        case '/':
        case '/account/create':
        case '/account/landing':
        case '/account/requestpin':
        case '/account/forgotpassword':
        case '/account/forgotusername':
          return false
        default:
          return true
      }
    }
  }
}
</script>
