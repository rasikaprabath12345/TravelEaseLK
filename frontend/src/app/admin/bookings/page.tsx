'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useBookings, useUpdateBookingStatus } from '@/hooks/useBookings';
import { formatPrice, formatDate } from '@/lib/utils';

export default function AdminBookingsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const { data: bookingsData, isLoading } = useBookings({ status: statusFilter || undefined });
  const updateStatus = useUpdateBookingStatus();
  const bookings = bookingsData?.data || [];

  const handleStatusUpdate = async (id: number, status: string) => {
    await updateStatus.mutateAsync({ id, status });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Bookings</h1>
          <p className="text-gray-600 dark:text-gray-400">View and manage all customer bookings</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input placeholder="Search bookings..." className="pl-10" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guests</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 text-sm font-medium">{booking.bookingId}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{booking.customerName}</p>
                          <p className="text-sm text-gray-500">{booking.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{booking.packageName}</td>
                      <td className="px-6 py-4 text-sm">{formatDate(booking.travelDate)}</td>
                      <td className="px-6 py-4 text-sm">
                        {booking.numberOfAdults}A {booking.numberOfChildren > 0 && `+ ${booking.numberOfChildren}C`}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{formatPrice(booking.totalPrice)}</td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                            booking.status === 'Confirmed' ? 'success' :
                            booking.status === 'Pending' ? 'warning' :
                            booking.status === 'Cancelled' ? 'destructive' : 'secondary'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          {booking.status === 'Pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusUpdate(booking.id, 'Confirmed')}
                                className="text-green-600"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusUpdate(booking.id, 'Cancelled')}
                                className="text-red-600"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}