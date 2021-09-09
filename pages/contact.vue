<template>
  <v-container>
    <v-row>
      <h1 class="display-1 mx-auto">
        Contact
      </h1>
    </v-row>
    <v-container>
      <v-row>
        <v-col
          class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
        >
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              label="Nom"
              color="cyan"
              required
            />

            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              label="Prénom"
              color="cyan"
              required
            />

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              color="cyan"
              required
            />

            <v-textarea
              filled
              name="input-7-4"
              label="Votre message"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
              color="cyan"
            />

            <v-btn
              :disabled="!valid"
              color="cyan"
              class="mr-4"
              @click="validate"
            >
              Valider
            </v-btn>

            <v-btn
              color="cyan"
              class="mr-4"
              @click="reset"
            >
              Réinitialiser
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    lastname: '',
    firstname: '',
    email: '',
    nameRules: [
      v => !!v || 'Le champs est requis'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    checkbox: false
  }),

  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>
