<template>
  <v-form ref="forma" v-model="valid" lazy-validation class="mt-5" @submit.prevent="updateUser">
    <v-text-field
      type="text"
      name="lastname"
      label="Nom"
      color="cyan darken-3"
      :value="$auth.user.account.lastname"
      @change="lastnameChange"
    />
    <v-text-field
      type="text"
      name="firstname"
      label="Prénom"
      color="cyan darken-3"
      :value="$auth.user.account.firstname"
      @change="firstnameChange"
    />
    <v-text-field
      type="text"
      name="name"
      color="cyan darken-3"
      label="Intitulé du compte"
      :value="$auth.user.account.name"
      @change="nameChange"
    />
    <v-text-field
      type="email"
      name="email"
      label="E-mail"
      color="cyan darken-3"
      :value="$auth.user.account.email"
      @change="emailChange"
    />
    <v-text-field
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[passwordRules.min]"
      :type="show1 ? 'text' : 'password'"
      color="cyan darken-3"
      name="password"
      autocomplete="new-password"
      label="Mot de passe administrateur"
      hint="Minimum 8 caractères"
      counter
      :value="password"
      @click:append="show1 = !show1"
      @change="passwordChange"
    />
    <v-text-field
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[passwordRules.min]"
      :type="show2 ? 'text' : 'password'"
      color="cyan darken-3"
      name="teamPassword"
      label="Mot de passe de l'équipe"
      hint="Minimum 8 caractères"
      counter
      :value="teamPassword"
      @click:append="show2 = !show2"
      @change="teamPasswordChange"
    />
    <div class="py-5">
      <v-btn type="submit" block color="cyan darken-3">
        Valider
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  middleware: 'auth',
  data () {
    return {
      show1: false,
      show2: false,
      valid: false,
      passwordConfirm: '',
      passwordRules: {
        min: v => v.length >= 8
      },
      emailRules: [v => /.+@.+/.test(v) || "L'email doit être valide"]
    }
  },
  computed: {
    ...mapState({
      lastname: state => state.user.lastname,
      firstname: state => state.user.firstname,
      name: state => state.user.name,
      email: state => state.user.email,
      password: state => state.user.password,
      teamPassword: state => state.user.teamPassword,
      loggedIn: state => state.auth.loggedIn
    })
  },

  mounted () {
    this.$auth.fetchUser()
  },

  methods: {
    ...mapMutations({
      lastnameChange: 'user/SET_LASTNAME',
      firstnameChange: 'user/SET_FIRSTNAME',
      nameChange: 'user/SET_NAME',
      emailChange: 'user/SET_EMAIL',
      passwordChange: 'user/SET_PASSWORD',
      teamPasswordChange: 'user/SET_TEAM_PASSWORD'
    }),

    updateUser () {
      this.$store.dispatch('user/updateUser')
      setTimeout(() => {
        this.$store.commit('global/SET_USER_UPDATE_MODAL', false)
      }, 1000)
    }
  }
}
</script>
