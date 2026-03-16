import { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const onSubmitSuccess = jwtToken => {
    // Save token in cookies for 30 days
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    // Redirect to home page
    navigate('/')
  }

  const submitForm = async event => {
    event.preventDefault()

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      setShowSubmitError(true)
      setErrorMsg(data.error_msg)
    }
  }

  // If already logged in, redirect to home
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }

  return (
    <div className="login-form-container">
      <form onSubmit={submitForm}>
        <h1>Login</h1>

        <label htmlFor="username">USERNAME</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <br />

        <label htmlFor="password">PASSWORD</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <br />

        <button type="submit">Login</button>

        {showSubmitError && <p>*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login