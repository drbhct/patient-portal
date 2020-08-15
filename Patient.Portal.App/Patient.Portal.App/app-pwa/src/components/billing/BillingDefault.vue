<template>
  <div class="mx-1">
      <h3>Statements</h3>
      <br>
      <div>
          <table class="table table-responsive-md mb-5">
              <thead>
                  <tr>
                      <th>Statement</th>
                      <th>Balance</th>
                      <th>Due Date</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td><a href="javascript:void(0)">November 2019</a></td>
                      <td>$44.23</td>
                      <td>2/12/2020</td>
                  </tr>
                  <tr>
                      <td><a href="javascript:void(0)">December 2019</a></td>
                      <td>$88.46</td>
                      <td>1/12/2020</td>
                  </tr>
              </tbody>
          </table>
      </div>
      <div>
          <h4>Balance due: $88.46</h4>
          <div class="col-lg-5">
              <button class="btn-primary btn-lg btn-block" @click="setBillingCurrentPage('MakePayment')">MAKE PAYMENT</button>
          </div>
          <h5>* Balance due may not reflect recent payments</h5>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['setBillingCurrentPage'])
  }
}
</script>

<style>

</style>
