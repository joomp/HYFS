import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

test('submitting the form calls callback with correct parameters', async () => {
  const mockHandler = jest.fn()
  const [title, author, url] = ['Test blog', 'Tester', 'www.tester.com']

  const component = render(
    <AddBlogForm addBlog={mockHandler}/>
  )

  const form = component.container.querySelector('form')
  const titleForm = component.container.querySelector('#title')
  const authorForm = component.container.querySelector('#author')
  const urlForm = component.container.querySelector('#url')

  fireEvent.change(titleForm, { target: { value: title } })
  fireEvent.change(authorForm, { target: { value: author } })
  fireEvent.change(urlForm, { target: { value: url } })
  fireEvent.submit(form)

  // Check the number of properties
  expect(Object.keys(mockHandler.mock.calls[0][0]).length).toBe(3)
  expect(mockHandler.mock.calls[0][0].title).toBe(title)
  expect(mockHandler.mock.calls[0][0].author).toBe(author)
  expect(mockHandler.mock.calls[0][0].url).toBe(url)
})
