<template>
  <section role="main">
    <form
      @submit.prevent="submit"
      class="mt-5 mr-2 ml-2 justify-content-md-center"
    >
      <div class="col">
        <section class="card">
          <header v-if="isPortionCareSaved" class="card-header">
            <h2 class="card-title">{{ TaskInfo.Description }}</h2>
          </header>
          <div class="card-body">
            <div v-if="!isLoading">
              <div
                v-if="!isPortionCareSaved"
                class="form-group row text-center f-weight-550"
              >
                <div class="col-lg-12 text-center">
                  <h3 class="label f-weight-550">
                    Do you plan on using insurance for any portion of your care?
                  </h3>
                  <div class="form-check">
                    <label class="radio-inline">
                      <input
                        type="radio"
                        name="question"
                        :checked="isPortionCare"
                        @click="toggle(true)"
                      />
                      YES
                    </label>
                    <label class="radio-inline">
                      <input
                        type="radio"
                        name="question"
                        :checked="!isPortionCare"
                        @click="toggle(false)"
                      />
                      NO
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
                              <label class="label f-weight-550 pr-2"
                                >Take a picture of your Driver's License or
                                State Issued Identification.</label
                              >
                              <div class="row">
                                <div class="col-6 text-right">
                                  <div v-if="!IsMobile">
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-outline-primary"
                                      @click="
                                        toggleCamera2(), (isFrontID = true)
                                      "
                                      :disabled="isCamera2Open"
                                    >
                                      <span
                                        >Capture front ID
                                        <i class="fa-solid fa-camera"></i
                                      ></span>
                                    </button>
                                  </div>
                                  <div v-else>
                                    <label
                                      for="licenseFileFront"
                                      class="btn btn-sm btn-primary"
                                      >Capture front ID
                                      <i class="fa-solid fa-camera mr-2"></i
                                    ></label>
                                    <input
                                      type="file"
                                      style="display: none"
                                      id="licenseFileFront"
                                      capture="environment"
                                      accept="image/*,video/*"
                                      @change="loadLicenseFileAsURLFront"
                                    />
                                  </div>
                                </div>
                                <div
                                  class="col-6 text-left"
                                  style="display: flex; align-items: center"
                                >
                                  <div v-if="base64String2Front !== ''">
                                    <span class="pr-2">CAPTURED FRONT ID</span>
                                    <a
                                      href="javascript: void(0)"
                                      @click="base64String2Front = ''"
                                    >
                                      <i
                                        class="fa-solid fa-circle-minus"
                                        style="color: red"
                                      ></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div class="row pt-2">
                                <div class="col-6 text-right">
                                  <div v-if="!IsMobile">
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-outline-primary"
                                      @click="
                                        toggleCamera2(), (isFrontID = false)
                                      "
                                      :disabled="isCamera2Open"
                                    >
                                      <span
                                        >Capture back ID
                                        <i class="fa-solid fa-camera"></i
                                      ></span>
                                    </button>
                                  </div>
                                  <div v-else>
                                    <label
                                      for="licenseFileBack"
                                      class="btn btn-sm btn-primary"
                                      >Capture back ID
                                      <i class="fa-solid fa-camera mr-2"></i
                                    ></label>
                                    <input
                                      type="file"
                                      style="display: none"
                                      id="licenseFileBack"
                                      capture="environment"
                                      accept="image/*,video/*"
                                      @change="loadLicenseFileAsURLBack"
                                    />
                                  </div>
                                </div>
                                <div
                                  class="col-6 text-left"
                                  style="display: flex; align-items: center"
                                >
                                  <div v-if="base64String2Back !== ''">
                                    <span class="pr-2">CAPTURED BACK ID</span>
                                    <a
                                      href="javascript: void(0)"
                                      @click="base64String2Back = ''"
                                    >
                                      <i
                                        class="fa-solid fa-circle-minus"
                                        style="color: red"
                                      ></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row pt-2" v-if="!IsMobile">
                            <div class="mx-auto web-camera-container">
                              <div
                                v-show="isCamera2Open && isLoading3"
                                class="camera-loading"
                              >
                                <ul class="loader-circle">
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                </ul>
                              </div>

                              <div
                                v-if="isCamera2Open"
                                v-show="!isLoading2"
                                class="camera-box"
                                :class="{ flash: isShotPhoto2 }"
                              >
                                <div>
                                  <div
                                    class="camera-shutter"
                                    :class="{ flash: isShotPhoto2 }"
                                  ></div>
                                  <video
                                    id="player2"
                                    v-show="!isPhotoTaken2"
                                    ref="camera2"
                                    :width="450"
                                    :height="337.5"
                                    autoplay
                                  ></video>

                                  <canvas
                                    v-show="isPhotoTaken2"
                                    id="photoTaken2"
                                    ref="canvas2"
                                    :width="450"
                                    :height="337.5"
                                  ></canvas>
                                </div>
                              </div>
                              <div
                                class="mx-auto"
                                v-if="isCamera2Open && !isLoading3"
                                style="display: flex; align-items: center"
                              >
                                <div class="camera-shoot pr-2">
                                  <button
                                    id="captureLicense"
                                    type="button"
                                    class="button camera-shoot"
                                    @click="takePhoto2"
                                  >
                                    <img
                                      src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
                                    />
                                  </button>
                                </div>
                                <div class="camera-button">
                                  <button
                                    type="button"
                                    class="button is-rounded"
                                    :class="{
                                      'is-primary': !isCamera2Open,
                                      'is-danger': isCamera2Open
                                    }"
                                    @click="toggleCamera2"
                                  >
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
              <!-- Upload File from your computer or ake a photo of the document -->
              <div v-if="isPortionCareSaved && isPortionCare">
                <div
                  class="form-group mx-auto text-center row f-weight-550 pt-4"
                >
                  <div class="col-lg-12">
                    <h4>{{ TaskInfo.Instructions }}</h4>
                  </div>
                </div>
                <div
                  v-if="dataURLList.length === 0"
                  class="form-group row f-weight-550 pt-4 mx-auto"
                >
                  <div class="col-lg-6 mx-auto">
                    <label class="label f-weight-550"
                      >Upload File from your computer? (pdf and jpeg
                      files)</label
                    >
                    <div class="d-flex">
                      <input
                        class="form-control"
                        @change="loadFileAsURL"
                        type="file"
                        id="formFile"
                        multiple
                        accept="image/gif,image/jpeg"
                      />
                      <div
                        class="pl-2"
                        v-if="dataURLListUpload.length > 0"
                        style="align-content: center"
                      >
                        <button
                          type="button"
                          class="btn btn-primary"
                          @click="removeUploadedFile"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="dataURLListUpload.length === 0"
                  class="form-group mx-auto row f-weight-550 pt-2"
                >
                  <div class="col-lg-6 mx-auto">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="row">
                          <div class="col-lg-12">
                            <label
                              v-if="dataURLList.length === 0"
                              class="label f-weight-550"
                              >Or Take a photo of the document</label
                            >

                            <div class="row">
                              <div class="col-6 text-right">
                                <div v-if="!IsMobile">
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-outline-primary"
                                    @click="toggleCamera(), (isFrontDoc = true)"
                                    :disabled="isCameraOpen"
                                  >
                                    <span
                                      >Capture front Doc
                                      <i class="fa-solid fa-camera"></i
                                    ></span>
                                  </button>
                                </div>
                                <div v-else>
                                  <label
                                    for="photoFile"
                                    class="btn btn-sm btn-primary"
                                    >Capture front Doc
                                    <i class="fa-solid fa-camera mr-2"></i
                                  ></label>
                                  <input
                                    type="file"
                                    style="display: none"
                                    id="photoFile"
                                    capture="environment"
                                    accept="image/*,video/*"
                                    @change="loadPhotoFileAsURLFront"
                                  />
                                </div>
                              </div>
                              <div
                                class="col-6 text-left"
                                style="display: flex; align-items: center"
                              >
                                <div v-if="base64StringFront !== ''">
                                  <span class="pr-2">CAPTURED FRONT DOC</span>
                                  <a
                                    href="javascript: void(0)"
                                    @click="base64StringFront = ''"
                                  >
                                    <i
                                      class="fa-solid fa-circle-minus"
                                      style="color: red"
                                    ></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div class="row pt-2">
                              <div class="col-6 text-right">
                                <div v-if="!IsMobile">
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-outline-primary"
                                    @click="
                                      toggleCamera(), (isFrontDoc = false)
                                    "
                                    :disabled="isCameraOpen"
                                  >
                                    <span
                                      >Capture back Doc
                                      <i class="fa-solid fa-camera"></i
                                    ></span>
                                  </button>
                                </div>
                                <div v-else>
                                  <label
                                    for="photoFileBack"
                                    class="btn btn-sm btn-primary"
                                    >Capture back Doc
                                    <i class="fa-solid fa-camera mr-2"></i
                                  ></label>
                                  <input
                                    type="file"
                                    style="display: none"
                                    id="photoFileBack"
                                    capture="environment"
                                    accept="image/*,video/*"
                                    @change="loadPhotoFileAsURLBack"
                                  />
                                </div>
                              </div>
                              <div
                                class="col-6 text-left"
                                style="display: flex; align-items: center"
                              >
                                <div v-if="base64StringBack !== ''">
                                  <span class="pr-2">CAPTURED BACK DOC</span>
                                  <a
                                    href="javascript: void(0)"
                                    @click="base64StringBack = ''"
                                  >
                                    <i
                                      class="fa-solid fa-circle-minus"
                                      style="color: red"
                                    ></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row pt-2" v-if="!IsMobile">
                          <div class="mx-auto web-camera-container">
                            <div
                              v-show="isCameraOpen && isLoading2"
                              class="camera-loading"
                            >
                              <ul class="loader-circle">
                                <li></li>
                                <li></li>
                                <li></li>
                              </ul>
                            </div>

                            <div
                              v-if="isCameraOpen"
                              v-show="!isLoading2"
                              class="camera-box"
                              :class="{ flash: isShotPhoto }"
                            >
                              <div>
                                <div
                                  class="camera-shutter"
                                  :class="{ flash: isShotPhoto }"
                                ></div>
                                <video
                                  id="player"
                                  v-show="!isPhotoTaken"
                                  ref="camera"
                                  :width="450"
                                  :height="337.5"
                                  autoplay
                                ></video>

                                <canvas
                                  v-show="isPhotoTaken"
                                  id="photoTaken"
                                  ref="canvas"
                                  :width="450"
                                  :height="337.5"
                                ></canvas>
                              </div>
                            </div>
                            <div
                              class="mx-auto"
                              v-if="isCameraOpen && !isLoading2"
                              style="display: flex; align-items: center"
                            >
                              <div class="camera-shoot pr-2">
                                <button
                                  id="capture"
                                  type="button"
                                  class="button camera-shoot"
                                  @click="takePhoto"
                                >
                                  <img
                                    src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
                                  />
                                </button>
                              </div>
                              <div class="camera-button">
                                <button
                                  type="button"
                                  class="button is-rounded"
                                  :class="{
                                    'is-primary': !isCameraOpen,
                                    'is-danger': isCameraOpen
                                  }"
                                  @click="toggleCamera"
                                >
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
                <div class="form-group mx-auto row f-weight-550">
                  <div class="col-lg-6 mx-auto">
                    <label class="label f-weight-550"
                      >On your insurance, who is the policy holder?</label
                    >
                    <div v-for="item in policyHolderList" :key="item">
                      <input
                        type="radio"
                        v-model="selectedPolicyHolder"
                        name="profileImg"
                        :value="item"
                      />
                      {{ item }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    selectedPolicyHolder !== 'Myself' &&
                    selectedPolicyHolder !== ''
                  "
                  class="form-group mx-auto row f-weight-550"
                >
                  <div class="col-lg-6 mx-auto">
                    <h3 class="label f-weight-550">
                      Policy Holder Information
                    </h3>
                    <label class="label f-weight-550"
                      >First Name <span style="color: red">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.firstName"
                      required
                    />
                  </div>
                </div>
                <div
                  v-if="
                    selectedPolicyHolder !== 'Myself' &&
                    selectedPolicyHolder !== ''
                  "
                  class="form-group mx-auto row f-weight-550"
                >
                  <div class="col-lg-6 mx-auto">
                    <label class="label f-weight-550"
                      >Middle Initial <span style="color: red">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.middleInitial"
                      required
                    />
                  </div>
                </div>
                <div
                  v-if="
                    selectedPolicyHolder !== 'Myself' &&
                    selectedPolicyHolder !== ''
                  "
                  class="form-group mx-auto row f-weight-550"
                >
                  <div class="col-lg-6 mx-auto">
                    <label class="label f-weight-550"
                      >Last Name <span style="color: red">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.lastName"
                      required
                    />
                  </div>
                </div>
                <div
                  v-if="
                    selectedPolicyHolder !== 'Myself' &&
                    selectedPolicyHolder !== ''
                  "
                  class="form-group mx-auto row f-weight-550"
                >
                  <div class="col-lg-6 mx-auto">
                    <label class="label f-weight-550"
                      >Date of Birth <span style="color: red">*</span></label
                    >
                    <datepicker
                      v-model="form.dob"
                      :input-class="'form-control bg-white'"
                      :format="'MM/dd/yyyy'"
                      :id="'dpicker'"
                      :required="true"
                      :typeable="true"
                      :initialView="'year'"
                    >
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
                            <label class="label f-weight-550 pr-2"
                              >Take a picture of your Driver's License or State
                              Issued Identification.</label
                            >

                            <div class="row">
                              <div class="col-6 text-right">
                                <div v-if="!IsMobile">
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-outline-primary"
                                    @click="toggleCamera2(), (isFrontID = true)"
                                    :disabled="isCamera2Open"
                                  >
                                    <span
                                      >Capture front ID
                                      <i class="fa-solid fa-camera"></i
                                    ></span>
                                  </button>
                                </div>
                                <div v-else>
                                  <label
                                    for="licenseFileFront"
                                    class="btn btn-sm btn-primary"
                                    >Capture front ID
                                    <i class="fa-solid fa-camera mr-2"></i
                                  ></label>
                                  <input
                                    type="file"
                                    style="display: none"
                                    id="licenseFileFront"
                                    capture="environment"
                                    accept="image/*,video/*"
                                    @change="loadLicenseFileAsURLFront"
                                  />
                                </div>
                              </div>
                              <div
                                class="col-6 text-left"
                                style="display: flex; align-items: center"
                              >
                                <div v-if="base64String2Front !== ''">
                                  <span class="pr-2">CAPTURED FRONT ID</span>
                                  <a
                                    href="javascript: void(0)"
                                    @click="base64String2Front = ''"
                                  >
                                    <i
                                      class="fa-solid fa-circle-minus"
                                      style="color: red"
                                    ></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div class="row pt-2">
                              <div class="col-6 text-right">
                                <div v-if="!IsMobile">
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-outline-primary"
                                    @click="
                                      toggleCamera2(), (isFrontID = false)
                                    "
                                    :disabled="isCamera2Open"
                                  >
                                    <span
                                      >Capture back ID
                                      <i class="fa-solid fa-camera"></i
                                    ></span>
                                    <!-- <span v-else><i class="fa-solid fa-camera"></i> Close Camera</span> -->
                                  </button>
                                </div>
                                <div v-else>
                                  <label
                                    for="licenseFileBack"
                                    class="btn btn-sm btn-primary"
                                    >Capture back ID
                                    <i class="fa-solid fa-camera mr-2"></i
                                  ></label>
                                  <input
                                    type="file"
                                    style="display: none"
                                    id="licenseFileBack"
                                    capture="environment"
                                    accept="image/*,video/*"
                                    @change="loadLicenseFileAsURLBack"
                                  />
                                </div>
                              </div>
                              <div
                                class="col-6 text-left"
                                style="display: flex; align-items: center"
                              >
                                <div v-if="base64String2Back !== ''">
                                  <span class="pr-2">CAPTURED BACK ID</span>
                                  <a
                                    href="javascript: void(0)"
                                    @click="base64String2Back = ''"
                                  >
                                    <i
                                      class="fa-solid fa-circle-minus"
                                      style="color: red"
                                    ></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row pt-2" v-if="!IsMobile">
                          <div class="mx-auto web-camera-container">
                            <div
                              v-show="isCamera2Open && isLoading3"
                              class="camera-loading"
                            >
                              <ul class="loader-circle">
                                <li></li>
                                <li></li>
                                <li></li>
                              </ul>
                            </div>

                            <div
                              v-if="isCamera2Open"
                              v-show="!isLoading2"
                              class="camera-box"
                              :class="{ flash: isShotPhoto2 }"
                            >
                              <div>
                                <div
                                  class="camera-shutter"
                                  :class="{ flash: isShotPhoto2 }"
                                ></div>
                                <video
                                  id="player2"
                                  v-show="!isPhotoTaken2"
                                  ref="camera2"
                                  :width="450"
                                  :height="337.5"
                                  autoplay
                                ></video>

                                <canvas
                                  v-show="isPhotoTaken2"
                                  id="photoTaken2"
                                  ref="canvas2"
                                  :width="450"
                                  :height="337.5"
                                ></canvas>
                              </div>
                            </div>
                            <div
                              class="mx-auto"
                              v-if="isCamera2Open && !isLoading3"
                              style="display: flex; align-items: center"
                            >
                              <div class="camera-shoot pr-2">
                                <button
                                  id="captureLicense"
                                  type="button"
                                  class="button camera-shoot"
                                  @click="takePhoto2"
                                >
                                  <img
                                    src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
                                  />
                                </button>
                              </div>
                              <div class="camera-button">
                                <button
                                  type="button"
                                  class="button is-rounded"
                                  :class="{
                                    'is-primary': !isCamera2Open,
                                    'is-danger': isCamera2Open
                                  }"
                                  @click="toggleCamera2"
                                >
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
                <button
                  type="reset"
                  class="btn btn-default mr-2"
                  @click="prev"
                  v-if="getTaskPreviousTaskType"
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import BtnSaving from '../button-saving.vue'
import { useTaskStore } from '@/stores/task'
import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from '@vuepic/vue-datepicker'

const router = useRouter()
const taskStore = useTaskStore()

// State
const isLoading = ref(false)
const isSaving = ref(false)
const isPortionCare = ref(false)
const isPortionCareSaved = ref(false)
const isCamera2Open = ref(false)
const isPhotoTaken2 = ref(false)
const isShotPhoto2 = ref(false)
const isLoading2 = ref(false)
const isLoading3 = ref(false)
const isFrontID = ref(true)
const base64String2Front = ref('')
const base64String2Back = ref('')
const camera2 = ref(null)
const canvas2 = ref(null)

// Computed properties
const getTaskPreviousTaskType = computed(() => taskStore.previousTaskType)
const getTaskCurrentTaskType = computed(() => taskStore.currentTaskType)
const TaskInfo = computed(() => {
  const taskInfo = taskStore.taskInfo
  return taskInfo ? JSON.parse(taskInfo) : undefined
})
const IsMobile = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
})

// Methods
const toggle = (value) => {
  isPortionCare.value = value
  isPortionCareSaved.value = true
}

const toggleCamera2 = async () => {
  isCamera2Open.value = !isCamera2Open.value
  if (isCamera2Open.value) {
    isLoading3.value = true
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      camera2.value.srcObject = stream
      isLoading3.value = false
    } catch (error) {
      console.error('Error accessing camera:', error)
      isCamera2Open.value = false
      isLoading3.value = false
    }
  } else {
    const stream = camera2.value?.srcObject
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
  }
}

const takePhoto2 = () => {
  if (!camera2.value) return

  const context = canvas2.value.getContext('2d')
  context.drawImage(camera2.value, 0, 0, 450, 337.5)
  isPhotoTaken2.value = true
  isShotPhoto2.value = true

  const imageData = canvas2.value.toDataURL('image/jpeg')
  if (isFrontID.value) {
    base64String2Front.value = imageData
  } else {
    base64String2Back.value = imageData
  }

  setTimeout(() => {
    isShotPhoto2.value = false
  }, 500)
}

const loadLicenseFileAsURLFront = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      base64String2Front.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const loadLicenseFileAsURLBack = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      base64String2Back.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const submit = async () => {
  isSaving.value = true
  try {
    await taskStore.saveInsuranceInfo({
      isPortionCare: isPortionCare.value,
      frontIdImage: base64String2Front.value,
      backIdImage: base64String2Back.value
    })
    router.push('/task/personal-history')
  } catch (error) {
    console.error('Error saving insurance info:', error)
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
  // Initialize component
})

onUnmounted(() => {
  // Clean up camera resources
  if (camera2.value?.srcObject) {
    camera2.value.srcObject.getTracks().forEach((track) => track.stop())
  }
})
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
  border-width: 0.2rem;
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
          animation-delay: 0.2s;
        }

        &:nth-child(3) {
          animation-delay: 0.4s;
        }
      }
    }
  }

  @keyframes preload {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.4;
    }

    100% {
      opacity: 1;
    }
  }
}
</style>
