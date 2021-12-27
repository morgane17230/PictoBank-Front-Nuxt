<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      absolute
    >
      <span v-if="error.length > 0" class="cyan--text">{{ error }}</span>
      <span v-if="validation.length > 0" class="cyan--text">{{ validation }}</span>
    </v-snackbar>
    <v-card flat class="d-flex flex-wrap">
      <v-btn depressed color="transparent" @click="closeDialog">
        <v-icon color="cyan">
          mdi-close
        </v-icon>
      </v-btn>

      <v-card flat class="col-xs-12 col-sm-12 col-md-6 col-lg-12 col-xl-12 px-3">
        <v-form ref="formaAdd" v-model="valid" lazy-validation>
          <v-card-title>
            Inscription
          </v-card-title>
          <v-card-text>
            <v-text-field
              name="lastname"
              :rules="nameRules"
              label="Nom"
              color="cyan"
              required
              :value="lastname"
              @change="lastnameChange"
            />
            <v-text-field
              :rules="nameRules"
              name="firstname"
              label="Prénom"
              color="cyan"
              required
              :value="firstname"
              @change="firstnameChange"
            />
            <v-text-field
              :rules="nameRules"
              type="text"
              name="username"
              label="Intitulé du compte"
              color="cyan"
              required
              :value="username"
              @change="usernameChange"
            />
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
            <v-btn color="cyan" text @click.stop="addUser">
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
      lastname: state => state.user.lastname,
      firstname: state => state.user.firstname,
      email: state => state.user.email,
      username: state => state.user.username,
      password: state => state.user.password,
      loggedIn: state => state.auth.loggedIn,
      validation: state => state.global.validation,
      error: state => state.global.error
    })
  },
  methods: {
    ...mapMutations({
      lastnameChange: 'user/SET_LASTNAME',
      firstnameChange: 'user/SET_FIRSTNAME',
      usernameChange: 'user/SET_USERNAME',
      emailChange: 'user/SET_EMAIL',
      passwordChange: 'user/SET_PASSWORD'
    }),

    addUser () {
      if (this.$refs.formaAdd.validate()) {
        this.$store.dispatch('user/addUser')
        this.dialog = false
      }
      setTimeout(() => this.$router.push({ path: '/' }), 5000)
    },

    closeDialog () {
      this.dialog = false
      this.$router.push('/')
    }
  }
}
</script>
