<template>
  <v-dialog v-model="$route.query.id" persistent max-width="500px">
    <v-card flat>
      <v-toolbar color="cyan darken-3" dark>
        <v-toolbar-title>Changement de mot de passe</v-toolbar-title>
        <v-spacer />
        <v-btn depressed color="transparent" @click="closeResetPasswordModal">
          <v-icon>
            {{ svgClose }}
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card flat>
        <v-form
          ref="forma"
          v-model="valid"
          lazy-validation
          @submit.prevent="changePassword"
        >
          <v-card-text>
            <v-text-field
              :append-icon="show ? svgEye : svgEyeOff"
              :rules="[passwordRules.required, passwordRules.min]"
              :type="show ? 'text' : 'password'"
              color="cyan darken-3"
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
              color="cyan darken-3"
              name="passwordConfirm"
              label="Retaper le mot de passe"
              :value="passwordConfirm"
            />
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="cyan darken-3" text type="submit">
              Valider
            </v-btn>
            <v-btn color="cyan darken-3" text @click="closeResetPasswordModal">
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
import { mdiClose, mdiEye, mdiEyeOff } from '@mdi/js'
export default {
  auth: 'guest',
  data () {
    return {
      svgClose: mdiClose,
      svgEye: mdiEye,
      svgEyeOff: mdiEyeOff,
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

  created () {
    this.$store.commit('user/SET_ID', this.$route.query.id)
  },

  methods: {
    ...mapMutations({
      passwordChange: 'user/SET_PASSWORD'
    }),

    closeResetPasswordModal () {
      this.$router.push('/')
    },

    changePassword () {
      if (this.$refs.forma.validate()) {
        this.$store.dispatch('user/updateUser')
        this.$router.push('/')
      }
    }
  }
}
</script>
