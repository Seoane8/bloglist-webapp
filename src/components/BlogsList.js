import Blog from './Blog'

const BlogList = ({ blogs, addLike, showNotification, username, deleteBlog }) => {
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
            showNotification={showNotification}
            username={username}
            deleteBlog={deleteBlog}
          />
        )}
    </div>
  )
}

export default BlogList
