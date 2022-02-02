const mutations = {
  SET_VALIDATION (state, payload) {
    state.validation = payload.validation
    state.snackbar = payload.snackbar
  },

  SET_USER_UDATE_MODAL (state, payload) {
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
  }
}

export default mutations
