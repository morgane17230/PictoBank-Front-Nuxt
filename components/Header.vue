<template>
  <div>
    <Toast />
    <v-app-bar fixed app>
      <v-toolbar-title hidden v-text="title" />
      <v-img lazy-src="/pikto.png" max-width="5rem" src="/pikto.png" />
      <v-spacer />
      <v-btn v-if="$auth.loggedIn" color="cyan" icon @click="logout">
        <v-icon>
          mdi-logout
        </v-icon>
      </v-btn>
      <div v-else>
        <v-btn color="cyan" icon @click="openRegisterUserModal">
          <v-icon>
            mdi-account-plus
          </v-icon>
        </v-btn>
        <v-btn color="cyan" icon @click="openLoginUserModal">
          <v-icon>
            mdi-login
          </v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <Login />
    <Register />
    <ResetPasswordModal />
    <ResetPasswordConfirmation />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      title: 'Pikto'
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },

  methods: {
    openLoginUserModal () {
      this.$store.commit('global/SET_USER_LOGIN_MODAL', true)
    },

    openRegisterUserModal () {
      this.$store.commit('global/SET_USER_REGISTER_MODAL', true)
    },

    generatePDF () {
      this.$store.dispatch('picto/generatePDF')
    },

    logout () {
      this.$auth.logout('local')
      this.$router.push('/')
    }
  }
}
</script>
