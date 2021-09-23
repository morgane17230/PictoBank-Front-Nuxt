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
    this.state.picto.uploadedFiles.forEach((selectedFile) => {
      const formData = new FormData()
      const blob = selectedFile
      formData.append('path', blob)

      axios
        .post('http://localhost:5000/addPictos', formData)
        .then(response => response.data)
        .catch((error) => {
          commit('SET_ERROR', error.response)
        })
    })
  },

  deletePicto ({ commit }, payload) {
    axios
      .delete(`http://localhost:5000/deletePicto/${payload}`)
      .then(response => commit('DEL_PICTOS', response.data))
      .catch((error) => {
        commit('SET_ERROR', error.response)
      })
  },

  downloadPicto ({ commit }, payload) {
    axios
      .get(`http://localhost:5000/getPicto/${payload}/download`)
      .then((response) => {
        const link = document.createElement('a')
        link.href = response.data
        link.download = `${response.data}`
        link.click()
      })
      .catch((error) => {
        commit('SET_ERROR', error.response)
      })
  },
  searchPictos ({ commit }, payload) {
    axios
      .get(`http://localhost:5000/getPictos/search/${payload}`)
      .then((response) => {
        commit('SET_PICTOS', response.data)
      })
      .catch((error) => {
        commit('SET_ERROR', error.response)
      })
  }

}

export default actions
