<template>
  <button class="btn btn-primary" type="submit" :disabled="isDisabled">
    <span
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
      v-if="isSaving"
    ></span>
    <span v-if="isSaving">
      {{ loadingText }}
    </span>
    <span v-else>
      {{ displayText }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      required: false,
      default: false
    },
    isSaving: {
      type: Boolean,
      required: true,
      default: false
    },
    loadingText: {
      type: String,
      required: false,
      default: 'Saving ...'
    },
    displayText: {
      type: String,
      required: false,
      default: 'Next'
    }
  }
}
</script>

<style></style>
