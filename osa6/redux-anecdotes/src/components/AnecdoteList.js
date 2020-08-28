import React from 'react'
import {vote as voteAction} from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state).sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAction(id))
  }
  
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList