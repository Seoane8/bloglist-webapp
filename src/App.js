import React, { useState, useEffect } from 'react'
import BlogsList from './components/BlogsList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(async () => {
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }, [])

  const addUser = ({ token, user }) => {
    setUser({
      token,
      username: user.username,
      name: user.name
    })
  }

  if (user === null) return <LoginForm addUser={addUser} />

  return (
    <div>
      <p>Logged by {user.username}</p>
      <BlogsList blogs={blogs} />
    </div>
  )
}

export default App
