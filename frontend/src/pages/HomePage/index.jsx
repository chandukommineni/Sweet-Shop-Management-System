import React from 'react'
import Login from '../../components/Login'
import {Api} from "../../api/Api"
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../store/slice/AuthSlice'  
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
const HomePage = () => {
const{ isAuthenticated }=useSelector((state)=>state.auth)
const dispatch=useDispatch()
const navigate=useNavigate()

  useEffect(() => {

    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated])

  const handleLogin =async (data) => {
    try { 
          const response = await Api.post("/auth/login",data);
          if (response.status === 200) {
            const { userName, email, token, role, expiration } = response.data;
            console.log("Login response data:", response.data);
            dispatch(loginSuccess({ userName, email, token, role, expiration }));
            toast.success("Login successful!");
            navigate("/dashboard");
          }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }

  }
  return (
    <div>
        <div>
          <h2 className="text-2xl font-bold mb-5 text-center">Welcome to Sweet Shop Management System</h2>
          <p className='text-center'>satisy our sweet cravings with our delicious sweets</p>
        </div>
        <div>
          <Login onSubmit={handleLogin} />
        </div>
    </div>
  )
}

export default HomePage