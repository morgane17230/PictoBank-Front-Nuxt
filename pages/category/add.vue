<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card flat class="pa-5">
      <v-row align="center">
        <v-btn depressed color="transparent" @click="closeDialog">
          <v-icon color="cyan">
            mdi-close
          </v-icon>
        </v-btn>
        <v-col class="text-right">
          <small v-if="error" class="red--text font-weight-black">{{ error }}</small>
          <small v-if="validation" class="green--text font-weight-black">{{ validation }}</small>
        </v-col>
      </v-row>
      <v-card-title>
        Ajouter une catégorie
      </v-card-title>
      <v-card flat>
        <v-form ref="formaLog" v-model="valid" lazy-validation>
          <v-card-text>
            <v-text-field
              type="name"
              label="Intitulé de la catégorie"
              name="name"
              color="cyan"
              required
              :rules="nameRules"
              :value="name"
              @change="categoryNameChange"
            />
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="cyan" text @click="addCategory">
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
      nameRules: [v => !!v || 'Le champs est requis']
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
        setTimeout(() => {
          this.$store.commit('global/SET_VALIDATION', '', { root: true })
          this.$store.commit('global/SET_ERROR', '', { root: true })
          this.$router.push({ path: '/pictos/search' })
        }, 3000)
      }
    },

    closeDialog () {
      this.$router.push('/pictos/search')
    }
  }
}
</script>
