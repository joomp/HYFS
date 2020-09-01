import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Test blog',
  author: 'Tester',
  likes: '16',
  url: 'www.tester.com',
  user: {
    name: 'Test user',
    username: '242341'
  }
}

test('By default title and author are rendered, but url and likes hidden', () => {
  const component = render(
    <Blog blog={blog} user={blog.user}/>
  )

  expect(component.getByText(RegExp(blog.title))).not.toHaveStyle(
    'display: none'
  )
  expect(component.getByText(RegExp(blog.author))).not.toHaveStyle(
    'display: none'
  )
  expect(component.container.querySelector('.additionalInformation')).toHaveStyle(
    'display: none'
  )
})

test('clicking the blog title show the additional information', async () => {
  const component = render(
    <Blog blog={blog} user={blog.user} />
  )

  const button = component.getByText(RegExp(blog.title))
  fireEvent.click(button)

  expect(component.container.querySelector('.additionalInformation')).not.toHaveStyle(
    'display: none'
  )
})

test('clicking the like calls event handler twice', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={blog.user} like={mockHandler}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
