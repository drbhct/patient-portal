<template>
  <form class="form-horizontal m-lg-4">
    <h3>My Information</h3>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="firstname">First Name:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="inputDefault">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">Last Name:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="lastname">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">Nick Name:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="nickname">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-lg-2 control-label text-lg-right pt-2" for="inputDefault">Email:</label>
      <div class="col-lg-4 col-xl-4">
        <input type="text" class="form-control" id="email">
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-2"></div>
      <div class="col-lg-4 col-xl-4">
        <button class="btn btn-primary btn-w-160">UPDATE</button>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style scoped>
  .btn-w-160 {
    width: 160px !important;
  }
</style>
