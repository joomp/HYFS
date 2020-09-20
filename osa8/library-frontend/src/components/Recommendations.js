import React, {useEffect} from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER_FAVORITE_GENRE } from '../queries'

const Recommendations = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const genreQuery = useQuery(CURRENT_USER_FAVORITE_GENRE)

  useEffect( () => {
    if (genreQuery.data){
      getBooks({ variables: { genre: genreQuery.data.me.favoriteGenre } })
    }
  }, [genreQuery, getBooks])

  if (!props.show || genreQuery.loading || result.loading) {
    return null
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>Book recommendations: </h2>

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
    </div>
  )
}

export default Recommendations