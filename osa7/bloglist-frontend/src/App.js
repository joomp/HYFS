import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { notification, error } from './reducers/notificationReducer'
import { initBlogs, createBlog, removeBlog, likeBlog } from './reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, logOut, initUser } from './reducers/userReducer'
import {
  Switch, Route, Link, useRouteMatch, useHistory
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  let blogs = useSelector( state => state.blogs)
    .sort( (a, b) => -a.likes + b.likes )
  const user = useSelector( state => state.user )
  const AddBlogFormToggleRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUser())
  }, [dispatch])

  const login = async credentials => {
    dispatch(logIn(credentials))
  }

  const logout = () => {
    dispatch(notification('Logged out'))
    dispatch(logOut())
  }

  const addBlog = async blog => {
    try {
      const response = await blogService.add(blog)
      console.log(response)
      AddBlogFormToggleRef.current.toggleVisibility()
      dispatch(createBlog(blog))
      dispatch(notification(`New blog added: ${blog.title} by ${blog.author}`))
    } catch(exception) {
      dispatch(error(`Error: Adding ${blog.title} failed`))
      console.error(exception)
    }
  }

  const like = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const remove = async (blog) => {
    dispatch(removeBlog(blog))
  }

  const generateLoggedInView = () => {
    return(
      <div>
        <h3>
          Logged in as <i> {`${user.name}`} </i>
          <button onClick = {logout}> Log out </button>
        </h3>
        <Switch>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/'>
            <Togglable buttonLabel = 'Add a blog'  ref = {AddBlogFormToggleRef}>
              <AddBlogForm addBlog = {addBlog}/>
            </Togglable>
            <h2>Blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} like={like} remove={remove} user={user}/>
            )}
          </Route>
        </Switch>
      </div>
    )
  }

  return (
    <div id = "container">
      <Notification />
      {user ? generateLoggedInView() : <Login login={login} />}
    </div>
  )
}

export default App