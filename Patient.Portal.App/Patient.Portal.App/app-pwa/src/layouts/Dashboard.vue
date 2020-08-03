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
                    <span
                      class="widget-title mt-0 font-weight-semibold mt-0 text-center"
                    >Appointments</span>
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
        <!-- end: page -->
      </header>

      <div class="w-100" />

      <div class="container d-lg-flex pt-4">
        <div class="col-12 col-lg-6 col-xl-6">
          <form class="form-horizontal">
            <h3>My Task List</h3>
            <img class="dash-divider" src="img/line-divider-transparent-1.png" />
            <div class="form-group row">
              <div class="col-12 col-lg-8 col-xl-8">
                <table class="w-100">
                  <tbody>
                    <tr>
                      <td class="dash-task-col-title">1. Pay Statement #3564</td>
                      <td class="dash-task-col-action">
                        <button class="mb-1 mt-1 mr-1 btn btn-sm btn-primary dash-task-btn">PAY $520</button>
                        <p class="p-dash-stat">Statement due: 02/02/2020</p>
                      </td>
                    </tr>
                    <tr>
                      <td class="dash-task-col-title">2. Patient Complaint Form #3564</td>
                      <td class="dash-task-col-action">
                        <button
                          class="mb-1 mt-1 mr-1 btn btn-sm btn-primary dash-task-btn"
                        >GO TO FORM</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <img class="dash-divider" src="img/line-divider-transparent-1.png" />
            <div class="form-group row">
              <div class="col">
                <p class="dash-appt-title">Upcoming appointments</p>
              </div>
            </div>
          </form>
        </div>
        <div class="col-12 col-lg-6 col-xl-6 offset-lg-2 offset-xl-2">
          <div class="col-12 d-none d-sm-block">
            <button type="button" class="mb-1 mt-1 mr-1 btn btn-new">MAKE NEW APPOINTMENT</button>
          </div>

          <div class="col-lg-6 col-xl-6">
            <h3>Welcome</h3>
            <p
              class="text-left"
            >Access health information online instead of over the phone or in person. The patient portal allows you to:</p>

            <ul>
              <li>keep contact information current</li>
              <li>Request appointments</li>
              <li>Pay statements and view invoices</li>
              <li>Access documents</li>
              <li>And much more</li>
            </ul>

            <p>If you have any question or concerns, please feel free to contact us. We here to help!</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
/* Add here all your CSS customizations */

.btn-new {
  background-color: #ffc266;
  border-color: black;
  font-weight: 600;
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

.dash-task-btn {
  width: 150px;
}

.dash-task-col-title {
  display: block;
}

.dash-task-col-action {
  display: block;
  float: right;
}
.dash-divider {
  width: 400px;
  height: 30px;
  margin-bottom: 10px;
}

.dash-appt-title {
  font-size: 14px;
  font-weight: 600 !important;
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
  /* Added by Rizza Herrero */
  .nav-link {
    display: block;
    padding: 1rem 0.5rem;
  }
  /* End*/

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

  .inner-wrapper {
    min-height: 0;
    padding-top: 0;
  }

  .content-body {
    padding: unset;
  }

  .dash-task-col-action {
    text-align: center;
    float: none !important;
  }

  /*added by Rizza Herrero*/
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

  .btn.btn-lg {
    font-size: 1rem;
    padding: 1rem 4rem;
    font-weight: 600;
  }

  .btn-new {
    background-color: #ffc266;
    border-color: black;
  }

  .btn-div-new {
    padding-bottom: 10px;
  }
}
</style>
