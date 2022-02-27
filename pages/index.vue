<template>
  <div justify="center" align="center">
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
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-row class="fill-height" align="center" justify="center">
          <div class="text-h2 backgroundcustom pa-12 rounded-lg white--text">
            {{ item.text }}
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-btn class="text-h6 pa-6 white--text" tile block color="grey darken-3" @click="openRegisterUserModal">
      S'inscrire
    </v-btn>
    <v-row class="py-5">
      <v-col class="col-12 col-lg-4">
        <v-card flat tile>
          <v-img src="/image-multiple-outline.svg" max-width="20%" />
          <v-card-text class="text-subtitle-1">
            Accédez à une bibliothèque de pictogrammes en libre service et alimentez le stock de pictogrammes disponibles
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-lg-4">
        <v-card flat tile>
          <v-img src="/printer-outline.svg" max-width="20%" />
          <v-card-text class="text-subtitle-1">
            Sélectionnez et imprimez vos planches de pictogrammes déjà dimensionnés
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-lg-4">
        <v-card flat tile>
          <v-img src="/account-group-outline.svg" max-width="20%" />
          <v-card-text class="text-subtitle-1">
            Profitez de Pikto que vous soyez particuliers ou établissement
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <Toast />
    <ResetPasswordModal />
  </div>
</template>

<script>
import ResetPasswordModal from '~/components/ResetPasswordModal.vue'
export default {
  components: { ResetPasswordModal },
  middleware: 'auth',
  auth: 'guest',
  data () {
    return {
      cycle: true,
      items: [
        {
          src: require('~/static/background1.jpg'),
          text: 'Pikto aide les soignants et les proches à renouer le contact...'
        },
        {
          src: require('~/static/background2.jpg'),
          text: '...avec les personnes atteintes de troubles cognitifs...'
        },
        {
          src: require('~/static/background3.jpg'),
          text: '...ou celles qui connaissent des troubles du spectre autistique.'
        }
      ]
    }
  },

  methods: {
    openRegisterUserModal () {
      this.$store.commit('global/SET_USER_REGISTER_MODAL', true)
    }
  }
}
</script>
