const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return state = action.data.notification
    case 'VOTE':
        return state = `You voted '${action.data.anecdote}'`
    case 'ADD':
        return state = `You added '${action.data.anecdote}'`
    default:
      return state
  }
}

export const setNotification = (content) => {
  return {
    type: 'NOTIFICATION',
    data: {
      notification: content
    }
  }
}

export default notificationReducer