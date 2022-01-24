<template>
  <v-container>
    <v-row justify="center">
      <h1 class="display-1 my-5">
        Contact
      </h1>
    </v-row>
    <v-row justify="center">
      <v-col class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="sendContact">
          <v-text-field
            :rules="nameRules"
            name="lastname"
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
            :rules="emailRules"
            name="email"
            label="E-mail"
            color="cyan"
            :value="email"
            required
            @change="emailChange"
          />

          <v-textarea
            filled
            name="message"
            label="Votre message"
            :value="message"
            color="cyan"
            @change="messageChange"
          />
          <div class="d-flex justify-center">
            <v-btn
              :disabled="!valid"
              color="cyan"
              class="mr-4"
              text
              type="submit"
            >
              Valider
            </v-btn>
            <v-btn color="cyan" text to="/">
              Annuler
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data: () => ({
    valid: true,
    timeout: 1000,
    nameRules: [v => !!v || 'Le champs est requis'],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    checkbox: false
  }),

  computed: {
    ...mapState({
      lastname: state => state.user.lastname,
      firstname: state => state.user.firstname,
      email: state => state.user.email,
      message: state => state.user.message
    })
  },

  methods: {
    ...mapMutations({
      lastnameChange: 'user/SET_LASTNAME',
      firstnameChange: 'user/SET_FIRSTNAME',
      emailChange: 'user/SET_EMAIL',
      messageChange: 'user/SET_MESSAGE'
    }),

    sendContact () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('user/sendContact')
        setTimeout(() => {
          this.$router.push({ path: '/' })
          this.$refs.form.reset()
        }, 1000)
      }
    }
  }
}
</script>
