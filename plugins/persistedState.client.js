import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    paths: ['folders', 'pictos', 'global']
  })(store)
}
