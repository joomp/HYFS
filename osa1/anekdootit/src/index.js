import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const anecWithMostVotes = anecdoteWithMostVotes(votes)
  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
        <p>Votes: {votes[selected]}</p>
      </div>
      <Button text = "Vote" value = {vote(votes, selected)} action = {setVotes} />
      <Button text = "Next anecdote" value = {randomAnecdoteIndex(selected)} action = {setSelected} />
      <div>
        <h1>Anecdote with most votes</h1>
        {props.anecdotes[anecWithMostVotes]}
        <p>Votes: {votes[anecWithMostVotes]}</p>
      </div>
    </div>
  )
}

// Returns a random anecdote index. Doesn't return selected anecdote index,
// if there are more than 1 anecdote
const randomAnecdoteIndex = (selected) =>{
  let i = Math.floor(Math.random() * anecdotes.length)
  if (i === selected){
    return (i + 1) % anecdotes.length
  } else{
    return i
  }
}

const anecdoteWithMostVotes = (votes) =>{
  let mostVotes = 0
  let anecdoteIndex = 0
  votes.forEach((v, i) => {
    if(mostVotes < v){
      anecdoteIndex = i
      mostVotes = v
    }
  })
  return anecdoteIndex
}

const vote = (votes, i) => {
  let copy = [...votes]
  copy[i] = copy[i] + 1
  return copy
}

const Button = ({text, value, action}) => {
  return (
    <button onClick = {() => {action(value)} } >
      {text}
    </button>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
