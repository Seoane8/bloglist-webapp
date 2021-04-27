import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const togglableRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()

    addBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
    togglableRef.current.toggleVisibility()
  }

  return (
    <Togglable
      showLabel='Create new blog'
      hideLabel='Cancel'
      ref={togglableRef}
    >
      <h3>Create new blog</h3>
      <form onSubmit={handleSubmit} id='createBlogForm'>
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
      </form>
      <button type='submit' form='createBlogForm'>
        Add blog
      </button>
    </Togglable>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm
