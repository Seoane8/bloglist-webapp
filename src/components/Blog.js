import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, addLike, showNotification }) => {
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

  return (
    <div>
      <spam><b>{blog.title}</b> by {blog.author}</spam>
      <button onClick={changeShowAll}>{buttonLabel}</button>
      <br />
      {
        showAll
          ? (
            <>
              <spam>{blog.url}</spam>
              <br />
              <spam>Added by: {blog.user.name}</spam>
              <div>
                <spam>Likes: {blog.likes}</spam>
                <button onClick={handleLike}>like</button>
              </div>
            </>
            )
          : null
      }
    </div>
  )
}

export default Blog
