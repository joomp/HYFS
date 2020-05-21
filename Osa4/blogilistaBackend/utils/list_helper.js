const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum += item.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (fav, item) => fav.likes > item.likes ? fav : {author: item.author, likes: item.likes, title: item.title}
  return blogs.reduce(reducer, {likes: 0})
}

const mostBlogs = (blogs) => {
  let foo = new Object()
  blogs.forEach( blog => {
    if (foo[blog.author]){
      ++foo[blog.author]
    } else{
      foo[blog.author] = 1
    }
  })
  let most = {author: null, blogs: 0}
  for ( const [key, value] of Object.entries(foo) ) {
    if (value > most.blogs){
      most = {author: key, blogs: value}
    }
  }
  return most
}

const mostLikes = (blogs) =>{
  let foo = new Object()
  blogs.forEach( blog => {
    if (foo[blog.author]){
      foo[blog.author] += blog.likes
    } else{
      foo[blog.author] = blog.likes
    }
  })
  let most = {author: null, likes: 0}
  for ( const [key, value] of Object.entries(foo) ) {
    if (value > most.likes){
      most = {author: key, likes: value}
    }
  }
  return most
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs, 
  mostLikes
}