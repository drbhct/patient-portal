<template>
  <div class="form">
    <table id="tblDemo" class="table tbl-bordered table-striped pt-4 w-100">
      <thead>
        <tr class="text-center">
          <td class="header-text">Appointment</td>
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
  .header-text {
    font-size: 16px;
    font-weight: 600 !important;
  }
</style>
