import React, { useState } from 'react'

const Blog = ({ blog, like, remove, user }) => {
  const [showInfo, setShowInfo] = useState(false)

  const showInformation = { display: showInfo ? 'inline' : 'none' }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleLike = (e) => {
    e.preventDefault()
    like(blog)
  }

  const handleRemove = (e) => {
    e.preventDefault()
    remove(blog)
  }

  return (
    <div className='blog' >
      <div onClick = {toggleInfo} className='blogTitle'>{`${blog.title} - ${blog.author} `}</div>
      <div style = {showInformation}>
        <ul style={{display: 'block'}}>
          <li>
            likes: {blog.likes}
            <button onClick={handleLike} style={{display:'inline', marginLeft: '1ch'}}> like </button> 
          </li>
          <li>url: {blog.url} </li>
          <li>added by: {blog.user.name} </li>
        </ul>
      {user.username === blog.user.username &&
        <button onClick={handleRemove} style={{ margin: '1ch'}}> remove </button> }
      </div>
    </div>
  )
}

export default Blog
