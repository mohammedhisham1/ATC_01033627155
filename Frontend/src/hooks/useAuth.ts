import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthService, LoginData, RegisterData } from '../lib/services/auth.service';

interface User {
  id: number;
  username: string;
  email: string;
  phone_number?: string;
  date_of_birth?: string;
  profile_picture?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (data) => {
        try {
          set({ isLoading: true, error: null });
          const authResponse = await AuthService.login(data);
          const userResponse = await AuthService.getProfile();
          set({ 
            user: userResponse, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (data) => {
        try {
          set({ isLoading: true, error: null });
          await AuthService.register(data);
          await useAuth.getState().login({
            email: data.email,
            password: data.password,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Registration failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        AuthService.logout();
        set({ 
          user: null, 
          isAuthenticated: false,
          error: null 
        });
      },

      loadUser: async () => {
        if (!localStorage.getItem('access_token')) {
          set({ 
            user: null, 
            isAuthenticated: false,
            isLoading: false 
          });
          return;
        }

        try {
          set({ isLoading: true, error: null });
          const user = await AuthService.getProfile();
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: any) {
          set({
            user: null,
            isAuthenticated: false,
            error: error.response?.data?.message || 'Failed to load user',
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
); 