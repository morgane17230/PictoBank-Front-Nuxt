export default ({ app, store }, inject) => {
  inject('notifier', {
    showSnackbar ({ validation = '', snackbar = false }) {
      store.commit('global/SET_VALIDATION', { validation, snackbar })
    }
  })
}
