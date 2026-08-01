import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, 

  restoreSession: async () => {
    try {
       
      const token = await SecureStore.getItemAsync('token');
      
      if (!token) {
        return set({ isLoading: false, isAuthenticated: false });
      }

       
      const response = await api.get('/auth/me');
      
       
      set({ 
        user: response.data.user, 
        token: token, 
        isAuthenticated: true, 
        isLoading: false 
      });

    } catch (error) {
      console.error("Session restoration failed:", error);
      
      await SecureStore.deleteItemAsync('token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (token, user) => {
    await SecureStore.setItemAsync('token', token);
    set({ user, token, isAuthenticated: true });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;