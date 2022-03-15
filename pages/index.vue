<template>
  <v-container fluid>
    <v-row class="index-row" align="center" justify="center" no-gutters>
      <nuxt-img
        sizes="xs:320 sm:640 md:768 lg:1024 xl:1280 xxl:1536"
        preload
        format="webp"
        src="/background.jpg"
        fit="cover"
        width="1920"
        height="600"
        quality="100"
        class="index-bg"
        alt="image de fond"
        provider="static"
      />
      <p class="text-h4 index-txt text-center">
        Pikto aide les soignants et les proches à renouer le contact...
      </p>
    </v-row>
    <v-row class="index-bottom">
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
      <v-col class="col-12 col-lg-4">
        <v-card flat tile justify="center" align="center">
          <nuxt-img
            preload
            provider="static"
            src="/image-multiple-outline.svg"
            width="100"
            alt="icone images mutliples"
          />
          <v-card-text class="text-subtitle-1">
            Accédez à une bibliothèque de pictogrammes en libre service et
            alimentez le stock de pictogrammes disponibles
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-lg-4 py-5">
        <v-card flat tile justify="center" align="center">
          <nuxt-img
            preload
            provider="static"
            src="/printer-outline.svg"
            width="100"
            alt="icone imprimante"
          />
          <v-card-text class="text-subtitle-1">
            Sélectionnez et imprimez vos planches de pictogrammes déjà
            dimensionnés
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-lg-4 py-5" justify="center" align="center">
        <v-card flat tile justify="center" align="center">
          <nuxt-img
            preload
            provider="static"
            src="/account-group-outline.svg"
            width="100"
            alt="icone personnes multiples"
          />
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

  methods: {
    openRegisterUserModal () {
      this.$store.commit('global/SET_USER_REGISTER_MODAL', true)
    }
  }
}
</script>
