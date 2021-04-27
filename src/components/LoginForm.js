import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h3>Log in to application</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={username}
            name='username'
            placeholder='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='password'
            placeholder='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
