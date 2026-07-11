import api from './api';
import type { Blog, ApiResponse } from '@/types';

export const blogService = {
  async getAll(params?: {
    search?: string;
    onlyPublished?: boolean;
    page?: number;
    pageSize?: number;
  }) {
    const response = await api.get<ApiResponse<Blog[]>>('/blogs', { params });
    return response.data;
  },

  async getById(id: number) {
    const response = await api.get<ApiResponse<Blog>>(`/blogs/${id}`);
    return response.data;
  },

  async create(data: Partial<Blog>) {
    const response = await api.post<ApiResponse<Blog>>('/blogs', data);
    return response.data;
  },

  async update(data: Partial<Blog> & { id: number }) {
    const response = await api.put<ApiResponse<Blog>>('/blogs', data);
    return response.data;
  },

  async delete(id: number) {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },
};
