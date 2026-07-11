import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogService } from '@/services/blog.service';

export function useBlogs(params?: {
  search?: string;
  onlyPublished?: boolean;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: ['blogs', params],
    queryFn: () => blogService.getAll(params),
  });
}

export function useBlog(id: number) {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getById(id),
    enabled: id > 0,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => blogService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => blogService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => blogService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}
