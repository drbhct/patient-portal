<template>
  <section role="main">
    <form @submit.prevent="save" class="mt-5 mr-2 ml-2 justify-content-md-center">
      <div id="cardAABody" class="col-lg-6 mx-auto">
        <section class="card">
          <header class="card-header"><h2 class="card-title">Please tell us about your automobile accident</h2></header>
          <div class="card-body">
            <div class="form-vertical">
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label f-weight-550">
                    Date of Accident
                  </label>
                  <datepicker v-model="form.dateAccident"
                              :input-class="'form-control'"
                              :format="'MMMM dd, yyyy'"
                              :disabled-dates="disabledDates"></datepicker>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">Time of accident</label>
                  <time-picker v-model="form.timeAccident" format="hh:mm A" input-width="100%" :input-class="'form-control'"></time-picker>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">Estimated Damage</label>
                  <input type="text" class="form-control" v-model="form.estimatedDamage">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Number of vehicles involved
                  </label>
                  <select class="form-control m-input phunkey-input" id="vehicle" value="1" v-model="form.numVehicles">
                    <option :value="num" v-for="num in numList" :key="num">{{num}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="card">
          <header class="card-header"><h2 class="card-title">Where did the accident occur?</h2></header>
          <div class="card-body">
            <div class="form-vertical">
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Street Address or Intersection
                  </label>
                  <input type="text" class="form-control" v-model="form.streetAddress">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    City
                  </label>
                  <input type="text" class="form-control" v-model="form.city">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    State
                  </label>
                  <select v-model="form.state" class="form-control">
                    <option v-for="state in usStates"
                            :key="state.code"
                            :value="state.code">
                      {{ state.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="card">
          <header class="card-header"><h2 class="card-title"></h2></header>
          <div class="card-body">
            <div class="form-vertical">
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    How would you describe the accident conditions?
                  </label>
                  <multiselect v-model="form.aaConditions"
                               :options="accidentConditions"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaConditions === 'Other'">
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600">
                    Please specify
                  </label>
                  <input type="text"
                         class="form-control"
                         v-model="aaConditions" />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    How would you describe what happened?
                  </label>
                  <multiselect v-model="form.aaDescription"
                               :options="accidentDescription"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaDescription === 'Other'">
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600">
                    Please specify
                  </label>
                  <input type="text"
                         class="form-control"
                         v-model="aaDescription" />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    What happened to your vehicle immediately after impact?
                  </label>
                  <multiselect v-model="form.aaImpact"
                               :options="accidentImpact"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaImpact === 'Other'">
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600">
                    Please specify
                  </label>
                  <input type="text"
                         class="form-control"
                         v-model="aaImpact" />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Where were you sitting at the time of the accident?
                  </label>
                  <multiselect v-model="form.aaLocationVehicle"
                               :options="accidentLocationVehicle"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaLocationVehicle === 'Other'">
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600">
                    Please specify
                  </label>
                  <input type="text"
                         class="form-control"
                         v-model="aaLocationVehicle" />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Did you know the accident was coming?
                  </label>
                  <multiselect v-model="form.aaAwareness"
                               :options="accidentAwareness"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaAwareness === 'Other'">
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600">
                    Please specify
                  </label>
                  <input type="text"
                         class="form-control"
                         v-model="aaAwareness" />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    What type of vehicle were you in during the accident?
                  </label>
                  <multiselect v-model="form.aaVehicleType"
                               :options="accidentVehicleType"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaVehicleType === 'Other'">
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600">
                    Please specify
                  </label>
                  <input type="text"
                         class="form-control"
                         v-model="aaVehicleType" />
                </div>
              </div>
              <div class="form-group row" v-if="form.numVehicles > 1">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    What type was the other vehicle?
                  </label>
                  <multiselect v-model="form.aaVehicleTypeOther"
                               :options="accidentVehicleType"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaVehicleTypeOther === 'Other'">
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600">
                    Please specify
                  </label>
                  <input type="text"
                         class="form-control"
                         v-model="aaVehicleTypeOther" />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    At the time of the impact were you:
                  </label>
                  <multiselect v-model="form.aaVehicleState"
                               :options="accidentVehicleState"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaVehicleState === 'Other'">
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600">
                    Please specify
                  </label>
                  <input type="text"
                         class="form-control"
                         v-model="aaVehicleState" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <header class="card-header"><h2 class="card-title">How fast were the vehicles moving?</h2></header>
          <div class="card-body">
            <div class="form-vertical">
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Your Vehicle
                  </label>
                  <multiselect v-model="form.aaVehicleSpeed"
                               :options="speedList"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.numVehicles > 1">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Other Vehicle
                  </label>
                  <multiselect v-model="form.aaOtherVehicleSpeed"
                               :options="speedList"></multiselect>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <header class="card-header"><h2 class="card-title"></h2></header>
          <div class="card-body">
            <div class="form-vertical">
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Did you lose consciousness during the accident?
                  </label>
                  <multiselect v-model="form.aaConsciousness"
                               :options="accidentConsciousness"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Did the airbags deployed during the accident?
                  </label>
                  <multiselect v-model="form.aaAirbags"
                               :options="accidentAirbags"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    What type of headrests where in your vehicle?
                  </label>
                  <multiselect v-model="form.aaHeadrestType"
                               :options="accidentHeadrestType"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Where was the headrest in relation to your body?
                  </label>
                  <multiselect v-model="form.aaHeadrestPosition"
                               :options="accidentHeadrestPosition"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    What type of seatbelt where you wearing?
                  </label>
                  <multiselect v-model="form.aaSeatbeltType"
                               :options="accidentSeatbeltType"
                               @select="setCodeValue($event, 'SeatbeltType')"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaSeatbeltType === 'Other'">
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600">
                    Please specify
                  </label>
                  <input type="text"
                         class="form-control"
                         v-model="aaSeatbeltType" />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Did the accident cause you to slide out of your seatbelt?
                  </label>
                  <multiselect v-model="form.aaSeatbeltEffect"
                               :options="accidentSeatbeltEffect"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Select parts of your vehicle that were damaged:
                  </label>
                  <multiselect v-model="form.aaVehicleDamage"
                               :options="accidentVehicleDamage"
                               :multiple="true"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Select parts of your vehicle that were dented inward during the accident:
                  </label>
                  <multiselect v-model="form.aaVehicleDents"
                               :options="accidentVehicleDents"
                               :multiple="true"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Select all the doors that would no longer open as a result of the accident:
                  </label>
                  <multiselect v-model="form.aaVehicleDoors"
                               :options="accidentVehicleDoors"
                               :multiple="true"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    How was your head positioned during the accident?
                  </label>
                  <multiselect v-model="form.aaHeadPosition"
                               :options="accidentHeadPosition"
                               @select="setCodeValue($event, 'HeadPosition')"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    How was your torso positioned during the accident?
                  </label>
                  <multiselect v-model="form.aaTorso"
                               :options="accidentTorso"
                               @select="setCodeValue($event, 'TorsoPosition')"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    How were your hands positioned during the accident?
                  </label>
                  <multiselect v-model="form.aaHandPosition"
                               :options="accidentHandPosition"
                               @select="setCodeValue($event, 'HandPosition')"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Select all the parts of your body that where impacted during the accident:
                  </label>
                  <multiselect v-model="form.aaImpactLocations"
                               :options="accidentImpactLocations"
                               :multiple="true"
                                @remove="removePart"
                               ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-for="item in form.aaImpactLocations" :key="item">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Select everything your {{ item }} hit during the accident:
                  </label>
                  <multiselect v-model="form['aaImpactLocCar' + item.replace( /\s/g, '')]"
                               :options="accidentLocationParts"
                               :multiple="true"
                               @select="reloadImpactLoc"
                               @remove="reloadImpactLoc"></multiselect>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <header class="card-header"><h2 class="card-title"></h2></header>
          <div class="card-body">
            <div class="form-vertical">
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Did you go to the Hospital after the accident?
                  </label>
                  <multiselect v-model="form.aaHospital"
                               :options="accidentYesNo"
                               @select="setCodeValue($event, 'Hospital')"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Please enter the name of the Hospital
                  </label>
                  <input type="text" class="form-control" v-model="form.aaHospitalName">
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    How did you get to the Hospital?
                  </label>
                  <multiselect v-model="form.aaHospitalTranspo"
                               :options="accidentHospitalTranspo"
                               @select="setCodeValue($event, 'HospitalTransport')"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Were you hospitalized overnight?
                  </label>
                  <multiselect v-model="form.aaHospitalized"
                               :options="accidentYesNo"
                               @select="setCodeValue($event, 'HospitalOvernight')"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    At the Hospital, did you receive pain medication?
                  </label>
                  <multiselect v-model="form.aaPainMed"
                               :options="accidentYesNo"
                               @select="setCodeValue($event, 'HospitalPainMeds')"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    At the Hospital, did you receive muscle relaxers?
                  </label>
                  <multiselect v-model="form.aaMuscleRelaxers"
                               :options="accidentYesNo"
                               @select="setCodeValue($event, 'HospitalMuscleRelaxers')"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    At the hospital, did you receive stitches?
                  </label>
                  <multiselect v-model="form.aaStitches"
                               :options="accidentYesNo"
                               @select="setCodeValue($event, 'HospitalStitches')"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Please select the items you received at the Hospital
                  </label>
                  <multiselect v-model="form.aaMedEquip"
                               :options="accidentMedEquip"
                               :multiple="true"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    At the Hospital, were Xray's taken?
                  </label>
                  <multiselect v-model="form.aaXray"
                               :options="accidentYesNo"
                               @select="setCodeValue($event, 'HospitalXrays')"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    At the Hospital, was an MRI taken?
                  </label>
                  <multiselect v-model="form.aaMRI"
                               :options="accidentYesNo"
                               @select="setCodeValue($event, 'HospitalMRI')"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    At the Hospital, were any other type of images taken?
                  </label>
                  <multiselect v-model="form.aaOtherImages"
                               :options="accidentYesNo"
                               @select="setCodeValue($event, 'HospitalImaging')"></multiselect>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <div class="row justify-content-end">
              <div class="col-sm-12">
                <!--<button class="btn btn-primary mr-2" @click="save">
                  Submit
                </button>-->
                <!--<input type="button" class="btn btn-primary mr-2" @click="save" />-->
                <button type="reset" class="btn btn-default mr-2" v-if="getTaskPreviousTaskType" @click="previous">Back</button>
                <btn-saving :is-saving="isSaving" />
              </div>
            </div>
          </footer>
        </section>
      </div>
    </form>
  </section>
</template>

<script>
import Multiselect from 'vue-multiselect'
import api from '../../api/http-common.js'
import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import 'vue2-timepicker/dist/VueTimepicker.css'
import Datepicker from 'vuejs-datepicker'
import TimePicker from 'vue2-timepicker'
import { mapGetters, mapActions } from 'vuex'
import btnSaving from '../button-saving.vue'
export default {
  components: {
    Multiselect,
    Datepicker,
    TimePicker,
    btnSaving
  },
  data () {
    return {
      isLoading: true,
      isSaving: false,
      form: {
        dateAccident: '',
        timeAccident: {
          hh: '12',
          mm: '00',
          A: 'AM'
        },
        estimatedDamage: 0,
        numVehicles: 0,
        streetAddress: '',
        city: '',
        state: '',
        aaConditions: '',
        aaDescription: '',
        aaImpact: '',
        aaLocationVehicle: '',
        aaAwareness: '',
        aaVehicleType: '',
        aaVehicleTypeOther: '',
        aaVehicleState: '',
        aaVehicleSpeed: 0,
        aaOtherVehicleSpeed: 0,
        aaConsciousness: '',
        aaAirbags: '',
        aaHeadrestType: '',
        aaHeadrestPosition: '',
        aaSeatbeltType: '',
        aaSeatbeltEffect: '',
        aaVehicleDamage: [],
        aaVehicleDents: [],
        aaVehicleDoors: [],
        aaHeadPosition: '',
        aaTorso: '',
        aaHandPosition: '',
        aaImpactLocations: [],
        aaHospital: '',
        aaHospitalName: '',
        aaHospitalTranspo: '',
        aaHospitalized: '',
        aaPainMed: '',
        aaMuscleRelaxers: '',
        aaStitches: '',
        aaMedEquip: [],
        aaXray: '',
        aaMRI: '',
        aaOtherImages: ''
      },
      accidentInfo: [],
      aaConditions: '',
      aaDescription: '',
      aaImpact: '',
      aaLocationVehicle: '',
      aaAwareness: '',
      aaVehicleType: '',
      aaVehicleTypeOther: '',
      aaVehicleState: '',
      aaSeatbeltType: '',
      disabledDates: {
        from: new Date()
      },
      TimeVal: {
        hh: '12',
        mm: '00',
        A: 'AM'
      },
      numList: ['1', '2', '3+'],
      usStates: []
    }
  },
  computed: {
    ...mapGetters([
      'getProfilePatientAssociated',
      'getTaskCurrentCaseHistoryId',
      'getTaskPreviousTaskType',
      'getTaskCurrentCaseHistoryAutoAccident',
      'getTaskCurrentCaseHistoryAAFormValues',
      'getTaskCurrentTaskType',
      'currentPatientAssociated'
    ]),
    accidentConditions: function () {
      return ['Icy', 'Wet', 'Dry', 'Slick', 'Other']
    },
    accidentDescription: function () {
      return ['Vehicle was rear-ended', 'Vehicle rear-ended another vehicle', 'Vehicle was hit on driver\'s side', 'Vehicle was hit on passenger\'s side', 'Other']
    },
    accidentImpact: function () {
      return ['Hit a guardrail', 'Hit a tree or pole', 'Rolled over', 'Ran off the road', 'Other']
    },
    accidentLocationVehicle: function () {
      return ['Driver\'s seat', 'Front passenger seat', 'Rear left passenger seat', 'Rear right passenger seat', 'Other']
    },
    accidentAwareness: function () {
      return ['No - Unaware of the impending collision', 'Yes - aware of the impending collision and relaxed', 'Yes - aware of the impending collision and braced', 'Other']
    },
    accidentVehicleType: function () {
      return ['Subcompact car', 'Compact car', 'Midsize car', 'Full size car', 'Truck', 'SUV', 'MiniVan', 'Van', 'Larger than one-ton vehicle', 'Other']
    },
    accidentVehicleState: function () {
      return ['Slowing down', 'Stopped', 'Gaining Speed', 'Moving at a steady speed', 'Other']
    },
    speedList: function () {
      return ['0', '5', '10', '15', '20', '25', '30', '35', '40',
        '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100',
        '105', '110', '115', '120', '125', '130', '135', '140', '145', '150']
    },
    accidentConsciousness: function () {
      return ['Yes', 'No']
    },
    accidentAirbags: function () {
      return ['Yes', 'No', 'Vehicle not equipped with airbags']
    },
    accidentHeadrestType: function () {
      return ['Movable headrests', 'Fixed/Non-movable headrests', 'No headrests']
    },
    accidentHeadrestPosition: function () {
      return ['Top portion of the back of head', 'Middle height of head', 'Lower portion of the back of head', 'Back of head', 'Shoulder blades']
    },
    accidentSeatbeltType: function () {
      return ['Shoulder and lap belt', 'Lap belt', 'Baby car seat', 'Booster seat', 'No seatbelt', 'Other']
    },
    accidentSeatbeltEffect: function () {
      return ['Yes completely', 'Yes partially', 'No']
    },
    accidentVehicleDamage: function () {
      return ['Front bumper', 'Hood', 'Front left quarter panel', 'Front right quarter panel',
        'Front left door', 'Front right door', 'Back left door', 'Back right door',
        'Back left quarter panel', 'Back right quarter panel', 'Rear bumper', 'Trunk',
        'Windshield', 'Side window', 'Rear window', 'Steering wheel', 'Dashboard', 'Rear view mirror',
        'Seat frame', 'Knee bolster']
    },
    accidentVehicleDents: function () {
      return ['Front bumper', 'Hood', 'Front left quarter panel', 'Front right quarter panel',
        'Front left door', 'Front right door', 'Back left door', 'Back right door', 'Back left quarter panel',
        'Back right quarter panel', 'Rear bumper', 'Trunk']
    },
    accidentVehicleDoors: function () {
      return ['Front left door', 'Front right door', 'Back left door', 'Back right door', 'Trunk']
    },
    accidentHeadPosition: function () {
      return ['Facing forward', 'Facing upward', 'Facing downward',
        'Turned left', 'Turned right', 'Turned left and upward',
        'Turned right and upward', 'Turned left and downward',
        'Turned right and downward']
    },
    accidentTorso: function () {
      return ['Forward', 'Twisted to your left', 'Twisted to your right', 'Bending forward']
    },
    accidentHandPosition: function () {
      return ['Left hand on steering wheel', 'Right hand on steering wheel',
        'Both hands on steering wheel', 'Left hand on the dashboard',
        'Right hand on the dashboard', 'Both hands on the dashboard',
        'Left hand on the seat in front of you', 'Right hand on the seat in front of you',
        'Both hands on the seat in front of you']
    },
    accidentImpactLocations: function () {
      return ['Head', 'Face', 'Neck', 'Chest', 'Right Shoulder', 'Right hip',
        'Right Knee', 'Right Foot', 'Left Shoulder', 'Left Hip', 'Left Knee', 'Left Foot']
    },
    accidentLocationParts: function () {
      return ['Steering wheel', 'Dashboard', 'Windshield', 'Side window', 'Side door', 'Seat', 'Ceiling', 'Car frame', 'Another passenger']
    },
    accidentHospitalTranspo: function () {
      return ['By ambulance', 'Rode with someone else', 'Drove yourself', 'By helicopter', 'Walked']
    },
    accidentYesNo: function () {
      return ['Yes', 'No']
    },
    accidentMedEquip: function () {
      return ['Cervical collar', 'Back brace', 'Crutches', 'Wheelchair']
    }
  },
  methods: {
    ...mapActions(['setTaskCurrentTaskType', 'setTaskCurrentCaseHistoryAutoAccident', 'setTaskCurrentCaseHistoryAAFormValues']),
    async getUsStates () {
      const result = await api.task.request.getUsStates()
      this.usStates = result.data
    },
    reloadImpactLoc () {
      const arrLoc = this.form.aaImpactLocations
      this.form.aaImpactLocations = []
      this.form.aaImpactLocations = arrLoc
    },
    removePart (value) {
      const obj = 'aaImpactLocCar' + value.replace(/\s/g, '')
      delete this.form[obj]
    },
    async previous () {
      const currentIndex = this.getTaskPreviousTaskType.findIndex(
        (c) => c === this.getTaskCurrentTaskType
      )
      let prevPage = ''
      if (currentIndex === -1) {
        prevPage = this.getTaskPreviousTaskType[
          this.getTaskPreviousTaskType.length - 1
        ]
      } else {
        prevPage = this.getTaskPreviousTaskType[currentIndex - 1]
      }
      // await this.setTaskCurrentTaskTypeRemove('NphComplaintLocation')
      this.setTaskCurrentTaskType({
        back: true,
        page: prevPage,
        removePage: this.getTaskCurrentTaskType
      })
    },
    save () {
      if (this.form.dateAccident !== '') {
        this.setCodeValue(this.form.dateAccident, 'AccidentDate')
      }
      if (this.form.timeAccident !== null) {
        const tmeVal = `${this.form.timeAccident.hh}:${this.form.timeAccident.mm} ${this.form.timeAccident.A}`
        this.setCodeValue(tmeVal, 'AccidentTime')
      }
      if (this.form.estimatedDamage > 0) {
        this.setCodeValue(this.form.estimatedDamage, 'AccidentDamageCost')
      }
      if (this.form.numVehicles > 0) {
        this.setCodeValue(this.form.numVehicles, 'NumVehicles')
      }
      if (this.form.streetAddress !== '') {
        this.setCodeValue(this.form.streetAddress, 'Street')
      }
      if (this.form.city !== '') {
        this.setCodeValue(this.form.city, 'City')
      }
      if (this.form.state !== '') {
        this.setCodeValue(this.form.state, 'State')
      }
      if (this.form.aaConditions !== '') {
        if (this.form.aaConditions === 'Other') {
          this.setCodeValue(this.aaConditions, 'WeatherCondition')
        } else {
          this.setCodeValue(this.form.aaConditions, 'WeatherCondition')
        }
      }
      if (this.form.aaDescription !== '') {
        if (this.form.aaDescription === 'Other') {
          this.setCodeValue(this.aaDescription, 'GeneralDescription')
        } else {
          this.setCodeValue(this.form.aaDescription, 'GeneralDescription')
        }
      }
      if (this.form.aaImpact !== '') {
        if (this.form.aaImpact === 'Other') {
          this.setCodeValue(this.aaImpact, 'AfterImpact')
        } else {
          this.setCodeValue(this.form.aaImpact, 'AfterImpact')
        }
      }
      if (this.form.aaLocationVehicle !== '') {
        if (this.form.aaLocationVehicle === 'Other') {
          this.setCodeValue(this.aaLocationVehicle, 'PatientLocation')
        } else {
          this.setCodeValue(this.form.aaLocationVehicle, 'PatientLocation')
        }
      }
      if (this.form.aaAwareness !== '') {
        if (this.form.aaAwareness === 'Other') {
          this.setCodeValue(this.aaAwareness, 'PatientAwareness')
        } else {
          this.setCodeValue(this.form.aaAwareness, 'PatientAwareness')
        }
      }
      if (this.form.aaVehicleType !== '') {
        if (this.form.aaVehicleType === 'Other') {
          this.setCodeValue(this.aaVehicleType, 'PatientVehicleType')
        } else {
          this.setCodeValue(this.form.aaVehicleType, 'PatientVehicleType')
        }
      }
      if (this.form.aaVehicleTypeOther !== '') {
        if (this.form.aaVehicleTypeOther === 'Other') {
          this.setCodeValue(this.aaVehicleTypeOther, 'OtherVehicleType')
        } else {
          this.setCodeValue(this.form.aaVehicleTypeOther, 'OtherVehicleType')
        }
      }
      if (this.form.aaVehicleState !== '') {
        if (this.form.aaVehicleState === 'Other') {
          this.setCodeValue(this.aaVehicleState, 'PatientVehicleVelocity')
        } else {
          this.setCodeValue(this.form.aaVehicleState, 'PatientVehicleVelocity')
        }
      }
      if (this.form.aaVehicleSpeed > 0) {
        this.setCodeValue(this.form.aaVehicleSpeed, 'PatientVehicleSpeed')
      }
      if (this.form.numVehicles > 1) {
        if (this.form.aaOtherVehicleSpeed > 0) {
          this.setCodeValue(this.form.aaOtherVehicleSpeed, 'OtherVehicleSpeed')
        }
      }
      if (this.form.aaConsciousness !== '') {
        this.setCodeValue(this.form.aaConsciousness, 'Consciousness')
      }
      if (this.form.aaAirbags !== '') {
        this.setCodeValue(this.form.aaAirbags, 'Airbags')
      }
      if (this.form.aaHeadrestType !== '') {
        this.setCodeValue(this.form.aaHeadrestType, 'HeadrestType')
      }
      if (this.form.aaHeadrestPosition !== '') {
        this.setCodeValue(this.form.aaHeadrestPosition, 'HeadrestPosition')
      }
      if (this.form.aaSeatbeltType !== '') {
        if (this.form.aaVehicleState === 'Other') {
          this.setCodeValue(this.aaSeatbeltType, 'SeatbeltType')
        } else {
          this.setCodeValue(this.form.aaSeatbeltType, 'SeatbeltType')
        }
      }
      if (this.form.aaSeatbeltEffect !== '') {
        this.setCodeValue(this.form.aaSeatbeltEffect, 'SeatbeltResult')
      }
      if (this.form.aaVehicleDamage.length > 0) {
        this.setCodeValue(this.form.aaVehicleDamage.join(), 'VehicleDamage')
      }
      if (this.form.aaVehicleDents.length > 0) {
        this.setCodeValue(this.form.aaVehicleDents.join(), 'VehicleDents')
      }
      if (this.form.aaVehicleDoors.length > 0) {
        this.setCodeValue(this.form.aaVehicleDoors.join(), 'VehicleDoors')
      }
      if (this.form.aaHeadPosition !== '') {
        this.setCodeValue(this.form.aaHeadPosition, 'HeadPosition')
      }
      if (this.form.aaTorso !== '') {
        this.setCodeValue(this.form.aaTorso, 'TorsoPosition')
      }
      if (this.form.aaHandPosition !== '') {
        this.setCodeValue(this.form.aaHandPosition, 'HandPosition')
      }
      if (this.form.aaHospital !== '') {
        this.setCodeValue(this.form.aaHospital, 'Hospital')
      }
      if (this.form.aaHospital === 'Yes') {
        if (this.form.aaHospitalName !== '') {
          this.setCodeValue(this.form.aaHospital, 'HospitalName')
        }
        if (this.form.aaHospitalTranspo !== '') {
          this.setCodeValue(this.form.aaHospitalTranspo, 'HospitalTransport')
        }
        if (this.form.aaHospitalized !== '') {
          this.setCodeValue(this.form.aaHospitalized, 'HospitalOvernight')
        }
        if (this.form.aaPainMed !== '') {
          this.setCodeValue(this.form.aaPainMed, 'HospitalPainMeds')
        }
        if (this.form.aaMuscleRelaxers !== '') {
          this.setCodeValue(this.form.aaMuscleRelaxers, 'HospitalMuscleRelaxers')
        }
        if (this.form.aaStitches !== '') {
          this.setCodeValue(this.form.aaStitches, 'HospitalStitches')
        }
        if (this.form.aaMedEquip.length > 0) {
          this.setCodeValue(this.form.aaMedEquip.join(), 'HospitalMedicalEquipment')
        }
        if (this.form.aaXray !== '') {
          this.setCodeValue(this.form.aaXray, 'HospitalXrays')
        }
        if (this.form.aaMRI !== '') {
          this.setCodeValue(this.form.aaMRI, 'HospitalMRI')
        }
        if (this.form.aaOtherImages !== '') {
          this.setCodeValue(this.form.aaOtherImages, 'HospitalImaging')
        }
      }
      if (this.form.aaImpactLocations.length > 0) {
        var me = this
        this.setCodeValue(this.form.aaImpactLocations.join(), 'BodyPartsImpacted')
        this.form.aaImpactLocations.forEach(function (item) {
          var aaImpactLoc = 'aaImpactLocCar' + item.replace(/\s/g, '')
          me.setCodeValue(me.form[aaImpactLoc].join(), 'Impact_' + item.replace(/ /g, '_'))
        })
      }
      if (this.accidentInfo.length > 0) {
        this.setTaskCurrentCaseHistoryAAFormValues(JSON.parse(JSON.stringify(this.form)))
        this.setTaskCurrentCaseHistoryAutoAccident(this.accidentInfo)

        this.isSaving = true
        this.setAAValues()
      } else {
        this.setTaskCurrentTaskType('NphComplaintLocation')
      }
    },
    loadValue (items) {
      var me = this
      for (const i in items) {
        const code = items[i].code
        const value = items[i].value

        if (code === 'AccidentDate') {
          this.form.dateAccident = value
        }
        if (code === 'AccidentTime') {
          this.form.timeAccident = value
        }
        if (code === 'AccidentDamageCost') {
          this.form.estimatedDamage = value
        }
        if (code === 'NumVehicles') {
          this.form.numVehicles = value
        }
        if (code === 'Street') {
          this.form.streetAddress = value
        }
        if (code === 'City') {
          this.form.city = value
        }
        if (code === 'State') {
          this.form.state = value
        }
        if (code === 'WeatherCondition') {
          const found = this.accidentConditions.find(element => element === value)
          if (found) {
            this.form.aaConditions = value
          } else {
            this.form.aaConditions = 'Other'
            this.aaConditions = value
          }
        }
        if (code === 'GeneralDescription') {
          const found = this.accidentDescription.find(element => element === value)
          if (found) {
            this.form.aaDescription = value
          } else {
            this.form.aaDescription = 'Other'
            this.aaDescription = value
          }
        }
        if (code === 'AfterImpact') {
          const found = this.accidentImpact.find(element => element === value)
          if (found) {
            this.form.aaImpact = value
          } else {
            this.form.aaImpact = 'Other'
            this.aaImpact = value
          }
        }
        if (code === 'PatientLocation') {
          const found = this.accidentLocationVehicle.find(element => element === value)
          if (found) {
            this.form.aaLocationVehicle = value
          } else {
            this.form.aaLocationVehicle = 'Other'
            this.aaLocationVehicle = value
          }
        }
        if (code === 'PatientAwareness') {
          const found = this.accidentAwareness.find(element => element === value)
          if (found) {
            this.form.aaAwareness = value
          } else {
            this.form.aaAwareness = 'Other'
            this.aaAwareness = value
          }
        }
        if (code === 'PatientVehicleType') {
          const found = this.accidentVehicleType.find(element => element === value)
          if (found) {
            this.form.aaVehicleType = value
          } else {
            this.form.aaVehicleType = 'Other'
            this.aaVehicleType = value
          }
        }
        if (code === 'OtherVehicleType') {
          const found = this.accidentVehicleType.find(element => element === value)
          if (found) {
            this.form.aaVehicleTypeOther = value
          } else {
            this.form.aaVehicleTypeOther = 'Other'
            this.aaVehicleTypeOther = value
          }
        }
        if (code === 'PatientVehicleVelocity') {
          const found = this.accidentVehicleState.find(element => element === value)
          if (found) {
            this.form.aaVehicleState = value
          } else {
            this.form.aaVehicleState = 'Other'
            this.aaVehicleState = value
          }
        }
        if (code === 'PatientVehicleSpeed') {
          this.form.aaVehicleSpeed = value
        }
        if (code === 'OtherVehicleSpeed') {
          this.form.aaOtherVehicleSpeed = value
        }
        if (code === 'Consciousness') {
          this.form.aaConsciousness = value
        }
        if (code === 'Airbags') {
          this.form.aaAirbags = value
        }
        if (code === 'HeadrestType') {
          this.form.aaHeadrestType = value
        }
        if (code === 'HeadrestPosition') {
          this.form.aaHeadrestPosition = value
        }
        if (code === 'SeatbeltType') {
          const found = this.accidentSeatbeltType.find(element => element === value)
          if (found) {
            this.form.aaSeatbeltType = value
          } else {
            this.form.aaSeatbeltType = 'Other'
            this.aaSeatbeltType = value
          }
        }
        if (code === 'SeatbeltResult') {
          this.form.aaSeatbeltEffect = value
        }
        if (code === 'VehicleDamage') {
          this.form.aaVehicleDamage = value.split(',')
        }
        if (code === 'VehicleDents') {
          this.form.aaVehicleDents = value.split(',')
        }
        if (code === 'VehicleDoors') {
          this.form.aaVehicleDoors = value.split(',')
        }
        if (code === 'HeadPosition') {
          this.form.aaHeadPosition = value
        }
        if (code === 'TorsoPosition') {
          this.form.aaTorso = value
        }
        if (code === 'HandPosition') {
          this.form.aaHandPosition = value
        }
        if (code === 'Hospital') {
          this.form.aaHospital = value
        }
        if (code === 'HospitalName') {
          this.form.aaHospital = value
        }
        if (code === 'HospitalTransport') {
          this.form.aaHospitalTranspo = value
        }
        if (code === 'HospitalOvernight') {
          this.form.aaHospitalized = value
        }
        if (code === 'HospitalPainMeds') {
          this.form.aaPainMed = value
        }
        if (code === 'HospitalMuscleRelaxers') {
          this.form.aaMuscleRelaxers = value
        }
        if (code === 'HospitalStitches') {
          this.form.aaStitches = value
        }
        if (code === 'HospitalMedicalEquipment') {
          this.form.aaMedEquip = value.split(',')
        }
        if (code === 'HospitalXrays') {
          this.form.aaXray = value
        }
        if (code === 'HospitalMRI') {
          this.form.aaMRI = value
        }
        if (code === 'HospitalImaging') {
          this.form.aaOtherImages = value
        }
        if (code === 'BodyPartsImpacted') {
          this.form.aaImpactLocations = value.split(',')
        }
        var arrImpact = []
        this.form.aaImpactLocations.forEach(function (item) {
          if (code === 'Impact_' + item.replace(/ /g, '_')) {
            var aaImpactLoc = 'aaImpactLocCar' + item.replace(/\s/g, '')
            arrImpact = value.split(',')
            me.form[aaImpactLoc] = arrImpact
          }
        })
      }
    },
    setCodeValue (value, code) {
      // console.log(value + ' + ' + code)
      const found = this.accidentInfo.some(el => el.code === code)
      if (!found) {
        this.accidentInfo.push({ code: code, value: value })
      } else {
        var index = this.accidentInfo.findIndex(el => el.code === code)
        this.accidentInfo[index].value = value
      }
    },
    async setAAValues () {
      console.log('setAAValues')
      const param = {
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryId: this.getTaskCurrentCaseHistoryId,
        values: this.accidentInfo
      }
      await api.task.request.updateCaseHistoryAaValues(param)
      this.isSaving = false
      this.setTaskCurrentTaskType('NphComplaintLocation')
    },
    async getAAValues () {
      const param = {
        facilityId: this.currentPatientAssociated.facilityID,
        caseHistoryId: this.getTaskCurrentCaseHistoryId
      }
      const response = await api.task.request.getCaseHistoryAaValues(param)
      this.loadValue(response.data)
    },
    initializeData () {
      console.log('initializeData.......')
      this.getAAValues()
      this.form = {
        dateAccident: '',
        timeAccident: null,
        estimatedDamage: 0,
        numVehicles: 0,
        streetAddress: '',
        city: '',
        state: '',
        aaConditions: '',
        aaDescription: '',
        aaImpact: '',
        aaLocationVehicle: '',
        aaAwareness: '',
        aaVehicleType: '',
        aaVehicleTypeOther: '',
        aaVehicleState: '',
        aaVehicleSpeed: 0,
        aaOtherVehicleSpeed: 0,
        aaConsciousness: '',
        aaAirbags: '',
        aaHeadrestType: '',
        aaHeadrestPosition: '',
        aaSeatbeltType: '',
        aaSeatbeltEffect: '',
        aaVehicleDamage: [],
        aaVehicleDents: [],
        aaVehicleDoors: [],
        aaHeadPosition: '',
        aaTorso: '',
        aaHandPosition: '',
        aaImpactLocations: [],
        aaHospital: '',
        aaHospitalName: '',
        aaHospitalTranspo: '',
        aaHospitalized: '',
        aaPainMed: '',
        aaMuscleRelaxers: '',
        aaStitches: '',
        aaMedEquip: [],
        aaXray: '',
        aaMRI: '',
        aaOtherImages: ''
      }
      this.accidentInfo = this.getTaskCurrentCaseHistoryAutoAccident
      if (this.getTaskCurrentCaseHistoryAAFormValues) {
        this.form = JSON.parse(JSON.stringify(this.getTaskCurrentCaseHistoryAAFormValues))

        if (this.form.aaConditions === 'Other') {
          const index = this.accidentInfo.findIndex(el => el.code === 'WeatherCondition')
          if (index >= 0) {
            this.aaConditions = this.accidentInfo[index].value
          }
        }
        if (this.form.aaDescription === 'Other') {
          const index = this.accidentInfo.findIndex(el => el.code === 'GeneralDescription')
          if (index >= 0) {
            this.aaDescription = this.accidentInfo[index].value
          }
        }
        if (this.form.aaImpact === 'Other') {
          const index = this.accidentInfo.findIndex(el => el.code === 'AfterImpact')
          if (index >= 0) {
            this.aaImpact = this.accidentInfo[index].value
          }
        }
        if (this.form.aaLocationVehicle === 'Other') {
          const index = this.accidentInfo.findIndex(el => el.code === 'PatientLocation')
          if (index >= 0) {
            this.aaLocationVehicle = this.accidentInfo[index].value
          }
        }
        if (this.form.aaAwareness === 'Other') {
          const index = this.accidentInfo.findIndex(el => el.code === 'PatientAwareness')
          if (index >= 0) {
            this.aaAwareness = this.accidentInfo[index].value
          }
        }
        if (this.form.aaVehicleType === 'Other') {
          const index = this.accidentInfo.findIndex(el => el.code === 'PatientVehicleType')
          if (index >= 0) {
            this.aaVehicleType = this.accidentInfo[index].value
          }
        }
        if (this.form.aaVehicleTypeOther === 'Other') {
          const index = this.accidentInfo.findIndex(el => el.code === 'OtherVehicleType')
          if (index >= 0) {
            this.aaVehicleTypeOther = this.accidentInfo[index].value
          }
        }
        if (this.form.aaVehicleState === 'Other') {
          const index = this.accidentInfo.findIndex(el => el.code === 'PatientVehicleVelocity')
          if (index >= 0) {
            this.aaVehicleState = this.accidentInfo[index].value
          }
        }
        if (this.form.aaSeatbeltType === 'Other') {
          const index = this.accidentInfo.findIndex(el => el.code === 'SeatbeltType')
          if (index >= 0) {
            this.aaSeatbeltType = this.accidentInfo[index].value
          }
        }
      }
    }
  },
  async mounted () {
    const el = document.getElementById('cardAABody')
    el.scrollIntoView({ behavior: 'smooth' })
    await this.getUsStates()
    await this.initializeData()
  }
}
</script>
<style scoped>
  .card + .card {
    margin-top: 0
  }
</style>
