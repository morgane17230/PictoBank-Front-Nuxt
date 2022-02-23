<template>
  <v-text-field
    v-model="query"
    placeholder="Chercher un picto..."
    label="Chercher un picto..."
    color="cyan darken-3"
    prepend-inner-icon="mdi-magnify"
    clearable
    outlined
    @input="searchPictos"
  />
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      query: ''
    }
  },

  methods: {
    searchPictos () {
      if (this.query !== '') {
        this.$store.dispatch('picto/searchPictos', this.query)
      } else {
        this.$store.dispatch('picto/getPictos')
      }
    }
  }
}
</script>
