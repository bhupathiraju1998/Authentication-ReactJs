import './index.css'
import Cookies from 'js-cookie'

const MainPage = props => {
  const clearLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="main-page-cont">
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
          />
        </div>
        <div>
          <button type="button" onClick={clearLogout}>
            Logout
          </button>
        </div>
      </div>
      <div>
        <h1 className="para">Your Flexibility, Our Excellence</h1>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
          />
        </div>
      </div>
    </div>
  )
}

export default MainPage
