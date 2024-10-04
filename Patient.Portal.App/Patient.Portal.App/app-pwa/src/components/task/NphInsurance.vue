<template>
  <section role="main">
    <form @submit.prevent="submit" class="mt-5 mr-2 ml-2 justify-content-md-center">
      <div class="col">
        <section class="card">
          <header v-if="isPortionCareSaved" class="card-header">
            <h2 class="card-title"> {{ TaskInfo.Description }}</h2>
          </header>
          <div class="card-body">
            <div v-if="!isLoading">
              <div v-if="!isPortionCareSaved" class="form-group row text-center f-weight-550">
                <div class="col-lg-12 text-center">
                  <h3 class="label f-weight-550">Do you plan on using insurance for any portion of your care?</h3>
                  <div class="form-check">
                    <label class="radio-inline">
                      <input type="radio" name="question" :checked="isPortionCare" @click="toggle(true)" /> YES
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="question" :checked="!isPortionCare" @click="toggle(false)" /> NO
                    </label>
                  </div>
                </div>
                <div class="col-lg-12 pt-4 mt-4" v-if="!isPortionCare">
                  <div class="form-group mx-auto row f-weight-550 pt-2">
                    <div class="col-lg-6 mx-auto">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="row">
                            <div class="col-lg-12">
                              <label class="label f-weight-550 pr-2">Take a picture of your Driver's License or State
                                Issued Identification.</label>
                              <div class="row">
                                <div class="col-6 text-right">
                                  <div v-if="!IsMobile">
                                    <button type="button" class="btn btn-sm btn-outline-primary"
                                      @click="toggleCamera2(), isFrontID = true" :disabled="isCamera2Open">
                                      <span>Capture front
                                        ID <i class="fa-solid fa-camera"></i></span>
                                      <!-- <span v-else><i class="fa-solid fa-camera"></i> Close Camera</span> -->
                                    </button>
                                  </div>
                                  <div v-else>
                                    <label for="licenseFile" class="btn btn-sm btn-primary"><i
                                        class="fa-solid fa-camera mr-2"></i>Open Camera</label>
                                    <input type="file" style="display: none" id="licenseFile" capture="environment"
                                      accept="image/*,video/*" @change="loadLicenseFileAsURL">
                                  </div>
                                </div>
                                <div class="col-6 text-left" style="display: flex; align-items: center;">
                                  <div v-if="base64String2Front !== ''">
                                    <span class="pr-2">CAPTURED FRONT ID</span>
                                    <a href="javascript: void(0)" @click="base64String2Front = ''">
                                      <i class="fa-solid fa-circle-minus" style="color:red"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div class="row pt-2">
                                <div class="col-6 text-right">
                                  <div v-if="!IsMobile">
                                    <button type="button" class="btn btn-sm btn-outline-primary"
                                      @click="toggleCamera2(), isFrontID = false" :disabled="isCamera2Open">
                                      <span>Capture back
                                        ID <i class="fa-solid fa-camera"></i></span>
                                      <!-- <span v-else><i class="fa-solid fa-camera"></i> Close Camera</span> -->
                                    </button>
                                  </div>
                                  <div v-else>
                                    <label for="licenseFile2" class="btn btn-sm btn-primary"><i
                                        class="fa-solid fa-camera mr-2"></i>Open Camera</label>
                                    <input type="file" style="display: none" id="licenseFile2" capture="environment"
                                      accept="image/*,video/*" @change="loadLicenseFileAsURL">
                                  </div>
                                </div>
                                <div class="col-6 text-left" style="display: flex; align-items: center;">
                                  <div v-if="base64String2Back !== ''">
                                    <span class="pr-2">CAPTURED BACK ID</span>
                                    <a href="javascript: void(0)" @click="base64String2Back = ''">
                                      <i class="fa-solid fa-circle-minus" style="color:red"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row pt-2" v-if="!IsMobile">
                            <div class="mx-auto web-camera-container">
                              <div v-show="isCamera2Open && isLoading3" class="camera-loading">
                                <ul class="loader-circle">
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                </ul>
                              </div>

                              <div v-if="isCamera2Open" v-show="!isLoading2" class="camera-box"
                                :class="{ 'flash': isShotPhoto2 }">
                                <div>
                                  <div class="camera-shutter" :class="{ 'flash': isShotPhoto2 }"></div>
                                  <video id="player2" v-show="!isPhotoTaken2" ref="camera2" :width="450" :height="337.5"
                                    autoplay>
                                  </video>

                                  <canvas v-show="isPhotoTaken2" id="photoTaken2" ref="canvas2" :width="450"
                                    :height="337.5"></canvas>
                                </div>
                              </div>
                              <div class="mx-auto" v-if="isCamera2Open && !isLoading3"
                                style="display:flex; align-items: center;">
                                <div class="camera-shoot pr-2">
                                  <button id="captureLicense" type="button" class="button camera-shoot"
                                    @click="takePhoto2">
                                    <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
                                  </button>
                                </div>
                                <div class="camera-button">
                                  <button type="button" class="button is-rounded"
                                    :class="{ 'is-primary': !isCamera2Open, 'is-danger': isCamera2Open }"
                                    @click="toggleCamera2">
                                    <span>Close Camera</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="isPortionCareSaved && isPortionCare">
                <div class="form-group mx-auto text-center row f-weight-550 pt-4">
                  <div class="col-lg-12">
                    <h4> {{ TaskInfo.Instructions }} </h4>
                  </div>
                </div>
                <div v-if="dataURLList.length === 0" class="form-group row f-weight-550 pt-4 mx-auto">
                  <div class="col-lg-6 mx-auto">
                    <label class="label f-weight-550">Upload File from your computer? (pdf and jpeg files)</label>
                    <div class="d-flex">
                      <input class="form-control" @change="loadFileAsURL" type="file" id="formFile" multiple
                        accept="image/gif,image/jpeg" />
                      <div class="pl-2" v-if="dataURLListUpload.length > 0" style="align-content: center;">
                        <!-- <button type="button" class="btn btn-primary mr-2 ml-2" @click="loadFileAsURL">Upload</button> -->
                        <button type="button" class="btn btn-primary" @click="removeUploadedFile">Clear</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="dataURLListUpload.length === 0" class="form-group mx-auto row f-weight-550 pt-2">
                  <div class="col-lg-6 mx-auto">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="row">
                          <div class="col-lg-12">
                            <label v-if="dataURLList.length === 0" class="label f-weight-550">Or Take a photo of the
                              document</label>
                            <div v-if="!IsMobile">
                              <button type="button" class="btn btn-sm btn-outline-primary" @click="toggleCamera">
                                <span v-if="!isCameraOpen"><i class="fa-solid fa-camera"></i> Open Camera</span>
                                <span v-else><i class="fa-solid fa-camera"></i> Close Camera</span>
                              </button>
                            </div>
                            <div v-else>
                              <label for="photoFile" class="btn btn-sm btn-primary"><i class="fa-solid fa-camera"></i>
                                Open Camera</label>
                              <input type="file" style="display: none" id="photoFile" capture="environment"
                                accept="image/*,video/*" @change="loadPhotoFileAsURL">
                            </div>
                          </div>
                        </div>
                        <div class="row pt-2" v-if="!IsMobile">
                          <div class="mx-auto web-camera-container">
                            <div v-show="isCameraOpen && isLoading2" class="camera-loading">
                              <ul class="loader-circle">
                                <li></li>
                                <li></li>
                                <li></li>
                              </ul>
                            </div>

                            <div v-if="isCameraOpen" v-show="!isLoading2" class="camera-box"
                              :class="{ 'flash': isShotPhoto }">
                              <div>
                                <div class="camera-shutter" :class="{ 'flash': isShotPhoto }"></div>
                                <video id="player" v-show="!isPhotoTaken" ref="camera" :width="450" :height="337.5"
                                  autoplay>
                                </video>

                                <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450"
                                  :height="337.5"></canvas>
                              </div>
                            </div>
                            <div class="mx-auto" v-if="isCameraOpen && !isLoading2"
                              style="display:flex; align-items: center;">
                              <div class="camera-shoot pr-2">
                                <button id="capture" type="button" class="button camera-shoot" @click="takePhoto">
                                  <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
                                </button>
                              </div>
                              <div class="camera-button">
                                <button type="button" class="button is-rounded"
                                  :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }"
                                  @click="toggleCamera">
                                  <span>Close Camera</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="dataURLList.length > 0">
                      <div class="col-lg-12 pt-4">
                        <ul>
                          <li class="pt-2" v-for="(item, index) in dataURLList" :key="index">
                            <span class="pr-2">IMAGE CAPTURE {{ index + 1 }}</span>
                            <a href="javascript: void(0)" @click="deleteItem(index)">
                              <i class="fa-solid fa-circle-minus" style="color:red"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group mx-auto row f-weight-550">
                  <div class="col-lg-6 mx-auto">
                    <label class="label f-weight-550">On your insurance, who is the policy holder?</label>
                    <div v-for="item in policyHolderList" :key="item">
                      <input type="radio" v-model="selectedPolicyHolder" name="profileImg" :value="item"> {{ item }}
                    </div>
                  </div>
                </div>
                <div v-if="selectedPolicyHolder !== 'Myself' && selectedPolicyHolder !== ''"
                  class="form-group mx-auto row f-weight-550">
                  <div class="col-lg-6 mx-auto">
                    <h3 class="label f-weight-550">Policy Holder Information</h3>
                    <label class="label f-weight-550">First Name <span style="color: red">*</span></label>
                    <input type="text" class="form-control" v-model="form.firstName" required />
                  </div>
                </div>
                <div v-if="selectedPolicyHolder !== 'Myself' && selectedPolicyHolder !== ''"
                  class="form-group mx-auto row f-weight-550">
                  <div class="col-lg-6 mx-auto">
                    <label class="label f-weight-550">Middle Initial <span style="color: red">*</span></label>
                    <input type="text" class="form-control" v-model="form.middleInitial" required />
                  </div>
                </div>
                <div v-if="selectedPolicyHolder !== 'Myself' && selectedPolicyHolder !== ''"
                  class="form-group mx-auto row f-weight-550">
                  <div class="col-lg-6 mx-auto">
                    <label class="label f-weight-550">Last Name <span style="color: red">*</span></label>
                    <input type="text" class="form-control" v-model="form.lastName" required />
                  </div>
                </div>
                <div v-if="selectedPolicyHolder !== 'Myself' && selectedPolicyHolder !== ''"
                  class="form-group mx-auto row f-weight-550">
                  <div class="col-lg-6 mx-auto">
                    <label class="label f-weight-550">Date of Birth <span style="color: red">*</span></label>
                    <datepicker v-model="form.dob" :input-class="'form-control bg-white'" :format="'MM/dd/yyyy'"
                      :id="'dpicker'" :required="true" :typeable="true" :initialView="'year'">
                    </datepicker>
                  </div>
                </div>
              </div>
              <div v-if="isPortionCareSaved && isPortionCare" class="pt-4">
                <div class="form-group mx-auto row f-weight-550 pt-2">
                  <div class="col-lg-6 mx-auto">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="row">
                          <div class="col-lg-12">
                            <label class="label f-weight-550 pr-2">Take a picture of your Driver's License or State
                              Issued Identification.</label>

                            <div class="row">
                              <div class="col-6 text-right">
                                <div v-if="!IsMobile">
                                  <button type="button" class="btn btn-sm btn-outline-primary"
                                    @click="toggleCamera2(), isFrontID = true" :disabled="isCamera2Open">
                                    <span>Capture front
                                      ID <i class="fa-solid fa-camera"></i></span>
                                    <!-- <span v-else><i class="fa-solid fa-camera"></i> Close Camera</span> -->
                                  </button>
                                </div>
                                <div v-else>
                                  <label for="licenseFile" class="btn btn-sm btn-primary"><i
                                      class="fa-solid fa-camera mr-2"></i>Open Camera</label>
                                  <input type="file" style="display: none" id="licenseFile" capture="environment"
                                    accept="image/*,video/*" @change="loadLicenseFileAsURL">
                                </div>
                              </div>
                              <div class="col-6 text-left" style="display: flex; align-items: center;">
                                <div v-if="base64String2Front !== ''">
                                  <span class="pr-2">CAPTURED FRONT ID</span>
                                  <a href="javascript: void(0)" @click="base64String2Front = ''">
                                    <i class="fa-solid fa-circle-minus" style="color:red"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div class="row pt-2">
                              <div class="col-6 text-right">
                                <div v-if="!IsMobile">
                                  <button type="button" class="btn btn-sm btn-outline-primary"
                                    @click="toggleCamera2(), isFrontID = false" :disabled="isCamera2Open">
                                    <span>Capture back
                                      ID <i class="fa-solid fa-camera"></i></span>
                                    <!-- <span v-else><i class="fa-solid fa-camera"></i> Close Camera</span> -->
                                  </button>
                                </div>
                                <div v-else>
                                  <label for="licenseFile2" class="btn btn-sm btn-primary"><i
                                      class="fa-solid fa-camera mr-2"></i>Open Camera</label>
                                  <input type="file" style="display: none" id="licenseFile2" capture="environment"
                                    accept="image/*,video/*" @change="loadLicenseFileAsURL">
                                </div>
                              </div>
                              <div class="col-6 text-left" style="display: flex; align-items: center;">
                                <div v-if="base64String2Back !== ''">
                                  <span class="pr-2">CAPTURED BACK ID</span>
                                  <a href="javascript: void(0)" @click="base64String2Back = ''">
                                    <i class="fa-solid fa-circle-minus" style="color:red"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row pt-2" v-if="!IsMobile">
                          <div class="mx-auto web-camera-container">
                            <div v-show="isCamera2Open && isLoading3" class="camera-loading">
                              <ul class="loader-circle">
                                <li></li>
                                <li></li>
                                <li></li>
                              </ul>
                            </div>

                            <div v-if="isCamera2Open" v-show="!isLoading2" class="camera-box"
                              :class="{ 'flash': isShotPhoto2 }">
                              <div>
                                <div class="camera-shutter" :class="{ 'flash': isShotPhoto2 }"></div>
                                <video id="player2" v-show="!isPhotoTaken2" ref="camera2" :width="450" :height="337.5"
                                  autoplay>
                                </video>

                                <canvas v-show="isPhotoTaken2" id="photoTaken2" ref="canvas2" :width="450"
                                  :height="337.5"></canvas>
                              </div>
                            </div>
                            <div class="mx-auto" v-if="isCamera2Open && !isLoading3"
                              style="display:flex; align-items: center;">
                              <div class="camera-shoot pr-2">
                                <button id="captureLicense" type="button" class="button camera-shoot"
                                  @click="takePhoto2">
                                  <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
                                </button>
                              </div>
                              <div class="camera-button">
                                <button type="button" class="button is-rounded"
                                  :class="{ 'is-primary': !isCamera2Open, 'is-danger': isCamera2Open }"
                                  @click="toggleCamera2">
                                  <span>Close Camera</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-12 pt-4">
                        <ul>
                          <li class="pt-2" v-for="(item, index) in dataURLList2" :key="index">
                            <span class="pr-2">IMAGE CAPTURE {{ index + 1 }}</span>
                            <a href="javascript: void(0)" @click="deleteItem2(index)">
                              <i class="fa-solid fa-circle-minus" style="color:red"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="col-12">
                <content-placeholders :rounded="true" :centered="true">
                  <content-placeholders-text :lines="5" />
                </content-placeholders>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <div class="row justify-content-end">
              <div class="col-sm-9">
                <button type="reset" class="btn btn-default mr-2" @click="prev" v-if="getTaskPreviousTaskType">
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

<script>
// import Multiselect from 'vue-multiselect'
import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
import api from '../../api/http-common.js'
import { mapGetters, mapActions } from 'vuex'
import BtnSaving from '../button-saving.vue'
import { jsPDF } from 'jspdf'
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker,
    BtnSaving
  },
  data() {
    return {
      files: {},
      isSaving: false,
      isLoading: false,
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading2: false,
      isCamera2Open: false,
      isPhotoTaken2: false,
      isShotPhoto2: false,
      isLoading3: false,
      link: '#',
      isPortionCare: false,
      isPortionCareSaved: false,
      isFrontID: true,
      base64Image1: '',
      base64Image2: '',
      dataURLList: [],
      dataURLList2: [],
      base64String2Front: '',
      base64String2Back: '',
      dataURLListUpload: [],
      policyHolderList: ['Myself', 'My Spouse/Partner', 'My Parent/Guardian'],
      selectedPolicyHolder: '',
      form: {
        firstName: '',
        middleInitial: '',
        lastName: '',
        dob: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'getTaskInfo',
      'getTaskPreviousTaskType',
      'currentPatientAssociated'
    ]),
    TaskInfo() {
      return JSON.parse(this.getTaskInfo)
    },
    IsMobile() {
      return window.navigator.userAgent.toLowerCase().includes('mobi')
    }
  },
  methods: {
    ...mapActions(['setTaskCurrentTaskType']),
    async submit() {
      if (this.isPortionCare) {
        if (this.isPortionCareSaved) {
          if (this.isCameraOpen) {
            this.isCameraOpen = false
            this.isPhotoTaken = false
            this.isShotPhoto = false
            this.stopCameraStream()
          }
          if (this.isCameraOpen2) {
            this.isCamera2Open = false
            this.isPhotoTaken2 = false
            this.isShotPhoto2 = false
            this.stopCameraStream2()
          }
          if (this.selectedPolicyHolder !== '') {
            if (this.base64String2Front !== '' && this.base64String2Back === '') {
              this.$swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cannot proceed, Please capture the back of your License ID'
              })
            } else if (this.base64String2Front === '' && this.base64String2Back !== '') {
              this.$swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cannot proceed, Please capture the front of your License ID'
              })
            } else {
              await this.uploadFile2(true)
              var givenDate = this.form.dob
              var todaysDate = new Date()

              if (givenDate > todaysDate) {
                this.$swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Invalid Date of Birth!'
                })
              } else {
                this.isSaving = true

                await api.task.request.insertInsuranceInfo({
                  facilityId: this.currentPatientAssociated.facilityID,
                  patientId: this.currentPatientAssociated.patientID,
                  relation: this.selectedPolicyHolder,
                  firstname: this.form.firstName,
                  mi: this.form.middleInitial.substring(0, 1),
                  lastname: this.form.lastName,
                  dob: this.form.dob
                })

                // uploading license images
                // if (this.dataURLList2.length > 0) {
                //   await this.uploadFile(this.dataURLList2, true)
                // }

                // end
                if (this.dataURLList.length > 0) {
                  await this.uploadFile(this.dataURLList, false)
                } else if (this.dataURLListUpload.length > 0) {
                  await this.uploadFile(this.dataURLListUpload, false)
                } else {
                  this.isSaving = false
                  this.setTaskCurrentTaskType(this.TaskInfo.CurrentTaskType)
                }
              }
            }
          }
        } else {
          this.isPortionCareSaved = true
        }
      } else {
        if (this.isCameraOpen2) {
          this.isCamera2Open = false
          this.isPhotoTaken2 = false
          this.isShotPhoto2 = false
          this.stopCameraStream2()
        }

        // if (this.dataURLList2.length > 0) {
        //   await this.uploadFile(this.dataURLList2, true)
        //   this.dataURLList2 = []
        // }
        if (this.base64String2Front !== '' && this.base64String2Back === '') {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Cannot proceed, Please capture the back of your License ID'
          })
        } else if (this.base64String2Front === '' && this.base64String2Back !== '') {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Cannot proceed, Please capture the front of your License ID'
          })
        } else {
          await this.uploadFile2(true)
          this.setTaskCurrentTaskType(this.TaskInfo.CurrentTaskType)
        }
      }
    },
    toggle(val) {
      this.isPortionCare = val
      this.base64String2Front = ''
      this.base64String2Back = ''
    },

    prev() {
      if (this.isPortionCareSaved) {
        this.isPortionCare = true
        this.isPortionCareSaved = false
      } else {
        this.setTaskCurrentTaskType('PatientInfo')
      }
    },
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false
        this.isPhotoTaken = false
        this.isShotPhoto = false
        this.stopCameraStream()
      } else {
        this.isCameraOpen = true
        this.createCameraElement()
      }
    },
    toggleCamera2() {
      if (this.isCamera2Open) {
        this.isCamera2Open = false
        this.isPhotoTaken2 = false
        this.isShotPhoto2 = false
        this.stopCameraStream2()
      } else {
        this.isCamera2Open = true
        this.createCameraElement2()
      }
    },
    createCameraElement() {
      // this.isLoading2 = true

      const constraints = (window.constraints = {
        audio: false,
        video: true
      })

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          this.isLoading2 = false
          this.$refs.camera.srcObject = stream
        })
        /* eslint handle-callback-err: "warn" */
        .catch(error => {
          this.isLoading2 = false
          alert("May the browser didn't support or there is some errors.")
        })
    },
    createCameraElement2() {
      const constraints = (window.constraints = {
        audio: false,
        video: true
      })

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          this.isLoading3 = false
          this.$refs.camera2.srcObject = stream
        })
        /* eslint handle-callback-err: "warn" */
        .catch(error => {
          this.isLoading3 = false
          alert("The browser didn't support or there is some errors.")
        })
    },
    stopCameraStream() {
      const tracks = this.$refs.camera.srcObject.getTracks()

      tracks.forEach(track => {
        track.stop()
      })
    },
    stopCameraStream2() {
      const tracks = this.$refs.camera2.srcObject.getTracks()

      tracks.forEach(track => {
        track.stop()
      })
    },
    takePhoto() {
      this.dataURLListUpload = []
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true

        const FLASH_TIMEOUT = 50

        setTimeout(() => {
          this.isShotPhoto = false
        }, FLASH_TIMEOUT)
      }
      this.isPhotoTaken = !this.isPhotoTaken

      const context = this.$refs.canvas.getContext('2d')
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5)

      // save image to arraylist
      const canvas = document.getElementById('photoTaken').toDataURL('image/jpeg')
        .replace('image/jpeg', 'image/octet-stream')
      this.dataURLList.push(canvas)
      setTimeout(() => {
        this.anotherPhoto()
      }, 2500)
    },
    takePhoto2() {
      if (!this.isPhotoTaken2) {
        this.isShotPhoto2 = true

        const FLASH_TIMEOUT = 50

        setTimeout(() => {
          this.isShotPhoto2 = false
        }, FLASH_TIMEOUT)
      }
      this.isPhotoTaken2 = !this.isPhotoTaken2
      const context = this.$refs.canvas2.getContext('2d')
      context.drawImage(this.$refs.camera2, 0, 0, 450, 337.5)

      // save image to arraylist
      const canvas = document.getElementById('photoTaken2').toDataURL('image/jpeg')
        .replace('image/jpeg', 'image/octet-stream')
      // this.dataURLList2.push(canvas)
      if (this.isFrontID) {
        this.base64String2Front = canvas
      } else {
        this.base64String2Back = canvas
      }

      setTimeout(() => {
        // this.anotherPhoto2()
        this.toggleCamera2()
      }, 1500)
    },
    anotherPhoto() {
      if (this.isCameraOpen) {
        this.isPhotoTaken = false
        this.isShotPhoto = false
      } else {
        this.isCameraOpen = true
        this.createCameraElement()
      }
    },
    anotherPhoto2() {
      if (this.isCamera2Open) {
        this.isPhotoTaken2 = false
        this.isShotPhoto2 = false
      } else {
        this.isCamera2Open = true
        this.createCameraElement2()
      }
    },
    convertBase64ToPdf(listData) {
      const pdf = new jsPDF()

      for (let i = 0; i < listData.length; i++) {
        pdf.addImage(listData[i], 'JPEG', 15, 40, 180, 160)
        if (i !== listData.length - 1) {
          pdf.addPage()
        }
      }

      // Save the PDF file
      pdf.save('output.pdf')
    },
    deleteItem(index) {
      this.dataURLList.splice(index, 1)
      const files = Array.from(document.getElementById('formFile').files)
      if (files) {
        files.splice(index, 1)
        document.getElementById('formFile').files.length = files.length
      }
    },
    deleteItem2(index) {
      this.dataURLList2.splice(index, 1)
      const files = Array.from(document.getElementById('licenseFile').files)
      if (files) {
        files.splice(index, 1)
        document.getElementById('licenseFile').files.length = files.length
      }
    },
    async loadFileAsURL() {
      this.checkFileType()
      const files = Array.from(document.getElementById('formFile').files).map(file => {
        const reader = new FileReader()
        return new Promise(resolve => {
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(file)
        })
      })
      const res = await Promise.all(files)
      this.dataURLListUpload = res
    },
    async loadPhotoFileAsURL() {
      const files = Array.from(document.getElementById('photoFile').files).map(file => {
        const reader = new FileReader()
        return new Promise(resolve => {
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(file)
        })
      })
      const res = await Promise.all(files)
      this.dataURLList = res
    },
    async loadLicenseFileAsURL() {
      const files = Array.from(document.getElementById('licenseFile').files).map(file => {
        const reader = new FileReader()
        return new Promise(resolve => {
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(file)
        })
      })
      const res = await Promise.all(files)
      this.dataURLList2 = res
    },
    removeUploadedFile() {
      document.getElementById('formFile').value = null
      this.dataURLListUpload = []
    },
    async uploadFile(listData, isInsurance) {
      let base64String = ''
      const pdf = new jsPDF()
      if (listData.length > 0) {
        for (let i = 0; i < listData.length; i++) {
          pdf.addImage(listData[i], 'JPEG', 15, 40, 180, 160)
          if (i !== listData.length - 1) {
            pdf.addPage()
          }
        }
        base64String = pdf.output('datauristring')
      }
      if (base64String !== '') {
        const base64data = base64String.split('base64')[1]

        const retData = await api.task.request.virusScan({
          facilityId: this.currentPatientAssociated.facilityID,
          base64: base64data.replace(',', '').trim(),
          dataUri: ''
        })

        if (retData.data) {
          if (retData.data.value) {
            this.uploadPatientForm(base64data.replace(',', '').trim(), isInsurance)
          } else {
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: retData.data.reason
            })
          }
        }
      }
    },

    async uploadFile2(isInsurance) {
      let base64String = ''
      const pdf = new jsPDF()
      if (this.base64String2Front !== '' && this.base64String2Back !== '') {
        pdf.addImage(this.base64String2Front, 'JPEG', 15, 40, 180, 160)
        pdf.addPage()
        pdf.addImage(this.base64String2Back, 'JPEG', 15, 40, 180, 160)
        base64String = pdf.output('datauristring')
      }

      if (base64String !== '') {
        const base64data = base64String.split('base64')[1]

        const retData = await api.task.request.virusScan({
          facilityId: this.currentPatientAssociated.facilityID,
          base64: base64data.replace(',', '').trim(),
          dataUri: ''
        })

        if (retData.data) {
          if (retData.data.value) {
            await this.uploadPatientForm(base64data.replace(',', '').trim(), isInsurance)
            this.base64String2Front = ''
            this.base64String2Back = ''
          } else {
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: retData.data.reason
            })
          }
        }
      }
    },
    async uploadPatientForm(base64data, isInsurance) {
      let desc = this.TaskInfo.Description
      if (isInsurance) {
        desc = 'Identification'
      }
      const retData = await api.task.request.uploadPatientForm({
        facilityId: this.currentPatientAssociated.facilityID,
        patientId: this.currentPatientAssociated.patientID,
        description: desc,
        base64: base64data,
        folder: this.TaskInfo.Folder
      })
      if (retData && !isInsurance) {
        this.isSaving = false
        this.setTaskCurrentTaskType(this.TaskInfo.CurrentTaskType)
        this.dataURLList = []
        this.dataURLListUpload = []
        // this.dataURLList2 = []
        this.base64String2Front = ''
        this.base64String2Back = ''
      }
    },
    checkFileType() {
      const files = Array.from(document.getElementById('formFile').files)
      const text = 'image/gif,image/jpeg'
      for (let i = 0; i < files.length; i++) {
        if (!text.includes(files[i].type)) {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid File Type!'
          })
          this.removeUploadedFile()
          break
        }
      }
    }
  },
  async mounted() {
    this.isLoading = true
    this.isLoading = false
  }
}
</script>
<style scoped>
ul {
  list-style-type: none;
}

.capture-button {
  padding: 5px 10px;
  font-size: 16px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px;
}

.form-box {
  padding: 1.5rem;
  margin-right: 0;
  margin-left: 0;
  border-width: .2rem;
  position: relative;
  margin: 1rem -15px 0;
  border: solid #f7f7f9;
}

.radio-inline {
  padding-right: 20px;
  font-size: 18px;
  font-weight: 600;
}

.web-camera-container {
  display: flex;
  flex-direction: column;
  width: 500px;

  .camera-button {
    margin: auto;
    margin-left: 0;
  }

  .camera-box {
    .camera-shutter {
      opacity: 0;
      width: 450px;
      height: 337.5px;
      background-color: #fff;
      position: absolute;

      &.flash {
        opacity: 1;
      }

      ;
    }
  }

  .camera-shoot {
    margin: 1rem 0;

    button {
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;

      img {
        height: 35px;
        object-fit: cover;
      }
    }
  }

  .camera-loading {
    overflow: hidden;
    height: 100%;
    position: absolute;
    width: 100%;
    margin: 3rem 0 0 -1.2rem;

    ul {
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: 999999;
      margin: 0;
    }

    .loader-circle {
      display: block;
      height: 14px;
      margin: 0 auto;
      top: 20%;
      left: 100%;
      transform: translateY(-50%);
      transform: translateX(-50%);
      position: absolute;
      width: 100%;
      padding: 0;

      li {
        display: block;
        float: left;
        width: 10px;
        height: 10px;
        line-height: 10px;
        padding: 0;
        position: relative;
        margin: 0 0 0 4px;
        background: #999;
        animation: preload 1s infinite;
        top: -50%;
        border-radius: 100%;

        &:nth-child(2) {
          animation-delay: .2s;
        }

        &:nth-child(3) {
          animation-delay: .4s;
        }
      }
    }
  }

  @keyframes preload {
    0% {
      opacity: 1;
    }

    50% {
      opacity: .4;
    }

    100% {
      opacity: 1;
    }
  }
}
</style>
