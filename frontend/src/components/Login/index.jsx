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
      setFormData({ username: "", password: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white w-80">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <div className="mb-3">
        <label htmlFor="username" className="block mb-1 font-medium">
          Username
        </label>
        <input
          id="userName"
          type="text"
          value={formData.username}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
