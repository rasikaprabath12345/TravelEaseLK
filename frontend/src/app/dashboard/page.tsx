'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Star, Heart, User, Bell, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth.store';
import { useBookings } from '@/hooks/useBookings';
import { formatPrice, formatDate } from '@/lib/utils';

export default function CustomerDashboard() {
  const { user, logout } = useAuthStore();
  const { data: bookingsData } = useBookings();
  const bookings = bookingsData?.data || [];

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { label: 'Upcoming Trips', value: bookings.filter(b => b.status === 'Confirmed').length, icon: MapPin, color: 'from-green-500 to-green-600' },
    { label: 'Wishlist', value: 0, icon: Heart, color: 'from-pink-500 to-pink-600' },
    { label: 'Reviews', value: 0, icon: Star, color: 'from-yellow-500 to-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}!</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your bookings and profile</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No bookings yet</p>
                <Link href="/packages">
                  <Button>Browse Packages</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <img
                        src={booking.packageImage || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80'}
                        alt={booking.packageName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{booking.packageName}</h3>
                        <p className="text-sm text-gray-500">Booking ID: {booking.bookingId}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{formatDate(booking.travelDate)}</span>
                          <span>{booking.numberOfAdults} Adults</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={booking.status === 'Confirmed' ? 'success' : booking.status === 'Pending' ? 'warning' : 'secondary'}>
                        {booking.status}
                      </Badge>
                      <p className="text-lg font-bold mt-2">{formatPrice(booking.totalPrice)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Profile Settings</h3>
                <p className="text-sm text-gray-500">Update your information</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-sm text-gray-500">View your notifications</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={logout}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <LogOut className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Logout</h3>
                <p className="text-sm text-gray-500">Sign out of your account</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}