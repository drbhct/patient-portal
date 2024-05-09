<template>
  <Survey :survey='survey'/>
</template>

<script>
import 'survey-core/defaultV2.min.css'
import api from '../../api/http-common.js'
import { mapGetters } from 'vuex'
import { Survey } from 'survey-vue-ui'
import { Model, slk } from 'survey-core'
import { SurveyPDF } from 'survey-pdf'

slk(
  'ZjI3MDkwMDYtNDkxNC00MmJkLTg4NDUtMjFhYjIyMDM5MWQxOzE9MjAyNS0wMy0wNCwyPTIwMjUtMDMtMDQsND0yMDI1LTAzLTA0'
)

export default {
  data () {
    return {
      survey: null,
      surveyJson: null,
      patientName: '',
      pdfFilename: '',
      pdfDocOptions: {
        fontSize: 12,
        htmlRenderAs: 'image'
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
    alertResults (sender) {
      // const results = JSON.stringify(sender.data)
      setTimeout(() => {
        window.opener.location.reload()
        window.close()
      }, 3000)
    },
    complete () {
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
            base64: base64
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
            }, 2000)
          }
        })
      }
    },
    async loadData () {
      const queryData = this.$route.query
      if (queryData) {
        // var res1 = await api.task.request.getFacilityFormJson(queryData.i)
        var res = await api.task.request.getFacilityFormJsonQueryObj({
          facilityformid: queryData.i,
          patientId: queryData.pid
        })
        var objData = JSON.parse(res.data.data)
        // var objData = {
        //   title: 'Informed Consent to Care',
        //   logo: '$$FormLogo$$',
        //   logoWidth: '',
        //   logoHeight: '',
        //   logoPosition: 'right',
        //   pages: [
        //     {
        //       name: 'page1',
        //       elements: [
        //         {
        //           type: 'html',
        //           name: 'agreement',
        //           startWithNewLine: false,
        //           html: 'You are the decision maker for your health care. Part of our role is to provide you with information to assist you in making informed choices. This process is often referred to as “informed consent” and involves your understanding and agreement regarding the care we recommend, the benefits and risks associated with the care, alternatives, and the potential effect on your health if you choose not to receive the care.<br><br>We may conduct some diagnostic or examination procedures if indicated. Any examinations or tests conducted will be carefully performed but may be uncomfortable.<br><br>Chiropractic care centrally involves what is known as a chiropractic adjustment. There may be additional supportive procedures or recommendations as well. When providing an adjustment, we use our hands or an instrument to reposition anatomical structures, such as vertebrae. Potential benefits of an adjustment include restoring normal joint motion, reducing swelling and inflammation in a joint, reducing pain in the joint, and improving neurological functioning and overall well-being.<br><br>It is important that you understand, as with all health care approaches, results are not guaranteed, and there is no promise to cure. As with all types of health care interventions, there are some risks to care, including, but not limited to: muscle spasms, aggravating and/or temporary increase in symptoms, lack of improvement of symptoms, burns and/or scarring from electrical stimulation and from hot or cold therapies, including but not limited to hot packs and ice, fractures (broken bones), disc injuries, dislocations, strains, and sprains. In addition, the literature recognizes an association between strokes and chiropractic manipulation of the cervical spine. With respect to strokes, there is a rare but serious condition known as an “arterial dissection” that typically is caused by a tear in the inner layer of the artery that may cause the development of a thrombus (clot) with the potential to lead to a stroke. The best available scientific evidence supports the understanding that chiropractic adjustment does not cause a dissection in a normal, healthy artery. Disease processes, genetic disorders, medications, and vessel abnormalities may cause an artery to be more susceptible to dissection. Strokes caused by arterial dissections have been associated with over 72 everyday activities such as sneezing, driving, and playing tennis.<br><br>Carotid and vertebral artery dissections are rare, with an annual incidence of 2.5 – 4 of every 100,000 people whether they are receiving health care or not. Patients who experience this condition often, but not always, present to their medical doctor or chiropractor with neck pain and headache. Unfortunately, a percentage of these patients will experience a stroke.<br><br>The reported association between visits to a chiropractor or a primary care physician and stroke is exceedingly rare and is estimated to be related in one in one million to one in two million visits.<br><br>It is also important that you understand there are treatment options available for your condition other than chiropractic procedures. Likely, you have tried many of these approaches already. These options may include, but are not limited to: self-administered care, over-the-counter pain relievers, physical measures and rest, medical care with prescription drugs, physical therapy, bracing, injections, and surgery. Lastly, you have the right to a second opinion and to secure other opinions about your circumstances and health care as you see fit.<br><br>I have read, or have had read to me, the above consent. I appreciate that it is not possible to consider every possible complication to care. I have also had an opportunity to ask questions about its content, and by signing below, I agree with the current or future recommendation to receive chiropractic care as is deemed appropriate for my circumstance. I intend this consent to cover the entire course of care from all providers in this office for my present condition and for any future condition(s) for which I seek chiropractic care from this office.'
        //         },
        //         {
        //           type: 'text',
        //           name: 'patientName',
        //           title: 'Patient Name',
        //           hideNumber: true,
        //           isRequired: true
        //         },
        //         {
        //           type: 'text',
        //           name: 'signDate',
        //           startWithNewLine: false,
        //           title: 'Date',
        //           hideNumber: true,
        //           isRequired: true,
        //           inputType: 'date'
        //         },
        //         {
        //           type: 'radiogroup',
        //           name: 'signorOption',
        //           title: 'Who is signing this form?',
        //           hideNumber: true,
        //           defaultValue: 'Item 1',
        //           isRequired: true,
        //           choices: [
        //             {
        //               value: 'Item 1',
        //               text: 'Patient signing'
        //             },
        //             {
        //               value: 'Item 2',
        //               text: 'Parent / Guardian Signing on behalf of Patient'
        //             }
        //           ]
        //         },
        //         {
        //           type: 'radiogroup',
        //           name: 'signatureType',
        //           title: 'Signature',
        //           hideNumber: true,
        //           defaultValue: 'Sign',
        //           choices: [
        //             'Sign',
        //             'Print'
        //           ]
        //         },
        //         {
        //           type: 'text',
        //           name: 'parentGuardianName',
        //           visible: false,
        //           visibleIf: '{signorOption} = "Item 2"',
        //           title: 'Parent / Guardian Name',
        //           hideNumber: true,
        //           requiredIf: '{signorOption} = "Item 2"'
        //         },
        //         {
        //           type: 'signaturepad',
        //           name: 'patientSignature',
        //           visible: false,
        //           visibleIf: '{signorOption} = "Item 1" && {signatureType} = "Sign"',
        //           startWithNewLine: false,
        //           title: 'Please sign here',
        //           hideNumber: true,
        //           requiredIf: '({signorOption} = "Item 1") and ({optOut} != ["OptOut"])',
        //           signatureWidth: 500,
        //           signatureHeight: 100
        //         },
        //         {
        //           type: 'signaturepad',
        //           name: 'guardianSignature',
        //           visible: false,
        //           visibleIf: '{signorOption} = "Item 2" && {signatureType} = "Sign"',
        //           startWithNewLine: false,
        //           title: 'Please sign here',
        //           hideNumber: true,
        //           requiredIf: '({signorOption} = "Item 2") and ({optOut} != ["OptOut"])',
        //           signatureWidth: 500,
        //           signatureHeight: 100
        //         },
        //         {
        //           type: 'text',
        //           name: 'patientTypedSignature',
        //           visible: false,
        //           visibleIf: '{signatureType} = "Print"',
        //           title: 'Please type your signature',
        //           hideNumber: true,
        //           isRequired: true,
        //           requiredIf: '{signorOption} = "Item 2"'
        //         },
        //         {
        //           type: 'checkbox',
        //           name: 'optOut',
        //           title: 'Opt Out',
        //           hideNumber: true,
        //           choices: [
        //             {
        //               value: 'OptOut',
        //               text: 'Opt out until discussion with clinic at my appointment'
        //             }
        //           ]
        //         },
        //         {
        //           type: 'text',
        //           name: 'witnessName',
        //           title: 'Witness Name',
        //           hideNumber: true,
        //           readOnly: true
        //         },
        //         {
        //           type: 'signaturepad',
        //           name: 'witnessSignature',
        //           startWithNewLine: false,
        //           title: 'Witness Signature',
        //           hideNumber: true,
        //           readOnly: true,
        //           signatureWidth: 500,
        //           signatureHeight: 100
        //         }
        //       ],
        //       title: 'Informed Consent to Care'
        //     }
        //   ],
        //   showTitle: false
        // }
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
    savePdf () {
      const surveyPdf = new SurveyPDF(this.surveyJson, this.pdfDocOptions)
      if (surveyPdf) {
        surveyPdf.data = this.survey.data
        surveyPdf.save(this.pdfFilename)
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
      action: () => this.savePdf(this.survey.data)
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
</style>
