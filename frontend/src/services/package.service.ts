import api from './api';
import type { Package, ApiResponse } from '@/types';

export const packageService = {
  async getAll(params?: {
    search?: string;
    destinationId?: number;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    page?: number;
    pageSize?: number;
  }) {
    const response = await api.get<ApiResponse<Package[]>>('/packages', { params });
    return response.data;
  },

  async getById(id: number) {
    const response = await api.get<ApiResponse<Package>>(`/packages/${id}`);
    return response.data;
  },

  async getFeatured() {
    const response = await api.get<ApiResponse<Package[]>>('/packages/featured');
    return response.data;
  },

  async create(data: Partial<Package>) {
    const response = await api.post<ApiResponse<Package>>('/packages', data);
    return response.data;
  },

  async update(data: Partial<Package> & { id: number }) {
    const response = await api.put<ApiResponse<Package>>('/packages', data);
    return response.data;
  },

  async delete(id: number) {
    const response = await api.delete(`/packages/${id}`);
    return response.data;
  },
};