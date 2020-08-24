import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const put = (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const newBlog = {
    user: blog.user.id,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  const request = axios.put(`${baseUrl}/${blog.id}`, newBlog, config)
  return request.then(response => response.data)
} 

const remove = (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${blog.id}`, config)
  return request.then(response => response.data)
} 

export default { getAll, add, setToken, put, remove}