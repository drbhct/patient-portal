<template>
  <section role="main">
    <div class="mt-5 mr-2 ml-2 justify-content-md-center">
      <div class="card">
        <header class="card-header">
          <h2 class="card-title"></h2>
        </header>
        <div class="card-body">
          <div class="form-horizontal">
            <div class="form-group row">
              <label class="col-lg-3 control-label text-lg-right pt-2">Is today's visit due to an auto accident?</label>
              <div class="col-lg-6">
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="question"
                    :checked="isAutoAccident"
                    @click="toggle(true)"
                  />
                  <label class="form-check-label"
                    >Yes</label
                  >
                </div>
                <div class="form-check">
                    <input
                    type="radio"
                    class="form-check-input"
                    name="question"
                    :checked="!isAutoAccident"
                    @click="toggle(false)"
                  />
                  <label class="form-check-label"
                    >No</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isAutoAccident: null
    }
  },
  methods: {
    toggle(val) {
      this.isAutoAccident = val
    }
  }
}
</script>

<style>
</style>
