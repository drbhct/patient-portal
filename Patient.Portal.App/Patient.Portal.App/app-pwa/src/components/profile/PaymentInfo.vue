<template>
  <form class="form-horizontal m-lg-4">
    <div class="form-group row">
      <div class="col-12 col-lg-6 col-xl-6">
        <h3>Payment Information</h3>
      </div>
      <div class="col-6 col-lg-6 col-xl-6 d-none d-lg-block d-xl-block">
        <div class="float-right">
          <button class="btn btn-primary btn-w-160">ADD NEW</button>
        </div>
      </div>
    </div>
    <div class="form-group row pt-lg-4 pt-md-4">
      <div class="col-12 col-lg-6 col-xl-6">
        <h4> Card on File</h4>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-12 col-lg-6 col-xl-6">
        <p>
          Name on Card: Rizza Herrero <br />
          Last 4: xxxx-xxxx-xxxx-1234 <br />
          Expires: 02/02/2022
        </p>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-12 col-lg-6 col-xl-6">
        <button class="btn btn-primary btn-w-160">UPDATE</button>
      </div>
    </div>
    <div class="form-group row d-lg-none">
      <div class="col-12 col-lg-6 col-xl-6">
        <button class="btn btn-primary btn-w-160">ADD NEW</button>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {

  },
  methods: {
  }
}
</script>
<style scoped>
  h4 {
    font-weight: 600 !important;
  }
  .btn-w-160 {
    width: 160px !important;
  }
</style>
