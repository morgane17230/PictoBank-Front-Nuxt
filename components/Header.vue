<template>
  <div>
    <v-app-bar fixed app>
      <v-toolbar-title hidden v-text="title" />
      <nuxt-picture
        legacy-format="png"
        class="mt-3"
        lazy-src="/pikto.webp"
        width="150px"
        src="/pikto.webp"
        alt="logo Pikto"
      />
      <v-spacer />
      <v-btn v-if="$auth.loggedIn" color="cyan darken-3" icon @click="logout">
        <v-icon>
          mdi-logout
        </v-icon>
      </v-btn>
      <div v-else>
        <v-btn color="cyan darken-3" aria-label="connexion" icon @click="openLoginUserModal">
          <v-icon size="30">
            mdi-account-circle
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
