<template>
  <v-dialog v-model="addFolderModal" max-width="500px" persistent>
    <v-card flat>
      <v-toolbar color="cyan darken-3" dark>
        <v-toolbar-title>Ajouter un dossier</v-toolbar-title>
        <v-spacer />
        <v-btn depressed color="transparent" @click="closeAddFolderModal">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card flat>
        <v-form
          ref="forma1"
          v-model="valid"
          lazy-validation
          @submit.prevent="addFolder"
        >
          <v-card-text>
            <v-text-field
              label="Nom du dossier"
              type="text"
              color="cyan darken-3"
              name="foldername"
              required
              autofocus
              :rules="fieldRules"
              :value="foldername"
              @change="foldernameChange"
            />
            <v-file-input
              ref="uploader"
              name="path"
              type="file"
              color="cyan darken-3"
              accept="image/*"
              label="photo"
              prepend-icon="mdi-camera"
              required
              :rules="pictoRules"
              :value="photo"
              @change="photoChange"
            />
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              color="cyan darken-3"
              small
              outlined
              @click="closeAddFolderModal"
            >
              Annuler
            </v-btn>
            <v-btn
              color="cyan darken-3"
              class="white--text"
              small
              type="submit"
            >
              Valider
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  middleware: 'auth',
  data: () => ({
    valid: false,
    pictoRules: [
      v => !v || v.size < 5000000 || 'Image should be less than 5MB'
    ],
    fieldRules: [v => !!v || 'Le champs est requis']
  }),

  computed: {
    ...mapState({
      foldername: state => state.user.foldername,
      photo: state => state.folder.photo,
      loggedIn: state => state.auth.loggedIn,
      addFolderModal: state => state.global.addFolderModal
    })
  },
  methods: {
    ...mapMutations({
      foldernameChange: 'folder/SET_FOLDERNAME',
      photoChange: 'folder/SET_PHOTO'
    }),

    addFolder () {
      if (this.$refs.forma1.validate()) {
        this.$store.dispatch('folder/addFolder')
      }
      this.$store.commit('folder/SET_PHOTO', null)
      this.$store.commit('global/SET_ADD_FOLDER_MODAL', false)
    },

    closeAddFolderModal () {
      this.$store.commit('global/SET_ADD_FOLDER_MODAL', false)
    }
  }
}
</script>
