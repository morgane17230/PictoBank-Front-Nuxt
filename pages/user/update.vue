<template>
  <v-row justify="center" align="center">
    <v-col class="col-sm-12 col-md-6 mt-2">
      <div class="text-h4 cyan--text">
        Modifier le profil
      </div>

      <v-form ref="forma" v-model="valid" class="mt-5">
        <v-text-field
          type="text"
          name="lastname"
          label="Nom"
          color="cyan"
          :value="$auth.user.organization.lastname"
          @change="lastnameChange"
        />
        <v-text-field
          type="text"
          name="firstname"
          label="Prénom"
          color="cyan"
          :value="$auth.user.organization.firstname"
          @change="firstnameChange"
        />
        <v-text-field
          type="text"
          name="name"
          color="cyan"
          label="Intitulé du compte"
          :value="$auth.user.organization.name"
          @change="nameChange"
        />
        <v-text-field
          type="email"
          name="email"
          label="E-mail"
          color="cyan"
          :value="$auth.user.organization.email"
          @change="emailChange"
        />
        <v-text-field
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[passwordRules.min]"
          :type="show1 ? 'text' : 'password'"
          color="cyan"
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
          color="cyan"
          name="teamPassword"
          label="Mot de passe de l'équipe"
          hint="Minimum 8 caractères"
          counter
          :value="teamPassword"
          @click:append="show2 = !show2"
          @change="teamPasswordChange"
        />
        <div class="justify-center">
          <v-btn type="submit" color="cyan" text @click="updateUser">
            Valider
          </v-btn>
        </div>
      </v-form>
      <v-alert
        class="d-flex flex-column text-center mt-5"
        border="top"
        color="red lighten-2"
        dark
      >
        <h2>
          Suppression du compte
        </h2>
        <p>
          Attention, le suppression de votre compte n'entraînera pas la
          suppression de vos pictogrammes. Si vous ne souhaitez pas les laisser
          sur l'application, vous devez vous même les supprimer grâce au bouton
          ci-dessous. Sinon, appuyez sur supprimer le compte.
        </p>
        <v-row>
          <v-col>
            <v-btn
              v-if="$auth.user.organization.pictos.length > 0"
              class="shrink mx-auto"
              @click="deletePictos"
            >
              Supprimer mes pictos
            </v-btn>
            <v-btn
              v-if="$auth.user.organization.pictos.length === 0"
              disabled
              class="shrink"
            >
              Vous n'avez aucun picto
            </v-btn>
          </v-col>
          <v-col>
            <v-btn class="shrink" @click="dialog = true">
              Supprimer le compte
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-col>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Suppression du compte
        </v-card-title>
        <v-card-text>
          Cette action est irréversible, souhaitez-vous vraiment supprimer votre
          compte ?
        </v-card-text>
        <v-card-actions>
          <v-btn color="dark" outlined @click="dialog = false">
            Annuler
          </v-btn>
          <v-btn color="cyan" text @click="deleteUser">
            Valider
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  middleware: 'auth',
  data () {
    return {
      dialog: false,
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
    },

    deletePictos () {
      this.$store.dispatch('picto/deletePictos')
    },

    deleteUser () {
      this.$store.dispatch('user/deleteUser')
      this.dialog = false
      setTimeout(() => {
        this.$auth.logout('local')
      }, 1000)
    }
  }
}
</script>
