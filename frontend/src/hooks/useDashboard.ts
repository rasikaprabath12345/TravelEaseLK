import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard.service';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dashboardService.getStats(),
    refetchInterval: 10000, // auto refetch stats every 10 seconds
  });
}

export function useBookingAnalytics() {
  return useQuery({
    queryKey: ['booking-analytics'],
    queryFn: () => dashboardService.getAnalytics(),
    refetchInterval: 30000, // auto refetch analytics every 30 seconds
  });
}

export function usePopularDestinations() {
  return useQuery({
    queryKey: ['popular-destinations'],
    queryFn: () => dashboardService.getPopularDestinations(),
    refetchInterval: 30000, // auto refetch popular destinations every 30 seconds
  });
}