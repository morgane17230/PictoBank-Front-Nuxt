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
      .then(response => response.data)
      .then(this.$router.push('/'))
      .catch((error) => {
        commit('SET_ERROR', error.response)
      })
  },

  login ({ commit }) {
    const { email, password } = this.state.user
    this.$auth
      .loginWith('local', {
        data: {
          email,
          password
        }
      })
      .then(this.$router.push('/'))
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
