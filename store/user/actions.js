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

    this.$axios
      .$post('/addUser', {
        lastname,
        firstname,
        name,
        email,
        password,
        isOrganization
      })
      .then((response) => {
        this.$notifier.showSnackbar({
          validation: response.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.validation,
          snackbar: true
        })
      })
  },

  updateUser () {
    let id

    if (this.$auth.loggedIn) {
      id = this.$auth.user.id
    } else {
      id = this.state.user.id
    }

    const {
      lastname,
      firstname,
      name,
      email,
      password,
      teamPassword
    } = this.state.user

    this.$axios
      .$put(`/user/${id}`, {
        lastname,
        firstname,
        name,
        email,
        password,
        teamPassword
      })
      .then((response) => {
        this.$notifier.showSnackbar({
          validation: response.validation,
          snackbar: true
        })
        if (!this.$auth.user) {
          this.$axios
            .$post('/nodemailer', {
              type: 'confirmResetPassword',
              firstname: response.user.account.firstname,
              lastname: response.user.account.lastname,
              email: response.user.account.email
            })
        }
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.validation,
          snackbar: true
        })
      })
  },

  deleteUser () {
    const { id } = this.$auth.user.account
    this.$axios
      .$delete(`/account/${id}`)
      .then((response) => {
        this.$notifier.showSnackbar({
          validation: response.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.validation,
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
          validation: response.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.validation,
          snackbar: true
        })
      })
  },

  sendContact () {
    const { lastname, firstname, email, message } = this.state.user
    this.$axios
      .$post('/nodemailer', {
        type: 'contact',
        lastname,
        firstname,
        email,
        message
      })
      .then((response) => {
        this.$notifier.showSnackbar({
          validation: response.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.validation,
          snackbar: true
        })
      })
  },

  resetPassword () {
    const { email } = this.state.user

    this.$axios
      .$post('/nodemailer', {
        type: 'resetPassword',
        email
      })
      .then((response) => {
        this.$notifier.showSnackbar({
          validation: response.validation,
          snackbar: true
        })
      })
      .catch((error) => {
        this.$notifier.showSnackbar({
          validation: error.response.validation,
          snackbar: true
        })
      })
  }
}

export default actions
