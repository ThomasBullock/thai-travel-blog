<template>
  <div>
    <v-alert
      :value="true"
      :color="(success) ? 'success' : 'error'"
    >
      {{message}}
    </v-alert>
  </div>
</template>

<script>
  export default {
    name: 'Alert',
    props: {
      success: {
        type: Boolean,
        default: true
      },
      error: {
        type: Boolean,
        default: false
      },
      message: {
        type: String,
        required: true
      }
    }
    
  }
</script>

<style scoped>

</style>