import axios from 'axios'

const actions = {
  getCategories ({ commit }) {
    axios
      .get('http://localhost:5000/category')
      .then(response => commit('SET_CATEGORIES', response.data))
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.data.validation,
          snackbar: true
        })
      })
  },

  getCategory ({ commit }, payload) {
    axios
      .get(`http://localhost:5000/category/${payload}`)
      .then(response =>
        commit('picto/SET_PICTOS', response.data.pictos, { root: true })
      )
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.data.validation,
          snackbar: true
        })
      })
  },

  addCategory ({ commit }) {
    const { name } = this.state.category
    axios
      .post('http://localhost:5000/category', {
        name
      })
      .then((response) => {
        commit('ADD_CATEGORY', response.data.category)
        this.$notifier.showSnackbar({
          validation: response.data.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.data.validation,
          snackbar: true
        })
      })
  }
}
export default actions
