const mongoose = require('mongoose')
const config = require('./config')
const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky',
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz',
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

const books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
  {
    title: 'Frankenstein; Or, the new Prometheus',
    published: 1818,
    author: 'Mary Shelley',
    id: "afa5de04-344d-11e9-a214-719c6709cf3a",
    genres: ['classic', 'horror']
  },
]

const reset = async () => {
  await Author.deleteMany({})
  await Book.deleteMany({})
  for (author of authors) {
    console.log(author.name)
    const auth = new Author(author)
    await auth.save()
  }

  for (book of books) {
    console.log(book.title)
    let author = await Author.findOne({name: book.author})
    if (!author){
      author = new Author({name: book.author, born: null})
    }
    author.bookCount += 1
    author = await author.save()
    const b = new Book({...book, author: author._id})
    await b.save()
  }
  console.log('Reset Ready')
}

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(async () => {
  console.log('connected to MongoDB')
  await reset()
  mongoose.connection.close()
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
  mongoose.connection.close()
})