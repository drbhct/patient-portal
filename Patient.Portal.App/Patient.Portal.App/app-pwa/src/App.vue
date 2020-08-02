<template>
  <section class="body">
    <!-- start: header -->
    <header class="header" v-show="currentRouteName!=='login'">
      <div class="logo-container">
        <a href="../2.3.0" class="logo">
          <img src="img/Healthcore Logo White (Transparent).png" height="35" alt="Porto Admin" />
        </a>
        <div
          class="d-md-none toggle-sidebar-left"
          data-toggle-class="sidebar-left-opened"
          data-target="html"
          data-fire-event="sidebar-left-opened"
          v-show="currentRouteName!=='dashboard'"
        >
          <i class="fas fa-bars" aria-label="Toggle sidebar"></i>
        </div>
      </div>

      <!-- start: search & user box -->
      <div class="header-right">
        <span class="separator"></span>

        <div id="userbox" class="userbox">
          <a href="#" data-toggle="dropdown">
            <figure class="profile-picture">
              <img
                src="img/!logged-user.jpg"
                alt="Joseph Doe"
                class="rounded-circle"
                data-lock-picture="img/!logged-user.jpg"
              />
            </figure>
            <div class="profile-info" data-lock-name="John Doe" data-lock-email="johndoe@okler.com">
              <span class="name">John Doe Junior</span>
              <span class="role">administrator</span>
            </div>

            <i class="fa custom-caret"></i>
          </a>

          <div class="dropdown-menu">
            <ul class="list-unstyled mb-2">
              <li class="divider"></li>
              <li>
                <a role="menuitem" tabindex="-1" href="pages-user-profile.html">
                  <i class="fas fa-user"></i> My Profile
                </a>
              </li>
              <li>
                <a role="menuitem" tabindex="-1" href="#" data-lock-screen="true">
                  <i class="fas fa-lock"></i> Lock Screen
                </a>
              </li>
              <li>
                <a role="menuitem" tabindex="-1" href="pages-signin.html">
                  <i class="fas fa-power-off"></i> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>

        <span class="separator"></span>
        <ul class="notifications">
          <li>
            <a href="#" class="notification-icon" data-toggle="dropdown">
              <i class="fas fa-question"></i>
            </a>
          </li>
        </ul>
        <span class="separator"></span>
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
