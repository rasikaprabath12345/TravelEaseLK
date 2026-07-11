import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '@/services/booking.service';

export function useBookings(params?: { status?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: () => bookingService.getAll(params),
    refetchInterval: 10000, // auto refetch bookings list every 10 seconds
  });
}

export function useBooking(id: number) {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingService.getById(id),
    enabled: id > 0,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => bookingService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; status: string; notes?: string; paymentStatus?: string }) =>
      bookingService.updateStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}