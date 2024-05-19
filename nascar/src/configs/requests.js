import axios from 'axios';
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL,
});



const token = authStore.getToken;

axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    // Lidar com erros de interceptador
    return Promise.reject(error);
  });