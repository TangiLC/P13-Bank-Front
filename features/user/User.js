import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {} from './userSlice'

const User = () => {
    const user=useSelector((state)=>state.user)
    const dispatch = useDispatch()
  return (
    <div>User</div>
  )
}

export default User