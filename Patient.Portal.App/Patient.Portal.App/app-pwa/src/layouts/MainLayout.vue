<template>
  <div class="inner-wrapper">
    <section role="main" class="content-body">
      <header class="menu-header text-left">
        <div class="menu-header-title ">
          <i class="far fa-calendar" aria-hidden="true"></i>
          <span class="h-title">Appointments</span>
        </div>
      </header>

      <!-- start: sidebar -->
      <aside id="sidebar-left" class="sidebar-left">
        <div class="nano">
          <div class="nano-content">
            <nav id="menu" class="nav-main sidebar-padding" role="navigation">
              <ul class="nav nav-main">
                <li>
                  <router-link to="/menu/messages" class="nav-link bg-blue sidebar-w">
                    <i class="far fa-comment" aria-hidden="true"></i>
                  </router-link>
                </li>
                <li>
                  <router-link to="/menu/documents" class="nav-link bg-green sidebar-w">
                    <i class="fas fa-file" aria-hidden="true"></i>
                  </router-link>
                </li>
                <li>
                  <router-link to="/menu/appointments" class="nav-link bg-orange sidebar-w">
                    <i class="far fa-calendar" aria-hidden="true"></i>
                  </router-link>
                </li>
                <li>
                  <router-link to="/menu/billing" class="nav-link bg-success sidebar-w">
                    <i class="fas fa-dollar-sign" aria-hidden="true"></i>
                  </router-link>
                </li>
                <li>
                  <router-link to="/menu/profile" class="nav-link bg-purple sidebar-w">
                    <i class="fas fa-user" aria-hidden="true"></i>
                  </router-link>
                </li>
                <li>
                  <router-link to="/menu/tasks" class="nav-link bg-red sidebar-w">
                    <i class="fas fa-tasks" aria-hidden="true"></i>
                  </router-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>
      <!-- end: sidebar -->

      <!-- start: page -->
      <router-view></router-view>
      <!-- end: page -->
    </section>
  </div>
</template>
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

  /*HEADER*/
  .menu-header {
    background: #ffa500 !important;
    color: white !important;
    height: 60px;
    padding-left: 20px;
  }

  .menu-header-title {
    padding-top: 15px;
    font-size: 24px;
  }

  .h3-margin-top {
    margin-top: auto;
  }

  .h-title {
    padding-left: 20px;
    font-weight: 600;
    font-size:18px;
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
