<template>
  <v-snackbar
    v-model="show"
    absolute
    top
    elevation="24"
    color="cyan darken-3"
    timeout="2000"
  >
    <strong>{{ validation }}</strong>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      validation: ''
    }
  },

  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'global/SET_VALIDATION') {
        this.validation = state.global.validation
        this.show = true
      }
    })
  }
}
</script>
