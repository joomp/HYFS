
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import Notification from './components/Notification'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const login = (token) => {
    setToken(token)
    setPage('authors')
  }

  if (!token) {
    const storedToken = localStorage.getItem('library-user-token')
    if (storedToken){
      setToken(storedToken)
    }
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>recommendations</button>
            <button onClick={logout}>log out</button>
          </>
          :
          <button onClick={() => setPage('login')}>log in</button>}
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <Recommendations show={page === 'recommendations'} />
      <NewBook show={page === 'add'} setError={notify}/>
      <LoginForm show={page === 'login'} setToken={login} setError={notify}/>

    </div>
  )
}

export default App