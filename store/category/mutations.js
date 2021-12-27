const mutations = {
  SET_NAME (state, payload) {
    state.name = payload
  },

  SET_CATEGORIES (state, payload) {
    state.categories = payload
  },

  REFRESH_USER () {
    this.$auth.fetchUser()
  }
}

export default mutations
