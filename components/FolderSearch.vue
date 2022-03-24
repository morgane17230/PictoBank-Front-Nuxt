<template>
  <v-autocomplete
    v-model="selectedItem"
    :items="folders"
    color="cyan darken-3"
    item-text="foldername"
    item-value="id"
    label="Vos dossiers"
    :append-icon="svgChevronDown"
    outlined
    full-width
    persistent-hint
    hide-details
    hide-selected
    single-line
    @change="displayFolder"
  >
    <template #prepend-item>
      <v-list-item ripple @click="openAddFolderModal">
        <v-list-item-content>
          <v-btn color="cyan darken-3 white--text">
            Créer un dossier
          </v-btn>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2" />
    </template>
    <template #no-data>
      <v-list-item>
        <v-list-item-title class="text-center">
          Pas encore de dossier
        </v-list-item-title>
      </v-list-item>
    </template>
    <template #item="{ item }">
      <v-list-item-content>
        <v-list-item-title class="d-flex justify-space-between align-center">
          <v-avatar>
            <img :src="item.path">
          </v-avatar>
          {{ item.foldername }}
        </v-list-item-title>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapState } from 'vuex'
import { mdiChevronDown } from '@mdi/js'
export default {
  middleware: 'auth',
  data: () => ({
    svgChevronDown: mdiChevronDown,
    selectedItem: null
  }),

  computed: {
    ...mapState({
      folders: state => state.folder.folders
    })
  },

  mounted () {
    this.$store.dispatch('folder/getFoldersByAccount')
  },

  methods: {
    displayFolder () {
      this.$store.dispatch('folder/getFolder', this.selectedItem)
      this.$store.commit('global/SET_DISPLAY_FOLDER_MODAL', true)
      setTimeout(() => {
        this.selectedItem = null
      }, 1)
    },

    openAddFolderModal () {
      this.$store.commit('global/SET_ADD_FOLDER_MODAL', true)
    }
  }
}
</script>
