<template>
  <div class="col-md-12">
    <form
      @submit.prevent="savePatientInfo"
      class="mt-5 mr-2 ml-2 justify-content-md-center"
    >
      <div class="row form-group">
        <div class="col-lg-4">
          <div class="form-group">
            <label class="col-form-label"
              >First Name</label
            >
            <input
              type="text"
              class="form-control"
              placeholder=""
            />
          </div>
        </div>
        <div class="col-lg-1">
          <div class="form-group">
            <label class="col-form-label"
              >Middle Initial</label
            >
            <input
              type="text"
              class="form-control"
              placeholder=""
            />
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <label class="col-form-label"
              >Last Name</label
            >
            <input
              type="text"
              class="form-control"
              placeholder=""
            />
          </div>
        </div>
        <div class="col-lg-3">
          <div class="form-group">
            <label class="col-form-label"
              >Nick Name</label
            >
            <input
              type="text"
              class="form-control"
              placeholder=""
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    savePatientInfo () {}
  }
}
</script>
