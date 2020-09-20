import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import Select from 'react-select'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(null)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const genresQuery = useQuery(ALL_GENRES)

  useEffect( () => {
    if(genreFilter){
      getBooks({ variables: { genre: genreFilter } })
    } else{
      getBooks()
    }
  }, [result.data, genreFilter, getBooks])

  if (!props.show || result.loading || genresQuery.loading) {
    return null
  }

  const genres = genresQuery.data.genres
  const books = result.data.allBooks

  const selectOptions = [{ value: null, label: 'All' }].concat(
    genres.map(g => { return { value: g, label: g }}) )

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {books.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Select options={selectOptions}
        onChange={({ value }) => setGenreFilter(value)}
        value = {{ value: genreFilter, label: genreFilter ? genreFilter : 'All' }}/>
    </div>
  )
}

export default Books