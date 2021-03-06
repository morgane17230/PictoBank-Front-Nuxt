const mutations = {
  SET_MESSAGE (state, payload) {
    state.message = payload.message
    state.snackbar = payload.snackbar
  },

  SET_USER_UPDATE_MODAL (state, payload) {
    state.updateUserModal = payload
  },

  SET_USER_DELETE_MODAL (state, payload) {
    state.deleteUserModal = payload
  },

  SET_USER_LOGIN_MODAL (state, payload) {
    state.loginUserModal = payload
  },

  SET_USER_REGISTER_MODAL (state, payload) {
    state.registerUserModal = payload
  },

  SET_ADD_PICTOS_MODAL (state, payload) {
    state.addPictosModal = payload
  },

  SET_RESET_PASSWORD_MODAL (state, payload) {
    state.resetPasswordModal = payload
  },

  SET_RESET_PASSWORD_CONFIRMATION (state, payload) {
    state.resetPasswordConfirmation = payload
  },

  SET_ADD_CATEGORY_MODAL (state, payload) {
    state.addCategoryModal = payload
  },

  SET_ADD_FOLDER_MODAL (state, payload) {
    state.addFolderModal = payload
  },

  SET_DISPLAY_FOLDER_MODAL (state, payload) {
    state.displayFolderModal = payload
  },

  SET_UPDATE_FOLDER_MODAL (state, payload) {
    state.updateFolderModal = payload
  },

  SET_ADD_PICTOS_TO_FOLDER_MODAL (state, payload) {
    state.addPictosToFolderModal = payload
  },

  SET_CONTACT_MODAL (state, payload) {
    state.contactModal = payload
  },

  SET_CGU_MODAL (state, payload) {
    state.cguModal = payload
  },

  SET_ZOOM_MODAL (state, payload) {
    state.zoomModal = payload
  }
}

export default mutations
