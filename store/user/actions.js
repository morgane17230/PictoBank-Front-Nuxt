import axios from 'axios'

const actions = {
  addUser ({ commit }) {
    const { lastname, firstname, username, email, password } = this.state.user
    axios.post('http://localhost:5000/addUser', {
      lastname,
      firstname,
      username,
      email,
      password
    })
    axios
      .post('http://localhost:5000/nodemailer', {
        type: 'confirmRegister',
        firstname,
        lastname,
        email
      })
      .then(response =>
        commit('global/SET_VALIDATION', response.data.validation, {
          root: true
        })
      )
      .then(this.$router.push('/'))
      .catch((error) => {
        commit('global/SET_ERROR', error.response, { root: true })
      })
  },

  updateUser ({ commit }) {
    const { id } = this.$auth.user
    const { lastname, firstname, username, email, password } = this.state.user
    axios
      .put(`http://localhost:5000/user/${id}`, {
        lastname,
        firstname,
        username,
        email,
        password
      })
      .then(response => commit('global/SET_VALIDATION', response.data.validation, { root: true }))
      .then(this.$router.push('/'))
      .catch((error) => {
        commit('global/SET_ERROR', error.response, { root: true })
      })
  },

  deleteUser ({ commit }) {
    const { id, email } = this.$auth.user
    axios.post('http://localhost:5000/nodemailer', {
      type: 'confirmDelete',
      email
    })
    axios
      .delete(`http://localhost:5000/user/${id}`)
      .then(response => commit('global/SET_VALIDATION', response.data.validation, { root: true }))
      .then(this.$router.push('/'))
      .catch((error) => {
        commit('global/SET_ERROR', error.response, { root: true })
      })
  },

  login ({ commit }) {
    const { username, password } = this.state.user
    this.$auth
      .loginWith('local', {
        data: {
          username,
          password
        }
      })
      .then(response => commit('SET_VALIDATION', response.data, { root: true }))
      .catch((error) => {
        commit('global/SET_ERROR', error.response, { root: true })
        this.$router.push('/')
      })
  },

  logout ({ commit }) {
    axios.get(this.$auth.logout()).catch((error) => {
      commit('global/SET_ERROR', error.response, { root: true })
    })
  },

  sendContact ({ commit }) {
    const { lastname, firstname, email, message } = this.state.user
    axios
      .post('http://localhost:5000/nodemailer', {
        type: 'contact',
        lastname,
        firstname,
        email,
        message
      })
      .then(response => commit('global/SET_VALIDATION', response.data, { root: true }))
      .catch((error) => {
        commit('global/SET_ERROR', error.response, { root: true })
      })
  },

  resetPassword ({ commit }) {
    const { email } = this.state.user

    axios
      .post('http://localhost:5000/nodemailer', {
        type: 'resetPassword',
        email
      })
      .then(response => commit('globa/SET_VALIDATION', response.data, { root: true }))
      .catch((error) => {
        commit('global/SET_ERROR', error.response, { root: true })
      })
  },

  confirmResetPassword ({ commit }) {
    const { email } = this.state.$auth.user.email
    axios
      .post('http://localhost:5000/nodemailer', {
        type: 'confirmResetPassword',
        email
      })
      .then(response => commit('global/SET_VALIDATION', response.data, { root: true }))
      .catch((error) => {
        commit('global/SET_ERROR', error.response, { root: true })
      })
  },

  updateProfilMail ({ commit }) {
    const { id, email, lastname, firstname } = this.$auth.user
    axios
      .post('http://localhost:5000/nodemailer', {
        type: 'updateProfil',
        id,
        email,
        lastname,
        firstname
      })
      .then(response => commit('global/SET_VALIDATION', response.data, { root: true }))
      .catch((error) => {
        commit('global/SET_ERROR', error.response, { root: true })
      })
  }
}

export default actions
