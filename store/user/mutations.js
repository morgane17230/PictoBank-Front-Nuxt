const mutations = {
  SET_LASTNAME (state, payload) {
    state.lastname = payload
  },

  SET_FIRSTNAME (state, payload) {
    state.firstname = payload
  },

  SET_USERNAME (state, payload) {
    state.username = payload
  },

  SET_EMAIL (state, payload) {
    state.email = payload
  },

  SET_NAME (state, payload) {
    state.name = payload
  },

  SET_ISORGANIZATION (state, payload) {
    state.isOrganization = payload
  },

  SET_PASSWORD (state, payload) {
    state.password = payload
  },

  SET_TEAM_PASSWORD (state, payload) {
    state.teamPassword = payload
  },

  SET_LOGGED (state, payload) {
    state.loggedIn = payload
  }
}

export default mutations
