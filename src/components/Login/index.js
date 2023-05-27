import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  checkAuth = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username !== '142420' && password !== '231225') {
      this.setState({
        showSubmitError: true,
        errorMsg: "User ID and PIN didn't match",
      })
    }
    if ((username !== '142420' && password === '231225') || username === '') {
      this.setState({showSubmitError: true, errorMsg: 'Invalid user ID'})
    }
    if (username === '142420' && (password !== '231225' || password === '')) {
      this.setState({showSubmitError: true, errorMsg: 'Invalid PIN'})
    }
    if (username === '' && password === '') {
      this.setState({showSubmitError: true, errorMsg: 'Invalid user ID'})
    }

    if (username === '142420' && password === '231225') {
      const userDetails = {user_id: username, pin: password}
      const url = 'https://apis.ccbp.in/ebank/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    console.log(username, password, errorMsg)
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <form onSubmit={this.checkAuth}>
          <div className="sub-container">
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
                alt="website login"
                className="image-login"
              />
            </div>
            <div className="input-container">
              <h1>Welcome Back</h1>
              <div>
                <label htmlFor="userId">User ID</label>
                <br />
                <input
                  value={username}
                  onChange={this.handleChange}
                  placeholder="Enter User ID"
                  name="username"
                  id="userId"
                />
              </div>
              <div>
                <label htmlFor="pass">PIN</label>
                <br />
                <input
                  value={password}
                  onChange={this.handleChange}
                  placeholder="Enter Password"
                  name="password"
                  id="pass"
                  type="password"
                />
              </div>
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
              <div>
                <button type="submit">Login</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
