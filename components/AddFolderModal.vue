<template>
  <v-dialog v-model="addFolderModal" max-width="500px" persistent>
    <v-card>
      <v-btn depressed color="transparent">
        <v-icon color="cyan">
          mdi-close
        </v-icon>
      </v-btn>
      <v-form ref="forma1" v-model="valid" lazy-validation @submit.prevent="addFolder">
        <v-card-title>
          Créer un nouveau dossier
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Nom du dossier"
            type="text"
            color="cyan"
            name="foldername"
            required
            :rules="fieldRules"
            :value="foldername"
            @change="foldernameChange"
          />
          <v-file-input
            ref="uploader"
            name="path"
            type="file"
            color="cyan"
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
          <v-btn color="cyan" text type="submit">
            Valider
          </v-btn>
          <v-btn color="cyan" text>
            Annuler
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  middleware: 'auth',
  data: () => ({
    valid: false,
    pictoRules: [v => !v || v.size < 5000000 || 'Image should be less than 5MB'],
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
    }
  }
}
</script>
