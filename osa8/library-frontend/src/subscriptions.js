import { gql  } from '@apollo/client'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author{
        name
        born
        id
        bookCount
      }
      published
      genres
      id
    }
  }
`