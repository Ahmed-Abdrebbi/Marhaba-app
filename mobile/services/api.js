import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:3000/api',
});


api.interceptors.request.use(
  async (config) => {
    
    const token = await SecureStore.getItemAsync('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;