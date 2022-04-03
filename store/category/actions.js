const actions = {
  getCategories ({ commit }) {
    this.$axios
      .$get('/category')
      .then(response => commit('SET_CATEGORIES', response))
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.data.message,
          snackbar: true
        })
      })
  },

  addCategory ({ commit }) {
    const { name } = this.state.category
    this.$axios
      .$post('/category', {
        name
      })
      .then((response) => {
        commit('ADD_CATEGORY', response.category)
        this.$notifier.showSnackbar({
          validation: response.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.data.message,
          snackbar: true
        })
      })
  }
}
export default actions
