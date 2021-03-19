<template>
  <button class="btn btn-primary" type="submit">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    v-if="isSaving"
                  ></span>
                    <span v-if="isSaving">
                      Saving..
                    </span>
                    <span v-else>
                      Next
                    </span>
                </button>
</template>

<script>
export default {
  props: ['isSaving']
}
</script>

<style>

</style>
