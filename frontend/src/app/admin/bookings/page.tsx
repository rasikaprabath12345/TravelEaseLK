'use client';

import { useState } from 'react';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useBookings, useUpdateBookingStatus } from '@/hooks/useBookings';
import { formatPrice, formatDate } from '@/lib/utils';

// TypeScript Error නැති කිරීම සඳහා Booking Interface එක හඳුන්වා දීම
interface Booking {
  id: number;
  bookingId: string;
  customerName: string;
  email: string;
  packageName: string;
  travelDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  totalPrice: number;
  status: string;
}

export default function AdminBookingsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const { data: bookingsData, isLoading } = useBookings({ status: statusFilter || undefined });
  const updateStatus = useUpdateBookingStatus();
  
  const bookings: Booking[] = bookingsData?.data || [];

  const handleStatusUpdate = async (id: number, status: string) => {
    // API එකට Call කරලා Status එක Update කිරීම
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
                <Input placeholder="Search bookings by ID or Name..." className="pl-10" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                  {isLoading ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                        Loading bookings...
                      </td>
                    </tr>
                  ) : bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                      <tr key={booking?.id || `booking-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 text-sm font-medium">{booking?.bookingId || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{booking?.customerName || 'Unknown'}</p>
                            <p className="text-sm text-gray-500">{booking?.email || 'No email'}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{booking?.packageName || '-'}</td>
                        <td className="px-6 py-4 text-sm">{booking?.travelDate ? formatDate(booking.travelDate) : '-'}</td>
                        <td className="px-6 py-4 text-sm">
                          {booking?.numberOfAdults || 0}A {booking?.numberOfChildren > 0 && `+ ${booking.numberOfChildren}C`}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          {booking?.totalPrice ? formatPrice(booking.totalPrice) : 'Rs. 0.00'}
                        </td>
                        <td className="px-6 py-4">
                          {/* Status එක අනුව පාට වෙනස් වීම */}
                          <Badge
                            className={
                              booking?.status === 'Confirmed' ? 'bg-green-500 hover:bg-green-600 text-white' :
                              booking?.status === 'Pending' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' :
                              booking?.status === 'Cancelled' ? 'bg-red-500 hover:bg-red-600 text-white' :
                              booking?.status === 'Completed' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                              'bg-gray-500 hover:bg-gray-600 text-white'
                            }
                          >
                            {booking?.status || 'Unknown'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2">
                            {booking?.status === 'Pending' && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleStatusUpdate(booking.id, 'Confirmed')}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                  title="Confirm Booking"
                                >
                                  <CheckCircle className="h-5 w-5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleStatusUpdate(booking.id, 'Cancelled')}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  title="Cancel Booking"
                                >
                                  <XCircle className="h-5 w-5" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                        No bookings found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}