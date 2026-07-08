import api from './api';
import type { Destination, ApiResponse } from '@/types';

export const destinationService = {
  async getAll(search?: string, page?: number, pageSize?: number) {
    const response = await api.get<ApiResponse<Destination[]>>('/destinations', { params: { search, page, pageSize } });
    return response.data;
  },

  async getById(id: number) {
    const response = await api.get<ApiResponse<Destination>>(`/destinations/${id}`);
    return response.data;
  },

  async create(data: Partial<Destination>) {
    const response = await api.post<ApiResponse<Destination>>('/destinations', data);
    return response.data;
  },

  async update(data: Partial<Destination> & { id: number }) {
    const response = await api.put<ApiResponse<Destination>>('/destinations', data);
    return response.data;
  },

  async delete(id: number) {
    const response = await api.delete(`/destinations/${id}`);
    return response.data;
  },
};