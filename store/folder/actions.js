import axios from 'axios'

const actions = {
  getFolder ({ commit }) {
    const { folderId } = this.state.folder

    axios
      .get(`http://localhost:5000/folder/${folderId}`)
      .then((response) => {
        commit('SET_FOLDER', response.data)
      })
      .catch((error) => {
        commit('global/SET_ERROR', error.response, { root: true })
      })
  },

  addFolder ({ commit }) {
    const { foldername, photo } = this.state.folder
    const { id } = this.state.auth.user
    const formData = new FormData()

    formData.append('path', photo)
    formData.append('foldername', foldername)
    formData.append('user_id', id)

    axios
      .post('http://localhost:5000/addFolder', formData)
      .then(() => {
        commit('REFRESH_USER')
      })
      .catch((error) => {
        commit('global/SET_ERROR', error.response, { root: true })
      })
  },

  updateFolder ({ commit }, payload) {
    const { foldername, photo } = this.state.folder
    const formData = new FormData()

    formData.append('path', photo)
    formData.append('foldername', foldername)

    axios
      .put(`http://localhost:5000/folder/${payload}`, formData)
      .then(() => {
        commit('REFRESH_USER')
      })
      .catch((error) => {
        commit('global/SET_ERROR', error.response, { root: true })
      })
  },

  deleteFolder ({ commit }, payload) {
    axios
      .delete(`http://localhost:5000/folder/${payload}`)
      .then(() => {
        commit('REFRESH_USER')
      })
      .catch((error) => {
        commit('global/SET_ERROR', error.response, { root: true })
      })
  },

  addPictoToFolder ({ commit }) {
    const { folderId } = this.state.folder
    const { pictoId } = this.state.picto
    axios
      .post(`http://localhost:5000/folder/${folderId}/picto/${pictoId}`)
      .then(response => commit('SET_VALIDATION', response.data.validation))
      .catch((error) => {
        commit('global/SET_ERROR', error.response)
      })
  },

  removePictoFromFolder ({ commit }, payload) {
    const { folderId } = this.state.folder
    axios
      .delete(`http://localhost:5000/folder/${folderId}/picto/${payload}`)
      .then(() => {
        commit('DEL_FROM_FOLDER', payload)
      })
      .catch((error) => {
        commit('global/SET_ERROR', error.response)
      })
  }
}

export default actions
