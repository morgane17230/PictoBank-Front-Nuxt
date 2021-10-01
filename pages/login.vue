
<template>
  <v-dialog
    v-model="dialog"
    persistent
  >
    <v-card
      flat
      class="d-flex flex-wrap"
    >
      <v-btn
        depressed
        color="transparent"
        @click="dialog = false"
      >
        <v-icon color cyan>
          mdi-close
        </v-icon>
      </v-btn>
      <v-card flat class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 px-3">
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
        >
          {{ validation }}

          <template #action="{ attrs }">
            <v-btn
              depressed
              color="transparent"
              v-bind="attrs"
              @click="snackbar = false"
            >
              <v-icon color="cyan">
                mdi-close
              </v-icon>
            </v-btn>
          </template>
        </v-snackbar>
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
            <NuxtLink to="/forgotPassword">
              <small>Mot de passe oublié ?</small>
            </NuxtLink>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="cyan"
              block
              text
              @click.stop="loginUser"
            >
              Valider
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>

      <v-card flat class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 px-3">
        <v-form ref="formaAdd" v-model="valid" lazy-validation>
          <v-card-title>
            Inscription
          </v-card-title>
          <v-card-text>
            <v-text-field
              name="lastname"
              :rules="nameRules"
              label="Nom"
              required
              :value="lastname"
              @change="lastnameChange"
            />
            <v-text-field
              :rules="nameRules"
              name="firstname"
              label="Prénom"
              required
              :value="firstname"
              @change="firstnameChange"
            />
            <v-text-field
              :rules="nameRules"
              type="text"
              name="username"
              label="Intitulé du compte"
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
              :rules="[passwordConfirmRules.required, passwordConfirmRules.match]"
              type="password"
              color="cyan"
              name="passwordConfirm"
              label="Retaper le mot de passe"
              :value="passwordConfirm"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="cyan"
              block
              text
              @click.stop="addUser"
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
export default {

  data () {
    return {
      dialog: true,
      show: false,
      valid: false,
      snackbar: false,
      timeout: 2000,
      passwordConfirm: '',
      nameRules: [
        v => !!v || 'Le champs est requis'
      ],
      passwordRules: {
        required: value => !!value || 'Requis.',
        min: v => v.length >= 8
      },
      passwordConfirmRules: {
        required: value => !!value || 'Requis.',
        match: value => value === this.password || 'Les mots de passe ne correspondent pas'
      },
      emailRules: [
        v => !!v || 'Un email est requis',
        v => /.+@.+/.test(v) || 'L\'email doit être valide'
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
      validation: state => state.user.validation
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
        this.snackbar = true
        this.dialog = false
      }
      setTimeout(() => this.$router.push({ path: '/' }), 5000)
    },

    loginUser () {
      if (this.$refs.formaLog.validate()) {
        this.$store.dispatch('user/login')
        this.dialog = false
      }
    }
  }

}
</script>
