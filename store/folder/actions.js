import axios from 'axios'

const actions = {
  addFolder ({ commit }) {
    const { foldername, photo } = this.state.folder
    const { id } = this.state.auth.user
    const formData = new FormData()

    formData.append('path', photo)
    formData.append('foldername', foldername)
    formData.append('user_id', id)

    axios
      .post('http://localhost:5000/addFolder', formData)
      .then(response => commit('SET_VALIDATION', response.data.validation))
      .catch((error) => {
        commit('SET_ERROR', error.response)
      })
  }
}

export default actions
