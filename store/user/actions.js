import axios from 'axios'

const actions = {
  addUser () {
    const {
      lastname,
      firstname,
      name,
      email,
      password,
      isOrganization
    } = this.state.user

    axios
      .post('http://localhost:5000/addUser', {
        lastname,
        firstname,
        name,
        email,
        password,
        isOrganization
      })
      .then((response) => {
        this.$notifier.showSnackbar({
          validation: response.data.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.data.validation,
          snackbar: true
        })
      })
  },

  updateUser () {
    let id

    if (this.$auth.loggedIn) {
      id = this.$auth.user.id
    } else {
      id = this.state.user.uuid
    }

    const {
      lastname,
      firstname,
      name,
      email,
      password,
      teamPassword
    } = this.state.user

    axios
      .put(`http://localhost:5000/user/${id}`, {
        lastname,
        firstname,
        name,
        email,
        password,
        teamPassword
      })
      .then((response) => {
        this.$notifier.showSnackbar({
          validation: response.data.validation,
          snackbar: true
        })
        if (!this.$auth.user) {
          axios.post('http://localhost:5000/nodemailer', {
            type: 'confirmResetPassword',
            firstname: response.data.user.account.firstname,
            lastname: response.data.user.account.lastname,
            email: response.data.user.account.email
          })
        }
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.data.validation,
          snackbar: true
        })
      })
  },

  deleteUser () {
    const { id } = this.$auth.user.account
    axios
      .delete(`http://localhost:5000/account/${id}`)
      .then((response) => {
        this.$notifier.showSnackbar({
          validation: response.data.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.data.validation,
          snackbar: true
        })
      })
  },

  login () {
    const { username, password } = this.state.user
    this.$auth
      .loginWith('local', {
        data: {
          username,
          password
        }
      })
      .then((response) => {
        this.$notifier.showSnackbar({
          validation: response.data.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.data.validation,
          snackbar: true
        })
      })
  },

  sendContact () {
    const { lastname, firstname, email, message } = this.state.user
    axios
      .post('http://localhost:5000/nodemailer', {
        type: 'contact',
        lastname,
        firstname,
        email,
        message
      })
      .then((response) => {
        this.$notifier.showSnackbar({
          validation: response.data.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.data.validation,
          snackbar: true
        })
      })
  },

  resetPassword () {
    const { email } = this.state.user

    axios
      .post('http://localhost:5000/nodemailer', {
        type: 'resetPassword',
        email
      })
      .then((response) => {
        this.$notifier.showSnackbar({
          validation: response.data.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.data.validation,
          snackbar: true
        })
      })
  }
}

export default actions
