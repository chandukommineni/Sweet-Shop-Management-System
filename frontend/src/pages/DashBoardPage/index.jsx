import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import DashBoard from '../../components/Dashboard';
const DashBoardPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
useEffect(()=>{
  if(!isAuthenticated){
    
    window.location.href="/"
   }

},[isAuthenticated])
  
  return (
    <div>
      <DashBoard/>
    </div>
  )
}

export default DashBoardPage