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
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },

  getFoldersByOrg ({ commit }) {
    const { id } = this.$auth.user.organization

    axios
      .get(`http://localhost:5000/org/${id}/folders`)
      .then((response) => {
        commit('SET_FOLDERS', response.data)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },

  addFolder ({ commit }) {
    const { foldername, photo } = this.state.folder
    const { id } = this.$auth.user.organization
    const formData = new FormData()

    formData.append('path', photo)
    formData.append('foldername', foldername)
    formData.append('org_id', id)

    axios
      .post('http://localhost:5000/addFolder', formData)
      .then((response) => {
        commit('ADD_FOLDER', response.data.newFolder)
        this.$notifier.showSnackbar({
          validation: response.data.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },

  updateFolder ({ commit }) {
    const { foldername, photo, folderId } = this.state.folder
    const formData = new FormData()

    if (photo) {
      formData.append('path', photo)
    }
    if (foldername !== '') {
      formData.append('foldername', foldername)
    }

    axios
      .put(`http://localhost:5000/folder/${folderId}`, formData)
      .then((response) => {
        commit('UPDATE_FOLDER', response.data.updatedFolder)
        this.$notifier.showSnackbar({
          validation: response.data.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },

  deleteFolder ({ commit }, payload) {
    axios
      .delete(`http://localhost:5000/folder/${payload}`)
      .then((response) => {
        commit('DEL_FOLDER', response.data.deletedFolder)
        this.$notifier.showSnackbar({
          validation: response.data.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },

  addPictoToFolder () {
    const { folderId } = this.state.folder
    const { pictoId } = this.state.picto
    axios
      .post(`http://localhost:5000/folder/${folderId}/picto/${pictoId}`)
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
  },

  removePictoFromFolder ({ commit }, payload) {
    const { folderId } = this.state.folder
    axios
      .delete(`http://localhost:5000/folder/${folderId}/picto/${payload}`)
      .then((response) => {
        commit('DEL_FROM_FOLDER', payload)
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
