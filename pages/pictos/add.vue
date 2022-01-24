<template>
  <v-container>
    <v-form
      ref="forma"
      v-model="valid"
      lazy-validation
      @submit.prevent="addPictos"
    >
      <v-row class="text-center">
        <v-col>
          <h1 id="title" class="display-1 my-5">
            Ajouter un picto
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12 col-lg-6">
          <v-col class="d-flex" cols="12">
            <v-select
              v-model="select"
              :items="categories"
              item-text="name"
              item-value="id"
              label="Catégories"
              solo
              @change="categoryIdChange"
            />
          </v-col>
          <v-col cols>
            <v-card
              :class="{ 'grey darken-3': dragover }"
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
                  <v-icon
                    :class="[dragover ? 'mt-2, mb-6' : 'mt-5']"
                    size="150"
                  >
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
          </v-col>
        </v-col>
        <v-col class="col-12 col-lg-6">
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
          <div v-else class="text-center text-h6 cyan--text">
            Ici vos pictos sélectionnés
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  middleware: 'auth',
  data: () => ({
    select: 0,
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
      categoryId: state => state.category.categoryId,
      uploadedCategories: state => state.picto.uploadedCategories
    })
  },

  mounted () {
    this.$store.dispatch('category/getCategories')
  },

  methods: {
    ...mapMutations({
      categoryIdChange: 'category/SET_CATEGORY_ID'
    }),

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
        this.$store.commit('category/SET_CATEGORY_ID', null)
        this.select = 0
      } else {
        this.$notifier.showSnackbar({ validation: "Veuillez d'abord choisir une catégorie", snackbar: true })
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
        this.$store.commit('category/SET_CATEGORY_ID', null)
        this.select = 0
      } else {
        this.$notifier.showSnackbar({ validation: "Veuillez d'abord choisir une catégorie", snackbar: true })
      }
    },

    addPictos () {
      if (this.$refs.forma.validate()) {
        this.$store.dispatch('picto/addPictos')
      }
      this.$router.push({ path: '/pictos/search' })
    }
  }
}
</script>
