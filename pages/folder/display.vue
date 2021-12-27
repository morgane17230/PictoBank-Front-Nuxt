<template>
  <v-row>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      absolute
    >
      <span v-if="error.length > 0" class="cyan--text">{{ error }}</span>
      <span v-if="validation.length > 0" class="cyan--text">{{ validation }}</span>
    </v-snackbar>
    <v-col>
      <v-row justify="center" align="center">
        <v-col class="text-center">
          <h1 class="display-1">
            Vos favoris
          </h1>
        </v-col>
      </v-row>
      <v-row class="my-5">
        <v-col
          v-for="picto in folder.pictos"
          :key="picto.id"
          class="d-flex child-flex col-xs-6 col-sm-6 col-md-3 col-lg-2 col-xl-2"
        >
          <v-img
            :src="`${picto.path}`"
            :lazy-src="`${picto.path}`"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <v-fab-transition>
              <v-btn
                class="my-6 mx-7"
                fab
                dark
                x-small
                absolute
                bottom
                right
                color="teal"
                :value="picto.id"
              >
                <v-icon dark>
                  mdi-download
                </v-icon>
              </v-btn>
            </v-fab-transition>
            <v-fab-transition>
              <v-btn
                class="my-6 mx-n2"
                fab
                dark
                x-small
                absolute
                bottom
                right
                color="dark"
                :value="pictoId = picto.id"
                @click="removePictoFromFolder"
              >
                <v-icon dark>
                  mdi-heart-off
                </v-icon>
              </v-btn>
            </v-fab-transition>
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5" />
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'auth',
  data () {
    return {
      lang: 'fr',
      snackbar: false,
      timeout: 2000
    }
  },

  computed: {
    ...mapState({
      folder: state => state.folder.folder,
      error: state => state.global.error,
      validation: state => state.global.validation
    })
  },

  mounted () {
    this.$store.dispatch('folder/getFolder')
  },

  methods: {
    removePictoFromFolder (e) {
      this.$store.dispatch('folder/removePictoFromFolder', Number(e.currentTarget.value))
    }
  }
}
</script>
