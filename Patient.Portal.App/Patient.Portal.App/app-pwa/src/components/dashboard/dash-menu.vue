<template>
  <form>
    <div class="row justify-content-center">
      <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
        <section class="card mb-4">
          <div class="card-body bg-primary">
            <div class="widget-summary widget-summary-sm">
              <div class="justify-content-center text-center">
                <div class="summary-icon bg-primary">
                  <i class="far fa-comment"></i>
                </div>
                <span class="widget-title mt-0 font-weight-semibold mt-0 text-center">Messages</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
        <section class="card mb-4">
          <div class="card-body bg-green">
            <div class="widget-summary widget-summary-sm">
              <div class="justify-content-center text-center">
                <div class="summary-icon bg-green">
                  <i class="fas fa-file"></i>
                </div>
                <span class="widget-title mt-0 font-weight-semibold mt-0 text-center">Documents</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
        <section class="card mb-4">
          <div class="card-body bg-orange">
            <div class="widget-summary widget-summary-sm">
              <div class="justify-content-center text-center">
                <div class="summary-icon bg-orange">
                  <i class="far fa-calendar"></i>
                </div>
                <span class="widget-title mt-0 font-weight-semibold mt-0 text-center">Appointments</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
        <section class="card mb-4">
          <div class="card-body bg-success">
            <div class="widget-summary widget-summary-sm">
              <div class="justify-content-center text-center">
                <div class="summary-icon bg-success">
                  <i class="fas fa-dollar-sign"></i>
                </div>
                <span class="widget-title mt-0 font-weight-semibold mt-0 text-center">Billing</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
        <section class="card mb-4">
          <div class="card-body bg-purple">
            <div class="widget-summary widget-summary-sm">
              <div class="justify-content-center text-center">
                <div class="summary-icon bg-purple">
                  <i class="far fa-user"></i>
                </div>
                <span class="widget-title mt-0 font-weight-semibold mt-0 text-center">Profile</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
        <section class="card mb-4">
          <div class="card-body bg-red">
            <div class="widget-summary widget-summary-sm">
              <div class="justify-content-center text-center">
                <div class="summary-icon bg-red">
                  <i class="fas fa-tasks"></i>
                </div>
                <span class="widget-title mt-0 font-weight-semibold mt-0 text-center">Tasks</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </form>

</template>
<style scoped>
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
    background: #90ee90;
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
      margin-left: -5px !important;
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
</style>
