<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="350"
    >
      <template #activator="{ on, attrs }">
        <div class="px-2 py-4">
          <v-btn
            block
            color="cyan"
            outlined
            v-bind="attrs"
            v-on="on"
          >
            Modifier votre profil
          </v-btn>
        </div>
      </template>
      <v-card>
        <v-card-title class="text-h6">
          Modifier vos informations
        </v-card-title>
        <v-card-text>Vous allez recevoir un email contenant un lien qui vous permettra de modifier vos informations</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="cyan"
            text
            @click="dialog = false"
          >
            Annuler
          </v-btn>
          <v-btn
            color="cyan"
            text
            @click="updateUser"
          >
            Envoyer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  data () {
    return {
      dialog: false
    }
  },

  methods: {
    updateUser () {
      this.$store.dispatch('user/updateProfilMail')
    }
  }
}
</script>
