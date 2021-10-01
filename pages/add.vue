/* eslint-disable no-console */
<template>
  <v-container>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ validation }}

      <template #action="{ attrs }">
        <v-btn
          color="cyan"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-form ref="forma" v-model="valid" lazy-validation>
      <v-row class="text-center">
        <v-col>
          <h1 id="my-font" class="display-1 my-5">
            Ajouter un picto
          </h1>
        </v-col>
      </v-row>
      <v-container>
        <v-container max-width="450px">
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
                    <span class="ml-3 text--secondary">
                      {{ item.size }} bytes</span>
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
        </v-container>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

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
      validation: state => state.user.validation
    })
  },

  methods: {
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
      this.$store.commit('picto/SET_UPLOADED_FILES', e.target.files[0])
    },

    addPictos () {
      if (this.$refs.forma.validate()) {
        this.$store.dispatch('picto/addPictos')
        this.snackbar = true
      }
      setTimeout(() => this.$router.push({ path: '/search' }), 5000)
    }

  }
}
</script>
