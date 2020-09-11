  
import React, {useState} from 'react'
import Select from 'react-select'
import {useQuery, useMutation} from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import { UPDATE_AUTHOR } from '../mutations'

const Authors = (props) => {
  const query =  useQuery(ALL_AUTHORS)
  const [authorName, setAuthorName] = useState('')
  const [bornTo, setBornTo] = useState('')
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  if (!props.show || query.loading) {
    return null
  }
  const authors = query.data.allAuthors

  const handleUpdateAuthor = (e) => {
    e.preventDefault()
    editAuthor({variables: {name: authorName, born: parseInt(bornTo)}})
    setBornTo('')
    setAuthorName('')
  }

  const selectOptions = authors.map(a => { return {value: a.name, label: a.name}})

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <form onSubmit={handleUpdateAuthor}>
        <div>
          <Select options={selectOptions} onChange={({value}) =>setAuthorName(value)}/>
        </div>
        <div>
          Born: <input value={bornTo}
            onChange={({ target }) => setBornTo(target.value)} />
        </div>
        <div>
          <button type='submit'>Update Author</button>
        </div>
      </form>
    </div>
  )
}

export default Authors
