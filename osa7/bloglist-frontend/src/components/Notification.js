import React from 'react'
import '../index.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector( state => state.notification)
  if (!notification.message) {
    return null
  }
  return (
    <div className={notification.type} id='notification'>
      {notification.message}
    </div>
  )
}

export default Notification