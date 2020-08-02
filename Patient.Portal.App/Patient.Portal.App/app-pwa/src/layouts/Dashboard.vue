<template>
  <div class="inner-wrapper">
    <section role="main" class="content-body">
      <header class="card-header text-center">
        <div class="d-none d-sm-block">
          <h3>Baker Mayfield</h3>
        </div>

        <div class="d-block d-sm-none">
          <button type="button" class="mb-1 mt-1 mr-1 btn btn-lg btn-warning">MAKE NEW APPOINTMENT</button>
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
                      </td>
                    </tr>
                    <tr>
                      <td class="dash-task-col-title">2. Patient Complaint Form #3564</td>
                      <td class="dash-task-col-action">
                        <button class="mb-1 mt-1 mr-1 btn btn-sm btn-primary dash-task-btn">GO TO FORM</button>
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
            <button type="button" class="mb-1 mt-1 mr-1 btn btn-warning">MAKE NEW APPOINTMENT</button>
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
