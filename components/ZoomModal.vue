<template>
  <v-dialog v-model="zoomModal" max-width="600px">
    <v-card>
      <v-card-title>
        <v-spacer />
        <v-btn @click="closeZoom">
          <v-icon>
            {{ svgClose }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-img v-if="picto !== null" :src="picto.path" />
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { mdiClose } from '@mdi/js'
export default {
  middleware: 'auth',
  data () {
    return {
      svgClose: mdiClose
    }
  },
  computed: {
    ...mapState({
      picto: state => state.picto.picto,
      zoomModal: state => state.global.zoomModal
    })
  },

  methods: {
    closeZoom () {
      this.$store.commit('picto/SET_PICTO', null)
    }
  }
}
</script>
