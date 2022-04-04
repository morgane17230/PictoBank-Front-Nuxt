export default ({ app, store }, inject) => {
  inject('notifier', {
    showSnackbar ({ message = '', snackbar = false }) {
      store.commit('global/SET_MESSAGE', { message, snackbar })
    }
  })
}
