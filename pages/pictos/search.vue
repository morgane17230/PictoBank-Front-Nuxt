<template>
  <v-container>
    <v-row justify="center" class="my-5">
      <h1 class="display-1">
        Chercher
      </h1>
    </v-row>
    <v-row>
      <v-col class="col-xs-12 col-lg-4">
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
        />
        <v-btn-toggle class="d-flex flex-column">
          <v-btn
            color="cyan"
            depressed
            to="/category/add"
          >
            Ajouter une catégorie
          </v-btn>
          <v-select
            class="px-2"
            :items="categories"
            label="Choir une catégorie"
            item-value="id"
            item-text="name"
            color="cyan"
            @change="searchPictosByCategory"
          />
        </v-btn-toggle>
      </v-col>
      <v-col class="col-xs-12 col-lg-8">
        <div
          v-if="pictos.length === 0"
          class="text-h6 text-center cyan--text"
        >
          Pas de pictos pour le moment
        </div>
        <v-row class="mb-6">
          <v-col
            v-for="picto in pictos"
            :key="picto.id"
            class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
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
                <v-checkbox
                  v-model="selected"
                  :value="picto.id"
                  color="cyan"
                  @change="collectPictos"
                />
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
              item-text="foldername"
              label="Choisir un dossier"
              item-value="id"
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
import { mapState } from 'vuex'
export default {
  middleware: 'auth',
  data () {
    return {
      query: '',
      valid: false,
      lang: 'fr',
      dialog: false,
      pictoId: null,
      selected: [],
      categoryName: '',
      addCategoryModal: false
    }
  },

  computed: {
    ...mapState({
      pictos: state => state.picto.pictos,
      loggedIn: state => state.user.loggedIn,
      categories: state => state.category.categories,
      collectedPictos: state => state.picto.collectedPictos
    })
  },

  mounted () {
    this.$store.dispatch('picto/getPictos')
    this.$store.dispatch('category/getCategories')
    this.$store.commit('picto/INITIALIZE_UPLOADED_FILES')
  },

  methods: {

    folderIdChange (e) {
      this.$store.commit('folder/SET_FOLDER_ID', e)
    },

    deletePicto (e) {
      this.$store.dispatch('picto/deletePicto', e.currentTarget.value)
    },

    collectPictos () {
      this.$store.commit('picto/SET_COLLECTED_PICTOS', this.selected)
    },

    searchPictos () {
      if (this.query !== '') {
        this.$store.dispatch('picto/searchPictos', this.query)
      } else {
        this.$store.dispatch('picto/getPictos')
      }
    },

    searchPictosByCategory (e) {
      this.$store.dispatch('category/getCategory', e)
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
