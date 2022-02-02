<template>
  <v-dialog v-model="updateUserModal" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Modifier le profil</span>
        <v-spacer />
        <v-btn depressed color="transparent">
          <v-icon color="cyan" @click="closeUpdateUserModal">
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <UpdateUser />
        <DeleteUser />
      </v-card-text>
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
      this.$store.commit('global/SET_USER_UDATE_MODAL', false)
    }
  }
}
</script>
