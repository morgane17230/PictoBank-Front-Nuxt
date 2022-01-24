const mutations = {
  SET_NAME (state, payload) {
    state.name = payload
  },

  SET_CATEGORIES (state, payload) {
    state.categories = payload
  },

  SET_CATEGORY_ID (state, payload) {
    state.categoryId = payload
  }
}

export default mutations
