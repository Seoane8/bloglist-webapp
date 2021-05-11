import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import BlogForm from './BlogForm'

describe('Rendering BlogForm component', () => {
  const title = 'Blog title'
  const author = 'John Doe'
  const url = 'http://www.webogblog.com'
  const mockHandler = jest.fn()
  let component

  beforeEach(() => {
    component = render(
      <BlogForm addBlog={mockHandler} />
    )
  })

  test('show add blog button', () => {
    component.getByText('Create new blog')
  })

  describe('Clicking in create new blog button', () => {
    beforeEach(() => {
      const button = component.getByText('Create new blog')
      fireEvent.click(button)
    })

    test('form is visible', () => {
      component.getByPlaceholderText('title')
      component.getByPlaceholderText('author')
      component.getByPlaceholderText('url')
      component.getByText('Add blog')
      component.getByText('Cancel')
    })

    test('when form is completed correctly, handler is called', () => {
      const titleInput = component.getByPlaceholderText('title')
      const authorInput = component.getByPlaceholderText('author')
      const urlInput = component.getByPlaceholderText('url')
      const addBlogButton = component.getByText('Add blog')

      fireEvent.change(titleInput, { target: { value: title } })
      fireEvent.change(authorInput, { target: { value: author } })
      fireEvent.change(urlInput, { target: { value: url } })
      fireEvent.click(addBlogButton)

      expect(mockHandler).toHaveBeenCalledTimes(1)
      expect(mockHandler.mock.calls[0][0].author).toBe(author)
      expect(mockHandler.mock.calls[0][0].title).toBe(title)
      expect(mockHandler.mock.calls[0][0].url).toBe(url)
    })
  })
})
