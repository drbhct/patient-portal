<template>
  <div class="mx-1">
    <div class="col-lg-12">
      <h2>Statement 123456</h2>
      <form class="my-5 col-lg-7">
        <div class="form-group row">
          <label>Select Payment Method</label>
        </div>
        <div class="form-group row">
          <div class="col-lg-6 mx-1 my-1">
            <select class="form-control" id="exampleFormControlSelect1">
              <option>VISA (02/22) - 4212</option>
              <option>MASTERCARD (05/25) - 5433</option>
            </select>
          </div>
          <div class="col-lg-5 mx-1 my-1">
            <button class="btn btn-default btn-lg btn-block">Pay with different card</button>
          </div>
          <!-- <div class="col-sm-5">
            <button class="btn btn-primary btn-lg btn-block">Pay with different card</button>
          </div>-->
        </div>
        <div class="form-group row">
          <label>Amount</label>
        </div>
        <div class="form-group row">
          <div class="col-lg-6">
            <input type="number" class="form-control" placeholder="Enter Amount" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-6 mx-1 my-1">
            <button class="btn btn-primary btn-lg btn-block">MAKE PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
