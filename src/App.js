import { useState, useEffect } from 'react'
import BlogsList from './components/BlogsList'
import blogService from './services/blogs'
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

  const showNotification = (msg, error = false) => {
    setNotification({ msg, error })
    setTimeout(() => setNotification({ msg: null, error: false }), 5000)
  }

  const addBlog = newBlog => {
    setBlogs(prevBlogs => [...prevBlogs, newBlog])
    showNotification('Blog created succesfuly')
  }

  const addLike = updatedBlog => {
    setBlogs(prevBlogs => prevBlogs.map(
      blog => blog.id === updatedBlog.id
        ? updatedBlog
        : blog
    ))
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistAppUser')
  }

  return (
    <div>
      {
        notification.msg || <p>{notification.msg}</p>
      }
      {
        user
          ? (
            <>
              <span>Logged by {user.username}</span>
              <button onClick={handleLogout}>logout</button>
              <BlogForm
                addBlog={addBlog}
                showNotification={showNotification}
              />
              <BlogsList
                blogs={blogs}
                addLike={addLike}
                showNotification={showNotification}
              />
            </>
            )
          : <LoginForm
              addUser={addUser}
              showNotification={showNotification}
            />
      }

    </div>
  )
}

export default App
