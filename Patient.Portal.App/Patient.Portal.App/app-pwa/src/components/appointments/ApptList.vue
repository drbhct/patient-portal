<template>
  <div class="form">
    <h4>Upcoming Appointments</h4>
    <table id="tblDemo" class="table mb-5 tbl-bordered table-striped">
      <thead>
        <tr>
          <td>Schedule</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span>Wednesday 5/6/2020 @ 10:00 AM</span></td>
        </tr>
        <tr>
          <td><span>Tuesday 5/12/2020 @ 9:30 AM</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  mounted () {
    // eslint-disable-next-line no-undef
    $('#tblDemo').DataTable()
  }
}
</script>
<style scoped>
</style>
