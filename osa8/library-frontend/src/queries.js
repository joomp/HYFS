import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query getBooks($genre: String){
    allBooks(genre: $genre) {
      title
      author{
        name
        born
        id
        bookCount
      }
      published
      id
    }
  }
`

export const CURRENT_USER_FAVORITE_GENRE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

export const ALL_GENRES = gql`
  query {
    genres 
  }
`