import api from './api';
import type { DashboardStats, BookingAnalytics, ApiResponse } from '@/types';

export const dashboardService = {
  async getStats() {
    const response = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data;
  },

  async getAnalytics() {
    const response = await api.get<ApiResponse<BookingAnalytics[]>>('/dashboard/analytics');
    return response.data;
  },

  async getPopularDestinations() {
    const response = await api.get<ApiResponse<any[]>>('/dashboard/popular-destinations');
    return response.data;
  },
};