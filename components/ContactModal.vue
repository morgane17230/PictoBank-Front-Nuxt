<template>
  <v-dialog v-model="contactModal" persistent max-width="500px">
    <v-card flat>
      <v-toolbar color="cyan darken-3" dark>
        <v-toolbar-title>Contact</v-toolbar-title>
        <v-spacer />
        <v-btn depressed color="transparent" @click="closeContactModal">
          <v-icon>
            {{ svgClose }}
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="sendContact">
          <v-text-field
            :rules="nameRules"
            name="lastname"
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
            :rules="emailRules"
            name="email"
            label="E-mail"
            color="cyan darken-3"
            :value="email"
            required
            @change="emailChange"
          />

          <v-textarea
            filled
            name="message"
            label="Votre message"
            :value="message"
            color="cyan darken-3"
            @change="messageChange"
          />
          <div>
            <v-btn color="cyan darken-3" outlined @click="closeContactModal">
              Annuler
            </v-btn>
            <v-btn
              :disabled="!valid"
              color="cyan darken-3"
              class="mr-4"
              type="submit"
            >
              Valider
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { mdiClose } from '@mdi/js'
export default {
  data: () => ({
    valid: false,
    svgClose: mdiClose,
    nameRules: [v => !!v || 'Le champs est requis'],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]
  }),

  computed: {
    ...mapState({
      lastname: state => state.user.lastname,
      firstname: state => state.user.firstname,
      email: state => state.user.email,
      message: state => state.user.message,
      contactModal: state => state.global.contactModal
    })
  },

  methods: {
    ...mapMutations({
      lastnameChange: 'user/SET_LASTNAME',
      firstnameChange: 'user/SET_FIRSTNAME',
      emailChange: 'user/SET_EMAIL',
      messageChange: 'user/SET_MESSAGE'
    }),

    closeContactModal () {
      this.$store.commit('global/SET_CONTACT_MODAL', false)
    },

    sendContact () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('user/sendContact')
        setTimeout(() => {
          this.$store.commit('global/SET_CONTACT_MODAL', false)
          this.$refs.form.reset()
        }, 1000)
      }
    }
  }
}
</script>
