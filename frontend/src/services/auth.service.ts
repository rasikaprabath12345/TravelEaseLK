import api from './api';
import type { AuthResponse, ApiResponse } from '@/types';

export const authService = {
  async register(data: { firstName: string; lastName: string; email: string; password: string; phoneNumber?: string }) {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data;
  },

  async login(data: { email: string; password: string }) {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return response.data;
  },
};