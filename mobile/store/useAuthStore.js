import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  register: async (fullName, email, password) => {
    const { data } = await api.post('/auth/register', { fullName, email, password });
    await SecureStore.setItemAsync('token', data.token);
    set({ user: data.user, token: data.token, isAuthenticated: true });
  },

  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    await SecureStore.setItemAsync('token', data.token);
    set({ user: data.user, token: data.token, isAuthenticated: true });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  restoreSession: async () => {
    const token = await SecureStore.getItemAsync('token');

    if (!token) {
      set({ isLoading: false });
      return;
    }

    try {
      
      const { data } = await api.get('/auth/me');
      set({
        user: data.user ?? data,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {

        await SecureStore.deleteItemAsync('token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

export default useAuthStore;
