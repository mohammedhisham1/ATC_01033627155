import axios from '../axios';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  phone_number?: string;
  date_of_birth?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const AuthService = {
  register: async (data: RegisterData) => {
    const response = await axios.post('/register/', data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await axios.post('/token/', data);
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  refreshToken: async (refresh_token: string) => {
    const response = await axios.post('/token/refresh/', { refresh_token });
    localStorage.setItem('access_token', response.data.access_token);
    return response.data;
  },

  getProfile: async () => {
    const response = await axios.get('/profile/');
    return response.data;
  },

  updateProfile: async (data: Partial<RegisterData>) => {
    const response = await axios.put('/profile/', data);
    return response.data;
  },
}; 