import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Thay URL backend thực tế
  withCredentials: true, // QUAN TRỌNG: Để gửi cookie refresh_token từ BE
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
