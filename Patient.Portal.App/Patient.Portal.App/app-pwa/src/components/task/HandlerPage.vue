<template>
  <Survey :survey='survey' />
</template>

<script>
import 'survey-core/defaultV2.min.css'
import api from '../../api/http-common.js'
import { mapGetters } from 'vuex'
import { Survey } from 'survey-vue-ui'
import { Model, slk } from 'survey-core'
import { SurveyPDF, HTMLBrick } from 'survey-pdf'

slk(
  'ZjI3MDkwMDYtNDkxNC00MmJkLTg4NDUtMjFhYjIyMDM5MWQxOzE9MjAyNS0wMy0wNCwyPTIwMjUtMDMtMDQsND0yMDI1LTAzLTA0'
)

export default {
  data() {
    return {
      survey: null,
      surveyJson: null,
      patientName: '',
      pdfFilename: '',
      pdfDocOptions: {
        compress: true,
        fontSize: 12,
        htmlRenderAs: 'image' // or "image" | "auto"
      }
    }
  },
  components: {
    Survey
  },
  computed: {
    ...mapGetters(['currentPatientAssociated'])
  },
  methods: {
    alertResults(sender) {
      // const results = JSON.stringify(sender.data)
      setTimeout(() => {
        window.opener.location.reload()
        window.close()
      }, 3000)
    },
    complete() {
      const queryData = this.$route.query
      const surveyPdf = new SurveyPDF(this.surveyJson, this.pdfDocOptions)
      if (surveyPdf) {
        surveyPdf.data = this.survey.data
        surveyPdf.raw('dataurlstring').then(async (dataurlstring) => {
          var base64 = dataurlstring.split('base64,')[1]
          var fileID = await api.task.request.uploadPatientForm({
            facilityId: this.currentPatientAssociated.facilityID,
            patientId: queryData.pid,
            description: this.surveyJson.title,
            base64: base64,
            facilityFormID: queryData.i
          })

          if (fileID) {
            console.log(fileID)
            await api.task.request.insertPatientForm({
              facilityformId: queryData.i,
              patientid: queryData.pid,
              data: JSON.stringify(surveyPdf.data)
            })

            await api.task.request.updateTaskComplete({
              facilityId: this.currentPatientAssociated.facilityID,
              id: queryData.tid,
              patientId: queryData.pid
            })

            window.opener.location.reload()

            setTimeout(() => {
              window.close()
            }, 1000)
          }
        })
      }
    },
    async loadData() {
      const queryData = this.$route.query
      if (queryData) {
        var res = await api.task.request.getFacilityFormJsonQueryObj({
          facilityformid: queryData.i,
          patientId: queryData.pid
        })
        var objData = JSON.parse(res.data.data)
        var el = objData.pages[0].elements
        var itemIndex = el.findIndex(x => x.name === 'patientName')
        if (itemIndex) {
          el[itemIndex].defaultValue = queryData.p
        }
        this.surveyJson = objData
        this.pdfFilename = objData.title
        objData.completedHtml = '<span style="font-size: 32px; font-weight: bolder">Thank you for completing the form</span>'
        return objData
      } else {
        return null
      }
    },
    savePdf() {
      const surveyPdf = new SurveyPDF(this.surveyJson, this.pdfDocOptions)
      if (surveyPdf) {
        surveyPdf.data = this.survey.data
        surveyPdf.save(this.pdfFilename)
      }
    },
    savePdf2(surveyModel) {
      const pdfWidth = !!surveyModel && surveyModel.pdfWidth ? surveyModel.pdfWidth : 225 // 210 orig
      const pdfHeight = !!surveyModel && surveyModel.pdfHeight ? surveyModel.pdfHeight : 319 // original 297
      const options = {
        fontSize: 12,
        compress: true,
        format: [pdfWidth, pdfHeight],
        htmlRenderAs: 'image'
      }
      const surveyPDF = new SurveyPDF(this.surveyJson, options)
      if (surveyModel) {
        surveyPDF.data = surveyModel.data
      }

      // Draw a portion of an image
      function drawPart(brickHeight, multiplier, shift, canvas, img,
        firstBrickHeight, fullPagesCnt, onePageSize, htmlBrick, controller) {
        canvas.height = brickHeight
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, shift, img.width, brickHeight, 0, 0, img.width, brickHeight)

        const currImageBase64 = canvas.toDataURL('image/jpeg')
        const brickHtml = `
                <img src='${currImageBase64}' width='${img.width * multiplier}' height='${brickHeight * multiplier}' />`
        const brickRect = {
          xLeft: htmlBrick.xLeft,
          xRight: htmlBrick.xRight,
          yTop: htmlBrick.yTop + multiplier * (firstBrickHeight + fullPagesCnt * onePageSize),
          yBot: htmlBrick.yTop + multiplier * (firstBrickHeight + fullPagesCnt * onePageSize + brickHeight)
        }
        return new HTMLBrick(null, controller, brickRect, brickHtml, true)
      }

      async function getImage(htmlBrick) {
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

      surveyPDF.onRenderQuestion.add(async (survey, options) => {
        // Split only HTML elements
        if (options.question.getType() === 'html') {
          // Get the HTML brick
          const htmlBrick = options.bricks[0]
          if (!htmlBrick || !htmlBrick.html) return

          options.bricks = []

          // Extract image from the HTML brick
          const img = await getImage(htmlBrick)

          // Calculate the available page height and the coordinate at which to start drawing
          const fullPageHeight = options.controller.paperHeight - options.controller.margins.top - options.controller.margins.bot
          const currY = htmlBrick.yTop - fullPageHeight * Math.floor(htmlBrick.yTop / fullPageHeight)

          const canvas = document.createElement('canvas')
          canvas.width = img.width

          // A multiplier is used to decrease the original image width if it exceeds the available page width
          let multiplier = 1
          if (htmlBrick.width < img.width) {
            multiplier = htmlBrick.width / img.width
          }

          // Calculate what portion of the original image would fit onto one page
          const onePageSize = fullPageHeight / multiplier
          // Calculate the height of the first brick
          const firstBrickHeight = Math.min(img.height, (fullPageHeight - currY) / multiplier)

          // Draw the first brick
          const firstBrick = drawPart(firstBrickHeight, multiplier, 0, canvas, img,
            0, 0, onePageSize, htmlBrick, options.controller)
          options.bricks.push(firstBrick)

          // Page counter
          let cnt = 0
          // Draw the rest of the bricks
          for (let i = firstBrickHeight; i < img.height; i += onePageSize) {
            const brickHeight = Math.min(img.height - i, onePageSize)

            const currBrick = drawPart(brickHeight, multiplier, i, canvas, img,
              firstBrickHeight, cnt, onePageSize, htmlBrick, options.controller)

            cnt += 1
            options.bricks.push(currBrick)
          }
        }
      })
      try {
        surveyPDF.save(this.pdfFilename)
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    const x = await this.loadData()
    this.survey = new Model(x)
    this.survey.onCompleting.add(this.complete)
    this.survey.addNavigationItem({
      id: 'pdf-export',
      title: 'Save as PDF',
      // action: () => this.savePdf()
      action: () => this.savePdf2(this.survey)
    })
    this.survey.onUpdateQuestionCssClasses.add(function (_, options) {
      if (options.question.name === 'patientTypedSignature') {
        options.cssClasses.root += ' scriptedSignatureInput'
      }
    })
  }
}
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
