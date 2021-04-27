import { useState } from 'react'
import userService from '../services/users'

const LoginForm = ({ addUser, showNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await userService.login({ username, password })

      setUsername('')
      setPassword('')
      addUser(user)
    } catch ({ response }) {
      showNotification(response.data.error, true)
    }
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

export default LoginForm
