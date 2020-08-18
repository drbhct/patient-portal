<template>
  <div>
    <a href="javascript:void(0)" @click="setMsgCurrentPage('List')">
      <i class="fas fa-angle-left"></i>
      Back to Messages
    </a>
    <div class="row mx-1">
      <h3>Missed Appointment 1/12/2020</h3>
      <p class="mt-4">
        <font style="vertical-align: inherit;">
          <font
            style="vertical-align: inherit;"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</font>
          <font style="vertical-align: inherit;">No entire weekend and weekend care.</font>
          <font style="vertical-align: inherit;">Stress mass photography and various developers.</font>
          <font style="vertical-align: inherit;">At one wants to put a tomato but he was not.</font>
          <font
            style="vertical-align: inherit;"
          >Present the course of non ligula tempor condimentum ipsum.</font>
          <font style="vertical-align: inherit;">Maecenas ornare vitae nibh blandit suscipit.</font>
          <font style="vertical-align: inherit;">Life takes no soft dui airline.</font>
          <font style="vertical-align: inherit;">There is no entrance or refrigerator.</font>
          <font
            style="vertical-align: inherit;"
          >However, developers have a lot region drink enhanced.</font>
          <font style="vertical-align: inherit;">Now fears carton set undergraduate author.</font>
          <font
            style="vertical-align: inherit;"
          >Somehow they were very important, the laughter of life, malesuada eu, mattis dapibus adipiscing elit.</font>
          <font
            style="vertical-align: inherit;"
          >Nullam elit quis, fermentum dictum there is no id, gravida dignissim eros.</font>
        </font>
      </p>
    </div>
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
