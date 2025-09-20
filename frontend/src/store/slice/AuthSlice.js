import { createSlice } from "@reduxjs/toolkit";

// Try to load from localStorage when app starts
const user = JSON.parse(localStorage.getItem("user")) || null;
const token = localStorage.getItem("token") || null;
const role = localStorage.getItem("role") || null;

const initialState = {
  user,
  token,
  role,
  isAuthenticated: !!token,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { userName, email, token, role, expiration } = action.payload;

      state.user = { userName, email };
      state.token = token;
      state.role = role;
      state.isAuthenticated = true;

      
      localStorage.setItem("user", JSON.stringify({ userName, email }));
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("expiration", expiration);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("expiration");
    },
    loadUserFromStorage: (state) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (user && token) {
        state.user = user;
        state.token = token;
        state.role = role;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { loginSuccess, logout, loadUserFromStorage } = AuthSlice.actions;
export default AuthSlice.reducer;
