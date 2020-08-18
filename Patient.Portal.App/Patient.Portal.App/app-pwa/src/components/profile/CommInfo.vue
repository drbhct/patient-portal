<template>
  <form class="form-horizontal m-lg-4">
    <h3>Communication Preferences</h3>
    <div class="form-group row pt-lg-4 pt-md-4 pt-2">
      <div class="col-12 col-lg-6 col-xl-6">
        <h4>Appointment Reminders</h4>
      </div>
    </div>
    <div v-for="item in chkList" :key="item.id" class="form-group row">
      <div class="col-12 col-lg-6 col-xl-6">
        <div class="checkbox-custom checkbox-default">
          <input type="checkbox" checked="" id="item.id">
          <label for="viacall">{{item.value}}</label>
        </div>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-12 col-lg-6 col-xl-6">
        <button class="btn btn-primary btn-w-160">UPDATE</button>
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
      chkList: [
        { id: 1, value: 'Send via Email' },
        { id: 2, value: 'Send via Text Message' },
        { id: 3, value: 'Call' }
      ]
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
