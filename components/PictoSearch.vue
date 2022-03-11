<template>
  <v-text-field
    v-model="query"
    placeholder="Chercher un picto..."
    label="Chercher un picto..."
    color="cyan darken-3"
    :prepend-inner-icon="svgMagnify"
    clearable
    outlined
    @input="searchPictos"
  />
</template>

<script>
import { mapState } from 'vuex'
import { mdiMagnify } from '@mdi/js'
export default {
  middleware: 'auth',
  data () {
    return {
      query: '',
      svgMagnify: mdiMagnify
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
        const queries = this.query.split(' ')
        const foundPictos = []
        this.pictos.forEach((picto) => {
          return queries.forEach((element) => {
            const index = picto.originalname.indexOf(element)
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
