const mutations = {
  SET_UUID (state, payload) {
    state.uuid = payload
  },

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

  SET_MESSAGE (state, payload) {
    state.message = payload
  },

  SET_ISORGANIZATION (state) {
    state.isOrganization = !state.isOrganization
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
