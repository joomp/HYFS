import React, {useState} from 'react'

const Login = ({login}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    login({username, password})
    setUsername('')
    setPassword('')
  }

  return(
    <form onSubmit = {handleLogin}>
      <h2> Log in </h2>
      <div>
        Username: <input value = {username} type = 'text' name = 'Username' onChange = {({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        Password: <input value = {password} type = 'password' name = 'Password' onChange = {({ target }) => setPassword(target.value)}/>
      </div>
      <div>
        <button type="submit">Log in</button>
      </div>
    </form>
  )
}

export default Login