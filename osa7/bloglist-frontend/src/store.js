import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  combineReducers({
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer
  }),
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store