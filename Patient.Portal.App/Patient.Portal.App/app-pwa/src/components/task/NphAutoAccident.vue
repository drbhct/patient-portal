<template>
  <section role="main">
    <form
      @submit.prevent="save"
      class="mt-5 mr-2 ml-2 justify-content-md-center"
    >
      <div id="cardAABody" class="col-lg-6 mx-auto">
        <section class="card">
          <header class="card-header">
            <h2 class="card-title">
              Please tell us about your automobile accident
            </h2>
          </header>
          <div class="card-body">
            <div class="form-vertical">
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label f-weight-550">
                    <strong style="color: red; margin-right: 5px">*</strong>
                    Date of Accident
                  </label>
                  <datepicker
                    v-model="form.dateAccident"
                    :input-class="'form-control'"
                    :format="'MMMM dd, yyyy'"
                    :disabled-dates="disabledDates"
                    required
                  ></datepicker>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600"
                    ><strong style="color: red; margin-right: 5px">*</strong>
                    Time of accident</label
                  >
                  <time-picker
                    v-model="form.timeAccident"
                    format="hh:mm A"
                    input-width="100%"
                    :input-class="'form-control'"
                  ></time-picker>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600"
                    ><strong style="color: red; margin-right: 5px">*</strong>
                    Estimated Damage</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.estimatedDamage"
                    required
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    <strong style="color: red; margin-right: 5px">*</strong>
                    Number of vehicles involved
                  </label>
                  <select
                    class="form-control m-input phunkey-input"
                    id="vehicle"
                    value="1"
                    v-model="form.numVehicles"
                    required
                  >
                    <option :value="num" v-for="num in numList" :key="num">
                      {{ num }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="card">
          <header class="card-header">
            <h2 class="card-title">Where did the accident occur?</h2>
          </header>
          <div class="card-body">
            <div class="form-vertical">
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    <strong style="color: red; margin-right: 5px">*</strong
                    >Street Address or Intersection
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.streetAddress"
                    required
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    <strong style="color: red; margin-right: 5px">*</strong>City
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.city"
                    required
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    <strong style="color: red; margin-right: 5px">*</strong
                    >State
                  </label>
                  <select v-model="form.state" class="form-control" required>
                    <option
                      v-for="state in usStates"
                      :key="state.code"
                      :value="state.code"
                    >
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
                  <multiselect
                    v-model="form.aaConditions"
                    :searchable="false"
                    :options="accidentConditions"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaConditions === 'Other'">
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600"> Please specify </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="aaConditions"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    How would you describe what happened?
                  </label>
                  <multiselect
                    v-model="form.aaDescription"
                    :searchable="false"
                    :options="accidentDescription"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaDescription === 'Other'">
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600"> Please specify </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="aaDescription"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    What happened to your vehicle immediately after impact?
                  </label>
                  <multiselect
                    v-model="form.aaImpact"
                    :searchable="false"
                    :options="accidentImpact"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaImpact === 'Other'">
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600"> Please specify </label>
                  <input type="text" class="form-control" v-model="aaImpact" />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Where were you sitting at the time of the accident?
                  </label>
                  <multiselect
                    v-model="form.aaLocationVehicle"
                    :searchable="false"
                    :options="accidentLocationVehicle"
                  ></multiselect>
                </div>
              </div>
              <div
                class="form-group row"
                v-if="form.aaLocationVehicle === 'Other'"
              >
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600"> Please specify </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="aaLocationVehicle"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Did you know the accident was coming?
                  </label>
                  <multiselect
                    v-model="form.aaAwareness"
                    :searchable="false"
                    :options="accidentAwareness"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaAwareness === 'Other'">
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600"> Please specify </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="aaAwareness"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    What type of vehicle were you in during the accident?
                  </label>
                  <multiselect
                    v-model="form.aaVehicleType"
                    :searchable="false"
                    :options="accidentVehicleType"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaVehicleType === 'Other'">
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600"> Please specify </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="aaVehicleType"
                  />
                </div>
              </div>
              <div class="form-group row" v-if="form.numVehicles > 1">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    What type was the other vehicle?
                  </label>
                  <multiselect
                    v-model="form.aaVehicleTypeOther"
                    :searchable="false"
                    :options="accidentVehicleType"
                  ></multiselect>
                </div>
              </div>
              <div
                class="form-group row"
                v-if="form.aaVehicleTypeOther === 'Other'"
              >
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600"> Please specify </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="aaVehicleTypeOther"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    At the time of the impact were you:
                  </label>
                  <multiselect
                    v-model="form.aaVehicleState"
                    :searchable="false"
                    :options="accidentVehicleState"
                  ></multiselect>
                </div>
              </div>
              <div
                class="form-group row"
                v-if="form.aaVehicleState === 'Other'"
              >
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600"> Please specify </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="aaVehicleState"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <header class="card-header">
            <h2 class="card-title">How fast were the vehicles moving?</h2>
          </header>
          <div class="card-body">
            <div class="form-vertical">
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600"> Your Vehicle </label>
                  <multiselect
                    v-model="form.aaVehicleSpeed"
                    :searchable="false"
                    :options="speedList"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.numVehicles > 1">
                <div class="col-lg-12">
                  <label class="label font-weight-600"> Other Vehicle </label>
                  <multiselect
                    v-model="form.aaOtherVehicleSpeed"
                    :searchable="false"
                    :options="speedList"
                  ></multiselect>
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
                  <multiselect
                    v-model="form.aaConsciousness"
                    :searchable="false"
                    :options="accidentConsciousness"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Did the airbags deployed during the accident?
                  </label>
                  <multiselect
                    v-model="form.aaAirbags"
                    :searchable="false"
                    :options="accidentAirbags"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    What type of headrests where in your vehicle?
                  </label>
                  <multiselect
                    v-model="form.aaHeadrestType"
                    :searchable="false"
                    :options="accidentHeadrestType"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Where was the headrest in relation to your body?
                  </label>
                  <multiselect
                    v-model="form.aaHeadrestPosition"
                    :searchable="false"
                    :options="accidentHeadrestPosition"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    What type of seatbelt where you wearing?
                  </label>
                  <multiselect
                    v-model="form.aaSeatbeltType"
                    :searchable="false"
                    :options="accidentSeatbeltType"
                    @select="setCodeValue($event, 'SeatbeltType')"
                  ></multiselect>
                </div>
              </div>
              <div
                class="form-group row"
                v-if="form.aaSeatbeltType === 'Other'"
              >
                <div class="col-lg-10 mx-auto">
                  <label class="label font-weight-600"> Please specify </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="aaSeatbeltType"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Did the accident cause you to slide out of your seatbelt?
                  </label>
                  <multiselect
                    v-model="form.aaSeatbeltEffect"
                    :searchable="false"
                    :options="accidentSeatbeltEffect"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Select parts of your vehicle that were damaged:
                  </label>
                  <multiselect
                    v-model="form.aaVehicleDamage"
                    :searchable="false"
                    :options="accidentVehicleDamage"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Select parts of your vehicle that were dented inward during
                    the accident:
                  </label>
                  <multiselect
                    v-model="form.aaVehicleDents"
                    :searchable="false"
                    :options="accidentVehicleDents"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Select all the doors that would no longer open as a result
                    of the accident:
                  </label>
                  <multiselect
                    v-model="form.aaVehicleDoors"
                    :searchable="false"
                    :options="accidentVehicleDoors"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    How was your head positioned during the accident?
                  </label>
                  <multiselect
                    v-model="form.aaHeadPosition"
                    :searchable="false"
                    :options="accidentHeadPosition"
                    @select="setCodeValue($event, 'HeadPosition')"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    How was your torso positioned during the accident?
                  </label>
                  <multiselect
                    v-model="form.aaTorso"
                    :searchable="false"
                    :options="accidentTorso"
                    @select="setCodeValue($event, 'TorsoPosition')"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    How were your hands positioned during the accident?
                  </label>
                  <multiselect
                    v-model="form.aaHandPosition"
                    :searchable="false"
                    :options="accidentHandPosition"
                    @select="setCodeValue($event, 'HandPosition')"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Select all the parts of your body that where impacted during
                    the accident:
                  </label>
                  <multiselect
                    v-model="form.aaImpactLocations"
                    :searchable="false"
                    :options="accidentImpactLocations"
                    :multiple="true"
                    @remove="removePart"
                  ></multiselect>
                </div>
              </div>
              <div
                class="form-group row"
                v-for="item in form.aaImpactLocations"
                :key="item"
              >
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Select everything your {{ item }} hit during the accident:
                  </label>
                  <multiselect
                    v-model="form['aaImpactLocCar' + item]"
                    :searchable="false"
                    :options="accidentLocationParts"
                    :multiple="true"
                  ></multiselect>
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
                  <multiselect
                    v-model="form.aaHospital"
                    :searchable="false"
                    :options="accidentYesNo"
                    @select="setCodeValue($event, 'Hospital')"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Please enter the name of the Hospital
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.aaHospitalName"
                  />
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    How did you get to the Hospital?
                  </label>
                  <multiselect
                    v-model="form.aaHospitalTranspo"
                    :searchable="false"
                    :options="accidentHospitalTranspo"
                    @select="setCodeValue($event, 'HospitalTransport')"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Were you hospitalized overnight?
                  </label>
                  <multiselect
                    v-model="form.aaHospitalized"
                    :searchable="false"
                    :options="accidentYesNo"
                    @select="setCodeValue($event, 'HospitalOvernight')"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    At the Hospital, did you receive pain medication?
                  </label>
                  <multiselect
                    v-model="form.aaPainMed"
                    :searchable="false"
                    :options="accidentYesNo"
                    @select="setCodeValue($event, 'HospitalPainMeds')"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    At the Hospital, did you receive muscle relaxers?
                  </label>
                  <multiselect
                    v-model="form.aaMuscleRelaxers"
                    :searchable="false"
                    :options="accidentYesNo"
                    @select="setCodeValue($event, 'HospitalMuscleRelaxers')"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    At the hospital, did you receive stitches?
                  </label>
                  <multiselect
                    v-model="form.aaStitches"
                    :searchable="false"
                    :options="accidentYesNo"
                    @select="setCodeValue($event, 'HospitalStitches')"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    Please select the items you received at the Hospital
                  </label>
                  <multiselect
                    v-model="form.aaMedEquip"
                    :searchable="false"
                    :options="accidentMedEquip"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    At the Hospital, were Xray's taken?
                  </label>
                  <multiselect
                    v-model="form.aaXray"
                    :searchable="false"
                    :options="accidentYesNo"
                    @select="setCodeValue($event, 'HospitalXrays')"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    At the Hospital, was an MRI taken?
                  </label>
                  <multiselect
                    v-model="form.aaMRI"
                    :searchable="false"
                    :options="accidentYesNo"
                    @select="setCodeValue($event, 'HospitalMRI')"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group row" v-if="form.aaHospital === 'Yes'">
                <div class="col-lg-12">
                  <label class="label font-weight-600">
                    At the Hospital, were any other type of images taken?
                  </label>
                  <multiselect
                    v-model="form.aaOtherImages"
                    :searchable="false"
                    :options="accidentYesNo"
                    @select="setCodeValue($event, 'HospitalImaging')"
                  ></multiselect>
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
                <button
                  type="reset"
                  class="btn btn-default mr-2"
                  v-if="getTaskPreviousTaskType"
                  @click="previous"
                >
                  Back
                </button>
                <btn-saving :is-saving="isSaving" />
              </div>
            </div>
          </footer>
        </section>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Multiselect from 'vue-multiselect'
import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from '@vuepic/vue-datepicker'
import TimePicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'
import { useTaskStore } from '@/stores/task'
import BtnSaving from '../button-saving.vue'

const router = useRouter()
const taskStore = useTaskStore()

const isLoading = ref(true)
const isSaving = ref(false)
const form = ref({
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
})

const accidentInfo = ref([])
const aaConditions = ref('')
const aaDescription = ref('')
const aaImpact = ref('')
const aaLocationVehicle = ref('')
const aaAwareness = ref('')
const aaVehicleType = ref('')
const aaVehicleTypeOther = ref('')
const aaVehicleState = ref('')
// These variables are already defined in the form.value object
// const aaVehicleSpeed = ref(0)
// const aaOtherVehicleSpeed = ref(0)
// const aaConsciousness = ref('')
const aaAirbags = ref('')
const aaHeadrestType = ref('')
const aaHeadrestPosition = ref('')
const aaSeatbeltType = ref('')
const aaSeatbeltEffect = ref('')
const aaVehicleDamage = ref([])
const aaVehicleDents = ref([])
const aaVehicleDoors = ref([])
const aaHeadPosition = ref('')
const aaTorso = ref('')
const aaHandPosition = ref('')
const aaImpactLocations = ref([])
const aaHospital = ref('')
const aaHospitalName = ref('')
const aaHospitalTranspo = ref('')
const aaHospitalized = ref('')
const aaPainMed = ref('')
const aaMuscleRelaxers = ref('')
const aaStitches = ref('')
const aaMedEquip = ref([])
const aaXray = ref('')
const aaMRI = ref('')
const aaOtherImages = ref('')

// Computed properties
const getTaskPreviousTaskType = computed(() => taskStore.previousTaskType)
const getTaskCurrentTaskType = computed(() => taskStore.currentTaskType)
const currentPatientAssociated = computed(
  () => taskStore.currentPatientAssociated
)
const getTaskCurrentCaseHistoryId = computed(
  () => taskStore.currentCaseHistoryId
)

// Methods
const loadAccidentInfo = async () => {
  try {
    const response = await taskStore.getAccidentInfo()
    accidentInfo.value = response.data
    form.value = response.data
  } catch (error) {
    console.error('Error loading accident info:', error)
  } finally {
    isLoading.value = false
  }
}

const save = async () => {
  isSaving.value = true
  try {
    await taskStore.saveAccidentInfo(form.value)
    router.push('/task/complaint-questions')
  } catch (error) {
    console.error('Error saving accident info:', error)
  } finally {
    isSaving.value = false
  }
}

const prev = () => {
  const currentIndex = getTaskPreviousTaskType.value.findIndex(
    (c) => c === getTaskCurrentTaskType.value
  )
  let prevPage = ''
  if (currentIndex === -1) {
    prevPage =
      getTaskPreviousTaskType.value[getTaskPreviousTaskType.value.length - 1]
  } else {
    prevPage = getTaskPreviousTaskType.value[currentIndex - 1]
  }
  taskStore.setTaskCurrentTaskType({
    back: true,
    page: prevPage,
    removePage: getTaskCurrentTaskType.value
  })
}

onMounted(() => {
  loadAccidentInfo()
})
</script>

<style scoped>
.card + .card {
  margin-top: 0;
}
</style>
