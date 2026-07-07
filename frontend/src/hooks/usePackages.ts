import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { packageService } from '@/services/package.service';

export function usePackages(params?: {
  search?: string;
  destinationId?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: ['packages', params],
    queryFn: () => packageService.getAll(params),
  });
}

export function usePackage(id: number) {
  return useQuery({
    queryKey: ['package', id],
    queryFn: () => packageService.getById(id),
    enabled: id > 0,
  });
}

export function useFeaturedPackages() {
  return useQuery({
    queryKey: ['featured-packages'],
    queryFn: () => packageService.getFeatured(),
  });
}

export function useCreatePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => packageService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
}

export function useUpdatePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => packageService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
}

export function useDeletePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => packageService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
}