<template>
  <section role="main">
    <form action="" class="mt-5 mr-2 ml-2 justify-content-md-center">
      <div class="col">
        <section class="card">
          <header class="card-header"><h2 class="card-title">Please tell us about your automobile accident</h2></header>
          <div class="card-body">
            <div class="form-vertical">
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Date of accident
                </label>
                <div class="col-lg-6">
                  <datepicker v-model="form.dateAccident"
                              :input-class="'form-control'"
                              :format="'MMMM dd, yyyy'"
                              :disabled-dates="disabledDates"></datepicker>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">Time of accident</label>
                <div class="col-lg-6">
                  <time-picker v-model="TimeVal" format="hh:mm A" :input-class="'form-control'"></time-picker>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">Estimated Damage</label>
                <div class="col-lg-6">
                  <input type="text" class="form-control" v-model="form.estimatedDamage">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                 Number of vehicles involved
                </label>
                <div class="col-lg-6">
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
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Street Address or Intersection
                </label>
                <div class="col-lg-6">
                  <input type="text" class="form-control" v-model="form.streetAddress">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  City
                </label>
                <div class="col-lg-6">
                  <input type="text" class="form-control" v-model="form.city">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  State
                </label>
                <div class="col-lg-6">
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
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  How would you describe the accident conditions?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaConditions"
                               :options="accidentConditions"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaConditions === 'Other'">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Please specify
                </label>
                <div class="col-lg-6">
                  <input type="text"
                         class="form-control"
                         v-model="aaConditions" />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  How would you describe what happened?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaDescription"
                               :options="accidentDescription"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaDescription === 'Other'">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Please specify
                </label>
                <div class="col-lg-6">
                  <input type="text"
                         class="form-control"
                         v-model="aaDescription" />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  What happened to your vehicle immediately after impact?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaImpact"
                               :options="accidentImpact"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaImpact === 'Other'">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Please specify
                </label>
                <div class="col-lg-6">
                  <input type="text"
                         class="form-control"
                         v-model="aaImpact" />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Where were you sitting at the time of the accident?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaLocationVehicle"
                               :options="accidentLocationVehicle"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaLocationVehicle === 'Other'">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Please specify
                </label>
                <div class="col-lg-6">
                  <input type="text"
                         class="form-control"
                         v-model="aaLocationVehicle" />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Did you know the accident was coming?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaAwareness"
                               :options="accidentAwareness"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaAwareness === 'Other'">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Please specify
                </label>
                <div class="col-lg-6">
                  <input type="text"
                         class="form-control"
                         v-model="aaAwareness" />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  What type of vehicle were you in during the accident?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaVehicleType"
                               :options="accidentVehicleType"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaVehicleType === 'Other'">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Please specify
                </label>
                <div class="col-lg-6">
                  <input type="text"
                         class="form-control"
                         v-model="aaVehicleType" />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  At the time of the impact were you:
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaVehicleState"
                               :options="accidentVehicleState"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaVehicleState === 'Other'">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Please specify
                </label>
                <div class="col-lg-6">
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
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Your Vehicle
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaVehicleSpeed"
                               :options="speedList"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.numVehicles > 1">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Other Vehicle
                </label>
                <div class="col-lg-6">
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
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Did you lose consciousness during the accident?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaConsciousness"
                               :options="accidentConsciousness"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Did the airbags deployed during the accident?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaAirbags"
                               :options="accidentAirbags"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  What type of headrests where in your vehicle?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaHeadrestType"
                               :options="accidentHeadrestType"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Where was the headrest in relation to your body?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaHeadrestPosition"
                               :options="accidentHeadrestPosition"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  What type of seatbelt where you wearing?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaSeatbeltType"
                               :options="accidentSeatbeltType"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaSeatbeltType === 'Other'">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Please specify
                </label>
                <div class="col-lg-6">
                  <input type="text"
                         class="form-control"
                         v-model="aaSeatbeltType" />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Did the accident cause you to slide out of your seatbelt?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaSeatbeltEffect"
                               :options="accidentSeatbeltEffect"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Select parts of your vehicle that were damaged:
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaVehicleDamage"
                               :options="accidentVehicleDamage"
                               :multiple="true"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Select parts of your vehicle that were dented inward during the accident:
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaVehicleDents"
                               :options="accidentVehicleDents"
                               :multiple="true"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Select all the doors that would no longer open as a result of the accident:
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaVehicleDoors"
                               :options="accidentVehicleDoors"
                               :multiple="true"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  How was your head positioned during the accident?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaHeadPosition"
                               :options="accidentHeadPosition"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  How was your torso positioned during the accident?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaTorso"
                               :options="accidentTorso"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  How were your hands positioned during the accident?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaHandPosition"
                               :options="accidentHandPosition"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Select all the parts of your body that where impacted during the accident:
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaImpactLocations"
                               :options="accidentImpactLocations"
                               :multiple="true"
                               @remove="removePart"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-for="item in form.aaImpactLocations" :key="item">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Select everything your {{item}} hit during the accident:
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form['aaImpactLocCar' + item]"
                               :options="accidentLocationParts"
                               :multiple="true"></multiselect>
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
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Did you go to the Hospital after the accident?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaHospital"
                               :options="accidentYesNo"></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Please enter the name of the Hospital
                </label>
                <div class="col-lg-6">
                  <input type="text" class="form-control" v-model="form.aaHospitalName">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  How did you get to the Hospital?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaHospitalTranspo"
                               :options="accidentHospitalTranspo"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Were you hospitalized overnight?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaHospitalized"
                               :options="accidentYesNo"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  At the Hospital, did you receive pain medication?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaPainMed"
                               :options="accidentYesNo"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  At the Hospital, did you receive muscle relaxers?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaMuscleRelaxers"
                               :options="accidentYesNo"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  At the hospital, did you receive stitches?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaStitches"
                               :options="accidentYesNo"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  Please select the items you received at the Hospital
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaMedEquip"
                               :options="accidentMedEquip"
                               :multiple="true"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  At the Hospital, were Xray's taken?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaXray"
                               :options="accidentYesNo"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  At the Hospital, was an MRI taken?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaMRI"
                               :options="accidentYesNo"></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-4 control-label text-lg-right pt-2">
                  At the Hospital, were any other type of images taken?
                </label>
                <div class="col-lg-6">
                  <multiselect v-model="form.aaOtherImages"
                               :options="accidentYesNo"></multiselect>
                </div>
              </div>
            </div>
          </div>
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
export default {
  components: {
    Multiselect,
    Datepicker,
    TimePicker
  },
  data () {
    return {
      form: {
        dateAccident: '',
        timeAcccident: null,
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
        aaVehicleState: '',
        aaVehicleSpeed: 0,
        aaOtherVehicleSpeed: 0,
        aaConsciousness: '',
        aaAirbags: '',
        aaHeadrestType: '',
        aaHeadrestPosition: '',
        aaVehicleDamage: [],
        aaVehicleDents: [],
        aaVehicleDoors: [],
        aaHeadPosition: '',
        aaTorso: '',
        aaHandPosition: '',
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
      aaConditions: '',
      aaDescription: '',
      aaImpact: '',
      aaLocationVehicle: '',
      aaAwareness: '',
      aaVehicleType: '',
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
      return ['Head', 'Face', 'Neck', 'Chest', 'Right shoulder', 'Right hip',
        'Right knee', 'Right foot', 'Left shoulder', 'Left hip', 'Left knee', 'Left foot']
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
    async getUsStates () {
      const result = await api.task.request.getUsStates()
      this.usStates = result.data
    },
    removePart (value) {
      console.log(value)
      const obj = 'aaImpactLocCar' + value
      delete this.form[obj]
    }
  },
  async mounted () {
    await this.getUsStates()
  }
}
</script>
<style scoped>
  .card + .card {
    margin-top: 0
  }
</style>
