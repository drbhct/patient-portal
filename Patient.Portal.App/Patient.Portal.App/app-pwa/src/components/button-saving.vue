<template>
  <button
    class="btn"
    :class="[
      `btn-${variant}`,
      { 'btn-outline': outline },
      { 'btn-sm': size === 'sm' },
      { 'btn-lg': size === 'lg' }
    ]"
    :disabled="isSaving || disabled"
    @click="$emit('click')"
    :aria-label="ariaLabel"
    :aria-busy="isSaving"
    role="button"
    tabindex="0"
  >
    <span
      v-if="isSaving"
      class="spinner-border spinner-border-sm me-2"
      role="status"
      aria-hidden="true"
    >
      <span class="sr-only">Loading...</span>
    </span>
    <slot>{{ isSaving ? savingText : text }}</slot>
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'Save'
  },
  savingText: {
    type: String,
    default: 'Saving...'
  },
  variant: {
    type: String,
    default: 'primary'
  },
  outline: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  isSaving: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: ''
  }
})

defineEmits(['click'])
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease-in-out;
  position: relative;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn:focus:not(:focus-visible) {
  box-shadow: none;
}

.spinner-border {
  width: 1rem;
  height: 1rem;
  border-width: 0.15em;
}

/* Add focus styles for keyboard navigation */
.btn:focus-visible {
  outline: 2px solid #0d6efd;
  outline-offset: 2px;
}

/* Add hover styles */
.btn:not(:disabled):hover {
  transform: translateY(-1px);
}

/* Add active styles */
.btn:not(:disabled):active {
  transform: translateY(0);
}
</style>
