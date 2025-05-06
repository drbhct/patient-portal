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
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

export default {
  name: 'MessagesList',
  components: {
    List,
    Detail,
    Create
  },
  setup() {
    const messageStore = useMessageStore()
    const { getMsgCurrentPage } = storeToRefs(messageStore)

    return {
      getMsgCurrentPage
    }
  }
}
</script>
