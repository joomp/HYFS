import React, { useEffect, useState } from 'react'
import userService from '../services/users'

const User = () => {
  const [users, setUsers] = useState(null)

  useEffect( () => {
    userService.getAll().then(users => setUsers(users))
  }, [])

  if (!users)
    return null

  return (
    <div>
      <h2> Users </h2>
      <table>
        <thead>
          <tr>
            <td > <b>Username</b> </td>
            <td > <b>Blogs created</b> </td>
          </tr>
        </thead>
        <tbody>
          {users.map( user => {
            return  (
              <tr key={user.username}>
                <td key={`name${user.username}`}> {user.name} </td> 
                <td key={`blogs${user.username}`}> {user.blogs.length} </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default User