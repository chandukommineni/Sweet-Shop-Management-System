// src/api/api.js
import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8080/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;
