<template>
  <v-dialog v-model="resetPasswordConfirmation" max-width="500px" persistent>
    <v-card>
      <v-form ref="forma" v-model="valid" lazy-validation @submit.prevent="resetPassword">
        <v-card-title>
          Réinitialiser le mot de passe
        </v-card-title>
        <v-card-text>
          <v-text-field
            type="email"
            :rules="emailRules"
            name="email"
            label="E-mail"
            color="cyan"
            required
            :value="email"
            @change="emailChange"
          />
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="cyan" text type="submit">
            Valider
          </v-btn>
          <v-btn color="cyan" text @click="closeResetPasswordConfirmation">
            Annuler
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  auth: 'guest',
  data () {
    return {
      valid: false,
      emailRules: [
        v => !!v || 'Un email est requis',
        v => /.+@.+/.test(v) || "L'email doit être valide"
      ]
    }
  },

  computed: {
    ...mapState({
      email: state => state.user.email,
      loggedIn: state => state.auth.loggedIn,
      resetPasswordConfirmation: state => state.global.resetPasswordConfirmation
    })
  },

  methods: {
    ...mapMutations({
      emailChange: 'user/SET_EMAIL'
    }),

    closeResetPasswordConfirmation () {
      this.$store.commit('global/SET_RESET_PASSWORD_CONFIRMATION', false)
    },

    resetPassword () {
      if (this.$refs.forma.validate()) {
        this.$store.dispatch('user/resetPassword')
      }
      setTimeout(() => {
        this.$store.commit('global/SET_RESET_PASSWORD_CONFIRMATION', false)
      }, 2000)
    }
  }
}
</script>
