import React from 'react'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'
import DashBoardPage from './pages/DashBoardPage'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <>
      <ToastContainer autoClose={1500}/>
    <Navbar/>

    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/dashboard' element={<DashBoardPage/>}/>
    </Routes>
    </>
  )
}

export default App