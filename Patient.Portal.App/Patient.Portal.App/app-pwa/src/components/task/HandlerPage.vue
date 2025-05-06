<template>
  <Survey :survey="survey" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import 'survey-core/defaultV2.min.css'
import api from '../../api/http-common.js'
import { Survey } from 'survey-vue-ui'
import { Model, slk } from 'survey-core'
import { SurveyPDF, HTMLBrick } from 'survey-pdf'
import moment from 'moment'
import { useTaskStore } from '@/stores/task'

slk(
  'ZjI3MDkwMDYtNDkxNC00MmJkLTg4NDUtMjFhYjIyMDM5MWQxOzE9MjAyNS0wMy0wNCwyPTIwMjUtMDMtMDQsND0yMDI1LTAzLTA0'
)

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const survey = ref(null)
const surveyJson = ref(null)
const pdfFilename = ref('')
const pdfDocOptions = ref({
  compress: true,
  fontSize: 12,
  htmlRenderAs: 'image'
})

const currentPatientAssociated = computed(
  () => taskStore.currentPatientAssociated
)

const alertResults = (sender) => {
  setTimeout(() => {
    window.opener.location.reload()
    window.close()
  }, 3000)
}

const loadData = async () => {
  const queryData = route.query
  if (queryData) {
    const res = await api.task.request.getFacilityFormJsonQueryObj({
      facilityformid: queryData.i,
      patientId: queryData.pid
    })
    const objData = JSON.parse(res.data.data)
    const el = objData.pages[0].elements
    const itemIndex = el.findIndex((x) => x.name === 'patientName')
    if (itemIndex) {
      el[itemIndex].defaultValue = queryData.p
    }
    surveyJson.value = objData
    pdfFilename.value = objData.title
    objData.completedHtml =
      '<span style="font-size: 32px; font-weight: bolder">Thank you for completing the form</span>'
    return objData
  } else {
    return null
  }
}

const savePdf = () => {
  const surveyPdf = new SurveyPDF(surveyJson.value, pdfDocOptions.value)
  if (surveyPdf) {
    surveyPdf.data = survey.value.data
    surveyPdf.save(pdfFilename.value)
  }
}

const savePdf2 = (surveyModel) => {
  const options = {
    fontSize: 12,
    compress: true,
    format: 'a4',
    htmlRenderAs: 'image',
    orientation: 'p'
  }
  const surveyPDF = new SurveyPDF(surveyJson.value, options)
  if (surveyModel) {
    surveyPDF.data = surveyModel.data
    surveyPDF.getAllQuestions().forEach((q) => {
      if (q.getType() === 'text' && q.inputType === 'date') {
        if (!q.isEmpty()) {
          const newVal = moment(q.value).format('MM/DD/YYYY')
          q.value = newVal
        }
      }
    })
  }

  surveyPDF.onRenderQuestion.add(async (survey, options) => {
    if (options.question.getType() === 'checkbox') {
      for (let i = 0; i < options.bricks.length; i++) {
        const unfoldBricks = options.bricks[i].unfold()
        for (let j = 0; j < unfoldBricks.length; j++) {
          if (unfoldBricks[j] instanceof options.module.CheckboxItemBrick) {
            if (unfoldBricks[j].context.checked) {
              unfoldBricks[j].formBorderColor = 'black'
            }
            unfoldBricks[j].textColor = 'black'
          }
        }
      }
    }

    if (options.question.getType() === 'html') {
      const htmlBrick = options.bricks[0]
      if (!htmlBrick || !htmlBrick.html) return

      options.bricks = []
      const img = await getImage(htmlBrick)
      const fullPageHeight =
        options.controller.paperHeight -
        options.controller.margins.top -
        options.controller.margins.bot
      const currY =
        htmlBrick.yTop -
        fullPageHeight * Math.floor(htmlBrick.yTop / fullPageHeight)

      const canvas = document.createElement('canvas')
      canvas.width = img.width

      let multiplier = 1
      if (htmlBrick.width < img.width) {
        multiplier = htmlBrick.width / img.width
      }

      const onePageSize = fullPageHeight / multiplier
      const firstBrickHeight = Math.min(
        img.height,
        (fullPageHeight - currY) / multiplier
      )

      const firstBrick = drawPart(
        firstBrickHeight,
        multiplier,
        0,
        canvas,
        img,
        0,
        0,
        onePageSize,
        htmlBrick,
        options.controller
      )
      options.bricks.push(firstBrick)

      let cnt = 0
      for (let i = firstBrickHeight; i < img.height; i += onePageSize) {
        const brickHeight = Math.min(img.height - i, onePageSize)
        const currBrick = drawPart(
          brickHeight,
          multiplier,
          i,
          canvas,
          img,
          firstBrickHeight,
          cnt,
          onePageSize,
          htmlBrick,
          options.controller
        )
        cnt += 1
        options.bricks.push(currBrick)
      }
    }
  })

  try {
    surveyPDF.save(pdfFilename.value)
  } catch (e) {
    console.log(e)
  }
}

const drawPart = (
  brickHeight,
  multiplier,
  shift,
  canvas,
  img,
  firstBrickHeight,
  fullPagesCnt,
  onePageSize,
  htmlBrick,
  controller
) => {
  canvas.height = brickHeight
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(
    img,
    0,
    shift,
    img.width,
    brickHeight,
    0,
    0,
    img.width,
    brickHeight
  )

  const currImageBase64 = canvas.toDataURL('image/jpeg')
  const brickHtml = `
            <img src='${currImageBase64}' width='${
    img.width * multiplier
  }' height='${brickHeight * multiplier}' />`
  const brickRect = {
    xLeft: htmlBrick.xLeft,
    xRight: htmlBrick.xRight,
    yTop:
      htmlBrick.yTop +
      multiplier * (firstBrickHeight + fullPagesCnt * onePageSize),
    yBot:
      htmlBrick.yTop +
      multiplier * (firstBrickHeight + fullPagesCnt * onePageSize + brickHeight)
  }
  return new HTMLBrick(null, controller, brickRect, brickHtml, true)
}

const getImage = async (htmlBrick) => {
  const html = htmlBrick.html
  let start = html.indexOf('data')

  let imageBase64 = ''
  while (html[start] !== "'") {
    imageBase64 += html[start]
    start++
  }
  const img = new Image()
  img.src = imageBase64
  await new Promise((resolve, reject) => {
    img.onload = () => resolve(img)
    img.onerror = reject
  })

  return img
}

onMounted(async () => {
  const x = await loadData()
  survey.value = new Model(x)
  survey.value.onComplete.add(alertResults)
  survey.value.addNavigationItem({
    id: 'pdf-export',
    title: 'Save as PDF',
    action: () => savePdf2(survey.value)
  })
  survey.value.onUpdateQuestionCssClasses.add(function (_, options) {
    if (options.question.name === 'patientTypedSignature') {
      options.cssClasses.root += ' scriptedSignatureInput'
    }
  })
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

.scriptedSignatureInput {
  font-family: 'Great Vibes', cursive !important;
  font-size: 18px !important;
  font-weight: 550;
}

.sv-signaturepad {
  border: 1px solid gray !important;
}

.sd-signaturepad {
  border: 1px solid gray !important;
}

@media (min-width: 449px) and (max-width: 495px) {
  .sd-title.sd-container-modern__title .sd-logo__image {
    width: 25rem;
  }
}

@media (min-width: 496px) and (max-width: 497px) {
  .sd-title.sd-container-modern__title .sd-logo__image {
    width: 28rem;
  }
}
</style>
