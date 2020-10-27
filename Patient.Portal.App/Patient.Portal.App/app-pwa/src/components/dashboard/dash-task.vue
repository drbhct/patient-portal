<template>
  <form class="form-horizontal">
    <div class="header-t-text d-block">
      My Task List
    </div>
    <div class="d-block">
      <img class="dash-divider" src="img/line-divider-transparent-1_edited.png" />
    </div>
    <div class="form-group row mb-3">
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
                <button class="mb-1 mt-1 mr-1 btn btn-sm btn-primary dash-task-btn">
                  GO TO FORM
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </form>
</template>
<style scoped>
  .dash-divider {
    width: 400px;
    height: 4px;
    margin-bottom: 10px;
  }
  /* ----------- iPhone 6, 7, 8 ----------- */
  @media only screen and (max-device-width: 375px) and (orientation: portrait) {
    .dash-divider {
      width: 360px;
    }
  }
  @media only screen and (max-device-width: 667px) and (orientation: landscape) {
    .dash-divider {
      width: 650px;
    }
  }
  /* ----------- iPhone Plus ----------- */
  @media only screen and (max-device-width: 414px) and (orientation: portrait) {
    .dash-divider {
      width: 390px;
    }
  }
  @media only screen and (device-width: 736px) and (orientation: landscape) {
    .dash-divider {
      width: 720px;
    }
  }

  /*IPHONE X */
  @media only screen and (max-device-width: 375px) and (orientation: portrait) {
    .dash-divider {
      width: 360px;
    }
  }
  @media only screen and (device-width: 812px) and (orientation: landscape) {
    .dash-divider {
      width: 670px;
    }
  }
  /* ----------- iPhone 5, 5S, 5C and 5SE ----------- */
  @media only screen and (max-device-width: 320px) and (orientation: portrait) {
    .dash-divider {
      width: 300px;
    }
  }

  @media only screen and (max-device-width: 568px) and (orientation: landscape) {
    .dash-divider {
      width: 550px !important;
    }
  }
</style>
