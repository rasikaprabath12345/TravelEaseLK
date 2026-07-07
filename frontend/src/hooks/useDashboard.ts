import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard.service';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dashboardService.getStats(),
  });
}

export function useBookingAnalytics() {
  return useQuery({
    queryKey: ['booking-analytics'],
    queryFn: () => dashboardService.getAnalytics(),
  });
}

export function usePopularDestinations() {
  return useQuery({
    queryKey: ['popular-destinations'],
    queryFn: () => dashboardService.getPopularDestinations(),
  });
}