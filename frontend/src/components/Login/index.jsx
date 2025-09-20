// src/components/Login/index.jsx
import { useState } from "react";

const Login = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
      setFormData({ userName: "", password: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-[50%] w-full max-w-md bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
        Login
      </h2>

      {/* Username */}
      <div className="mb-4">
        <label
          htmlFor="userName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Username
        </label>
        <input
          id="userName"
          type="text"
          value={formData.userName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
