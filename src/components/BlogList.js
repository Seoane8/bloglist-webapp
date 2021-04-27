import PropTypes from 'prop-types'
import Blog from './Blog'

const BlogList = ({ blogs, addLike, username, deleteBlog }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            username={username}
            deleteBlog={deleteBlog}
          />
        )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  addLike: PropTypes.func.isRequired,
  username: PropTypes.string,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogList
