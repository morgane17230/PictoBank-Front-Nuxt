const mutations = {
  SET_FOLDERNAME (state, payload) {
    state.foldername = payload
  },

  SET_FOLDER_ID (state, payload) {
    state.folderId = payload
  },

  SET_FOLDER (state, payload) {
    state.folder = payload
  },

  DEL_FROM_FOLDER (state, payload) {
    const index = state.folder.pictos.findIndex(picto => picto.id === payload.id)
    state.folder.pictos.splice(index, 1)
  },

  SET_PHOTO (state, payload) {
    state.photo = payload
    state.photo.url = URL.createObjectURL(payload)
  },

  REFRESH_USER () {
    this.$auth.fetchUser()
  },

  SET_ERROR (state, payload) {
    state.error = payload
  },

  SET_VALIDATION (state, payload) {
    state.validation = payload
  }
}

export default mutations
