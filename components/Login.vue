<template>
  <v-dialog v-model="loginUserModal" persistent max-width="500px">
    <v-card flat>
      <v-toolbar color="cyan darken-3" dark>
        <v-toolbar-title>Connexion</v-toolbar-title>
        <v-spacer />
        <v-btn depressed color="transparent" @click="closeLoginUserModal">
          <v-icon>
            {{ svgClose }}
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card flat>
        <v-form
          ref="formaLog"
          v-model="valid"
          lazy-validation
          @submit.prevent="loginUser"
        >
          <v-card-text>
            <v-text-field
              type="text"
              :rules="nameRules"
              label="Nom d'utilisateur"
              name="username"
              color="cyan darken-3"
              required
              :value="username"
              @change="userNameChange"
            />
            <v-text-field
              :rules="[passwordRules.required]"
              :append-icon="show ? svgEye : svgEyeOff"
              color="cyan darken-3"
              name="password"
              label="Mot de passe"
              autocomplete="current-password"
              :type="show ? 'text' : 'password'"
              :value="password"
              @click:append="show = !show"
              @change="passwordChange"
            />
            <a type="button" @click="openResetPasswordModal">
              <small>Mot de passe oublié ?</small>
            </a>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              color="cyan darken-3"
              outlined
              small
              @click="closeLoginUserModal"
            >
              Annuler
            </v-btn><v-btn
              color="cyan darken-3"
              class="white--text"
              small
              type="submit"
            >
              Valider
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { mdiClose, mdiEye, mdiEyeOff } from '@mdi/js'
export default {
  middleware: 'auth',
  auth: 'guest',
  data () {
    return {
      valid: false,
      show: false,
      svgClose: mdiClose,
      svgEye: mdiEye,
      svgEyeOff: mdiEyeOff,
      nameRules: [v => !!v || 'Le champs est requis'],
      passwordRules: {
        required: value => !!value || 'Le champs est requis.'
      }
    }
  },

  computed: {
    ...mapState({
      username: state => state.user.username,
      password: state => state.user.password,
      loginUserModal: state => state.global.loginUserModal
    })
  },

  methods: {
    ...mapMutations({
      userNameChange: 'user/SET_USERNAME',
      passwordChange: 'user/SET_PASSWORD'
    }),

    closeLoginUserModal () {
      this.$store.commit('global/SET_USER_LOGIN_MODAL', false)
    },

    openResetPasswordModal () {
      this.$store.commit('global/SET_RESET_PASSWORD_CONFIRMATION', true)
    },

    loginUser () {
      if (this.$refs.formaLog.validate()) {
        this.$store.dispatch('user/login')
        this.$store.commit('global/SET_USER_LOGIN_MODAL', false)
      }
    }
  }
}
</script>
