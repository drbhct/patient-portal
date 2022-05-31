<template>
  <div class="mx-1">
    <div class="col-lg-12">
      <h2>Statement 123456</h2>
      <div v-if="statementInfo" class="ml-3">
        <div class="row">
          <div class="d-inline p-2"><strong>Statement Date:</strong></div>
          <div class="d-inline p-2">
            {{ statementInfo.StatementDate }}
          </div>
        </div>
        <div class="row">
          <div class="d-inline p-2"><strong>Due Date:</strong></div>
          <div class="d-inline p-2">
            {{ statementInfo.PmtDueDate }}
          </div>
        </div>
        <div class="row">
          <div class="d-inline p-2"><strong>Total Due:</strong></div>
          <div class="d-inline p-2">
            {{ evenRound(statementInfo.TotalDue, 2, 'money') }}
          </div>
        </div>
      </div>
      <form class="my-5 col-lg-7">
        <div class="form-group row">
          <div class="col-lg-3">
            <label>Select Payment Method</label>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-6 mx-1 my-1">
            <select class="form-control" required>
              <option disabled selected hidden value="">Select Card</option>
              <option>VISA (02/22) - 4212</option>
              <option>MASTERCARD (05/25) - 5433</option>
            </select>
          </div>
          <div class="col-lg-5 mx-1 my-1">
            <button class="btn btn-default btn-lg btn-block">
              Pay with different card
            </button>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-3">
            <label>Amount</label>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-6">
            <input
              type="number"
              step="0.01"
              class="form-control"
              placeholder="Enter Amount"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-6 mx-1 my-1">
            <button class="btn btn-primary btn-lg btn-block">
              MAKE PAYMENT
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['currentPatientAssociated', 'getBillingTaskStatement']),
    statementInfo () {
      if (!this.getBillingTaskStatement) {
        return null
      }

      const info = JSON.parse(this.getBillingTaskStatement.info)
      return info
    }
  },
  methods: {
    // https://stackoverflow.com/questions/3108986/gaussian-bankers-rounding-in-javascript
    evenRound (num, decimalPlaces, hasFormat) {
      try {
        if (!num) {
          return ''
        }
        var d = decimalPlaces || 0
        var m = Math.pow(10, d)
        var n = +(d ? num * m : num).toFixed(8) // Avoid rounding errors
        var i = Math.floor(n)
        var f = n - i
        var e = 1e-8 // Allow for rounding errors in f
        var r =
          f > 0.5 - e && f < 0.5 + e ? (i % 2 === 0 ? i : i + 1) : Math.round(n)
        let retVal = d ? r / m : r

        switch (hasFormat) {
          case 'comma':
            // console.log("retVal>", retVal)
            retVal = Number(retVal).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })
            break
          case 'money':
            retVal = Number(retVal).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
            retVal = '$ ' + retVal
            break
          case 'percent':
            retVal = Number(retVal).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
            retVal = retVal + ' %'
            break
          default:
            break
        }
        return retVal
      } catch (ex) {
        console.error('error> ' + ex)
      }
    }
  }
}
</script>

<style>
</style>
