const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      return state = action.data.filter
    default:
      return state
  }
}

export const setFilter = (content) => {
  return {
    type: 'FILTER',
    data: {
      filter: content
    }
  }
}

export default filterReducer