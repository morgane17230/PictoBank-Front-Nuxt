<template>
  <v-dialog v-model="registerUserModal" persistent max-width="500px">
    <v-card flat>
      <v-toolbar color="cyan darken-3" dark>
        <v-toolbar-title>Inscription</v-toolbar-title>
        <v-spacer />
        <v-btn depressed color="transparent" @click="closeRegisterUserModal">
          <v-icon>
            {{ svgClose }}
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card
        flat
        class="col-xs-12 col-sm-12 col-md-6 col-lg-12 col-xl-12 px-3"
      >
        <v-form
          ref="formaAdd"
          v-model="valid"
          lazy-validation
          @submit.prevent="addUser"
        >
          <v-card-text>
            <v-switch
              v-model="switch1"
              name="account"
              color="cyan darken-3"
              required
              :value="isOrganization"
              :label="
                switch1
                  ? 'Je représente un établissement'
                  : 'Je suis un particulier'
              "
              @change="isOrganizationChange"
            />
            <v-text-field
              name="lastname"
              :rules="nameRules"
              label="Nom"
              color="cyan darken-3"
              required
              :value="lastname"
              @change="lastnameChange"
            />
            <v-text-field
              :rules="nameRules"
              name="firstname"
              label="Prénom"
              color="cyan darken-3"
              required
              :value="firstname"
              @change="firstnameChange"
            />
            <v-text-field
              :rules="nameRules"
              type="text"
              name="name"
              label="Intitulé du compte"
              color="cyan darken-3"
              required
              :value="name"
              @change="nameChange"
            />
            <v-text-field
              type="email"
              :rules="emailRules"
              name="email"
              label="E-mail"
              color="cyan darken-3"
              required
              :value="email"
              @change="emailChange"
            />
            <v-text-field
              :append-icon="show ? svgEye : svgEyeOff"
              :rules="[passwordRules.required, passwordRules.min]"
              :type="show ? 'text' : 'password'"
              color="cyan darken-3"
              name="password"
              label="Mot de passe"
              hint="Minimum 8 caractères"
              counter
              autocomplete
              :value="password"
              @click:append="show = !show"
              @change="passwordChange"
            />
            <v-text-field
              :rules="[
                passwordConfirmRules.required,
                passwordConfirmRules.match,
              ]"
              type="password"
              color="cyan darken-3"
              name="passwordConfirm"
              label="Retaper le mot de passe"
              autocomplete
              :value="passwordConfirm"
            />
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              color="cyan darken-3"
              outlined
              small
              @click="closeRegisterUserModal"
            >
              Annuler
            </v-btn><v-btn
              color="cyan darken-3"
              small
              class="white--text"
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
  auth: 'guest',
  data () {
    return {
      show: false,
      valid: false,
      switch1: false,
      svgClose: mdiClose,
      svgEye: mdiEye,
      svgEyeOff: mdiEyeOff,
      passwordConfirm: '',
      nameRules: [v => !!v || 'Le champs est requis', v => (v.split(' ').length <= 1) ||
    'Aucun espace autorisé (utiliser -, /  ou _ )'],
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
      name: state => state.user.name,
      password: state => state.user.password,
      isOrganization: state => state.user.isOrganization,
      registerUserModal: state => state.global.registerUserModal
    })
  },
  methods: {
    ...mapMutations({
      lastnameChange: 'user/SET_LASTNAME',
      firstnameChange: 'user/SET_FIRSTNAME',
      nameChange: 'user/SET_NAME',
      emailChange: 'user/SET_EMAIL',
      passwordChange: 'user/SET_PASSWORD',
      isOrganizationChange: 'user/SET_ISORGANIZATION'
    }),

    closeRegisterUserModal () {
      this.$store.commit('global/SET_USER_REGISTER_MODAL', false)
    },

    addUser () {
      if (this.$refs.formaAdd.validate()) {
        this.$store.dispatch('user/addUser', this.switch1)
      }
      setTimeout(() => {
        this.$store.commit('global/SET_USER_REGISTER_MODAL', false)
      }, 1000)
    }
  }
}
</script>
