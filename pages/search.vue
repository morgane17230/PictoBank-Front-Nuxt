<template>
  <v-container>
    <v-row justify="center my-5">
      <h1 class="display-1">
        Chercher
      </h1>
    </v-row>
    <v-row justify="center" align="center">
      <v-col
        cols="12"
        xs="12"
        sm="11"
        md="8"
        lg="6"
        xl="6"
      >
        <v-text-field
          v-model="query"
          placeholder="Chercher un picto..."
          label="Chercher un picto..."
          color="cyan"
          prepend-inner-icon="mdi-magnify"
          clearable
          outlined
          rounded
        >
          />
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="photo in photos"
        :key="photo.id"
        class="d-flex child-flex col-xs-6 col-sm-6 col-md-3 col-lg-2 col-xl-2"
      >
        <v-img
          :src="`data:${photo.mimetype};base64,${photo.path}`"
          :lazy-src="`data:${photo.mimetype};base64,${photo.path}`"
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <v-fab-transition>
            <v-btn
              class="my-6 mx-8"
              fab
              dark
              x-small
              absolute
              bottom
              right
              color="dark"
              @click="dialog = true"
            >
              <v-icon dark>
                mdi-heart
              </v-icon>
            </v-btn>
          </v-fab-transition>
          <v-fab-transition>
            <v-btn
              class="my-6 mx-n2"
              fab
              dark
              x-small
              absolute
              bottom
              right
              color="cyan"
              :value="photo.id"
              @click="deleteFav"
            >
              <v-icon dark>
                mdi-delete
              </v-icon>
            </v-btn>
          </v-fab-transition>
          <template #placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-card>
        <v-form v-model="valid">
          <v-card-title>
            Choisir un dossier
          </v-card-title>
          <v-card-text>
            <v-select
              :items="select"
              label="Choisir un dossier"
              item-value="text"
              color="cyan"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="cyan"
              text
            >
              Valider
            </v-btn>
            <v-btn
              color="cyan"
              text
              @click="dialog = false"
            >
              Annuler
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {

  data () {
    return {
      query: '',
      valid: false,
      lang: 'fr',
      photos: [],
      dialog: false,
      select: [
        { text: 'State 1' },
        { text: 'State 2' },
        { text: 'State 3' },
        { text: 'State 4' },
        { text: 'State 5' },
        { text: 'State 6' },
        { text: 'State 7' }
      ]
    }
  },

  async fetch () {
    this.photos = await fetch(
      'http://localhost:5000/getPictos'
    ).then(res => res.json())
  },

  methods: {
    deleteFav () {
      alert('supprimé')
    }
  }
}

</script>
