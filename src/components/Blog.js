import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, username, deleteBlog }) => {
  const [showAll, setShowAll] = useState(false)

  const changeShowAll = () => {
    setShowAll(prevState => !prevState)
  }

  const buttonLabel = showAll ? 'hide' : 'view'

  const handleLike = () => {
    addLike(blog.id, blog.likes + 1)
  }

  const handleDelete = async () => {
    const confirmMsg = `remove ${blog.title} by ${blog.author}`
    if (!window.confirm(confirmMsg)) return null

    deleteBlog(blog.id)
  }

  const canBeDeleted = blog.user.username === username

  return (
    <div className='blog'>
      <span>{blog.title} by {blog.author}</span>
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
  username: PropTypes.string,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
