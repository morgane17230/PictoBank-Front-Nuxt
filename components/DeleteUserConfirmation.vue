<template>
  <v-dialog v-model="deleteUserModal" persistent max-width="350">
    <v-card>
      <v-card-title class="text-h5">
        Suppression du compte
      </v-card-title>
      <v-card-text>
        Cette action est irréversible, souhaitez-vous vraiment supprimer votre
        compte ?
      </v-card-text>
      <v-card-actions>
        <v-btn color="dark" outlined @click="closeDeleteUserModal">
          Annuler
        </v-btn>
        <v-btn color="cyan darken-3" text @click="deleteUser">
          Valider
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'auth',

  computed: {
    ...mapState({
      deleteUserModal: state => state.global.deleteUserModal
    })
  },
  methods: {
    closeDeleteUserModal () {
      this.$store.commit('global/SET_USER_DELETE_MODAL', false)
    },

    deleteUser () {
      this.$store.commit('user/SET_EMAIL', this.email)
      this.$store.dispatch('user/deleteUser')
      this.$store.commit('global/SET_USER_DELETE_MODAL', false)
      this.$store.commit('global/SET_USER_UPDATE_MODAL', false)
      setTimeout(() => {
        this.$auth.logout('local')
      }, 1000)
    }
  }
}
</script>
