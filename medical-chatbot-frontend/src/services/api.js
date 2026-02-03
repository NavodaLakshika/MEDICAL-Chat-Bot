import axios from "axios";

// const API_URL = "http://localhost:8001/api"; // Adjust if deployed
const API_URL = "http://localhost:8000/api";
// Save token in localStorage
export const setToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");

// Axios instance with token
const api = axios.create({
  baseURL: API_URL,
});

// Attach token to requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// services/api.js
export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  if (response.data.token) {
    setToken(response.data.token);
  }
  return response.data;
};

export const registerUser = async (name, email, password) => {
  const response = await api.post("/auth/register", { name, email, password });
  if (response.data.token) {
    setToken(response.data.token);
  }
  return response.data;
};
export const sendMessage = async (message) => {
  try {
    console.log("Sending message to backend:", message);
    const response = await api.post("/chat/send", { message });
    console.log("Backend response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error Details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    throw error;
  }
};

export default api;
