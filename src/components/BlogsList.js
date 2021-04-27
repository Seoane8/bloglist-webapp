import Blog from './Blog'

const BlogList = ({ blogs, addLike, showNotification }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          showNotification={showNotification}
        />
      )}
    </div>
  )
}

export default BlogList
