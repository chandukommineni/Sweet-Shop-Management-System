import React from 'react'
import SweetCard from '../SweetCard'
const DashBoard = () => {
  const sweet={name:"Laddu",category:"INDIAN",price:50,quantity:0}
  return (
    <div>
      <SweetCard sweet={sweet} role="USER"/>
    </div>
  )
}

export default DashBoard