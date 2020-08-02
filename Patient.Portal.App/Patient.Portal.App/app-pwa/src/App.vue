<template>
  <section class="body">
    <!-- start: header -->
    <header class="header" v-show="currentRouteName !== 'login'">
      <div class="logo-container">
        <a href="../2.3.0" class="logo">
          <img src="img/Healthcore Logo White (Transparent).png" height="35" alt="Porto Admin" />
        </a>
        <div
          class="d-md-none toggle-sidebar-left"
          data-toggle-class="sidebar-left-opened"
          data-target="html"
          data-fire-event="sidebar-left-opened"
          v-show="currentRouteName !== 'dashboard'"
        >
          <i class="fas fa-bars" aria-label="Toggle sidebar"></i>
        </div>
      </div>

      <!-- start: search & user box -->
      <div class="header-right">
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
      <!-- end: search & user box -->
    </header>
    <!-- end: header -->
    <router-view></router-view>
    <a class="scroll-to-top hidden-mobile visible" href="#">
      <i class="fas fa-chevron-up"></i>
    </a>
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
    }
  }
}
</script>
