<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      absolute
    >
      <span v-if="error" class="cyan--text">{{ error }}</span>
      <span v-if="validation" class="cyan--text">{{ validation }}</span>
    </v-snackbar>
    <v-card flat class="pa-5">
      <v-btn depressed color="transparent" @click="closeDialog">
        <v-icon color="cyan">
          mdi-close
        </v-icon>
      </v-btn>
      <v-card flat>
        <v-form ref="formaLog" v-model="valid" lazy-validation>
          <v-card-title>
            Connexion
          </v-card-title>
          <v-card-text>
            <v-text-field
              type="username"
              :rules="nameRules"
              label="Nom d'utilisateur"
              name="username"
              color="cyan"
              required
              :value="username"
              @change="usernameChange"
            />
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required]"
              :type="show ? 'text' : 'password'"
              color="cyan"
              name="password"
              label="Mot de passe"
              hint="Minimum 8 caractères"
              :value="password"
              @click:append="show = !show"
              @change="passwordChange"
            />
            <NuxtLink to="/resetPassword">
              <small>Mot de passe oublié ?</small>
            </NuxtLink>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="cyan" text @click.stop="loginUser">
              Valider
            </v-btn>
            <v-btn color="cyan" text @click="closeDialog">
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
  middleware: 'auth',
  auth: 'guest',
  data () {
    return {
      dialog: true,
      show: false,
      valid: false,
      passwordConfirm: '',
      timeout: 2000,
      snackbar: false,
      nameRules: [v => !!v || 'Le champs est requis'],
      passwordRules: {
        required: value => !!value || 'Requis.',
        min: v => v.length >= 8
      },
      passwordConfirmRules: {
        required: value => !!value || 'Requis.',
        match: value =>
          value === this.password || 'Les mots de passe ne correspondent pas'
      },
      emailRules: [
        v => !!v || 'Un email est requis',
        v => /.+@.+/.test(v) || "L'email doit être valide"
      ]
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.username,
      password: state => state.user.password,
      loggedIn: state => state.auth.loggedIn,
      validation: state => state.global.validation,
      error: state => state.global.error
    })
  },
  methods: {
    ...mapMutations({
      usernameChange: 'user/SET_USERNAME',
      passwordChange: 'user/SET_PASSWORD'
    }),

    loginUser () {
      if (this.$refs.formaLog.validate()) {
        this.$store.dispatch('user/login')
        this.dialog = false
      }
    },

    closeDialog () {
      this.dialog = false
      this.$router.push('/')
    }
  }
}
</script>
