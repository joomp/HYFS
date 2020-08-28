import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect( () => {
    const timer = setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
    return () => clearTimeout(timer)
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    Boolean(notification) &&
      <div style={style}> {notification} </div>
  )
}

export default Notification