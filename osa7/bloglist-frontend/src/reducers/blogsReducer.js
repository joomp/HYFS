import blogService from '../services/blogs'

const initialState = []

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CREATE_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data
  case 'REMOVE_BLOG':
    return state.filter( (b) => b.id !== action.data.id)
  case 'LIKE_BLOG':
    return state.map( (iter) => {
      return iter.id === action.data.id ? { ...iter, likes: iter.likes + 1 } : iter
    })
  default:
    return state
  }
}

export const vote = (blog) => {
  return async dispatch => {
    const newblog = await blogService.put({
      ...blog,
      votes: blog.votes + 1
    })
    dispatch( {
      type: 'VOTE',
      data: newblog
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newblog = await blogService.add(blog)
    dispatch( {
      type: 'CREATE_BLOG',
      data: newblog
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blog = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blog,
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog,
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.put({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE_BLOG',
      data: blog,
    })
  }
}

export default blogsReducer