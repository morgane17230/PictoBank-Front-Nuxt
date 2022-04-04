<template>
  <v-snackbar
    v-model="show"
    absolute
    top
    class="elevation"
    elevation="24"
    color="cyan darken-3"
    timeout="2000"
  >
    <p class="text-center font-weight-bold">
      {{ message }}
    </p>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: ''
    }
  },

  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'global/SET_MESSAGE') {
        this.message = state.global.message
        this.show = true
      }
    })
  }
}
</script>
