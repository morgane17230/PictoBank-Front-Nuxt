<template>
  <v-container>
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
        <v-container
          fluid
        >
          <v-row
            dense
          >
            <v-col

              class="d-flex child-flex col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3"
            >
              <v-card
                class="d-flex flex-column justify-space-between"
              >
                <v-card-actions
                  class="d-flex justify-center"
                >
                  <v-btn
                    icon
                    class="d-flex"
                    width="200"
                    height="200"
                    @click="dialog = true"
                  >
                    <v-icon
                      color="cyan"
                      size="150"
                    >
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
                <v-card-actions>
                  <v-img
                    :src="`${folder.path}`"
                    :lazy-src="`${folder.path}`"
                    aspect-ratio="1"
                    class="white--text align-end"
                    height="200px"
                  />
                  <v-fab-transition>
                    <v-btn
                      class="my-6 mx-7"
                      fab
                      dark
                      x-small
                      absolute
                      bottom
                      right
                      color="dark"
                    >
                      <v-icon dark>
                        mdi-eye
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
                      color="cyan"
                      :value="folder.id"
                    >
                      <v-icon dark>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-fab-transition>
                </v-card-actions>

                <v-card-title v-text="folder.foldername" />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-card>
        <v-btn
          depressed
          color="transparent"
          @click="dialog = false"
        >
          <v-icon color="cyan">
            mdi-close
          </v-icon>
        </v-btn>
        <v-form ref="forma" v-model="valid" lazy-validation>
          <v-card-title>
            Créer un nouveau dossier
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
            <v-btn
              color="cyan"
              text
              @click="addFolder"
            >
              Valider
            </v-btn>
            <v-btn
              color="cyan"
              text
              @click="dialog = false"
            >
              Annuler
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  middleware: 'auth',
  data: () => ({
    selectedItem: 0,
    dialog: false,
    valid: false,
    pictoRules: [v => !v || v.size < 5000000 || 'Image should be less than 5MB']
  }),
  computed: {
    ...mapState({
      foldername: state => state.user.foldername,
      folders: state => state.folder.folders,
      photo: state => state.folder.photo,
      loggedIn: state => state.auth.loggedIn,
      validation: state => state.user.validation
    })
  },
  methods: {
    ...mapMutations({
      foldernameChange: 'folder/SET_FOLDERNAME',
      photoChange: 'folder/SET_PHOTO'
    }),

    addFolder () {
      if (this.$refs.forma.validate()) {
        this.$store.dispatch('folder/addFolder')
      }
    }
  }
}
</script>
