<template>
  <div class="inner-wrapper">
    <section role="main" class="content-body">
      <header class="card-header text-center">
        <div class="d-none d-sm-block">
          <h3>Baker Mayfield</h3>
        </div>

        <div class="d-block d-sm-none btn-div-new">
          <button type="button" class="mb-1 mt-1 mr-1 btn btn-lg btn-new">MAKE NEW APPOINTMENT</button>
        </div>

        <!-- start: page DASHBOARD MENU-->
          <dash-menu></dash-menu>
        <!-- end: page -->
      </header>

      <div class="w-100" />

      <div class="container d-lg-flex pt-4">
        <div class="col-12 col-lg-6 col-xl-6">
          <dash-task></dash-task>
          <img class="dash-divider" src="img/line-divider-transparent-1_edited.png" />
          <dash-appointments></dash-appointments>
        </div>
        <div class="col-12 col-lg-6 col-xl-6 offset-lg-2 offset-xl-2">
          <div class="col-12 d-none d-sm-block">
            <button type="button" class="mb-1 mt-1 mr-1 btn btn-new">MAKE NEW APPOINTMENT</button>
          </div>

          <div class="col col-lg-6 col-xl-6">
            <dash-welcome></dash-welcome>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DashTask from '@/components/dashboard/dash-task.vue'
import DashAppointments from '@/components/dashboard/dash-appointments.vue'
import DashWelcome from '@/components/dashboard/dash-welcome.vue'
import DashMenu from '@/components/dashboard/dash-menu.vue'
export default {
  name: 'Dashboard',
  components: {
    DashTask,
    DashAppointments,
    DashWelcome,
    DashMenu
  }
}
</script>

<style scoped>
/* Add here all your CSS customizations */

.btn-new {
  background-color: #ffc266;
  border-color: black;
  font-weight: 600;
}

.dash-divider {
  width: 400px;
  height: 10px;
  margin-bottom: 10px;
}

/* Header Mobile */
@media only screen and (max-width: 767px) {
  .list-text-aligned {
    text-align: left !important;
  }

  .card {
    background: transparent !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: none !important;
    width: 100px !important;
    height: 100px !important;
    padding: 0 5px 0 5px !important;
    margin-left: -5px !important;
  }

  .card-header {
    padding-top: 70px !important;
  }

  .card-body {
    padding: 0 !important;
  }

  /* Header Dark */
  html.dark .header,
  html.header-dark .header {
    background: #0c529c !important;
    border-bottom-color: #0c529c !important;
    border-top-color: #0c529c !important;
  }

  html.dark .header .logo-container,
  html.header-dark .header .logo-container {
    background: #0c529c;
    border-bottom-color: #0c529c;
    border-top-color: #0c529c;
  }

  html.dark .header .header-right,
  html.header-dark .header .header-right {
    background: #0c529c; /*modified by Rizza Herrero*/
    font-size: 10px; /* added by Rizza Herrero */
  }

  .header .logo-container {
    height: 60px;
    left: 0;
    position: static;
    right: 0;
    top: 0;
    z-index: 99;
  }

  .header .header-right {
    background: #fff;
    float: right !important;
    height: 0 !important;
    margin-top: 0 !important;
    width: unset !important;
  }

  .btn-div-new {
    padding-bottom: 10px !important;
  }

  .btn.btn-lg {
    font-size: 1rem;
    padding: 1rem 4rem;
    font-weight: 600;
  }

  .btn-new {
    background-color: #ffc266;
    border-color: black;
  }
}
</style>
