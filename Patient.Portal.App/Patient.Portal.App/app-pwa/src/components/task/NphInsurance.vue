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
              </div>
              <div v-if="isPortionCareSaved">
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
                            <div v-if="!IsMobile" class="camera-button">
                              <button type="button" class="capture-button"
                                :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }"
                                @click="toggleCamera">
                                <span v-if="!isCameraOpen">Open Camera</span>
                                <span v-else>Close Camera</span>
                              </button>
                            </div>
                            <div v-else>
                              <label for="photoFile" class="capture-button">Open Camera</label>
                              <input type="file" style="display: none" id="photoFile" capture="environment" accept="image/*,video/*" @change="loadPhotoFileAsURL">
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
                    <div class="row">
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
                      :id="'dpicker'" :required="true" :typeable="false" onkeydown="return false">
                    </datepicker>
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
      link: '#',
      isPortionCare: false,
      isPortionCareSaved: false,
      base64Image1: '',
      base64Image2: '',
      dataURLList: [],
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
          if (this.selectedPolicyHolder !== '') {
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

              // uploading images

              if (this.dataURLList.length > 0) {
                this.uploadFile(this.dataURLList)
              } else if (this.dataURLListUpload.length > 0) {
                this.uploadFile(this.dataURLListUpload)
              }
            }
          }
        } else {
          this.isPortionCareSaved = true
        }
      } else {
        this.setTaskCurrentTaskType(this.TaskInfo.CurrentTaskType)
      }
    },
    toggle(val) {
      this.isPortionCare = val
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
    stopCameraStream() {
      const tracks = this.$refs.camera.srcObject.getTracks()

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
    anotherPhoto() {
      if (this.isCameraOpen) {
        this.isPhotoTaken = false
        this.isShotPhoto = false
      } else {
        this.isCameraOpen = true
        this.createCameraElement()
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
      // var base64 = pdf.output('datauri')
      // console.log(base64)
    },
    deleteItem(index) {
      this.dataURLList.splice(index, 1)
      const files = Array.from(document.getElementById('formFile').files)
      if (files) {
        files.splice(index, 1)
        console.log('splice')
        console.log(files)
        document.getElementById('formFile').files.length = files.length
      }
      // var myFiles = Object.entries(document.getElementById('formFile').files)
      // Object.entries(myFiles.splice(index - 1, 1))
      // console.log(myFiles)
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
      this.dataURLList.push(res)
    },
    removeUploadedFile() {
      document.getElementById('formFile').value = null
      this.dataURLListUpload = []
    },
    async uploadFile(listData) {
      let base64String = ''
      const pdf = new jsPDF()
      if (listData.length > 0) {
        for (let i = 0; i < listData.length; i++) {
          pdf.addImage(listData[i], 'JPEG', 15, 40, 180, 160)
          if (i !== listData.length - 1) {
            pdf.addPage()
          }
        }
        base64String = pdf.output('datauri')
      }
      if (base64String !== '') {
        const base64data = base64String.split('base64')[1]
        const retData = await api.task.request.virusScan({
          facilityId: this.currentPatientAssociated.facilityID,
          base64: base64data.replace(',', '').trim()
        })
        if (retData.data) {
          if (retData.data.value) {
            this.uploadPatientForm(base64data.replace(',', '').trim())
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
    async uploadPatientForm(base64data) {
      const retData = await api.task.request.uploadPatientForm({
        facilityId: this.currentPatientAssociated.facilityID,
        patientId: this.currentPatientAssociated.patientID,
        description: this.TaskInfo.Description + '|' + this.TaskInfo.Folder,
        base64: base64data
      })
      if (retData) {
        this.isSaving = false
        this.setTaskCurrentTaskType(this.TaskInfo.CurrentTaskType)
        this.dataURLList = []
        this.dataURLListUpload = []
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
