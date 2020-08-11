<template>
  <div class="ml-3">
    <component v-bind:is="getMsgCurrentPage"></component>
  </div>
</template>
<script>
import List from '../components/messages/MsgList.vue'
import Detail from '../components/messages/MsgDetails.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    List,
    Detail
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
