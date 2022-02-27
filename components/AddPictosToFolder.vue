<template>
  <v-dialog v-model="addPictosToFolderModal" max-width="500px">
    <v-card flat>
      <v-toolbar color="cyan darken-3" dark>
        <v-toolbar-title>Choisir un dossier</v-toolbar-title>
        <v-spacer />
        <v-btn depressed color="transparent" @click="closePictosToFolderModal">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card flat>
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
              color="cyan darken-3"
              @change="folderIdChange"
            >
              <template #prepend-item>
                <v-list-item ripple @click="openAddFolderModal">
                  <v-list-item-content>
                    <v-btn color="cyan darken-3 white--text">
                      Créer un dossier
                    </v-btn>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2" />
              </template>
              <template #no-data>
                <v-list-item>
                  <v-list-item-title class="text-center">
                    Pas encore de dossier
                  </v-list-item-title>
                </v-list-item>
              </template>
            </v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="cyan darken-3" text type="submit">
              Valider
            </v-btn>
            <v-btn color="cyan darken-3" text @click="closePictosToFolderModal">
              Annuler
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
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

    openAddFolderModal () {
      this.$store.commit('global/SET_ADD_FOLDER_MODAL', true)
    },

    addPictoToFolder () {
      if (this.$refs.forma.validate()) {
        this.$store.dispatch('folder/addPictoToFolder', this.pictoId)
        this.$store.commit('global/SET_ADD_PICTOS_TO_FOLDER_MODAL', false)
      }
    },
    closePictosToFolderModal () {
      this.$store.commit('global/SET_ADD_PICTOS_TO_FOLDER_MODAL', false)
    }
  }
}
</script>
