const mutations = {
  SET_FOLDERNAME (state, payload) {
    state.foldername = payload
  },

  SET_ERROR (state, payload) {
    state.error = payload
  },

  SET_VALIDATION (state, payload) {
    state.validation = payload
  }
}

export default mutations
