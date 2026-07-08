import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { destinationService } from '@/services/destination.service';

export function useDestinations(params?: string | { search?: string; page?: number; pageSize?: number }) {
  const search = typeof params === 'string' ? params : params?.search;
  const page = typeof params === 'object' ? params?.page : undefined;
  const pageSize = typeof params === 'object' ? params?.pageSize : undefined;
  return useQuery({
    queryKey: ['destinations', search, page, pageSize],
    queryFn: () => destinationService.getAll(search, page, pageSize),
  });
}

export function useDestination(id: number) {
  return useQuery({
    queryKey: ['destination', id],
    queryFn: () => destinationService.getById(id),
    enabled: id > 0,
  });
}

export function useCreateDestination() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => destinationService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['destinations'] });
    },
  });
}

export function useUpdateDestination() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => destinationService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['destinations'] });
    },
  });
}

export function useDeleteDestination() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => destinationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['destinations'] });
    },
  });
}