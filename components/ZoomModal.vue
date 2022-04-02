<template>
  <v-dialog v-model="zoomModal" max-width="600px" @click:outside="closeZoom">
    <v-card>
      <v-card-title>
        <v-spacer />
        <v-btn depressed text @click="closeZoom">
          <v-icon>
            {{ svgClose }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <nuxt-img
          v-if="picto"
          preload
          :src="picto.path"
          :alt="picto.originalname"
          class="grey lighten-2 pointer zoom"
          @click="$store.commit('picto/SET_PICTO', picto)"
        />
      </v-card-text>
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
