'use client';

import { motion } from 'framer-motion';
import { Users, Package, Calendar, DollarSign, TrendingUp, MapPin, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDashboardStats, useBookingAnalytics, usePopularDestinations } from '@/hooks/useDashboard';
import { useAuthStore } from '@/store/auth.store';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { data: statsData } = useDashboardStats();
  const { data: analyticsData } = useBookingAnalytics();
  const { data: popularData } = usePopularDestinations();

  const stats = statsData?.data;
  const analytics = analyticsData?.data || [];
  const popularDestinations = popularData?.data || [];

  useEffect(() => {
    if (user && user.role !== 'Admin') {
      router.push('/');
    }
  }, [user, router]);

  const statCards = [
    { label: 'Total Customers', value: stats?.totalCustomers || 0, icon: Users, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { label: 'Total Bookings', value: stats?.totalBookings || 0, icon: Calendar, color: 'from-green-500 to-green-600', change: '+8%' },
    { label: 'Total Packages', value: stats?.totalPackages || 0, icon: Package, color: 'from-purple-500 to-purple-600', change: '+5%' },
    { label: 'Monthly Revenue', value: formatPrice(stats?.monthlyRevenue || 0), icon: DollarSign, color: 'from-yellow-500 to-orange-500', change: '+15%' },
  ];

  const adminLinks = [
    { href: '/admin/packages', label: 'Manage Packages', icon: Package },
    { href: '/admin/destinations', label: 'Manage Destinations', icon: MapPin },
    { href: '/admin/bookings', label: 'Manage Bookings', icon: Calendar },
    { href: '/admin/customers', label: 'Manage Customers', icon: Users },
  ];

  const maxBookingCount = Math.max(...analytics.map(a => a.bookingCount), 1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.firstName}!</p>
          </div>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">
            Admin Panel
          </Badge>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="success">{stat.change}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Booking Analytics */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Booking Analytics
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.slice(-6).map((item, index) => (
                  <div key={item.month} className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 w-20">{item.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.bookingCount / maxBookingCount) * 100}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-end px-2"
                        >
                          <span className="text-xs text-white font-medium">{item.bookingCount}</span>
                        </motion.div>
                      </div>
                    </div>
                    <span className="text-sm font-medium w-20 text-right">{formatPrice(item.revenue)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Destinations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Popular Destinations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularDestinations.map((dest, index) => (
                  <motion.div
                    key={dest.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <img
                      src={dest.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&q=80'}
                      alt={dest.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{dest.name}</h3>
                      <p className="text-sm text-gray-500">{dest.bookingCount} bookings</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {adminLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Card className="p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <link.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium">{link.label}</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Bookings */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pending Bookings</CardTitle>
              <Badge variant="warning">{stats?.pendingBookings || 0} Pending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">
              {stats?.pendingBookings === 0 ? 'No pending bookings' : `${stats?.pendingBookings} bookings awaiting confirmation`}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}