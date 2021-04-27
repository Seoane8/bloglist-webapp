import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)

  const changeShowAll = () => {
    setShowAll(prevState => !prevState)
  }

  const buttonLabel = showAll ? 'hide' : 'view'

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
                <button>like</button>
              </div>
            </>
            )
          : null
      }
    </div>
  )
}

export default Blog
