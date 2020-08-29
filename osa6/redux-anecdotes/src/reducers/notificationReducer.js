const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return state = action.data.notification
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

export const setNotification = (content, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: {
        notification: content
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
      notification: ""
    }
  }
}

export default notificationReducer