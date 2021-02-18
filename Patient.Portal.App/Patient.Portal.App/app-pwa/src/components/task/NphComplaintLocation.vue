<template>
  <section role="main">
    <form class="mt-5 mr-2 ml-2 justify-content-md-center">
      <div class="col">
        <section class="card">
          <header class="card-header">
            <h2 class="card-title"></h2>
          </header>
          <div class="card-body">
            <div class="form-horizontal">
              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2"
                  >Please select up to 4 regions that pertain to your
                  visit</label
                >
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.regions"
                    :options="regionsLocation"
                    :group-select="true"
                    :multiple="true"
                    @select="selectChange"
                    @remove="selectRemove"
                    :max="4"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">Primary Complaint</label>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="form.complaint1" disabled>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">2nd Complaint</label>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="form.complaint2" disabled>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">3rd Complaint</label>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="form.complaint3" disabled>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">4th Complaint</label>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="form.complaint4" disabled>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer"></div>
        </section>
      </div>
    </form>
  </section>
</template>

<script>
import Multiselect from 'vue-multiselect'
import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
export default {
  components: {
    Multiselect
  },
  data () {
    return {
      form: {
        regions: '',
        complaint1: '',
        complaint2: '',
        complaint3: '',
        complaint4: ''
      }
    }
  },
  computed: {
    regionsLocation () {
      return [
        'Head',
        'Jaw',
        'Neck',
        'Shoulder',
        'Arm',
        'Elbow',
        'Wrist',
        'Hand',
        'Upper Back',
        'Mid Back',
        'Lower Back',
        'Hip',
        'Leg',
        'Knee',
        'Ankle',
        'Foot'
      ]
    }
  },
  methods: {
    selectChange (selected) {
      if (!this.form.complaint1) {
        this.form.complaint1 = selected
        return
      }
      if (!this.form.complaint2) {
        this.form.complaint2 = selected
        return
      }
      if (!this.form.complaint3) {
        this.form.complaint3 = selected
        return
      }
      if (!this.form.complaint4) {
        this.form.complaint4 = selected
      }
    },
    selectRemove (removed) {
      if (this.form.complaint1 === removed) {
        this.form.complaint1 = ''
        return
      }
      if (this.form.complaint2 === removed) {
        this.form.complaint2 = ''
        return
      }
      if (this.form.complaint3 === removed) {
        this.form.complaint3 = ''
        return
      }
      if (this.form.complaint4 === removed) {
        this.form.complaint4 = ''
      }
    }
  }
}
</script>
