const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const pubsub = new PubSub()

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.error('error connection to MongoDB:', error.message)
})

const typeDefs = gql`
  type Token {
    value: String!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]
    me: User
    genres: [String!]!
  }

  type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      if (args.author){
        const author =  await Author.find({name: args.author})
        filter.author = author.name
      }
      if (args.genre){
        filter.genres = args.genre
      }
      return Book.find(filter)
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
    genres: () => Book.find().distinct('genres')
  },
  Book: {
    author: (root) => {
      return Author.findById(root.author)
    }
  },
  Mutation: {
    addBook: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      let author = await Author.findOne({name: args.author})
      if (!author){
        author = new Author({name: args.author, born: null})
      }
      const book = new Book({...args, author: author._id})
      try {
        const b = book.save()
        author.bookCount += 1
        author = await author.save()
        pubsub.publish('BOOK_ADDED', {bookAdded: book})
        return b
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      await Author.updateOne({name: args.name}, {born: args.setBornTo})
      return Author.findOne({name: args.name})
    },
    createUser: (root, args) => {
      const user = new User({...args})
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'password' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
  console.log(`Server ready at ${url}`)
})