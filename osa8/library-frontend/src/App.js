
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import Notification from './components/Notification'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './subscriptions'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

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

  const updateCacheWith = newBook => {
    const includedIn = (set, object) => set.map(o => o.id).includes(object.id)
    const variables =  newBook.genres.map(g => { return { genre: g }}).concat(null)

    for (const variable of variables) {
      let dataInStore = client.readQuery({ query: ALL_BOOKS })
      if (!includedIn(dataInStore.allBooks, newBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          variables: variable,
          data: { allBooks : dataInStore.allBooks.concat(newBook) }
        })
      }
    }

    let dataInStore = client.readQuery({ query: ALL_AUTHORS })
    client.writeQuery({
      query: ALL_AUTHORS,
      data: { allAuthors : dataInStore.allAuthors.map(author => {
        return author.id === newBook.author.id ? newBook.author : author
      }) }
    })
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

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

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