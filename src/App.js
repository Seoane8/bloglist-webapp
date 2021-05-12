import { useState, useEffect } from 'react'
import BlogsList from './components/BlogList'
import blogService from './services/blogs'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ msg: null, error: false })

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

  const showNotification = (msg, error = false) => {
    setNotification({ msg, error })
    setTimeout(() => setNotification({ msg: null, error: false }), 5000)
  }

  const addBlog = async blog => {
    try {
      const newBlog = await blogService.create(blog)

      setBlogs(prevBlogs => [...prevBlogs, newBlog])
      showNotification('Blog created succesfully')
    } catch ({ response }) {
      showNotification(response.data.error, true)
    }
  }

  const addLike = async (id, likes) => {
    try {
      const updatedBlog = await blogService.update({ id, likes })

      setBlogs(prevBlogs => prevBlogs.map(
        blog => blog.id === updatedBlog.id
          ? updatedBlog
          : blog
      ))
    } catch ({ response }) {
      showNotification(response.data.error, true)
    }
  }

  const deleteBlog = id => {
    try {
      blogService.remove(id)

      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id))
      showNotification('Blog removed')
    } catch ({ response }) {
      showNotification(response.data.error, true)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistAppUser')
  }

  const handleLogin = async credentials => {
    try {
      const { token, user } = await userService.login(credentials)
      const { username, name } = user

      const newUser = { token, username, name }

      window.localStorage.setItem(
        'loggedBloglistAppUser', JSON.stringify(newUser)
      )

      blogService.setToken(token)
      setUser(newUser)
    } catch ({ response }) {
      showNotification(response.data.error, true)
    }
  }

  const notificationStyle = notification.error
    ? { color: 'red' }
    : { color: 'green' }

  return (
    <div>
      {
        notification.msg &&
          <div style={notificationStyle}>
            {notification.msg}
          </div>
      }
      {
        user
          ? (
            <>
              <span>Logged by {user.username}</span>
              <button onClick={handleLogout}>logout</button>
              <BlogForm
                addBlog={addBlog}
              />
              <BlogsList
                blogs={blogs}
                addLike={addLike}
                username={user.username}
                deleteBlog={deleteBlog}
              />
            </>
            )
          : <LoginForm
              handleLogin={handleLogin}
            />
      }

    </div>
  )
}

export default App
