<template>
  <v-container fluid>
    <v-row class="index-bg text-center" align="center" justify="center">
      <div class="pa-6 text-h5 text-lg-h3 rounded-xl opacitybg ma-2">
        Pikto aide les soignants et les proches à renouer le contact...
      </div>
    </v-row>
    <v-row>
      <v-btn
        class="text-h6 pa-6 white--text"
        tile
        block
        color="grey darken-3"
        aria-label="inscription"
        @click="openRegisterUserModal"
      >
        S'inscrire
      </v-btn>
    </v-row>
    <v-row class="py-5">
      <v-col class="col-12 col-lg-4">
        <v-card flat tile justify="center" align="center">
          <nuxt-img
            preload
            alt="icone images multiples"
            format="webp"
            src="/images.webp"
            width="100"
            height="100"
          />
          <v-card-text class="text-subtitle-1">
            Accédez à une bibliothèque de pictogrammes en libre service et
            alimentez le stock de pictogrammes disponibles
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-lg-4">
        <v-card flat tile justify="center" align="center">
          <nuxt-img preload alt="icone imprimante" format="webp" src="/imprimante.webp" width="100" />
          <v-card-text class="text-subtitle-1">
            Sélectionnez et imprimez vos planches de pictogrammes déjà
            dimensionnés
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-lg-4">
        <v-card flat tile justify="center" align="center">
          <nuxt-img preload alt="icone personnes multiples" format="webp" src="/persons.webp" width="100" />
          <v-card-text class="text-subtitle-1">
            Profitez de Pikto que vous soyez particuliers ou établissement
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <Toast />
    <ResetPasswordModal />
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  created () {
    if (this.$route.query.modal === true) {
      this.$store.commit('global/SET_RESET_PASSWORD_MODAL', true)
    } else if (this.$route.query.login === true) {
      this.$store.commit('global/SET_USER_LOGIN_MODAL', true)
    }
  },

  methods: {
    openRegisterUserModal () {
      this.$store.commit('global/SET_USER_REGISTER_MODAL', true)
    }
  }
}
</script>
