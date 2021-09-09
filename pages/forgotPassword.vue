<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
    persistent
  >
    <v-card>
      <v-form v-model="valid">
        <v-card-title>
          Réinitialiser le mot de passe
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="email"
            type="email"
            :rules="emailRules"
            label="E-mail"
            color="cyan"
            required
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
            to="/connexion"
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
