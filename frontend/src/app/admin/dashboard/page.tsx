'use client';

import { motion } from 'framer-motion';
import {
  Users, Package, Calendar, DollarSign, TrendingUp,
  MapPin, BarChart3, ArrowUpRight, ChevronRight,
  AlertCircle, CheckCircle, Package as PkgIcon, Plus, Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDashboardStats, useBookingAnalytics, usePopularDestinations } from '@/hooks/useDashboard';
import { useAuthStore } from '@/store/auth.store';
import { formatPrice, formatDate } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useBookings } from '@/hooks/useBookings';

const destImages = [
  'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=100&q=80',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&q=80',
  'https://images.unsplash.com/photo-1597659840994-8c9fb7b82e4a?w=100&q=80',
];

const adminLinks = [
  { href: '/admin/packages', label: 'Packages', icon: Package, color: 'sky', desc: 'Create & manage tour packages' },
  { href: '/admin/destinations', label: 'Destinations', icon: MapPin, color: 'orange', desc: 'Manage Sri Lanka destinations' },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar, color: 'emerald', desc: 'View & update all bookings' },
  { href: '/admin/customers', label: 'Customers', icon: Users, color: 'purple', desc: 'Customer database & details' },
  { href: '/admin/settings', label: 'Page Covers', icon: ImageIcon, color: 'pink', desc: 'Customize site cover images' },
];

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { data: statsData } = useDashboardStats();
  const { data: analyticsData } = useBookingAnalytics();
  const { data: popularData } = usePopularDestinations();
  const { data: recentBookingsData } = useBookings({ page: 1, pageSize: 5 } as any);

  const stats = statsData?.data;
  const analytics = analyticsData?.data || [];
  const popularDestinations = popularData?.data || [];
  const recentBookings = recentBookingsData?.data || [];

  useEffect(() => {
    if (user && user.role !== 'Admin') {
      router.push('/');
    }
  }, [user, router]);

  const maxBookingCount = Math.max(...analytics.map((a: any) => a.bookingCount || 0), 1);

  const statCards = [
    { label: 'Total Customers', value: stats?.totalCustomers || 0, icon: Users, gradient: 'from-sky-500 to-cyan-500', change: '+12%', up: true },
    { label: 'Total Bookings', value: stats?.totalBookings || 0, icon: Calendar, gradient: 'from-emerald-500 to-teal-500', change: '+8%', up: true },
    { label: 'Active Packages', value: stats?.totalPackages || 0, icon: Package, gradient: 'from-purple-500 to-pink-500', change: '+5%', up: true },
    { label: 'Monthly Revenue', value: formatPrice(stats?.monthlyRevenue || 0), icon: DollarSign, gradient: 'from-orange-500 to-amber-500', change: '+15%', up: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <p className="text-slate-500 text-sm mb-0.5">Welcome back, <span className="font-semibold text-slate-700">{user?.firstName}</span>!</p>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white border-0 px-4 py-2 text-sm font-semibold shadow">
              Admin Panel
            </Badge>
            <Link href="/admin/packages">
              <Button className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-xl text-sm font-semibold shadow-md hover:-translate-y-0.5 transition-all">
                <Plus className="h-4 w-4 mr-1.5" /> New Package
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                  <ArrowUpRight className="h-3.5 w-3.5" />{stat.change}
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-0.5">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Pending Alert */}
        {stats?.pendingBookings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-amber-800">{stats.pendingBookings} Bookings Awaiting Confirmation</p>
              <p className="text-amber-600 text-sm">Review and confirm pending customer bookings.</p>
            </div>
            <Link href="/admin/bookings">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-semibold shrink-0">
                Review Now
              </Button>
            </Link>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Booking Analytics */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-sky-500" /> Booking Analytics
              </h2>
            </div>
            <div className="p-6 space-y-3">
              {analytics.length === 0 ? (
                <div className="text-center py-8">
                  <BarChart3 className="h-10 w-10 text-slate-200 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">No analytics data available yet</p>
                </div>
              ) : analytics.slice(-6).map((item: any, i: number) => (
                <div key={item.month || i} className="flex items-center gap-4">
                  <span className="text-xs text-slate-500 font-medium w-10 shrink-0">{item.month}</span>
                  <div className="flex-1 h-8 bg-slate-100 rounded-xl overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.bookingCount / maxBookingCount) * 100}%` }}
                      transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-sky-400 to-cyan-500 rounded-xl flex items-center justify-end px-3 min-w-[2.5rem]"
                    >
                      <span className="text-xs text-white font-bold">{item.bookingCount}</span>
                    </motion.div>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 w-24 text-right shrink-0">{formatPrice(item.revenue || 0)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" /> Top Destinations
              </h2>
            </div>
            <div className="p-4 space-y-2.5">
              {popularDestinations.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin className="h-10 w-10 text-slate-200 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">No destination data yet</p>
                </div>
              ) : popularDestinations.map((dest: any, i: number) => (
                <motion.div
                  key={dest.name || i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span className="w-6 h-6 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {i + 1}
                  </span>
                  <img src={dest.imageUrl || destImages[i % destImages.length]} alt={dest.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{dest.name}</p>
                    <p className="text-slate-400 text-xs">{dest.bookingCount} bookings</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {adminLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <Link href={link.href}>
                <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group`}>
                  <div className={`w-12 h-12 bg-${link.color}-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <link.icon className={`h-6 w-6 text-${link.color}-600`} />
                  </div>
                  <p className="font-bold text-slate-800 text-sm mb-0.5">{link.label}</p>
                  <p className="text-slate-500 text-xs">{link.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-sky-600 font-semibold group-hover:gap-2 transition-all">
                    <span>Open</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-sky-500" /> Recent Bookings
            </h2>
            <Link href="/admin/bookings">
              <Button variant="outline" className="rounded-xl border-sky-200 text-sky-600 hover:bg-sky-50 text-sm font-semibold py-1.5 px-4">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentBookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-10 w-10 text-slate-200 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">No bookings yet</p>
              </div>
            ) : recentBookings.slice(0, 5).map((b: any, i: number) => (
              <div key={b.id} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors">
                <div className="w-9 h-9 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {b.fullName?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm">{b.fullName}</p>
                  <p className="text-slate-400 text-xs truncate">{b.packageName}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800 text-sm">{formatPrice(b.totalPrice)}</p>
                  <Badge className={`text-[10px] font-bold border-0 ${b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : b.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'}`}>
                    {b.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}