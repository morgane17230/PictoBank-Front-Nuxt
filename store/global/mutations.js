const mutations = {
  SET_VALIDATION (state, payload) {
    state.validation = payload.validation
    state.snackbar = payload.snackbar
  }
}

export default mutations
