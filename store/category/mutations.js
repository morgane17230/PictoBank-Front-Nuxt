const mutations = {
  SET_NAME (state, payload) {
    state.name = payload
  },

  SET_CATEGORIES (state, payload) {
    state.categories = payload
  },

  ADD_CATEGORY (state, payload) {
    state.categories = [...state.categories, payload]
  }
}

export default mutations
