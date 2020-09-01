import loginService from '../services/login'
import blogService from '../services/blogs'
import { error, notification } from './notificationReducer'

const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOG_IN':
    return action.data
  case 'LOG_OUT':
    return null
  case 'INIT_USER':
    return action.data
  default:
    return state
  }
}

export const logIn = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials)
      .catch(e => {
        dispatch(error('Wrong username or password'))
        throw e
      })
    dispatch(notification('Logged in successfully'))
    window.localStorage.setItem( 'loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch( {
      type: 'LOG_IN',
      data: user
    })
  }
}

export const initUser = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))
  return {
    type: 'INIT_USER',
    data: user
  }
}

export const logOut = () => {
  blogService.setToken(null)
  localStorage.removeItem('loggedUser')
  return {
    type: 'LOG_OUT'
  }
}

export default userReducer