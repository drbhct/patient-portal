<template>
  <section role="main">
    <form class="mt-5 mr-2 ml-2 justify-content-md-center">
      <div class="col">
        <section class="card">
          <header class="card-header"></header>
          <div class="card-body">
            <div class="form-horizontal">
              <div class="row">
                <div class="col-lg-12 text-center">
                  <h4>Please answer these questions about yourself</h4>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  Number of Children?
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.numOfChildren"
                    :options="numOfChildrenSelection"
                    :multiple="false"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  Exercise Frequency?
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.exerciseFrequency"
                    :options="excerciseSelection"
                    :multiple="false"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  Exercise Intensity Level?
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.exerciseIntensity"
                    :options="excerciseIntensitySelection"
                    :multiple="false"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  Sufficient Rest?
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.sufficientRest"
                    :options="sufficientRestSelection"
                    :multiple="false"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  Hours of Sleep?
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.hourOfSleep"
                    :options="hourOfSleepSelection"
                    :multiple="false"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  Well balanced diet?
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.wellBalancedDiet"
                    :options="wellBalancedDietSelection"
                    :multiple="false"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  Do you smoke?
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.smoke"
                    :options="smokeSelection"
                    :multiple="false"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  Do you drink caffeinated beverages?
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.caffein"
                    :options="caffeinSelection"
                    :multiple="false"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  Do you drink alcohol beverages?
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.alcohol"
                    :options="alcoholSelection"
                    :multiple="false"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 control-label text-lg-right pt-2">
                  Have you ever used street drugs?
                </label>
                <div class="col-lg-6">
                  <multiselect
                    v-model="form.drugs"
                    :options="drugsSelection"
                    :multiple="false"
                  />
                </div>
              </div>

              <hr />

              <div class="row">
                <div class="col-lg-12 text-center">
                  <h4>
                    Please indicate the following condition(s) that apply to you
                  </h4>
                  <h4>
                    Present = you have this now Past = if you have had in the
                    past
                  </h4>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6" v-for="condition in form.conditionQandA" :key="condition.question">
                  <div class="form-group row mb-2">
                    <label class="col-lg-3 control-label text-lg-right pt-2">
                      {{ condition.question }}
                    </label>
                    <div class="col-lg-6">
                      <multiselect
                        v-model="condition.answer"
                        :options="conditionApplySelection"
                        :multiple="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer"></footer>
        </section>
      </div>
    </form>
  </section>
</template>

<script>
import Multiselect from 'vue-multiselect'
import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
export default {
  components: {
    Multiselect
  },
  data () {
    return {
      form: {
        numOfChildren: null,
        exerciseFrequency: null,
        exerciseIntensity: null,
        sufficientRest: null,
        hourOfSleep: null,
        wellBalancedDiet: null,
        smoke: null,
        caffein: null,
        alcohol: null,
        drugs: null,
        conditionQandA: [
          { question: 'Fatigue', answer: '' },
          { question: 'Seizures', answer: '' },
          { question: 'Fever', answer: '' },
          { question: 'Depression', answer: '' },
          { question: 'Chills', answer: '' },
          { question: 'Dizziness', answer: '' },
          { question: 'Tremors', answer: '' },
          { question: 'Mempry Loss', answer: '' },
          { question: 'Night Sweats', answer: '' },
          { question: 'Hot Joints', answer: '' },
          { question: 'Fainting', answer: '' },
          { question: 'Muscle Weakness', answer: '' },
          { question: 'Joint Swelling', answer: '' },
          { question: 'Loss of Coordination', answer: '' },
          { question: 'Lumps/Masses', answer: '' },
          { question: 'Difficulty of Speeech', answer: '' }
        ]
      }
    }
  },
  computed: {
    numOfChildrenSelection: function () {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    excerciseSelection: function () {
      return ['Never', 'Rarely', 'Occasionally', 'Moderately', 'Regularly']
    },
    excerciseIntensitySelection: function () {
      return ['Low', 'Medium', 'High', 'Competition']
    },
    sufficientRestSelection: function () {
      return ['Never', 'Rarely', 'Occasionally', 'Sometimes', 'Often']
    },
    hourOfSleepSelection: function () {
      return ['Less than 6', '6 to 8', '8 to 10', 'More than 10']
    },
    wellBalancedDietSelection: function () {
      return ['Never', 'Rarely', 'Sometimes', 'Often']
    },
    smokeSelection: function () {
      return [
        'No',
        'Occasionally',
        '1 to 2 packs',
        '2 to 3 packs',
        '4 or more'
      ]
    },
    caffeinSelection: function () {
      return [
        'No',
        'Occasionally',
        '1 to 2 Drinks',
        '2 to 3 Drinks',
        '4 or more'
      ]
    },
    alcoholSelection: function () {
      return [
        'No',
        'Occasionally',
        '1 to 2 Drinks',
        '2 to 3 Drinks',
        '4 or more'
      ]
    },
    drugsSelection: function () {
      return ['Yes', 'No']
    },
    conditionApplySelection: function () {
      return ['Present', 'Past']
    }
  }
}
</script>

<style>
</style>
