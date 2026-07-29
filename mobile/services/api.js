import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.26:3000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});


api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { default: useAuthStore } = await import('../store/useAuthStore');
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
