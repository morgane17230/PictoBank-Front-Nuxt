const actions = {
  getFolder ({ commit }, payload) {
    this.$axios
      .$get(`/folder/${payload}`)
      .then((response) => {
        commit('SET_FOLDER', response)
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          message: error.response.data.message,
          snackbar: true
        })
      })
  },

  getFoldersByAccount ({ commit }) {
    const { id } = this.$auth.user.account

    this.$axios
      .$get(`/account/${id}/folders`)
      .then((response) => {
        commit('SET_FOLDERS', response)
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          message: error.response.data.message,
          snackbar: true
        })
      })
  },

  addFolder ({ commit }) {
    const { foldername, photo } = this.state.folder
    const { id } = this.$auth.user.account

    const formData = new FormData()

    formData.append('path', photo)
    formData.append('foldername', foldername)
    formData.append('account_id', id)

    this.$axios
      .$post('/addFolder', formData)
      .then((response) => {
        commit('ADD_FOLDER', response.newFolder)
        this.$notifier.showSnackbar({
          message: response.message,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          message: error.response.data.message,
          snackbar: true
        })
      })
  },

  updateFolder ({ commit }, payload) {
    const { foldername, photo } = this.state.folder
    const formData = new FormData()

    if (photo) {
      formData.append('path', photo)
    }
    if (foldername !== '') {
      formData.append('foldername', foldername)
    }

    this.$axios
      .$put(`/folder/${payload}`, formData)
      .then((response) => {
        commit('UPDATE_FOLDER', response.updatedFolder)
        this.$notifier.showSnackbar({
          message: response.message,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          message: error.response.data.message,
          snackbar: true
        })
      })
  },

  deleteFolder ({ commit }, payload) {
    this.$axios
      .$delete(`/folder/${payload}`)
      .then((response) => {
        commit('DEL_FOLDER', response.deletedFolder)
        this.$notifier.showSnackbar({
          message: response.message,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          message: error.response.data.message,
          snackbar: true
        })
      })
  },

  addPictoToFolder () {
    const { folderId } = this.state.folder
    const { pictoId } = this.state.picto
    this.$axios
      .$post(`/folder/${folderId}/picto/${pictoId}`)
      .then((response) => {
        this.$notifier.showSnackbar({
          message: response.message,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          message: error.response.data.message,
          snackbar: true
        })
      })
  },

  removePictoFromFolder ({ commit }, payload) {
    const { pictoId, folderId } = payload
    this.$axios
      .$delete(`/folder/${folderId}/picto/${pictoId}`)
      .then((response) => {
        commit('DEL_FROM_FOLDER', payload)
        this.$notifier.showSnackbar({
          message: response.message,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          message: error.response.data.message,
          snackbar: true
        })
      })
  }
}

export default actions
