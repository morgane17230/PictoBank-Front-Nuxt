import axios from 'axios'

const actions = {
  getCategories ({ commit }) {
    axios
      .get('http://localhost:5000/category')
      .then(response => commit('SET_CATEGORIES', response.data))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },

  getCategory ({ commit }, payload) {
    axios
      .get(`http://localhost:5000/category/${payload}`)
      .then(response =>
        commit('picto/SET_PICTOS', response.data.pictos, { root: true })
      )
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },

  addCategory () {
    const { name } = this.state.category
    axios
      .post('http://localhost:5000/category', {
        name
      })
      .then((response) => {
        this.$notifier.showSnackbar({
          validation: response.data.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  }
}
export default actions
