const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return state = action.data
  default:
    return state
  }
}

let timer = null

const wait = seconds => {
  return new Promise(resolve => {
    if (timer){
      clearTimeout(timer)
    }
    timer = setTimeout(resolve, 1000*seconds)
  })
}

export const setNotification = (message, type, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: {
        message, type
      }
    })
    await wait(seconds)
    dispatch(clearNotification())
  }
}

export const notification = (message, seconds = 4) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: {
        message, type: 'notification'
      }
    })
    await wait(seconds)
    dispatch(clearNotification())
  }
}

export const error = (message, seconds = 4) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: {
        message, type: 'error'
      }
    })
    await wait(seconds)
    dispatch(clearNotification())
  }
}

const clearNotification = () => {
  return {
    type: 'NOTIFICATION',
    data: {
      message: ''
    }
  }
}

export default notificationReducer