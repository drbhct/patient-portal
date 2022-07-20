<template>
  <div class="row">
    <div class="header-d-text">
      Welcome<span class="d-sm-none"> to Your Patient Portal</span>
    </div>
    <div class="font-weight-600">
      <p class="text-left">
        Access health information online instead of over the phone or in person.
        The patient portal allows you to:
      </p>

      <ul>
        <li>Keep contact information current</li>
        <li>Request appointments</li>
        <!--<li>Pay statements and view invoices</li>-->
        <li>Access documents</li>
        <li>And much more</li>
      </ul>

      <p>
        If you have any question or concerns, please feel free to contact us. We
        are here to help!
      </p>
    </div>
  </div>
</template>
<script>
import api from '../../api/http-common.js'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      facilityInfo: null
    }
  },
  computed: {
    ...mapGetters(['currentPatientAssociated'])
  },
  methods: {},
  async mounted () {
    this.facilityInfo = await api.auth.request.getFacilityInfo(
      this.currentPatientAssociated.facilityID
    )
  }
}
</script>
