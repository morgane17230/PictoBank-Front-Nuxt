const mutations = {
  SET_LASTNAME (state, payload) {
    state.lastname = payload
  },

  SET_FIRSTNAME (state, payload) {
    state.firstname = payload
  },

  SET_EMAIL (state, payload) {
    state.email = payload
  },

  SET_USERNAME (state, payload) {
    state.username = payload
  },

  SET_PASSWORD (state, payload) {
    state.password = payload
  },

  SET_LOGGED (state, payload) {
    state.loggedIn = payload
  },

  SET_MESSAGE (state, payload) {
    state.message = payload
  }
}

export default mutations
