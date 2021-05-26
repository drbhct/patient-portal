<template>
  <div class="form">
    <div class="col-12">
      <component v-bind:is="getMsgCurrentPage"></component>
    </div>
  </div>
</template>
<script>
import List from '../components/messages/MsgList.vue'
import Detail from '../components/messages/MsgDetails.vue'
import Create from '../components/messages/MsgCreate.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    List,
    Detail,
    Create
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getMsgCurrentPage'])
  }
}
</script>
