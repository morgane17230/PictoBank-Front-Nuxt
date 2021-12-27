<template>
  <v-container>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      absolute
      centered
    >
      <span v-if="error.length > 0" class="text-h6 cyan--text">{{ error }}</span>
      <span v-if="validation.length > 0" class="text-h6 cyan--text">{{ validation }}</span>
    </v-snackbar>

    <v-form ref="forma" v-model="valid" lazy-validation>
      <v-row class="text-center">
        <v-col>
          <h1 id="my-font" class="display-1 my-5">
            Ajouter un picto
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-col
            class="d-flex"
            cols="12"
          >
            <v-select
              :items="categories"
              item-text="name"
              item-value="id"
              label="Catégories"
              solo
              @change="categoryIdChange"
            />
          </v-col>
          <v-col
            cols
          >
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
            <v-btn block color="cyan" class="mr-4" @click.stop="addPictos">
              Valider
            </v-btn>
          </v-col>
        </v-col>
        <v-col cols="6">
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
                    {{ item.name }}
                    <span
                      class="ml-3 text--secondary"
                    >
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
    dragover: false,
    isSelecting: false,
    valid: false,
    snackbar: false,
    timeout: 2000,
    pictoRules: [v => !v || v.size < 5000000 || 'Image should be less than 5MB']
  }),

  computed: {
    ...mapState({
      uploadedFiles: state => state.picto.uploadedFiles,
      selectedFile: state => state.picto.selectedFile,
      validation: state => state.global.validation,
      error: state => state.global.error,
      categories: state => state.category.categories,
      categoryId: state => state.picto.categoryId,
      uploadedCategories: state => state.picto.uploadedCategories
    })

  },

  mounted () {
    this.$store.dispatch('category/getCategories')
  },

  methods: {
    ...mapMutations({
      categoryIdChange: 'picto/SET_CATEGORY_ID'
    }),

    removeFile (filename) {
      this.$store.commit('picto/DEL_UPLOADED_FILES', filename)
    },

    onDrop (e) {
      this.$store.commit('picto/ON_DROP_UPLOADED_FILES', e.dataTransfer.files)
    },

    onUpload () {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click()
    },

    onFileChanged (e) {
      const filtered = this.categories.find(category => category.id === this.categoryId)
      if (this.categoryId) {
        this.$store.commit('picto/SET_CATEGORY_NAME', filtered.name)
        this.$store.commit('picto/SET_UPLOADED_FILES', e.target.files[0])
        this.$store.commit('picto/SET_CATEGORY_ID', null)
      } else {
        this.$store.commit('global/SET_ERROR', "Veuillez d'abord choisir une catégorie")
        this.snackbar = true
        setTimeout(() => this.$store.commit('global/SET_ERROR', ''), this.timeout)
      }
    },

    addPictos () {
      if (this.$refs.forma.validate()) {
        this.$store.dispatch('picto/addPictos')
        this.snackbar = true
      }
      setTimeout(() => this.$router.push({ path: '/pictos/search' }), 3000)
    }

  }
}
</script>
