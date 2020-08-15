<template>
  <form class="my-5 col-lg-7" @submit.prevent="submitPayment">
    <div class="form-group row">
      <div class="col-lg-3">
        <label>Card number</label>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-6">
        <input type="number" class="form-control" min="0" v-model="payment.cardNum" required />
      </div>
    </div>

    <div class="form-group row">
      <div class="col-lg-3">
        <label>Expiration Date</label>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-3 mx-1 my-1">
        <select class="form-control" v-model="payment.expireMonth" required>
          <option v-for="month in monthList" value="month.value" :key="month.text">{{ month.text }}</option>
        </select>
      </div>
      <div class="col-lg-3 mx-1 my-1">
        <select class="form-control" v-model="payment.expireYear" required>
          <option v-for="year in yearList" value="year" :key="year">{{ year }}</option>
        </select>
      </div>
    </div>

    <div class="form-group row">
      <div class="col-lg-3">
        <label>CVC (Security Code)</label>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-6">
        <input type="text" class="form-control" v-model="payment.cvc" required />
      </div>
    </div>

    <div class="form-group row">
      <div class="col-lg-3">
        <label>Amount</label>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-6">
        <input type="number" class="form-control" placeholder="Enter Amount" v-model="payment.amount"/>
      </div>
    </div>

    <div class="form-group row">
      <div class="col-lg-5">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" v-model="payment.saveInfo" />
          <label class="form-check-label">Save to available payment methods?</label>
        </div>
      </div>
    </div>

    <div class="form-group row">
      <div class="col-lg-6 mx-1 my-1">
        <button class="btn btn-primary btn-lg btn-block">MAKE PAYMENT</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      payment: {
        cardNum: '',
        cvc: '',
        expireMonth: '',
        expireYear: '',
        saveInfo: false,
        amount: ''
      }
    }
  },
  computed: {
    monthList () {
      return [
        { text: 'Jan', value: 1 },
        { text: 'Feb', value: 2 },
        { text: 'Mar', value: 3 },
        { text: 'Apr', value: 4 },
        { text: 'May', value: 5 },
        { text: 'Jun', value: 6 },
        { text: 'Jul', value: 7 },
        { text: 'Aug', value: 8 },
        { text: 'Sep', value: 9 },
        { text: 'Oct', value: 10 },
        { text: 'Nov', value: 11 },
        { text: 'Dec', value: 12 }
      ]
    },
    yearList () {
      const currYear = new Date().getFullYear()
      const arr = []
      for (let index = 0; index < 10; index++) {
        arr.push(currYear + index)
      }
      return arr
    }
  },
  methods: {
    submitPayment () {}
  }
}
</script>
