import React, { useState, useEffect } from 'react'
import BlogsList from './components/BlogsList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(async () => {
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistAppUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addUser = ({ token, user }) => {
    const newUser = {
      token,
      username: user.username,
      name: user.name
    }

    window.localStorage.setItem(
      'loggedBloglistAppUser', JSON.stringify(newUser)
    )
    blogService.setToken(token)
    setUser(newUser)
  }

  const addBlog = newBlog => {
    setBlogs(prevBlogs => [...prevBlogs, newBlog])
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistAppUser')
  }

  if (user === null) return <LoginForm addUser={addUser} />

  return (
    <div>
      <span>Logged by {user.username}</span>
      <button onClick={handleLogout}>logout</button>
      <BlogForm addBlog={addBlog} />
      <BlogsList blogs={blogs} />
    </div>
  )
}

export default App
