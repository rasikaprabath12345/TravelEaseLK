import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { destinationService } from '@/services/destination.service';

export function useDestinations(search?: string) {
  return useQuery({
    queryKey: ['destinations', search],
    queryFn: () => destinationService.getAll(search),
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