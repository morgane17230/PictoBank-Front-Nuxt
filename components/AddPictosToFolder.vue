<template>
  <v-dialog v-model="addPictosToFolderModal" max-width="500px">
    <v-card flat class="pa-5">
      <v-row>
        <v-btn depressed color="transparent">
          <v-icon color="cyan">
            mdi-close
          </v-icon>
        </v-btn>
      </v-row>
      <v-card-title>
        Choisir un dossier
      </v-card-title>
      <v-form
        ref="forma"
        v-model="valid"
        lazy-validation
        @submit.prevent="addPictoToFolder"
      >
        <v-card-text>
          <v-select
            :items="folders"
            :rules="nameRules"
            item-text="foldername"
            label="Choisir un dossier"
            item-value="id"
            color="cyan"
            @change="folderIdChange"
          />
        </v-card-text>
        <v-card-actions>
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
import { mapState } from 'vuex'
export default {
  middleware: 'auth',
  data () {
    return {
      valid: false,
      lang: 'fr',
      pictoId: null,
      categoryName: '',
      addCategoryModal: false,
      nameRules: [v => !!v || 'Veuillez choisir un dossier']
    }
  },

  computed: {
    ...mapState({
      folderId: state => state.folder.folderId,
      folders: state => state.folder.folders,
      loggedIn: state => state.user.loggedIn,
      addPictosToFolderModal: state => state.global.addPictosToFolderModal
    })
  },

  mounted () {
    this.$store.dispatch('folder/getFoldersByOrg')
  },

  methods: {
    folderIdChange (e) {
      this.$store.commit('folder/SET_FOLDER_ID', e)
    },

    addPictoToFolder () {
      if (this.$refs.forma.validate()) {
        this.$store.dispatch('folder/addPictoToFolder', this.pictoId)
      }
      setTimeout(() => {}, 1000)
    }
  }
}
</script>
