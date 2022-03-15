<template>
  <v-container fluid>
    <v-row class="index-row" align="center" justify="center">
      <nuxt-img preload src="/background.webp" fit="contain" class="index-bg" />
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
          <nuxt-img src="/image-multiple-outline.svg" width="100" />
          <v-card-text class="text-subtitle-1">
            Accédez à une bibliothèque de pictogrammes en libre service et
            alimentez le stock de pictogrammes disponibles
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-lg-4 py-5">
        <v-card flat tile justify="center" align="center">
          <nuxt-img src="/printer-outline.svg" width="100" />
          <v-card-text class="text-subtitle-1">
            Sélectionnez et imprimez vos planches de pictogrammes déjà
            dimensionnés
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-lg-4 py-5" justify="center" align="center">
        <v-card flat tile justify="center" align="center">
          <nuxt-img src="/account-group-outline.svg" width="100" />
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
