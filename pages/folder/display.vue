<template>
  <v-row>
    <v-col>
      <v-row justify="center" align="center">
        <v-col class="text-center">
          <h1 class="display-1">
            {{ folder.foldername }}
          </h1>
        </v-col>
      </v-row>
      <v-row class="my-5">
        <v-col
          v-for="picto in folder.pictos"
          :key="picto.id"
          class="d-flex child-flex col-xs-6 col-sm-6 col-md-3 col-lg-2 col-xl-2"
        >
          <v-card class="pa-2">
            <v-img
              :src="`${picto.path}`"
              :lazy-src="`${picto.path}`"
              aspect-ratio="1"
              class="grey lighten-2"
            />
            <v-card-actions color="cyan">
              <v-spacer />
              <v-checkbox
                v-model="selected"
                :value="picto.id"
                color="cyan"
                @change="collectPictos"
              />
              <v-btn
                fab
                dark
                x-small
                icon
                color="dark"
                :value="(pictoId = picto.id)"
                @click="removePictoFromFolder"
              >
                <v-icon dark>
                  mdi-heart-off
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5" />
            </v-row>
          </template>
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
      selected: []
    }
  },

  computed: {
    ...mapState({
      folder: state => state.folder.folder,
      collectedPictos: state => state.picto.collectedPictos
    })
  },

  mounted () {
    this.$store.dispatch('folder/getFolder')
  },

  methods: {
    removePictoFromFolder (e) {
      this.$store.dispatch(
        'folder/removePictoFromFolder',
        e.currentTarget.value
      )
    },

    collectPictos () {
      this.$store.commit('picto/SET_COLLECTED_PICTOS', this.selected)
    }
  }
}
</script>
