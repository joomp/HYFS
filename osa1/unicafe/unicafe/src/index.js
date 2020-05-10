import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button text = "Good" value = {good} setValue = {setGood} />
        <Button text = "Neutal" value = {neutral} setValue = {setNeutral} />
        <Button text = "Bad" value = {bad} setValue = {setBad} />
      </div>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

const Button = ({text, value, setValue}) => {
  return (
    <button onClick = {() => {setValue(value + 1)} } >
      {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let all = good + bad + neutral
  // Share of average and positive votes in decimal value
  let average = 0
  let positive = 0
  if (all !== 0){
    average = (good - bad)/all
    positive = good/all
    return (
      <div>
        <h1>Statistics</h1>
          <table>
            <tbody>
              <StatisticLine text = "Good" value = {good} />
              <StatisticLine text = "Neutral" value = {neutral} />
              <StatisticLine text = "Bad" value = {bad} />
              <StatisticLine text = "All" value = {all} />
              <StatisticLine text = "Average" value = {average} />
              <StatisticLine text = "Positive" value = {positive} />
            </tbody>
          </table>
      </div>
    )
  } else{
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>
        {text}: {value}
      </td>
    </tr>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)