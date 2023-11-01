import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000",
  timeout: 5000, // Optional: set a timeout limit for requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
