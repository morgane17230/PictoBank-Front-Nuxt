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
        commit('global/SET_ERROR', error.response.data, { root: true })
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
        commit('global/SET_ERROR', error.response.data.error, { root: true })
      })
  },

  updateFolder ({ commit }) {
    const { foldername, photo, folderId } = this.state.folder
    const formData = new FormData()

    if (photo !== null) { formData.append('path', photo) }
    if (foldername !== '') { formData.append('foldername', foldername) }

    axios
      .put(`http://localhost:5000/folder/${folderId}`, formData)
      .then(() => {
        commit('REFRESH_USER')
      })
      .catch((error) => {
        commit('global/SET_ERROR', error.response.data, { root: true })
      })
  },

  deleteFolder ({ commit }, payload) {
    axios
      .delete(`http://localhost:5000/folder/${payload}`)
      .then(() => {
        commit('REFRESH_USER')
      })
      .catch((error) => {
        commit('global/SET_ERROR', error.response.data, { root: true })
      })
  },

  addPictoToFolder ({ commit }) {
    const { folderId } = this.state.folder
    const { pictoId } = this.state.picto
    axios
      .post(`http://localhost:5000/folder/${folderId}/picto/${pictoId}`)
      .then(response =>
        commit('global/SET_VALIDATION', response.data.validation, {
          root: true
        })
      )
      .catch((error) => {
        commit('global/SET_ERROR', error.response.data, { root: true })
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
        commit('global/SET_ERROR', error.response.data, { root: true })
      })
  }
}

export default actions
