<template>
  <div class="row mx-1">
    <table class="table table-responsive-md mb-5">
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
            <a href="javascript:void(0)" @click="setMsgCurrentPage('Detail')">Missed Appointment 1/12/2010</a>
          </td>
          <td>1/13/2020</td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <a href="javascript:void(0)" @click="setMsgCurrentPage('Detail')">Update Contact Information</a>
          </td>
          <td>12/13/2020</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['setMsgCurrentPage'])
  }
}
</script>

<style>
</style>
