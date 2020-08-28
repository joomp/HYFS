import React from 'react'
import {vote as voteAction} from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
  const filter = RegExp(useSelector( state => state.filter) )
  console.log(filter)
  const anecdotes = useSelector(state => state.anecdotes)
    .filter(anec => filter.test(anec.anecdote)).sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAction(anecdote))
  }
  
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.anecdote}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList