/* eslint-disable no-console */
<template>
  <v-container>
    <v-row justify="center" class="my-5">
      <h1 class="display-1">
        Chercher
      </h1>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-btn-toggle class="d-flex flex-column">
          <v-btn
            color="cyan"
            depressed
            to="/category/add"
          >
            Ajouter une catégorie
          </v-btn>
          <v-btn
            v-for="category in categories"
            :key="category.id"
            depressed
            :value="category.id"
            @click="searchPictosByCategory"
          >
            {{ category.name }}
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="10">
        <v-col cols>
          <v-text-field
            v-model="query"
            top
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
        <v-col
          v-if="pictos.length === 0"
          class="text-h6 text-center cyan--text"
        >
          Pas de pictos pour le moment
        </v-col>
        <v-row class="mb-6">
          <v-col
            v-for="picto in pictos"
            :key="picto.id"
            class="col-sm-6 col-lg-2"
          >
            <v-card class="pa-2">
              <v-img
                :src="`${picto.path}`"
                :lazy-src="`${picto.path}`"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5" />
                  </v-row>
                </template>
              </v-img>
              <v-card-actions color="cyan">
                <v-spacer />
                <v-btn
                  fab
                  dark
                  x-small
                  icon
                  color="teal"
                  :value="picto.id"
                  @click="downloadPicto"
                >
                  <v-icon dark>
                    mdi-download
                  </v-icon>
                </v-btn>

                <v-btn
                  fab
                  dark
                  x-small
                  icon
                  color="dark"
                  :value="picto.id"
                  @click="pictoIdChange"
                >
                  <v-icon dark>
                    mdi-heart-plus
                  </v-icon>
                </v-btn>

                <v-btn
                  v-if="picto.user_id === $auth.user.id"
                  fab
                  dark
                  x-small
                  icon
                  color="cyan"
                  :value="picto.id"
                  @click="deletePicto"
                >
                  <v-icon dark>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
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
      pictoId: null,
      categoryName: '',
      addCategoryModal: false
    }
  },

  computed: {
    ...mapState({
      pictos: state => state.picto.pictos,
      loggedIn: state => state.user.loggedIn,
      categories: state => state.category.categories
    })
  },

  mounted () {
    this.$store.dispatch('picto/getPictos')
    this.$store.dispatch('category/getCategories')
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

    searchPictosByCategory (e) {
      this.$store.dispatch('category/getCategory', e.currentTarget.value)
    },

    addPictoToFolder () {
      if (this.$refs.forma.validate()) {
        this.$store.dispatch('folder/addPictoToFolder', this.pictoId)
      }
      setTimeout((this.dialog = false), 5000)
    },

    pictoIdChange (e) {
      this.dialog = true
      this.$store.commit('picto/SET_PICTO_ID', e.currentTarget.value)
    }
  }
}
</script>
