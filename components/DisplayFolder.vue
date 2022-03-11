<template>
  <v-dialog
    v-model="displayFolderModal"
    transition="dialog-bottom-transition"
    fullscreen
    persistent
  >
    <v-card flat tile>
      <v-toolbar class="mb-3" color="cyan darken-3" dark>
        <v-toolbar-title>
          <v-avatar left>
            <v-img :src="folder.path" />
          </v-avatar>
          <span>
            {{ folder.foldername }}
          </span>
          <v-btn icon @click="openForm = true">
            <v-icon color="green">
              {{ svgPen }}
            </v-icon>
          </v-btn>
          <v-btn icon @click="deleteFolder">
            <v-icon color="red">
              {{ svgDelete }}
            </v-icon>
          </v-btn>
        </v-toolbar-title>
        <v-spacer />
        <v-btn depressed color="transparent" @click="closeDisplayFolder">
          <v-icon>
            {{ svgClose }}
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form
          v-if="openForm"
          ref="form"
          v-model="valid"
          lazy-validation
          class="d-sm-flex"
          @submit.prevent="updateFolder"
        >
          <v-text-field
            label="Nom du dossier"
            type="text"
            color="cyan darken-3"
            name="foldername"
            :value="folder.foldername"
            @change="foldernameChange"
          />
          <v-file-input
            ref="uploader"
            name="path"
            type="file"
            color="cyan darken-3"
            accept="image/*"
            label="photo"
            :prepend-icon="svgCamera"
            :rules="pictoRules"
            :value="photo"
            @change="photoChange"
          />
          <div class="text-center d-flex align-center">
            <v-btn icon type="submit">
              <v-icon color="green">
                {{ svgCheck }}
              </v-icon>
            </v-btn>
            <v-btn icon @click="openForm = false">
              <v-icon color="red">
                {{ svgClose }}
              </v-icon>
            </v-btn>
          </div>
        </v-form>
        <v-row v-if="folder.pictos && folder.pictos.length > 0">
          <v-col
            v-for="picto in folder.pictos"
            :key="picto.id"
            class="col-6 col-sm-4 col-lg-3 col-xl-2"
          >
            <v-card>
              <v-toolbar color="grey darken-3" dark>
                <v-chip
                  small
                  :class="`${
                    categories.find((cat) => cat.id === picto.category_id).color
                      .text
                  }--text`"
                  :color="
                    categories.find((cat) => cat.id === picto.category_id).color
                      .background
                  "
                >
                  {{ picto.originalname.split("-")[0] }}
                </v-chip>
                <v-spacer />
                <span class="white--text end">{{
                  picto.originalname.split("-")[1]
                }}</span>
              </v-toolbar>
              <v-img
                :src="`${picto.path}`"
                :lazy-src="`${picto.path}`"
                aspect-ratio="1"
                class="grey lighten-2 ma-2 pointer"
                @click="$store.commit('picto/SET_PICTO', picto)"
              />
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5" />
                </v-row>
              </template>
              <v-card-actions class="grey darken-3">
                <v-checkbox
                  v-model="selected"
                  :value="picto.id"
                  :on-icon="svgCheck"
                  :off-icon="svgPrinter"
                  x-small
                  color="cyan darken-3"
                  @change="collectPictos"
                />
                <v-btn
                  fab
                  dark
                  x-small
                  icon
                  color="cyan darken-3"
                  :value="picto.id"
                  @click="removePictoFromFolder"
                >
                  <v-icon>
                    {{ svgHeartOff }}
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-card-text class="text-center">
            <v-alert color="grey darken-1" dark border="bottom" class="text-h6">
              Pas encore de pictos dans ce dossier
            </v-alert>
          </v-card-text>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {
  mdiClose,
  mdiPrinter,
  mdiHeartOff,
  mdiCheck,
  mdiDelete,
  mdiPen,
  mdiCamera
} from '@mdi/js'
export default {
  middleware: 'auth',
  data () {
    return {
      lang: 'fr',
      svgClose: mdiClose,
      svgPrinter: mdiPrinter,
      svgHeartOff: mdiHeartOff,
      svgCheck: mdiCheck,
      svgDelete: mdiDelete,
      svgPen: mdiPen,
      svgCamera: mdiCamera,
      selected: [],
      openForm: false,
      valid: false,
      pictoRules: [
        v => !v || v.size < 5000000 || 'Image should be less than 5MB'
      ]
    }
  },

  computed: {
    ...mapState({
      displayFolderModal: state => state.global.displayFolderModal,
      foldername: state => state.folder.foldername,
      categories: state => state.category.categories,
      photo: state => state.folder.photo,
      folder: state => state.folder.folder
    })
  },

  methods: {
    ...mapMutations({
      foldernameChange: 'folder/SET_FOLDERNAME',
      photoChange: 'folder/SET_PHOTO'
    }),

    removePictoFromFolder (e) {
      this.$store.dispatch('folder/removePictoFromFolder', {
        pictoId: e.currentTarget.value,
        folderId: this.folder.id
      })
    },

    deleteFolder () {
      this.$store.dispatch('folder/deleteFolder', this.folder.id)
      this.$store.commit('global/SET_DISPLAY_FOLDER_MODAL', false)
    },

    updateFolder () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('folder/updateFolder', this.folder.id)
      }
      setTimeout(() => {
        this.$refs.form.reset()
        this.openForm = false
      }, 1000)
    },

    collectPictos () {
      this.$store.commit('picto/SET_COLLECTED_PICTOS_FOLDER', this.selected)
    },

    closeDisplayFolder () {
      this.$store.commit('global/SET_DISPLAY_FOLDER_MODAL', false)
      this.openForm = false
    }
  }
}
</script>
