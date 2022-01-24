<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
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
          <v-btn color="cyan" text to="/register">
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
      dialog: true,
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
      loggedIn: state => state.auth.loggedIn
    })
  },

  methods: {
    ...mapMutations({
      emailChange: 'user/SET_EMAIL'
    }),

    resetPassword () {
      if (this.$refs.forma.validate()) {
        this.$store.dispatch('user/resetPassword')
        this.dialog = false
      }
      setTimeout(() => this.$router.push({ path: '/' }), 2000)
    }
  }
}
</script>
