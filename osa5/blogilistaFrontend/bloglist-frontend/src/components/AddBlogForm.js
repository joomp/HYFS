import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    addBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit = {handleSubmit}>
      <h2> Add new blog </h2>
      <div>
        Title: <input value = {title} type = 'text' name = 'Title' onChange = {({ target }) => setTitle(target.value)}/>
      </div>
      <div>
        Author: <input value = {author} type = 'text' name = 'Author' onChange = {({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
        Url: <input value = {url} type = 'text' name = 'Url' onChange = {({ target }) => setUrl(target.value)}/>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

AddBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default AddBlogForm