<template>
  <v-dialog v-model="addCategoryModal" persistent max-width="500px">
    <v-card flat>
      <v-toolbar color="cyan darken-3" dark>
        <v-toolbar-title>Ajouter une nouvelle catégorie</v-toolbar-title>
        <v-spacer />
        <v-btn depressed color="transparent" @click="closeAddCategoryModal">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card flat>
        <v-form
          ref="formaLog"
          v-model="valid"
          lazy-validation
          @submit.prevent="addCategory"
        >
          <v-card-text>
            <v-text-field
              type="name"
              label="Intitulé de la catégorie"
              name="name"
              color="cyan darken-3"
              autofocus
              required
              :rules="nameRules"
              :value="name"
              @change="categoryNameChange"
            />
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              color="cyan darken-3"
              small
              outlined
              @click="closeAddCategoryModal"
            >
              Annuler
            </v-btn><v-btn
              color="cyan darken-3"
              small
              class="white--text"
              type="submit"
            >
              Valider
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
        this.$store.commit('global/SET_ADD_CATEGORY_MODAL', false)
      }
    }
  }
}
</script>
