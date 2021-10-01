import axios from 'axios'

const actions = {
  addUser ({ commit }) {
    const { lastname, firstname, username, email, password } = this.state.user
    axios
      .post('http://localhost:5000/addUser', {
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
    axios.get(this.$auth.logout())
      .catch((error) => {
        commit('SET_ERROR', error.response)
      })
  },

  sendMessage ({ commit }) {
    const { lastname, firstname, email, message } = this.state.user
    axios
      .post('http://localhost:5000/contact', {
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
  }
}

export default actions
