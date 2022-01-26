<template>
  <v-row justify="center" align="center">
    <v-col class="text-center">
      <v-carousel
        :show-arrows="false"
        hide-delimiters
        continuous
        :cycle="cycle"
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        />
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',

  data () {
    return {
      cycle: true,
      items: [
        {
          src: require('~/static/background1.jpg')
        },
        {
          src: require('~/static/background2.jpg')
        },
        {
          src: require('~/static/background3.jpg')
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ]
    }
  }
}
</script>
