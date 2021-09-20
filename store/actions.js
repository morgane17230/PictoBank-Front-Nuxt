import axios from 'axios'

const actions = {
  getPictos ({ commit }) {
    axios
      .get('http://localhost:5000/getPictos')
      .then(response => commit('SET_PICTOS', response.data))
      .catch((error) => {
        commit('SET_ERROR', error.response)
      })
  },

  addPictos ({ commit }) {
    this.state.uploadedFiles.forEach((selectedFile) => {
      const picto = {
        name: selectedFile.name,
        size: selectedFile.size,
        mimetype: selectedFile.type,
        path: selectedFile.url,
        data: selectedFile
      }
      axios
        .post('http://localhost:5000/addPictos', picto)
        .then(response => response.data)
        .catch(
          (error) => {
            commit('SET_ERROR', error.response)
          }
        )
    })
  },

  async deletePicto ({ commit }, payload) {
    await axios
      .delete(`http://localhost:5000/deletePicto/${payload}`)
      .then(response => commit('DEL_PICTOS', response.data))
      .catch((error) => {
        commit('SET_ERROR', error.response)
      })
  }
}

export default actions
