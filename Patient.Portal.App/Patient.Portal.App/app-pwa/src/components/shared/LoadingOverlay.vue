<template>
  <div
    v-if="show"
    class="loading-overlay"
    :class="{ 'loading-overlay--fullscreen': fullscreen }"
    role="alert"
    aria-busy="true"
  >
    <div class="loading-overlay__content">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <p v-if="message" class="loading-overlay__message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  fullscreen: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-overlay--fullscreen {
  position: fixed;
}

.loading-overlay__content {
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.loading-overlay__message {
  margin-top: 1rem;
  margin-bottom: 0;
  color: #6c757d;
  font-size: 0.875rem;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  border-width: 0.25em;
}
</style>
