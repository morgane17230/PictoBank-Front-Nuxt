import axios from 'axios'

const actions = {
  addFolder ({ commit }) {
    const formData = new FormData()
    const blob = this.state.path
    const foldername = this.state.foldername
    formData.append('foldername', foldername)
    formData.append('path', blob)

    axios
      .post('http://localhost:5000/addPictos', formData)
      .then(response => response.data)
      .catch((error) => {
        commit('SET_ERROR', error.response)
      })
  }
}

export default actions
