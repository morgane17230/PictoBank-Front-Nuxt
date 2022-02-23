<template>
  <v-dialog v-model="updateUserModal" persistent max-width="600px">
    <v-card flat>
      <v-toolbar color="cyan darken-3" dark>
        <v-toolbar-title>Gestion du profil</v-toolbar-title>
        <v-spacer />
        <v-btn depressed color="transparent" @click="closeUpdateUserModal">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card flat>
        <v-card-text>
          <UpdateUser />
          <DeleteUser />
        </v-card-text>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      updateUserModal: state => state.global.updateUserModal
    })
  },

  methods: {
    closeUpdateUserModal () {
      this.$store.commit('global/SET_USER_UPDATE_MODAL', false)
    }
  }
}
</script>
