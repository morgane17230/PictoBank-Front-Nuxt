<template>
  <v-container>
    <v-row justify="center" class="my-5 ">
      <v-col>
        <v-btn class="my-1" block color="cyan" outlined @click="generatePDF">
          Télécharger les pictos
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          v-if="$auth.user.role === 'admin'"
          class="my-1"
          block
          color="cyan"
          outlined
          @click="openUpdateUserModal"
        >
          Modifier le profil
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-lg-2">
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
      </v-col>
      <v-col class="col-xs-12 col-lg-10">
        <div v-if="pictos.length === 0" class="text-h6 text-center cyan--text">
          Pas de pictos pour le moment
        </div>
        <v-row class="mb-6">
          <v-col
            class="d-flex child-flex col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
          >
            <v-card class="d-flex flex-column justify-space-between">
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  icon
                  class="d-flex"
                  width="200"
                  height="200"
                  @click="openAddPictosModal"
                >
                  <v-icon color="cyan" size="150">
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col
            v-for="picto in pictos"
            :key="picto.id"
            class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
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
                <v-chip :value="picto.category_id" @click="searchPictosByCategory(picto.category_id)">
                  {{ categories.find(cat => cat.id === picto.category_id).name }}
                </v-chip>
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
                  color="cyan"
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
    <Profile />
    <AddPictosModal />
    <AddFolderModal />
    <UpdateFolderModal />
    <AddCategoryModal />
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
      folderId: state => state.folder.folderId,
      folders: state => state.folder.folders,
      loggedIn: state => state.user.loggedIn,
      categories: state => state.category.categories,
      collectedPictos: state => state.picto.collectedPictos
    })
  },

  mounted () {
    this.$store.dispatch('picto/getPictos')
    this.$store.dispatch('category/getCategories')
    this.$store.dispatch('folder/getFoldersByOrg')
  },

  methods: {
    openUpdateUserModal () {
      this.$store.commit('global/SET_USER_UDATE_MODAL', true)
    },

    openAddPictosModal () {
      this.$store.commit('global/SET_ADD_PICTOS_MODAL', true)
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
      console.log(e)
      if (e.type === 'click') {
        this.$store.dispatch('category/getCategory', e.currentTarget.value)
      }
      this.$store.dispatch('category/getCategory', e)
    },

    pictoIdChange (e) {
      this.$store.commit('picto/SET_PICTO_ID', e.currentTarget.value)
    },

    generatePDF () {
      this.$store.dispatch('picto/generatePDF')
    }
  }
}
</script>
