
const actions = {
  getPictos ({ commit }) {
    this.$axios
      .$get('/picto')
      .then((response) => {
        commit('SET_PICTOS', response)
        commit('SET_FOUND_PICTOS', response)
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.validation,
          snackbar: true
        })
      })
  },

  addPictos ({ commit }) {
    const { id } = this.$auth.user.account
    this.state.picto.uploadedFiles.forEach((selectedFile) => {
      const formData = new FormData()
      const blob = selectedFile
      formData.append('path', blob, blob.originalname)
      formData.append('account_id', id)
      formData.append('category_id', blob.category_id)
      formData.append('originalname', blob.originalname)

      this.$axios
        .$post('/picto', formData)
        .then((response) => {
          commit('ADD_PICTOS', response.newPictos)
          this.$notifier.showSnackbar({
            validation: response.validation,
            snackbar: true
          })
        })
        .then(commit('INITIALIZE_UPLOADED_FILES'))
        .then(location.reload(true))
        .catch((error) => {
          this.$notifier.showSnackbar({
            validation: error.response.validation,
            snackbar: true
          })
        })
    })
  },

  deletePicto ({ commit }, payload) {
    this.$axios
      .$delete(`/picto/${payload}`)
      .then((response) => {
        commit('DEL_PICTO', response.deletedPicto)
        this.$notifier.showSnackbar({
          validation: response.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.validation,
          snackbar: true
        })
      })
  },

  deletePictos ({ commit }) {
    const { id } = this.$auth.user.account
    this.$axios
      .$delete(`/pictos/${id}`)
      .then((response) => {
        commit('DEL_PICTOS', response.data.deletedPictos)
        this.$notifier.showSnackbar({
          validation: response.data.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.data.validation,
          snackbar: true
        })
      })
  },

  searchPictos ({ commit }, payload) {
    this.$axios
      .$get(`/picto/search/${payload}`)
      .then((response) => {
        commit('SET_PICTOS', response)
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.validation,
          snackbar: true
        })
      })
  },

  generatePDF ({ commit }) {
    const { collectedPictosHome, collectedPictosFolder } = this.state.picto
    const collected = [...collectedPictosHome, ...collectedPictosFolder]
    this.$axios
      .$get('/picto/pdf', {
        params: {
          collectedPictos: [...new Set(collected)]
        },
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf'
        }
      })
      .then((response) => {
        const blob = new Blob([response], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        window.open(link)
      })
      .then(
        commit('SET_COLLECTED_PICTOS_HOME', []),
        commit('SET_COLLECTED_PICTOS_FOLDER', [])
      )
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.validation,
          snackbar: true
        })
      })
  }
}

export default actions
