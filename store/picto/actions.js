import axios from 'axios'

const actions = {
  getPictos ({ commit }) {
    axios
      .get('http://localhost:5000/picto')
      .then((response) => {
        commit('SET_PICTOS', response.data)
        commit('SET_FOUND_PICTOS', response.data)
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.data.validation,
          snackbar: true
        })
      })
  },

  generatePDF () {
    const { collectedPictosHome, collectedPictosFolder } = this.state.picto
    const collected = [...collectedPictosHome, ...collectedPictosFolder]
    axios
      .get('http://localhost:5000/picto/pdf', {
        params: {
          collectedPictos: [...new Set(collected)]
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
        this.$notifier.showSnackbar({
          validation: error.response.data.validation,
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

      axios
        .post('http://localhost:5000/picto', formData)
        .then((response) => {
          commit('ADD_PICTOS', response.data.newPictos)
          this.$notifier.showSnackbar({
            validation: response.data.validation,
            snackbar: true
          })
        })
        .then(commit('INITIALIZE_UPLOADED_FILES'))
        .catch((error) => {
          this.$notifier.showSnackbar({
            validation: error.response.data.validation,
            snackbar: true
          })
        })
    })
  },

  deletePicto ({ commit }, payload) {
    axios
      .delete(`http://localhost:5000/picto/${payload}`)
      .then((response) => {
        commit('DEL_PICTO', response.data.deletedPicto)
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

  deletePictos ({ commit }) {
    const { id } = this.$auth.user.account
    axios
      .delete(`http://localhost:5000/pictos/${id}`)
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
    axios
      .get(`http://localhost:5000/picto/search/${payload}`)
      .then((response) => {
        commit('SET_PICTOS', response.data)
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.data.validation,
          snackbar: true
        })
      })
  }
}

export default actions
