// Write your JS code here
import './index.css'
import {Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  const onSuccess = token => {
    const {history} = props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  const onSubmitBtn = async () => {
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSuccess(data.jwt_token)
    }
  }
  return (
    <div className="login-container">
      <h1 className="heading">Please Login</h1>
      <button type="button" onClick={onSubmitBtn}>
        Login with sample creds
      </button>
    </div>
  )
}

export default withRouter(Login)
