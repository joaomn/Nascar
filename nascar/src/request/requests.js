import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL,
});
// Adicionando o interceptor para injetar o token no header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // ou qualquer outro método para obter o token
    console.log('Obtendo token:', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token adicionado ao header:', config.headers.Authorization);
    } else {
      console.log('Token não encontrado');
    }

    return config;
  },
  (error) => {
    console.error('Erro no interceptor de requisição:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;