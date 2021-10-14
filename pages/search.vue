<template>
  <v-container>
    <v-row justify="center" class="my-5">
      <h1 class="display-1">
        Chercher
      </h1>
    </v-row>
    <v-row justify="center" align="center">
      <v-col
        cols="12"
        xs="12"
        sm="11"
        md="8"
        lg="6"
        xl="6"
      >
        <v-text-field
          v-model="query"
          placeholder="Chercher un picto..."
          label="Chercher un picto..."
          color="cyan"
          prepend-inner-icon="mdi-magnify"
          clearable
          outlined
          rounded
          @input="searchPictos"
        >
          />
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="picto in pictos"
        :key="picto.id"
        class="d-flex child-flex col-xs-6 col-sm-6 col-md-3 col-lg-2 col-xl-2"
      >
        <v-card>
          <v-card-title class="text-h6">
            {{ picto.originalname }}
          </v-card-title>
          <v-img
            :src="`${picto.path}`"
            :lazy-src="`${picto.path}`"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <v-fab-transition>
              <v-btn
                class="my-6 mx-16"
                fab
                dark
                x-small
                absolute
                bottom
                right
                color="teal"
                :value="picto.id"
                @click="downloadPicto"
              >
                <v-icon dark>
                  mdi-download
                </v-icon>
              </v-btn>
            </v-fab-transition>
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
                :value="picto.id"
                @click="pictoIdChange"
              >
                <v-icon dark>
                  mdi-heart-plus
                </v-icon>
              </v-btn>
            </v-fab-transition>
            <v-fab-transition>
              <v-btn
                v-if="picto.user_id === $auth.user.id"
                class="my-6 mx-n2"
                fab
                dark
                x-small
                absolute
                bottom
                right
                color="cyan"
                :value="picto.id"
                @click="deletePicto"
              >
                <v-icon dark>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-fab-transition>
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5" />
              </v-row>
            </template>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-form ref="forma" v-model="valid" lazy-validation>
          <v-card-title>
            Choisir un dossier
          </v-card-title>
          <v-card-text>
            <v-select
              :items="$auth.user.folders"
              :item-text="folder => folder.foldername"
              label="Choisir un dossier"
              :item-value="folder => folder.id"
              color="cyan"
              @change="folderIdChange"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn color="cyan" text @click="addPictoToFolder">
              Valider
            </v-btn>
            <v-btn color="cyan" text @click="dialog = false">
              Annuler
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  middleware: 'auth',
  data () {
    return {
      query: '',
      valid: false,
      lang: 'fr',
      dialog: false,
      pictoId: null
    }
  },

  computed: {
    ...mapState({
      pictos: state => state.picto.pictos,
      loggedIn: state => state.user.loggedIn
    })
  },

  mounted () {
    this.$store.dispatch('picto/getPictos')
    this.$store.commit('picto/INITIALIZE_UPLOADED_FILES')
  },

  methods: {
    ...mapMutations({
      folderIdChange: 'folder/SET_FOLDER_ID'
    }),

    deletePicto (e) {
      this.$store.dispatch('picto/deletePicto', e.currentTarget.value)
    },

    downloadPicto (e) {
      this.$store.dispatch('picto/downloadPicto', e.currentTarget.value)
    },

    searchPictos () {
      if (this.query !== '') {
        this.$store.dispatch('picto/searchPictos', this.query)
      } else {
        this.$store.dispatch('picto/getPictos')
      }
    },

    addPictoToFolder () {
      if (this.$refs.forma.validate()) {
        this.$store.dispatch('folder/addPictoToFolder', this.pictoId)
      }
      setTimeout(this.dialog = false, 5000)
    },

    pictoIdChange (e) {
      this.dialog = true
      this.$store.commit('picto/SET_PICTO_ID', e.currentTarget.value)
    }
  }
}
</script>
