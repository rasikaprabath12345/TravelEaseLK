import api from './api';
import type { Booking, ApiResponse } from '@/types';

export const bookingService = {
  async getAll(params?: { status?: string; page?: number; pageSize?: number }) {
    const response = await api.get<ApiResponse<Booking[]>>('/bookings', { params });
    return response.data;
  },

  async getById(id: number) {
    const response = await api.get<ApiResponse<Booking>>(`/bookings/${id}`);
    return response.data;
  },

  async create(data: {
    packageId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    country: string;
    passportOrNIC?: string;
    numberOfAdults: number;
    numberOfChildren: number;
    travelDate: string;
    pickupLocation?: string;
    specialRequests?: string;
  }) {
    const response = await api.post<ApiResponse<Booking>>('/bookings', data);
    return response.data;
  },

  async updateStatus(data: { id: number; status: string; notes?: string }) {
    const response = await api.put<ApiResponse<Booking>>('/bookings/status', data);
    return response.data;
  },
};