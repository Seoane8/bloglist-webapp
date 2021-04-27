import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, addLike, showNotification, username, deleteBlog }) => {
  const [showAll, setShowAll] = useState(false)

  const changeShowAll = () => {
    setShowAll(prevState => !prevState)
  }

  const buttonLabel = showAll ? 'hide' : 'view'

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.update({ id: blog.id, likes: blog.likes + 1 })

      addLike(updatedBlog)
    } catch ({ response }) {
      showNotification(response.data.error, true)
    }
  }

  const handleDelete = async () => {
    const confirmMsg = `remove ${blog.title} by ${blog.author}`
    if (!window.confirm(confirmMsg)) return null

    try {
      blogService.remove(blog.id)

      deleteBlog(blog.id)
    } catch ({ response }) {
      showNotification(response.data.error, true)
    }
  }

  const canBeDeleted = blog.user.username === username

  return (
    <div>
      <span><b>{blog.title}</b> by {blog.author}</span>
      <button onClick={changeShowAll}>{buttonLabel}</button>
      {
        canBeDeleted
          ? <button onClick={handleDelete}>delete</button>
          : null
      }
      <br />
      {
        showAll
          ? (
            <>
              <span>{blog.url}</span>
              <br />
              <span>Added by: {blog.user.name}</span>
              <div>
                <span>Likes: {blog.likes}</span>
                <button onClick={handleLike}>like</button>
              </div>
            </>
            )
          : null
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  username: PropTypes.string,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
