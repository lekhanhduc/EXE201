import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Danh sách whitelist - các API không cần token
const WHITELIST_URLS = [
  '/auth/login',
  '/users/registration',
  '/auth/forgot-password',
  '/search/products/**',
  '/categories',
  '/categories/**',
  '/public/**',
];

const isWhitelistedUrl = (url: string) => {
  return WHITELIST_URLS.some(pattern => {
    if (pattern.includes('**')) {
      const basePattern = pattern.replace('/**', '');
      return url.startsWith(basePattern);
    }
    else if (pattern.includes('*')) {
      const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
      return regex.test(url);
    }
    else {
      return url === pattern || url.startsWith(pattern + '/');
    }
  });
};

axiosInstance.interceptors.request.use((config) => {
  const url = config.url ?? "";

  if (!isWhitelistedUrl(url)) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default axiosInstance;