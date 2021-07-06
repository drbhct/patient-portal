<template>
  <form>
    <div class="row justify-content-center">
      <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
        <router-link to="/menu/messages" class="bg-blue">
          <section class="card mb-4">
            <div class="card-body bg-blue">
              <div class="widget-summary widget-summary-sm">
                <div class="justify-content-center text-center">
                  <div class="summary-icon">
                    <i class="far fa-comment" aria-hidden="true"></i>
                  </div>
                  <span class="widget-title mt-0 font-weight-semibold mt-0 text-center">Messages</span>
                </div>
              </div>
            </div>
          </section>
        </router-link>
      </div>
      <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
        <router-link to="/menu/documents" class="bg-green">
          <section class="card mb-4">
            <div class="card-body bg-green">
              <div class="widget-summary widget-summary-sm">
                <div class="justify-content-center text-center">
                  <div class="summary-icon">
                    <i class="fas fa-file" aria-hidden="true"></i>
                  </div>
                  <span class="widget-title mt-0 font-weight-semibold mt-0 text-center">Documents</span>
                </div>
              </div>
            </div>
          </section>
        </router-link>
      </div>
      <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
        <router-link to="/menu/appointments" class="bg-orange">
          <section class="card mb-4">
            <div class="card-body bg-orange">
              <div class="widget-summary widget-summary-sm">
                <div class="justify-content-center text-center">
                  <div class="summary-icon">
                    <i class="far fa-calendar" aria-hidden="true"></i>
                  </div>
                  <span class="widget-title mt-0 font-weight-semibold mt-0 text-center">Appointments</span>
                </div>
              </div>
            </div>
          </section>
        </router-link>
      </div>
      <!--<div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
        <router-link to="/menu/billing" class="bg-dgreen">
          <section class="card mb-4">
            <div class="card-body bg-dgreen">
              <div class="widget-summary widget-summary-sm">
                <div class="justify-content-center text-center">
                  <div class="summary-icon">
                    <i class="fas fa-dollar-sign" aria-hidden="true"></i>
                  </div>
                  <span class="widget-title mt-0 font-weight-semibold mt-0 text-center">Billing</span>
                </div>
              </div>
            </div>
          </section>
        </router-link>
      </div>-->
      <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
        <router-link to="/menu/profile" class="bg-purple">
          <section class="card mb-4">
            <div class="card-body bg-purple">
              <div class="widget-summary widget-summary-sm">
                <div class="justify-content-center text-center">
                  <div class="summary-icon">
                    <i class="fas fa-user" aria-hidden="true"></i>
                  </div>
                  <span class="widget-title mt-0 font-weight-semibold mt-0 text-center">Profile</span>
                </div>
              </div>
            </div>
          </section>
        </router-link>
      </div>
      <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
        <router-link to="/menu/tasks" class="bg-red">
          <section class="card mb-4">
            <div class="card-body bg-red">
              <div class="widget-summary widget-summary-sm">
                <div class="justify-content-center text-center">
                  <div class="summary-icon">
                    <i class="fas fa-tasks" aria-hidden="true"></i>
                  </div>
                  <span class="widget-title mt-0 font-weight-semibold mt-0 text-center">Tasks</span>
                </div>
              </div>
            </div>
          </section>
        </router-link>
      </div>
    </div>
  </form>

</template>
<style scoped>
  .bg-dgreen {
    background: #28a745;
    color: #fff !important;
  }

  .card-body.bg-blue:hover, .card-body.bg-blue:hover a {
    background: #0063cc !important;
  }

  .card-body.bg-orange:hover, .card-body.bg-orange:hover a {
    background: #cc8500 !important;
  }

  .card-body.bg-green:hover, .card-body.bg-green:hover a {
    background: #669966 !important;
  }

  .card-body.bg-purple:hover, .card-body.bg-purple:hover a {
    background: #3e309c !important;
  }

  .card-body.bg-red:hover, .card-body.bg-red:hover a {
    background: #ea4848 !important;
  }

  .card-body.bg-dgreen:hover, .card-body.bg-dgreen:hover a {
    background: #23903c !important;
  }

  .p-dash-stat {
    font-size: 12px;
  }

  .content-body {
    padding: unset;
  }

  .card-header {
    background: #f6f6f6;
    border-radius: 5px 5px 5px 5px !important;
    border-bottom: 1px solid #dadada;
    position: relative;
  }

  .card-body.bg-blue {
    background: #007bff;
    color: #fff;
    border-bottom: 0 none;
    border-right: 0 none;
  }

  .summary-icon.bg-blue {
    background: #007bff;
    color: #fff;
    border-bottom: 0 none;
    border-right: 0 none;
  }

  .card-body.bg-orange {
    background: #ffa500;
    color: #fff;
    border-bottom: 0 none;
    border-right: 0 none;
  }

  .summary-icon.bg-orange {
    background: #ffa500;
    color: #fff;
    border-bottom: 0 none;
    border-right: 0 none;
  }

  .card-body.bg-green {
    background: #93c47d;
    color: #fff;
    border-bottom: 0 none;
    border-right: 0 none;
  }

  .summary-icon.bg-green {
    background: #90ee90;
    border-bottom: 0 none;
    border-right: 0 none;
  }

  .card-body.bg-purple {
    background: #6a5acd;
    color: #fff;
    border-bottom: 0 none;
    border-right: 0 none;
  }

  .summary-icon.bg-purple {
    background: #6a5acd;
    border-bottom: 0 none;
    border-right: 0 none;
  }

  .card-body.bg-red {
    background: #f08080;
    color: #fff;
    border-bottom: 0 none;
    border-right: 0 none;
  }

  .summary-icon.bg-red {
    background: #f08080;
    border-bottom: 0 none;
    border-right: 0 none;
  }

  .card-spacing {
    padding-left: 5px;
    padding-right: 5px;
  }

  .bg-primary .widget-summary .summary-footer {
    border-top: 0;
  }

  .widget-summary.widget-summary-sm .summary-icon {
    width: unset;
    height: 50px;
    line-height: 50px;
    font-size: 2.7rem;
  }

  .widget-summary .summary-icon {
    margin-right: auto;
    height: 90px;
    line-height: 90px;
    font-size: 51.2px;
    font-size: 3.2rem;
    text-align: center;
    color: #fff;
    border-radius: 55px;
  }

  /* Header Mobile */
  @media only screen and (max-width: 767px) {
    .card {
      background: transparent !important;
      -webkit-box-shadow: none !important;
      box-shadow: none !important;
      border: none !important;
      width: 100px !important;
      height: 100px !important;
      padding: 0 5px 0 5px !important;
      margin-left: -3px !important;
    }

    .card-header {
      padding-top: 70px !important;
    }

    .card-body {
      padding: 0 !important;
    }

    .summary-icon {
      margin: auto;
    }

    .widget-summary.widget-summary-sm .summary-icon {
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 27.2px;
      font-size: 2.7rem;
      padding-top: 10px;
      margin-bottom: 10px;
    }

    .widget-summary.widget-summary-sm .widget-title {
      font-size: 11px;
    }

    .content-body {
      padding: unset;
    }

    .nav-link {
      display: block;
      padding: 1rem 0.5rem;
    }

    .inner-wrapper {
      min-height: 0;
      padding-top: 0;
    }
  }

  /* ----------- iPhone 5, 5S, 5C and 5SE ----------- */
  @media only screen and (max-device-width: 320px) {
    .card {
      margin-left: -12px !important;
    }
  }
  /* ----------- iPhone Plus ----------- */
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) {
    .card {
      margin-left: 0 !important;
      padding: 0 !important;
    }
  }
</style>
