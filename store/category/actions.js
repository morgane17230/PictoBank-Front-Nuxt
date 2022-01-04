import axios from 'axios'

const actions = {
  getCategories ({ commit }) {
    axios
      .get('http://localhost:5000/category')
      .then(response => commit('SET_CATEGORIES', response.data))
      .catch((error) => {
        commit('global/SET_ERROR', error.response.data, { root: true })
      })
  },

  getCategory ({ commit }, payload) {
    axios
      .get(`http://localhost:5000/category/${payload}`)
      .then(response =>
        commit('picto/SET_PICTOS', response.data.pictos, { root: true })
      )
      .catch((error) => {
        commit('global/SET_ERROR', error.response.data, { root: true })
      })
  },

  addCategory ({ commit }) {
    const { name } = this.state.category
    axios
      .post('http://localhost:5000/category', {
        name
      })
      .then((response) => {
        commit('global/SET_VALIDATION', response.data.validation, {
          root: true
        })
      })
      .catch((error) => {
        commit('global/SET_ERROR', error.response.data.error, { root: true })
      })
  }
}
export default actions
