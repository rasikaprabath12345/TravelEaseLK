import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export function useAdminCustomers(params?: { search?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['admin-customers', params],
    queryFn: async () => {
      const response = await api.get('/users', { params });
      return response.data;
    },
  });
}

export function useAdminUser(id: number) {
  return useQuery({
    queryKey: ['admin-user', id],
    queryFn: async () => {
      const response = await api.get(`/users/${id}`);
      return response.data;
    },
    enabled: id > 0,
  });
}
