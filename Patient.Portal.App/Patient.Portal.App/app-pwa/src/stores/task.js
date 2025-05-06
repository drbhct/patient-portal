import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTaskStore = defineStore('task',
  () => {
  // State
    const previousTaskType = ref([])
    const currentTaskType = ref('')
    const caseHistory = ref({
      id: 0,
      problems: [],
      oats: [],
      complaintFormValues: null,
      autoAccident: [],
      aaFormValues: null
    })
    const officeName = ref('')
    const taskCode = ref('')
    const access = ref({
      isAccessOnly: false,
      accessOnlyRoute: '/'
    })
    const taskInfo = ref('')
    const taskItem = ref(undefined)
    const urllinkInfo = ref(undefined)

    // Getters
    const getCurrentTaskType = computed(() => currentTaskType.value)
    const getPreviousTaskTypes = computed(() => previousTaskType.value)
    const getCaseHistoryId = computed(() => caseHistory.value.id)
    const getCaseHistoryProblems = computed(() => caseHistory.value.problems)
    const getCaseHistoryOats = computed(() => caseHistory.value.oats)
    const getComplaintFormValues = computed(() => caseHistory.value.complaintFormValues)
    const getAutoAccident = computed(() => caseHistory.value.autoAccident)
    const getAAFormValues = computed(() => caseHistory.value.aaFormValues)
    const getOfficeName = computed(() => officeName.value)
    const getTaskCode = computed(() => taskCode.value)
    const getAccessStatus = computed(() => access.value)
    const getTaskInfo = computed(() => taskInfo.value)
    const getTaskItem = computed(() => taskItem.value)
    const getUrlLinkInfo = computed(() => urllinkInfo.value)

    // Actions
    const setCurrentTaskType = ({ page, back = false, removePage = null }) => {
      if (currentTaskType.value && !back) {
        const exist = previousTaskType.value.find(
          (c) => c === currentTaskType.value
        )
        if (!exist) {
          previousTaskType.value.push(currentTaskType.value)
        }
      }

      if (back) {
        previousTaskType.value = previousTaskType.value.filter(
          (el) => el !== removePage
        )
        currentTaskType.value = page
      } else {
        currentTaskType.value = page
      }
    }

    // Case History Actions
    const setCaseHistoryId = (id) => {
      caseHistory.value.id = id
    }

    const setCaseHistoryProblems = (problems) => {
      caseHistory.value.problems = problems
    }

    const setCaseHistoryOats = (oats) => {
      caseHistory.value.oats = oats
    }

    const setComplaintFormValues = (values) => {
      caseHistory.value.complaintFormValues = values
    }

    const setAutoAccident = (accident) => {
      caseHistory.value.autoAccident = accident
    }

    const setAAFormValues = (values) => {
      caseHistory.value.aaFormValues = values
    }

    // Task Management Actions
    const setOfficeName = (name) => {
      officeName.value = name
    }

    const setTaskCode = (code) => {
      taskCode.value = code
    }

    const setAccessOnly = (isAccessOnly) => {
      access.value.isAccessOnly = isAccessOnly
    }

    const setAccessOnlyRoute = (route) => {
      access.value.accessOnlyRoute = route
    }

    const setTaskInfo = (info) => {
      taskInfo.value = info
    }

    const setTaskItem = (item) => {
      taskItem.value = item
    }

    const setUrlLinkInfo = (info) => {
      urllinkInfo.value = info
    }

    // Reset Actions
    const resetCaseHistory = () => {
      caseHistory.value = {
        id: 0,
        problems: [],
        oats: [],
        complaintFormValues: null,
        autoAccident: [],
        aaFormValues: null
      }
    }

    const resetTaskState = () => {
      previousTaskType.value = []
      currentTaskType.value = ''
      officeName.value = ''
      taskCode.value = ''
      access.value.isAccessOnly = false
      access.value.accessOnlyRoute = '/'
      taskInfo.value = ''
      taskItem.value = undefined
      urllinkInfo.value = undefined
      resetCaseHistory()
    }

    return {
    // State
      previousTaskType,
      currentTaskType,
      caseHistory,
      officeName,
      taskCode,
      access,
      taskInfo,
      taskItem,
      urllinkInfo,
      // Getters
      getCurrentTaskType,
      getPreviousTaskTypes,
      getCaseHistoryId,
      getCaseHistoryProblems,
      getCaseHistoryOats,
      getComplaintFormValues,
      getAutoAccident,
      getAAFormValues,
      getOfficeName,
      getTaskCode,
      getAccessStatus,
      getTaskInfo,
      getTaskItem,
      getUrlLinkInfo,
      // Actions
      setCurrentTaskType,
      setCaseHistoryId,
      setCaseHistoryProblems,
      setCaseHistoryOats,
      setComplaintFormValues,
      setAutoAccident,
      setAAFormValues,
      setOfficeName,
      setTaskCode,
      setAccessOnly,
      setAccessOnlyRoute,
      setTaskInfo,
      setTaskItem,
      setUrlLinkInfo,
      resetCaseHistory,
      resetTaskState
    }
  }, {
    persist: {
      key: 'task',
      storage: localStorage,
      paths: ['currentTaskType', 'caseHistory', 'taskItem']
    }
  })
