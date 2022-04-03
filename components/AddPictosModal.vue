<template>
  <v-dialog v-model="addPictosModal" persistent max-width="600px">
    <v-card flat class="d-flex flex-wrap">
      <v-toolbar color="cyan darken-3" dark>
        <v-toolbar-title>Ajouter de nouveaux pictos</v-toolbar-title>
        <v-spacer />
        <v-btn depressed color="transparent" @click="closeAddPictosModal">
          <v-icon>
            {{ svgClose }}
          </v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pt-5">
        <v-form
          ref="forma"
          v-model="valid"
          lazy-validation
          @submit.prevent="addPictos"
        >
          <v-autocomplete
            v-model="selected"
            :items="categories"
            :append-icon="svgChevronDown"
            color="cyan darken-3"
            item-text="name"
            item-value="id"
            label="Catégorie"
            full-width
            required
            persistent-hint
            hide-details
            hide-selected
            single-line
            class="mb-5"
            @change="categoryIdChange"
          >
            <template #no-data>
              <v-list-item>
                <v-list-item-title class="text-center">
                  Pas de catégorie avec ce nom
                </v-list-item-title>
              </v-list-item>
            </template>
            <template #prepend-item>
              <v-list-item
                ripple
                @mousedown.prevent
                @click="openAddCategoryModal"
              >
                <v-list-item-content>
                  <v-btn color="cyan darken-3 white--text">
                    Ajouter une catégorie
                  </v-btn>
                </v-list-item-content>
              </v-list-item><v-divider class="mt-2" />
            </template>
          </v-autocomplete>
          <v-text-field
            type="name"
            label="Nom du picto"
            name="name"
            color="cyan darken-3"
            :value="pictoName"
            @change="pictoNameChange"
          />
          <v-row class="mb-5">
            <v-col class="col-12 col-sm-6">
              <croppa
                v-model="selectedFile"
                canvas-color="#e2e2e2"
                :width="290"
                :height="290"
                :placeholder="
                  pictoName === '' || categoryId === null
                    ? 'Veuillez choisir une catégorie et un nom'
                    : 'Sélectionnez une image'
                "
                :disabled="pictoName === '' || categoryId === null"
                :placeholder-font-size="15"
                :placeholder-color="'default'"
                :accept="'image/*'"
                :show-loading="true"
                :file-size-limit="0"
                :quality="2"
                :zoom-speed="3"
                :reverse-scroll-to-zoom="false"
                :show-remove-button="true"
                :remove-button-color="'cyan darken-3'"
                :remove-button-size="0"
              />
            </v-col>
            <v-col
              class="d-flex flex-sm-column justify-space-between align-center col-6 pa-lg-6"
            >
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    text
                    fab
                    :disabled="selectedFile === null"
                    @click="selectedFile.rotate(-1)"
                  >
                    <v-icon color="grey" dark v-bind="attrs" v-on="on">
                      {{ svgRotateLeft }}
                    </v-icon>
                  </v-btn>
                </template>
                <span>Pivoter le picto vers la gauche</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    text
                    fab
                    :disabled="selectedFile === null"
                    @click="selectedFile.rotate()"
                  >
                    <v-icon color="grey" dark v-bind="attrs" v-on="on">
                      {{ svgRotateRight }}
                    </v-icon>
                  </v-btn>
                </template>
                <span>Pivoter le picto vers la droite</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn text fab>
                    <v-icon color="grey" dark v-bind="attrs" v-on="on">
                      {{ svgDrag }}
                    </v-icon>
                  </v-btn>
                </template>
                <span>Cliquer-glisser le picto pour ajuster le cadrage</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn text fab>
                    <v-icon color="grey" dark v-bind="attrs" v-on="on">
                      {{ svgMagnifyPlus }}
                    </v-icon>
                  </v-btn>
                </template>
                <span>Utilisez la roulette de la souris pour ajuster le zoom</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    text
                    fab
                    :color="selectedFile.chosenFile ? 'cyan' : ''"
                    :disabled="selectedFile === null"
                    @click="onFileChanged"
                  >
                    <v-icon color="grey" dark v-bind="attrs" v-on="on">
                      {{ svgCheck }}
                    </v-icon>
                  </v-btn>
                </template>
                <span>Si vous êtes satisfait, validez le picto tel qu'affiché</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-btn
            :disabled="uploadedFiles.length === 0"
            block
            color="cyan darken-3"
            class="mr-4"
            type="submit"
          >
            Valider
          </v-btn>
          <v-virtual-scroll
            v-if="uploadedFiles.length > 0"
            :items="uploadedFiles"
            height="500"
            item-height="60"
          >
            <template #default="{ item }">
              <v-list-item :key="item.name">
                <v-list-item-avatar class="profile">
                  <v-img
                    preload
                    :src="item.url"
                    :alt="item.originalname"
                  />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.originalname.split("-")[1] }}
                    <v-chip
                      :class="`ml-3 ${item.category_color.text}--text`"
                      :color="item.category_color.background"
                      small
                    >
                      <span>{{ item.category_name }}</span>
                    </v-chip>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click.stop="removeFile(item.name)">
                    <v-icon> {{ svgClose }} </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider />
            </template>
          </v-virtual-scroll>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { mdiClose, mdiRotateRight, mdiRotateLeft, mdiCheck, mdiMagnifyPlus, mdiDragVariant, mdiChevronDown } from '@mdi/js'
import Vue from 'vue'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
Vue.use(Croppa)
export default {
  middleware: 'auth',
  data: () => ({
    selectedFile: {},
    selected: [],
    svgChevronDown: mdiChevronDown,
    svgClose: mdiClose,
    svgRotateRight: mdiRotateRight,
    svgRotateLeft: mdiRotateLeft,
    svgMagnifyPlus: mdiMagnifyPlus,
    svgCheck: mdiCheck,
    svgDrag: mdiDragVariant,
    valid: false,
    pictoRules: [
      v => !v || v.size < 5000000 || 'Image should be less than 5MB'
    ],
    nameRules: [v => !!v || 'Le champs est requis']
  }),

  computed: {
    ...mapState({
      pictoName: state => state.picto.name,
      uploadedFiles: state => state.picto.uploadedFiles,
      categories: state => state.category.categories,
      categoryId: state => state.picto.categoryId,
      uploadedCategories: state => state.picto.uploadedCategories,
      addPictosModal: state => state.global.addPictosModal
    })
  },

  mounted () {
    this.$store.dispatch('category/getCategories')
  },

  methods: {
    ...mapMutations({
      categoryIdChange: 'picto/SET_CATEGORY_ID',
      pictoNameChange: 'picto/SET_PICTO_NAME'
    }),

    openAddCategoryModal () {
      this.$store.commit('global/SET_ADD_CATEGORY_MODAL', true)
    },

    closeAddPictosModal () {
      this.$store.commit('global/SET_ADD_PICTOS_MODAL', false)
    },

    removeFile (filename) {
      this.$store.commit('picto/DEL_UPLOADED_FILES', filename)
    },

    onFileChanged () {
      const filtered = this.categories.find(
        category => category.id === this.categoryId
      )
      if (this.categoryId) {
        this.$store.commit('picto/SET_CATEGORY_NAME', filtered.name)
        this.$store.commit('picto/SET_CATEGORY_COLOR', filtered.color)
        this.selectedFile.generateBlob((blob) => {
          this.$store.commit('picto/SET_UPLOADED_FILES', blob)
        }, 'image/webp', 0.8)
        this.selected = 0
        this.selectedFile.remove()
      }
    },

    addPictos () {
      if (this.$refs.forma.validate()) {
        this.$store.dispatch('picto/addPictos')
        this.$store.commit('global/SET_ADD_PICTOS_MODAL', false)
        location.reload(true)
      }
    }
  }
}
</script>
