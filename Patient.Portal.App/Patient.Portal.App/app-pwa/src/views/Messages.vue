<template>
  <div>
    <header class="page-header">
      <h2>
        <i class="far fa-comment" aria-hidden="true"></i>
        Messages
      </h2>
    </header>
    <div class="row">
      <table class="table table-bordered table-responsive-md mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <a href="#">Missed Appointment 1/12/2010</a>
            </td>
            <td>1/13/2020</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <a href>Update Contact Information</a>
            </td>
            <td>12/13/2020</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    console.log('hello world')
  }
}
</script>
