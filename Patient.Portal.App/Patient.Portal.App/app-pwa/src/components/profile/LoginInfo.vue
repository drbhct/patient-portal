<template>
  <form class="form-horizontal m-lg-4">
    <h3>Login Information</h3>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-left pt-4" for="inputDefault">User Name:</label>
      <label class="col-lg-2 control-label text-lg-left pt-4" for="inputDefault">rizza@phirecomm.net</label>
    </div>
    <div class="form-group row">
      <img class="dash-divider" src="img/line-divider-transparent-1_edited.png" />
    </div>
    <div class="form-group row">
      <div class="col-12">
        <span class="header-d-text">Password</span>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-12 col-md-4 col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter New Password">
      </div>
    </div>
    <div class="form-group row">
      <div class="col-12 col-md-4 col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Confirm New Password">
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-6">
        <button class="btn btn-primary">UPDATE PASSWORD</button>
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
  h4 {
    font-weight: 600 !important;
  }
  /* ----------- iPhone 5, 5S, 5C and 5SE ----------- */
  @media only screen and (min-device-width: 320px) and (max-device-width: 568x) {
    .dash-divider {
      width: 320px;
    }
  }
  /* ----------- iphone 6+, 6s+, 7+, 8+ ----------- */
  @media only screen and (min-device-width: 414px) and (max-device-width : 736px) {
    .dash-divider {
      width: 420px;
    }
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) {
    .dash-divider {
      max-width: 375px;
    }
  }
</style>
