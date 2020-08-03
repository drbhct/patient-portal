<template>
  <div>
    <div class="row mt-5 mr-2 ml-2">
      <div class="col-lg-5">
        <div class="row mb-3 justify-content-md-center">
          <div class="col-xl-8 mb-5">
            <img
              src="img/Healthcore Logo White (Transparent).png"
              alt
              height="80"
              class="img-fluid"
            />
          </div>
          <div class="col-xl-8 mb-3">
            <section class="card card-featured-left card-featured-secondary">
              <div class="card-body">
                <form>
                  <span>
                    <h3>PORTAL LOGIN</h3>
                  </span>
                  <!-- to error: add class "has-danger" -->
                  <div class="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input
                      type="email"
                      class="form-control form-control-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="form-group mb-4">
                    <label for="exampleInputPassword1">Password</label>
                    <!-- <a href="#" style="float:right;font-size:12px;">Forgot password?</a> -->
                    <input
                      type="password"
                      class="form-control form-control-sm"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <button type="button" class="mb-1 mt-1 mr-5 btn btn-primary">Login</button>
                  <a href="#" class="ml-3">Need help logging in?</a>
                </form>
              </div>
            </section>
          </div>
          <div class="col-xl-8 mb-5">
            <section class="card card-featured-left card-featured-secondary">
              <div class="card-body">
                <form>
                  <span>
                    <h3>CREATE ACCOUNT</h3>
                  </span>
                  <!-- to error: add class "has-danger" -->
                  <div class="form-group mb-3">
                    <input
                      type="email"
                      class="form-control form-control-sm"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter PIN"
                    />
                  </div>
                  <button type="button" class="mb-1 mt-1 mr-5 btn btn-primary">Sign Up</button>
                  <a href="#" class="ml-5">Need PIN?</a>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div class="col-lg-5 mb-5 mt-7 d-none d-sm-block">
        <img
          data-src="holder.js/100px250"
          class="img-fluid"
          alt="100%x250"
          src="img/stock office.jpg"
          data-holder-rendered="true"
        />
      </div>
    </div>
    <div class="row mt-5 mr-2 ml-2">
      <div class="col-lg-5 mb-5 order-2 order-sm-1">
        <div class="row mb-3 justify-content-md-center">
          <div class="col-xl-8 mb-5">
            <p class="text-left">Your Patient Portal</p>
            <p
              class="text-justify"
            >Access health information online, instead of over the phone or in person. The patient portal allows you to:</p>
            <span class="text-left ml-3">
              <ul>
                <li>Keep contact information current</li>
                <li>Request appointments</li>
                <li>Pay statements and view</li>
                <li>Access documents</li>
                <li>And much more</li>
              </ul>
            </span>
            <p
              class="text-left"
            >If you have any questions or concerns, please feel free to contact us. Were here to help!</p>
          </div>
        </div>
      </div>
      <div class="col-lg-5 mb-5 order-1 order-sm-2">
        <div class="row mb-3 justify-content-md-center">
          <div class="col-xl-8 mb-5">
            <span class="text-center">
              <h2>Office Information</h2>
            </span>
            <p class="text-center">
              <strong>Phone:</strong> (702) 555-1212
              <br />
              <strong>Office Hours:</strong> 9 am - 5 pm M-F
            </p>
            <p class="text-center">
              1234 Main St.
              <br />Cleveland, OH 444142
              <br />44142
            </p>
          </div>
          <div class="col-xl-8 mb-5">
            <iframe
              width="520"
              height="400"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              id="gmap_canvas"
              src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=%20General%20Trias+(Demo)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
            <a href="https://www.embed-map.net/">add google map</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
