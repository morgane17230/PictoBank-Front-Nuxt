<template>
  <v-text-field
    v-model="query"
    placeholder="Chercher un picto..."
    label="Chercher un picto..."
    color="cyan darken-3"
    :prepend-inner-icon="svgMagnify"
    :clear-icon="svgClear"
    clearable
    outlined
    @input="searchPictos"
  />
</template>

<script>
import { mapState } from 'vuex'
import { mdiMagnify, mdiClose } from '@mdi/js'
export default {
  middleware: 'auth',
  data () {
    return {
      query: '',
      svgMagnify: mdiMagnify,
      svgClear: mdiClose
    }
  },

  computed: {
    ...mapState({
      pictos: state => state.picto.pictos
    })
  },

  methods: {
    searchPictos () {
      if (this.query) {
        const queries = this.query.toLowerCase().split(' ')
        const foundPictos = []
        this.pictos.forEach((picto) => {
          return queries.forEach((element) => {
            const index = picto.originalname.toLowerCase().indexOf(element)
            if (index !== -1) { return foundPictos.push(picto) }
          })
        })
        this.$store.commit('picto/SET_FOUND_PICTOS', [...new Set(foundPictos)])
      } else {
        this.$store.commit('picto/SET_FOUND_PICTOS', this.pictos)
      }
    }
  }

}
</script>
