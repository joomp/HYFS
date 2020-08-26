import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationTimeout, setNotificationTimeout] = useState(null)
  const [notificationClass, setNotificationClass] = useState('notification')
  const AddBlogFormToggleRef = useRef()

  const notificationDisplayTime = 3000

  const displayNotification = (message) => {
    setNotificationClass('notification')
    setNotificationMessage(message)
    if (notificationTimeout !== null){
      clearTimeout(notificationTimeout)
    }
    setNotificationTimeout(setTimeout(() => {
      setNotificationMessage(null)
      setNotificationTimeout(null)
    }, notificationDisplayTime))
  }

  const displayError = (message) => {
    setNotificationClass('error')
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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort( (a, b) => -a.likes + b.likes ))
    )
  }, [])

  const login = async credentials => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      let blogs = await blogService.getAll()
      setBlogs(blogs.sort( (a, b) => -a.likes + b.likes ))
      displayNotification('Logged in successfully')
    } catch (exception) {
      displayError('Wrong username or password')
      console.error(exception)
    }
  }

  const logout = () => {
    setUser(null)
    blogService.setToken(null)
    setBlogs([])
    localStorage.removeItem('loggedUser')
    displayNotification('Logged out')
  }

  const addBlog = async blog => {
    try {
      const response = await blogService.add(blog)
      console.log(response)
      AddBlogFormToggleRef.current.toggleVisibility()
      setBlogs(blogs.concat(response))
      displayNotification(`New blog added: ${blog.title} by ${blog.author}`)
    } catch(exception) {
      displayError(`Error: Adding ${blog.title} failed`)
      console.error(exception)
    }
  }

  const like = async (blog) => {
    let foo = blogs.map( (iter) => {
      return iter.id === blog.id ? { ...iter, likes: iter.likes + 1 } : iter
    })
    setBlogs(foo.sort( (a, b) => -a.likes + b.likes ))
    await blogService.put({ ...blog, likes: blog.likes + 1 })
  }

  const remove = async (blog) => {
    let foo = blogs.filter( (iter) => iter.id !== blog.id)
    setBlogs(foo)
    await blogService.remove(blog)
  }

  const generateLoggedInView = () => {
    return(
      <div>
        <h3>
          Logged in as <i> {`${user.name}`} </i>
          <button onClick = {logout}> Log out </button>
        </h3>
        <Togglable buttonLabel = 'Add a blog'  ref = {AddBlogFormToggleRef}>
          <AddBlogForm addBlog = {addBlog}/>
        </Togglable>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} like={like} remove={remove} user={user}/>
        )}
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