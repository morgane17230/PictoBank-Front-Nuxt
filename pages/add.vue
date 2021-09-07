/* eslint-disable no-console */
<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <h1 id="my-font" class="display-2">
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
            <v-row class="d-flex flex-column" dense align="center" justify="center">
              <v-icon :class="[dragover ? 'mt-2, mb-6' : 'mt-5']" size="150">
                mdi-cloud-upload
              </v-icon>
              <p>
                Glissez-déposez votre pictogramme ou cliquez pour en sélectionner un
              </p>
              <input
                ref="uploader"
                class="d-none"
                type="file"
                accept="image/*"
                @change="onFileChanged"
              >
            </v-row>
          </v-card-text>
        </v-card>
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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dragover: false,
    uploadedFiles: [],
    selectedFile: null,
    isSelecting: false
  }),
  multiple: {
    type: Boolean,
    default: true
  },
  methods: {
    removeFile (fileName) {
      // Find the index of the
      const index = this.uploadedFiles.findIndex(
        file => file.name === fileName
      )
      // If file is in uploaded files remove it
      if (index > -1) { this.uploadedFiles.splice(index, 1) }
    },

    onDrop (e) {
      e.dataTransfer.files.forEach((element) => {
        element.url = URL.createObjectURL(element)
        this.uploadedFiles.push(element)
      })
    },

    // submit () {
    // If there aren't any files to be uploaded throw error
    // if (!this.uploadedFiles.length > 0) {
    // this.$store.dispatch('addNotification', {
    //   message: 'There are no files to upload',
    //   colour: 'error'
    // })
    // } else {
    // Send uploaded files to parent component
    //  this.$emit('filesUploaded', this.uploadedFiles)
    // }
    // },

    onUpload () {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click()
    },

    onFileChanged (e) {
      this.selectedFile = e.target.files[0]
      this.selectedFile.url = URL.createObjectURL(this.selectedFile)
      this.uploadedFiles.push(this.selectedFile)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/variables.scss';

#my-font {
  font-family: $perso-font;
}
</style>
