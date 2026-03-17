import { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate, Navigate } from 'react-router-dom'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const onSubmitSuccess = token => {
    Cookies.set('jwt_token', token, { expires: 30 })
    navigate('/')
  }

  const submitForm = async event => {
    event.preventDefault()

    // basic validation
    if (username.trim() === '' || password.trim() === '') {
      setShowSubmitError(true)
      setErrorMsg('Username and password required')
      return
    }

    const url = 'https://dummyjson.com/auth/login'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      const data = await response.json()
      console.log(data) // 🔍 see actual response

      if (response.ok) {
        // ✅ correct field
        onSubmitSuccess(data.token)
      } else {
        setShowSubmitError(true)
        setErrorMsg(data.message)
      }
    } catch (error) {
      setShowSubmitError(true)
      setErrorMsg('Something went wrong')
    }
  }

  // redirect if already logged in
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={submitForm}>
        <h1 className="head">Login</h1>

        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          className="input"
          type="text"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <br />

        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="input"
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <br />

        <button className="login-btn" type="submit">
          Login
        </button>

        {showSubmitError && <p className="error">* {errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login




//============== valid credentials ============== 

 /* username : emilys
  password : emilyspass  */