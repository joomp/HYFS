import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map(obj => obj.id === id ? {...obj, votes: obj.votes + 1 }: obj)
    case 'CREATE_ANECDOTE':
      return state.concat({
        content: action.data.content,
        id: action.data.id,
        votes: 0
      })
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.put({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch( {
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch( {
      type: 'CREATE_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecs,
    })
  }
}

export default anecdoteReducer