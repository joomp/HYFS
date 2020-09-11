import { gql  } from '@apollo/client'

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!,
    $genres: [String!]!) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
      ) {
      title
      author
      id
      published
    }
  }
`

export const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name
    setBornTo: $born
    ) {
    name
    id
    born
  }
}
`