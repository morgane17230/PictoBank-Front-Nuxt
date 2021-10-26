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
      .then(response => commit('SET_VALIDATION', response.data.validation))
      .then(this.$router.push('/'))
      .catch((error) => {
        commit('SET_ERROR', error.response)
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
      .then(response => commit('SET_VALIDATION', response.data.validation))
      .then(this.$router.push('/'))
      .catch((error) => {
        commit('SET_ERROR', error.response)
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
      .then(response => commit('SET_VALIDATION', response.data.validation))
      .then(this.$router.push('/'))
      .catch((error) => {
        commit('SET_ERROR', error.response)
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
      .then(this.$router.push('/search'))
      .then(response => commit('SET_VALIDATION', response.data))
      .catch((error) => {
        commit('SET_ERROR', error.response)
      })
  },

  logout ({ commit }) {
    axios.get(this.$auth.logout()).catch((error) => {
      commit('SET_ERROR', error.response)
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
      .then(response => commit('SET_VALIDATION', response.data))
      .catch((error) => {
        commit('SET_ERROR', error.response)
      })
  },

  resetPassword ({ commit }) {
    const { email } = this.state.user

    axios
      .post('http://localhost:5000/nodemailer', {
        type: 'resetPassword',
        email
      })
      .then(response => commit('SET_VALIDATION', response.data))
      .catch((error) => {
        commit('SET_ERROR', error.response)
      })
  },

  confirmResetPassword ({ commit }) {
    const { email } = this.state.$auth.user.email
    axios
      .post('http://localhost:5000/nodemailer', {
        type: 'confirmResetPassword',
        email
      })
      .then(response => commit('SET_VALIDATION', response.data))
      .catch((error) => {
        commit('SET_ERROR', error.response)
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
      .then(response => commit('SET_VALIDATION', response.data))
      .catch((error) => {
        commit('SET_ERROR', error.response)
      })
  }
}

export default actions
