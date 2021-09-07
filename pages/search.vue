<template>
  <v-container class="text-center">
    <h1 class="title">
      Chercher
    </h1>
    <v-container>
      <v-row justify="center">
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
            @input="fetchImg"
          >
            />
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="photo in photos"
          :key="photo.id"
          class="d-flex child-flex"
          cols="4"
        >
          <v-img
            :src="photo.contentUrl"
            :lazy-src="photo.contentUrl"
            aspect-ratio="1"
            class="grey lighten-2"
          >
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
    </v-container>
  </v-container>
</template>

<script>
export default {

  data: () => ({
    query: '',
    valid: false,
    lang: 'fr',
    photos: []

  }),
  methods: {
    fetchImg () {
      fetch(`https://bing-image-search1.p.rapidapi.com/images/search?q=${this.query}&count=100`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com',
          'x-rapidapi-key': '86013b17b3msh89ac7dcb9fce0aap13fbf9jsn796fa811bfbb'
        }
      }).then((res) => { return res.json() }).then(this.setResults)
    },
    setResults (results) {
      this.photos = results.value
    }
  }
}

</script>
