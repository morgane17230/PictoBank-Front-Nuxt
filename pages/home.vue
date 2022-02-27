<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3" class="border-end">
        <div class="mb-2">
          <FolderSearch />
        </div>
        <div><PictoSearch /></div>
        <div>
          <v-btn
            block
            color="cyan darken-3"
            class="white--text mb-2"
            :disabled="
              [...collectedPictosHome, ...collectedPictosFolder].length === 0
            "
            @click="generatePDF"
          >
            Télécharger les pictos
          </v-btn>
          <v-btn
            v-if="$auth.user.role === 'admin'"
            block
            color="cyan darken-3"
            class="white--text"
            @click="openUpdateUserModal"
          >
            Modifier le profil
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="9">
        <v-row class="mb-6">
          <v-col class="d-flex child-flex col-xs-12 col-sm-4 col-lg-3 col-xl-2">
            <v-card class="d-flex flex-column justify-space-between">
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  icon
                  class="d-flex"
                  width="200"
                  height="200"
                  @click="openAddPictosModal"
                >
                  <v-icon color="cyan darken-3" size="150">
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col v-if="pictos.length === 0" class="col-12 col-md">
            <v-card class="text-h6 text-center py-10 cyan lighten-5">
              Pas de pictos pour le moment
            </v-card>
          </v-col>
          <v-col
            v-for="picto in foundPictos"
            :key="picto.id"
            class="col-xs-12 col-sm-4 col-lg-3 col-xl-2"
          >
            <v-card>
              <v-toolbar color="grey darken-3" dark>
                <v-chip
                  small
                  :class="`${categories.find(cat => cat.id === picto.category_id).color.text}--text`"
                  :color="
                    categories.find(cat => cat.id === picto.category_id).color.background
                  "
                  :value="picto.category_id"
                  @click="searchPictosByCategory(picto.category_id)"
                >
                  {{ picto.originalname.split("-")[0] }}
                </v-chip>
                <v-spacer />
                <span class="white--text end">{{ picto.originalname.split("-")[1] }}</span>
              </v-toolbar>
              <v-img
                :src="`${picto.path}`"
                :lazy-src="`${picto.path}`"
                aspect-ratio="1"
                class="grey lighten-2 ma-2"
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
              <v-card-actions class="grey darken-3">
                <v-checkbox
                  v-model="selected"
                  on-icon="mdi-check"
                  off-icon="mdi-printer"
                  x-small
                  :value="picto.id"
                  color="cyan darken-3"
                  @change="collectPictos"
                />
                <v-btn
                  fab
                  dark
                  x-small
                  icon
                  color="cyan darken-3"
                  :value="picto.id"
                  @click="pictoIdChange"
                >
                  <v-icon dark>
                    mdi-heart-plus
                  </v-icon>
                </v-btn>

                <v-btn
                  v-if="picto.account_id === $auth.user.account.id"
                  fab
                  dark
                  x-small
                  icon
                  color="cyan darken-3"
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
    <Toast />
    <Profile />
    <AddPictosModal />
    <AddFolderModal />
    <AddCategoryModal />
    <AddPictosToFolder />
    <DisplayFolder />
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
      pictoId: null,
      selected: [],
      categoryName: '',
      nameRules: [v => !!v || 'Veuillez choisir un dossier']
    }
  },

  computed: {
    ...mapState({
      pictos: state => state.picto.pictos,
      foundPictos: state => state.picto.foundPictos,
      categories: state => state.category.categories,
      collectedPictosHome: state => state.picto.collectedPictosHome,
      collectedPictosFolder: state => state.picto.collectedPictosFolder,
      selectedFile: state => state.picto.selectedFile
    })
  },

  created () {
    this.$store.dispatch('category/getCategories')
    this.$store.dispatch('picto/getPictos')
  },

  methods: {
    openUpdateUserModal () {
      this.$store.commit('global/SET_USER_UPDATE_MODAL', true)
    },

    openAddPictosModal () {
      this.$store.commit('global/SET_ADD_PICTOS_MODAL', true)
    },

    deletePicto (e) {
      this.$store.dispatch('picto/deletePicto', e.currentTarget.value)
    },

    collectPictos () {
      this.$store.commit('picto/SET_COLLECTED_PICTOS_HOME', this.selected)
    },

    searchPictos () {
      if (this.query !== '') {
        this.$store.dispatch('picto/searchPictos', this.query)
      } else {
        this.$store.dispatch('picto/getPictos')
      }
    },

    searchPictosByCategory (e) {
      if (e.type === 'click') {
        this.$store.dispatch('category/getCategory', e.currentTarget.value)
      }
      this.$store.dispatch('category/getCategory', e)
    },

    pictoIdChange (e) {
      this.$store.commit('picto/SET_PICTO_ID', e.currentTarget.value)
      this.$store.commit('global/SET_ADD_PICTOS_TO_FOLDER_MODAL', true)
    },

    generatePDF () {
      this.$store.dispatch('picto/generatePDF')
    }
  }
}
</script>
