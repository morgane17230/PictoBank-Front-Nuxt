<template>
  <v-dialog v-model="addPictosModal" persistent max-width="500px">
    <v-card flat class="d-flex flex-wrap">
      <v-toolbar color="cyan" dark>
        <v-toolbar-title>Ajouter de nouveaux pictos</v-toolbar-title>
        <v-spacer />
        <v-btn depressed color="transparent" @click="closeAddPictosModal">
          <v-icon>
            mdi-close
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
            color="cyan"
            chips
            item-text="name"
            item-value="id"
            label="Catégorie"
            full-width
            persistent-hint
            hide-details
            hide-selected
            single-line
            class="mb-5"
            @change="categoryIdChange"
          >
            <template #prepend-item>
              <v-list-item
                ripple
                @mousedown.prevent
                @click="openAddCategoryModal"
              >
                <v-list-item-content>
                  <v-list-item-title class="cyan--text font-weight-bold">
                    Ajouter une catégorie
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2" />
            </template>
          </v-autocomplete>
          <v-card
            :class="{ 'blue lighten-5': dragover }"
            :loading="isSelecting"
            @drop.prevent="onDrop($event)"
            @dragover.prevent="dragover = true"
            @dragenter.prevent="dragover = true"
            @dragleave.prevent="dragover = false"
            @click="onUpload"
          >
            <v-card-text>
              <v-row
                class="d-flex flex-column"
                dense
                align="center"
                justify="center"
              >
                <v-icon :class="[dragover ? 'mt-2, mb-6' : 'mt-5']" size="150">
                  mdi-cloud-upload
                </v-icon>
                <p>
                  Glissez-déposez votre pictogramme ou cliquez pour en
                  sélectionner un
                </p>
                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  name="path"
                  accept="image/*"
                  :rules="pictoRules"
                  @change="onFileChanged"
                >
              </v-row>
            </v-card-text>
          </v-card>
          <v-btn block color="cyan" class="mr-4" type="submit">
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
                <v-list-item-avatar>
                  <v-img :src="item.url" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.name.substr(0, 20) }}
                    <span class="ml-3 cyan--text">
                      {{ item.category_name }}
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click.stop="removeFile(item.name)">
                    <v-icon> mdi-close-circle </v-icon>
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

export default {
  middleware: 'auth',
  data: () => ({
    selected: [],
    dragover: false,
    isSelecting: false,
    valid: false,
    pictoRules: [v => !v || v.size < 5000000 || 'Image should be less than 5MB']
  }),

  computed: {
    ...mapState({
      uploadedFiles: state => state.picto.uploadedFiles,
      selectedFile: state => state.picto.selectedFile,
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
      categoryIdChange: 'picto/SET_CATEGORY_ID'
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

    onDrop (e) {
      const filtered = this.categories.find(
        category => category.id === this.categoryId
      )
      if (this.categoryId) {
        this.$store.commit('picto/SET_CATEGORY_NAME', filtered.name)
        this.$store.commit(
          'picto/ON_DROP_UPLOADED_FILES',
          e.dataTransfer.files
        )
        this.$store.commit('picto/SET_CATEGORY_ID', null)
        this.selected = 0
      } else {
        this.$notifier.showSnackbar({
          validation: "Veuillez d'abord choisir une catégorie"
        })
      }
    },

    onUpload () {
      this.isSelecting = true
      window.addEventListener(
        'focus',
        () => {
          this.isSelecting = false
        },
        { once: true }
      )
      this.$refs.uploader.click()
    },

    onFileChanged (e) {
      const filtered = this.categories.find(
        category => category.id === this.categoryId
      )
      if (this.categoryId) {
        this.$store.commit('picto/SET_CATEGORY_NAME', filtered.name)
        this.$store.commit('picto/SET_UPLOADED_FILES', e.target.files[0])
        this.$store.commit('picto/SET_CATEGORY_ID', null)
        this.selected = 0
      } else {
        this.$notifier.showSnackbar({
          validation: "Veuillez d'abord choisir une catégorie"
        })
      }
    },

    addPictos () {
      if (this.$refs.forma.validate()) {
        this.$store.dispatch('picto/addPictos')
        this.$store.commit('global/SET_ADD_PICTOS_MODAL', false)
      }
    }
  }
}
</script>
