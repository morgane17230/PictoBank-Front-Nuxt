<template>
  <v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout" absolute>
      <span v-if="error.length > 0" class="cyan--text">{{ error }}</span>
      <span v-if="validation.length > 0" class="cyan--text">{{
        validation
      }}</span>
    </v-snackbar>
    <v-row justify="center">
      <v-col class="text-center">
        <h1 class="display-1 my-5">
          Favoris
        </h1>
      </v-col>
    </v-row>

    <v-spacer />

    <v-row>
      <v-col>
        <v-container fluid>
          <v-row dense>
            <v-col
              class="d-flex child-flex col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3"
            >
              <v-card class="d-flex flex-column justify-space-between">
                <v-card-actions class="d-flex justify-center">
                  <v-btn
                    icon
                    class="d-flex"
                    width="200"
                    height="200"
                    to="/folder/add"
                  >
                    <v-icon color="cyan" size="150">
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </v-card-actions>
                <v-card-title class="d-flex justify-center">
                  Ajouter un dossier
                </v-card-title>
              </v-card>
            </v-col>
            <v-col
              v-for="folder in $auth.user.folders"
              :key="folder.id"
              class="d-flex child-flex col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3"
            >
              <v-card>
                <v-img
                  :src="`${folder.path}`"
                  :lazy-src="`${folder.path}`"
                  aspect-ratio="1"
                  class="white--text align-end"
                  height="200px"
                />
                <v-card-actions>
                  <v-row>
                    <v-col>
                      <v-card-title v-text="folder.foldername" />
                    </v-col>
                    <v-col class="d-flex align-center" cols="4">
                      <v-btn
                        fab
                        dark
                        x-small
                        icon
                        color="teal"
                        :value="(folderId = folder.id)"
                        to="/folder/update"
                      >
                        <v-icon dark>
                          mdi-pen
                        </v-icon>
                      </v-btn>
                      <v-btn
                        fab
                        dark
                        x-small
                        icon
                        color="dark"
                        :value="folder.id"
                        @click="folderChange"
                      >
                        <v-icon dark>
                          mdi-eye
                        </v-icon>
                      </v-btn>
                      <v-btn
                        fab
                        dark
                        x-small
                        icon
                        color="cyan"
                        :value="folder.id"
                        @click="deleteFolder"
                      >
                        <v-icon dark>
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  middleware: 'auth',
  data: () => ({
    selectedItem: 0,
    dialogUpdate: false,
    valid: false,
    folderId: null,
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

    deleteFolder (e) {
      this.$store.dispatch('folder/deleteFolder', e.currentTarget.value)
    },

    folderChange (e) {
      this.$store.commit('folder/SET_FOLDER_ID', e.currentTarget.value)
      this.$router.push('/folder/display')
    }
  }
}
</script>
