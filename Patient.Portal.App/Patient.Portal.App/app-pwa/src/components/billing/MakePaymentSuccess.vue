<template>
  <div>
    <a href="javascript:void(0)" @click="setBillingCurrentPage('Default')">
      <i class="fas fa-angle-left"></i>
      Back to Billing
    </a>
    <div class="row mx-1">
      <div class="col-lg-10">
        <h3>PAYMENT RECEIVED</h3>
        <p class="mt-4">
          <font style="vertical-align: inherit;">
            <font
              style="vertical-align: inherit;"
            >We've received the payment submitted and are processing now.</font>
            <br />
            <strong>
              <font style="vertical-align: inherit;">Payment Summary</font>
            </strong>

            <br />
            <font
              style="vertical-align: inherit;"
            >Payment received successfull on 1/21/2020 in the amount of $44.23</font>
            <br />
            <font style="vertical-align: inherit;">The payment metod was VISA 4122.</font>
            <br />
            <font style="vertical-align: inherit;">Thank you!</font>
            <br />
          </font>
        </p>
      </div>
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
