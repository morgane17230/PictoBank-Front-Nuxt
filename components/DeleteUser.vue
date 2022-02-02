<template>
  <v-container>
    <v-alert
      class="d-flex flex-column text-center mt-5"
      border="top"
      color="red lighten-2"
      dark
    >
      <h2>Suppression du compte</h2>
      <p>
        Attention, le suppression de votre compte n'entraînera pas la
        suppression de vos pictogrammes. Si vous ne souhaitez pas les laisser
        sur l'application, vous devez vous même les supprimer grâce au bouton
        ci-dessous. Sinon, appuyez sur supprimer le compte.
      </p>
      <v-row>
        <v-col>
          <v-btn
            v-if="$auth.user.account.pictos.length > 0"
            class="shrink mx-auto"
            @click="deletePictos"
          >
            Supprimer mes pictos
          </v-btn>
          <v-btn
            v-if="$auth.user.account.pictos.length === 0"
            disabled
            class="shrink"
          >
            Vous n'avez aucun picto
          </v-btn>
        </v-col>
        <v-col>
          <v-btn class="shrink" @click="openDeleteUserModal">
            Supprimer le compte
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <DeleteUserConfirmation />
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  mounted () {
    this.$auth.fetchUser()
  },

  methods: {
    openDeleteUserModal () {
      this.$store.commit('global/SET_USER_DELETE_MODAL', true)
    },

    deletePictos () {
      this.$store.dispatch('picto/deletePictos')
      this.$auth.fetchUser()
    }
  }
}
</script>
