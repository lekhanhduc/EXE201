import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081", // Thay URL backend thực tế
  withCredentials: true, // QUAN TRỌNG: Để gửi cookie refresh_token từ BE
  headers: {
    "Content-Type": "application/json",
  },
});
// Gắn interceptor để tự động gắn token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default axiosInstance;
