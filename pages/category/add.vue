<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-snackbar v-model="snackbar" :timeout="timeout" absolute>
      <span v-if="error.length > 0" class="cyan--text">{{ error }}</span>
      <span v-if="validation.length > 0" class="cyan--text">{{
        validation
      }}</span>
    </v-snackbar>
    <v-card flat class="pa-5">
      <v-btn depressed color="transparent" @click="closeDialog">
        <v-icon color="cyan">
          mdi-close
        </v-icon>
      </v-btn>
      <v-card flat>
        <v-form ref="formaLog" v-model="valid" lazy-validation>
          <v-card-title>
            Ajouter une catégorie
          </v-card-title>
          <v-card-text>
            <v-text-field
              type="name"
              label="Intitulé de la catégorie"
              name="name"
              color="cyan"
              required
              :value="name"
              @change="categoryNameChange"
            />
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="cyan" text @click.stop="addCategory">
              Valider
            </v-btn>
            <v-btn color="cyan" text @click="closeDialog">
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
export default {
  middleware: 'auth',
  data () {
    return {
      dialog: true,
      show: false,
      valid: false,
      timeout: 2000,
      snackbar: false
    }
  },

  computed: {
    ...mapState({
      name: state => state.category.name,
      validation: state => state.global.validation,
      error: state => state.global.error
    })
  },

  methods: {
    ...mapMutations({
      categoryNameChange: 'category/SET_NAME'
    }),

    addCategory () {
      if (this.$refs.formaLog.validate()) {
        this.$store.dispatch('category/addCategory')
        this.dialog = false
        this.$router.push('/pictos/search')
      }
    },

    closeDialog () {
      this.dialog = false
      this.$router.push('/pictos/search')
    }
  }
}
</script>
