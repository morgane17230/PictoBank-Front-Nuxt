<template>
  <v-container fluid>
    <v-row class="index-bg text-h3 text-center" align="center" justify="center">
      <div class="cyan darken-3 pa-6 rounded-xl">
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
          <v-img src="/image-multiple-outline.svg" max-width="20%" />
          <v-card-text class="text-subtitle-1">
            Accédez à une bibliothèque de pictogrammes en libre service et
            alimentez le stock de pictogrammes disponibles
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-lg-4">
        <v-card flat tile justify="center" align="center">
          <v-img src="/printer-outline.svg" max-width="20%" />
          <v-card-text class="text-subtitle-1">
            Sélectionnez et imprimez vos planches de pictogrammes déjà
            dimensionnés
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-lg-4">
        <v-card flat tile justify="center" align="center">
          <v-img src="/account-group-outline.svg" max-width="20%" />
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
