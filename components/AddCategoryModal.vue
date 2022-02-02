<template>
  <v-dialog v-model="addCategoryModal" persistent max-width="500px">
    <v-card flat class="pa-5">
      <v-row align="center">
        <v-btn depressed color="transparent" @click="closeAddCategoryModal">
          <v-icon color="cyan">
            mdi-close
          </v-icon>
        </v-btn>
      </v-row>
      <v-card-title>
        Ajouter une catégorie
      </v-card-title>
      <v-card flat>
        <v-form ref="formaLog" v-model="valid" lazy-validation @submit.prevent="addCategory">
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
            <v-btn color="cyan" text type="submit">
              Valider
            </v-btn>
            <v-btn color="cyan" text @click="closeAddCategoryModal">
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
      show: false,
      valid: false,
      nameRules: [v => !!v || 'Le champs est requis']
    }
  },

  computed: {
    ...mapState({
      name: state => state.category.name,
      addCategoryModal: state => state.global.addCategoryModal
    })
  },

  methods: {
    ...mapMutations({
      categoryNameChange: 'category/SET_NAME'
    }),

    closeAddCategoryModal () {
      this.$store.commit('global/SET_ADD_CATEGORY_MODAL', false)
    },

    addCategory () {
      if (this.$refs.formaLog.validate()) {
        this.$store.dispatch('category/addCategory')
        setTimeout(() => {
          this.$store.commit('global/SET_ADD_CATEGORY_MODAL', false)
        }, 1000)
      }
    }
  }
}
</script>
