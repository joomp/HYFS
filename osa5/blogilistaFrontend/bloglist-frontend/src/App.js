import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationTimeout, setNotificationTimeout] = useState(null)
  const [notificationClass, setNotificationClass] = useState('notification')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const notificationDisplayTime = 3000

  const displayNotification = (message, className) => {
    setNotificationClass(className) 
    setNotificationMessage(message)
    if (notificationTimeout !== null){
      clearTimeout(notificationTimeout)
    }
    setNotificationTimeout(setTimeout(() => {
      setNotificationMessage(null)
      setNotificationTimeout(null)
    }, notificationDisplayTime))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async credentials => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      setUser(user)
      blogService.setToken(user.token)
      displayNotification('Logged in successfully', 'notification')
    } catch (exception) {
      displayNotification('Wrong username or password', 'error')
      console.error(exception)
    }
  }

  const logout = () => {
    setUser(null)
    blogService.setToken(null)
    localStorage.removeItem('loggedUser')
    displayNotification('Logged out', 'notification')
  }

const addBlog = async blog => {
  try {
    const response = await blogService.add(blog)
    setBlogs(blogs.concat(response))
    displayNotification(`New blog added: ${blog.title} by ${blog.author}`, 'notification')
  } catch(exception) {
    displayNotification(`Error: Adding ${blog.title} failed`, 'error')
    console.error(exception)
  }
}

  const generateLoggedInView = () => {
    return(
      <div>
        <h3>
          Logged in as <i> {`${user.name}`} </i>
          <button onClick = {logout}> Log out </button>
          </h3>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        <AddBlogForm addBlog = {addBlog}/>
      </div>
    )  
  }
  
  return (
    <div id = "container">
        <Notification message = {notificationMessage} className = {notificationClass} />
        {user === null ?
          <Login login={login} /> :
          generateLoggedInView()
        }
    </div>
  )
}

export default App