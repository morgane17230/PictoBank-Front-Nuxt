import axios from 'axios'

const actions = {
  getPictos ({ commit }) {
    axios
      .get('http://localhost:5000/picto')
      .then(response => commit('SET_PICTOS', response.data))
      .catch((error) => {
        commit('global/SET_ERROR', error.response.data, { root: true })
      })
  },

  generatePDF ({ commit }) {
    const { collectedPictos } = this.state.picto
    axios
      .get('http://localhost:5000/picto/pdf', {
        params: {
          collectedPictos
        },
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf'
        }
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        window.open(link)
      })
      .catch((error) => {
        commit('global/SET_ERROR', error.response.data, { root: true })
      })
  },

  addPictos ({ commit }) {
    const { id } = this.state.auth.user
    this.state.picto.uploadedFiles.forEach((selectedFile) => {
      const formData = new FormData()
      const blob = selectedFile
      formData.append('path', blob)
      formData.append('user_id', id)
      formData.append('category_id', blob.category_id)

      axios
        .post('http://localhost:5000/picto', formData)
        .then((response) => {
          commit('global/SET_VALIDATION', response.data.validation, {
            root: true
          })
        })
        .catch((error) => {
          commit('global/SET_ERROR', error.response.data, { root: true })
        })
    })
  },

  deletePicto ({ commit }, payload) {
    axios
      .delete(`http://localhost:5000/picto/${payload}`)
      .then(response => commit('DEL_PICTOS', response.data))
      .catch((error) => {
        commit('global/SET_ERROR', error.response.data, { root: true })
      })
  },

  searchPictos ({ commit }, payload) {
    axios
      .get(`http://localhost:5000/picto/search/${payload}`)
      .then((response) => {
        commit('SET_PICTOS', response.data)
      })
      .catch((error) => {
        commit('global/SET_ERROR', error.response.data, { root: true })
      })
  }
}

export default actions
