import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ addBlog, showNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({ title, author, url })

      setTitle('')
      setAuthor('')
      setUrl('')
      addBlog(blog)
    } catch ({ response }) {
      showNotification(response.data.error, true)
    }
  }

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={title}
            name='title'
            placeholder='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <input
            type='text'
            value={author}
            name='author'
            placeholder='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <input
            type='url'
            value={url}
            name='url'
            placeholder='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button>
          Add blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm
