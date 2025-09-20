import React, { useEffect } from "react";
import Login from "../../components/Login";
import Register from "../../components/Register";
import { Api } from "../../api/Api";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../store/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Typewriter } from "react-simple-typewriter";

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const handleLogin = async (data) => {
    try {
      const response = await Api.post("/auth/login", data);
      if (response.status === 200) {
        const { userName, email, token, role, expiration } = response.data;
        dispatch(loginSuccess({ userName, email, token, role, expiration }));
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleRegister = async (data) => {
    try {
      const response = await Api.post("/auth/register", data);
      if (response.status === 201) {
        toast.success("Registration successful! Please log in.");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-100 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <img
          src="/logo.png"
          alt="SweetShop Logo"
          className="h-28 w-28 mx-auto mb-4 drop-shadow-lg"
        />

        {/* Fixed height for heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 h-12 flex items-center justify-center">
          <Typewriter
            words={["Welcome to SweetShop"]}
            cursor={false}
            typeSpeed={100}
            deleteSpeed={60}
            delaySpeed={1500}
          />
        </h2>

        {/* Fixed height for paragraph */}
        <p className="text-gray-600 text-lg h-8 flex items-center justify-center">
          <Typewriter
            words={[
              "Satisfy your sweet cravings with our delicious sweets 🍬",
              "Freshly baked, just for you 🧁",
              "The sweetest place in town 🍫",
            ]}
            loop={0}
            cursor={false}
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </p>
      </div>

      {/* Forms container */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-[90%]">
        <Login onSubmit={handleLogin} />
        <div className="hidden md:block w-px bg-gray-300"></div>
        <div className="block md:hidden h-px bg-gray-300 w-full"></div>
        <Register onSubmit={handleRegister} />
      </div>
    </div>
  );
};

export default HomePage;
