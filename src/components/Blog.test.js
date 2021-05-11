import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import Blog from './Blog'

describe('Rendering Blog component', () => {
  const blogInfo = {
    id: 1,
    title: 'Blog title',
    author: 'John Doe',
    likes: 8,
    url: 'http://www.webogblog.com',
    user: {
      id: 2,
      name: 'Jane',
      username: 'janeD'
    }
  }
  const mockLikeHandle = jest.fn()
  const mockDeleteHandle = jest.fn()
  const username = 'User'
  let component

  beforeEach(() => {
    component = render(
      <Blog
        blog={blogInfo}
        username={username}
        addLike={mockLikeHandle}
        deleteBlog={mockDeleteHandle}
      />
    )
  })

  test('only show title and author', () => {
    component.getByText(`${blogInfo.title} by ${blogInfo.author}`)
    const urlComponent = component.queryByText(blogInfo.url)
    expect(urlComponent).toBeNull()
    const likesComponent = component.queryByText(`Likes: ${blogInfo.likes}`)
    expect(likesComponent).toBeNull()
  })

  test('when clicking on the view button, show url and likes', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    component.getByText(blogInfo.url)
    component.getByText(`Likes: ${blogInfo.likes}`)
  })
})
