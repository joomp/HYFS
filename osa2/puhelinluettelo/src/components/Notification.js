import React from 'react'
import '../index.css'

const Notification = ({ message, className}) => {

    if (message === null) {
      return null
    }
  
    return (
      <div className={className}>
        {message}
      </div>
    )
}

export default Notification