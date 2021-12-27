<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <v-card>
      <v-btn depressed color="transparent" @click="closeDialog">
        <v-icon color="cyan">
          mdi-close
        </v-icon>
      </v-btn>
      <v-form ref="forma2" v-model="valid" lazy-validation>
        <v-card-title>
          Modifier le dossier
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Nom du dossier"
            type="text"
            color="cyan"
            name="foldername"
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
            :rules="pictoRules"
            :value="photo"
            @change="photoChange"
          />
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="cyan" text @click="updateFolder">
            Valider
          </v-btn>
          <v-btn color="cyan" text @click="closeDialog">
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
    dialog: true,
    valid: false,
    snackbar: false,
    timeout: 2000,
    pictoRules: [v => !v || v.size < 5000000 || 'Image should be less than 5MB']
  }),

  computed: {
    ...mapState({
      foldername: state => state.user.foldername,
      photo: state => state.folder.photo,
      loggedIn: state => state.auth.loggedIn,
      validation: state => state.global.validation,
      error: state => state.global.error
    })
  },
  methods: {
    ...mapMutations({
      foldernameChange: 'folder/SET_FOLDERNAME',
      photoChange: 'folder/SET_PHOTO'
    }),

    updateFolder () {
      if (this.$refs.forma2.validate()) {
        this.$store.dispatch('folder/updateFolder', this.folderId)
      }
      setTimeout((this.dialogUpdate = false), 5000)
    },

    closeDialog () {
      this.dialog = false
      this.$router.push('/')
    }
  }
}
</script>
