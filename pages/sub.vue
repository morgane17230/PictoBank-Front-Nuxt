<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
    persistent
  >
    <v-card>
      <v-form v-model="valid">
        <v-card-title>
          Inscription
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            label="Nom"
            required
          />
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            label="Prénom"
            required
          />
          <v-text-field
            v-model="username"
            :rules="nameRules"
            label="Intitulé du compte"
            required
          />
          <v-text-field
            v-model="email"
            type="email"
            :rules="emailRules"
            label="E-mail"
            color="cyan"
            required
          />
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="show ? 'text' : 'password'"
            color="cyan"
            name="password"
            label="Mot de passe"
            hint="Minimum 8 caractères"
            counter
            @click:append="show = !show"
          />
          <v-text-field
            v-model="passwordConfirm"
            :rules="[passwordConfirmRules.required, passwordConfirmRules.match]"
            type="password"
            color="cyan"
            name="passwordConfirm"
            label="Retaper le mot de passe"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="cyan"
            text
          >
            Valider
          </v-btn>
          <v-btn
            color="cyan"
            text
            to="/"
          >
            Annuler
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: true,
      show: false,
      valid: false,
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      nameRules: [
        v => !!v || 'Le champs est requis'
      ],
      passwordRules: {
        required: value => !!value || 'Requis.',
        min: v => v.length >= 8 || 'Min 8 caractères',
        emailMatch: () => ('Ce mot de passe ne correspond pas à cet email')
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
  }
}
</script>
