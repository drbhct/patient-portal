<template>
  <div class="form">
    <div class="col-12">
      <button type="button" class="mb-1 mt-1 mr-1 btn btn-lg btn-new">MAKE NEW APPOINTMENT</button>
    </div>
    <img class="dash-divider" src="img/line-divider-transparent-1_edited.png" />
    <div class="col-12">
      <list></list>
    </div>
  </div>
</template>

<script>
import List from '../components/appointments/ApptList.vue'
export default {
  components: {
    List
  }
}
</script>

<style scoped>
  .menu-header {
    background: #ffa500 !important;
    color:white!important;
    height:60px;
    padding-left:20px;
    width:100%;
  }
  .menu-header-title {
    padding-top:15px;
    font-size: 24px;
  }
  .h3-margin-top {
    margin-top:auto;
  }
  .h-title {
    padding-left:20px;
    font-weight:600;
  }
  .dash-divider {
    width: 100%;
    height: 10px;
    margin-bottom: 10px;
    margin-top:10px;
  }
</style>
