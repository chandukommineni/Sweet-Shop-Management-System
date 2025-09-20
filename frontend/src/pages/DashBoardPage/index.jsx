import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const DashBoardPage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(user)
useEffect(()=>{
  if(!isAuthenticated){
    window.location.href="/"
   }

},[isAuthenticated])
  
  return (
    <div>{user?.userName}</div>
  )
}

export default DashBoardPage