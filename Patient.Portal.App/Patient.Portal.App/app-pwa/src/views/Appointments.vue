<template>
  <div class="form">
    <!-- <div class="col-12">
      <button type="button" class="mb-1 mt-1 mr-1 btn btn-lg btn-new">MAKE NEW APPOINTMENT</button>
    </div>
    <img class="dash-divider" src="/img/line-divider-transparent-1_edited.png" /> -->
    <div class="col-12">
      <list></list>
    </div>
  </div>
</template>

<script>
import List from '../components/appointments/ApptList.vue'
import { useAppointmentStore } from '@/stores/appointment'
export default {
  name: 'AppointmentsView',
  components: {
    List
  },
  setup() {
    const appointmentStore = useAppointmentStore()
    return { appointmentStore }
  }
}
</script>

<style scoped>
.menu-header {
  background: #ffa500 !important;
  color: white !important;
  height: 60px;
  padding-left: 20px;
  width: 100%;
}
.menu-header-title {
  padding-top: 15px;
  font-size: 24px;
}
.h3-margin-top {
  margin-top: auto;
}
.h-title {
  padding-left: 20px;
  font-weight: 600;
}
.dash-divider {
  width: 100%;
  height: 4px;
  margin-bottom: 10px;
  margin-top: 10px;
}

/* ----------- iPhone 5, 5S, 5C and 5SE ----------- */
@media only screen and (max-device-width: 320px) {
  .dash-divider {
    width: 320px;
    height: 4px;
  }
}

/* ----------- iPhone Plus ----------- */
@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) {
  .dash-divider {
    width: 415px;
    height: 4px;
  }
}
</style>
