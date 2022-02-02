<template>
  <v-dialog v-model="resetPasswordModal" persistent max-width="500px">
    <v-card flat class="d-flex flex-wrap">
      <v-btn depressed color="transparent">
        <v-icon color="cyan" @click="closeResetPasswordModal">
          mdi-close
        </v-icon>
      </v-btn>
      <v-card
        flat
        class="col-xs-12 col-sm-12 col-md-6 col-lg-12 col-xl-12 px-3"
      >
        <v-form ref="forma" v-model="valid" lazy-validation @submit.prevent="changePassword">
          <v-card-title>
            Changement de mot de passe
          </v-card-title>
          <v-card-text>
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required, passwordRules.min]"
              :type="show ? 'text' : 'password'"
              color="cyan"
              name="password"
              label="Mot de passe"
              hint="Minimum 8 caractères"
              counter
              :value="password"
              @click:append="show = !show"
              @change="passwordChange"
            />
            <v-text-field
              :rules="[
                passwordConfirmRules.required,
                passwordConfirmRules.match
              ]"
              type="password"
              color="cyan"
              name="passwordConfirm"
              label="Retaper le mot de passe"
              :value="passwordConfirm"
            />
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="cyan" text type="submit">
              Valider
            </v-btn>
            <v-btn color="cyan" text>
              Annuler
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  auth: 'guest',
  data () {
    return {
      show: false,
      valid: false,
      passwordConfirm: '',
      nameRules: [v => !!v || 'Le champs est requis'],
      passwordRules: {
        required: value => !!value || 'Requis.',
        min: v => v.length >= 8
      },
      passwordConfirmRules: {
        required: value => !!value || 'Requis.',
        match: value =>
          value === this.password || 'Les mots de passe ne correspondent pas'
      }
    }
  },

  computed: {
    ...mapState({
      password: state => state.user.password,
      loggedIn: state => state.auth.loggedIn,
      resetPasswordModal: state => state.global.resetPasswordModal
    })
  },

  methods: {
    ...mapMutations({
      passwordChange: 'user/SET_PASSWORD'
    }),

    closeResetPasswordModal () {
      this.$store.commit('global/SET_RESET_PASSWORD_MODAL', false)
    },

    changePassword () {
      if (this.$refs.forma.validate()) {
        this.$store.dispatch('user/updateUser', Number(this.$route.query.qu))
      }
      setTimeout(() => {
        this.$store.commit('global/SET_RESET_PASSWORD_MODAL', false)
      }, 2000)
    }
  }
}
</script>
