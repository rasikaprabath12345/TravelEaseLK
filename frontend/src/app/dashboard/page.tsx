'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, MapPin, Clock, User, Bell, LogOut,
  Globe, ChevronRight, CheckCircle, AlertCircle, XCircle, MessageCircle, CreditCard
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth.store';
import { useBookings } from '@/hooks/useBookings';
import { formatPrice, formatDate } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// ── CONFIG: Change to your WhatsApp business number (94XXXXXXXXX) ──
const DEFAULT_WA_BUSINESS = '94703348191';

const statusConfig: Record<string, { label: string; color: string; icon: any; bg: string }> = {
  Confirmed: { label: 'Confirmed', color: 'text-green-700', icon: CheckCircle, bg: 'bg-green-50 border-green-200' },
  Pending: { label: 'Pending', color: 'text-amber-700', icon: AlertCircle, bg: 'bg-amber-50 border-amber-200' },
  Cancelled: { label: 'Cancelled', color: 'text-red-700', icon: XCircle, bg: 'bg-red-50 border-red-200' },
  Completed: { label: 'Completed', color: 'text-sky-700', icon: CheckCircle, bg: 'bg-sky-50 border-sky-200' },
};

const packageImages = [
  'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=400&q=80',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
  'https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&q=80',
];

const quickLinks = [
  { href: '/packages', icon: Globe, label: 'Browse Tours', desc: 'Find your next adventure', color: 'sky' },
  { href: '/destinations', icon: MapPin, label: 'Destinations', desc: 'Explore Sri Lanka', color: 'orange' },
  { href: '/contact', icon: Bell, label: 'Contact Support', desc: 'Get help 24/7', color: 'emerald' },
];

export default function CustomerDashboard() {
  const { user, logout } = useAuthStore();
  const { data: bookingsData } = useBookings();
  const bookings = bookingsData?.data || [];
  const [activeTab, setActiveTab] = useState<'all' | 'confirmed' | 'pending' | 'completed'>('all');
  const [waBusiness, setWaBusiness] = useState(DEFAULT_WA_BUSINESS);

  useEffect(() => {
    const saved = localStorage.getItem('site_whatsapp_number');
    if (saved) {
      setWaBusiness(saved);
    }
  }, []);

  const filtered = activeTab === 'all' ? bookings : bookings.filter((b: any) => b.status?.toLowerCase() === activeTab);

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: Calendar, gradient: 'from-sky-500 to-cyan-500', change: '+2 this month' },
    { label: 'Upcoming Trips', value: bookings.filter((b: any) => b.status === 'Confirmed').length, icon: MapPin, gradient: 'from-orange-500 to-amber-500', change: 'Next trip soon' },
    { label: 'Countries Visited', value: 1, icon: Globe, gradient: 'from-purple-500 to-pink-500', change: 'Sri Lanka' },
    { label: 'Days Traveled', value: bookings.reduce((acc: number, b: any) => acc + (b.duration || 0), 0), icon: Clock, gradient: 'from-emerald-500 to-teal-500', change: 'Total days' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/30 to-white flex flex-col justify-between">
      <Navbar />
      <div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">

        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-sky-200">
              {user?.firstName?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-slate-500 text-sm">{user?.email} · <span className="text-sky-600 font-medium">Premium Member</span></p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600 text-sm">
              <User className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
            <Button
              onClick={logout}
              variant="outline"
              className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 text-sm"
            >
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-sky-100 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-3 shadow-md`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 mb-0.5">{stat.value}</p>
              <p className="text-slate-500 text-xs font-medium">{stat.label}</p>
              <p className="text-slate-400 text-[10px] mt-1">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Bookings Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-sky-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="font-bold text-slate-900 text-lg">My Bookings</h2>
                <div className="flex gap-2 flex-wrap">
                  {(['all', 'confirmed', 'pending', 'completed'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${activeTab === tab
                          ? 'bg-sky-500 text-white shadow'
                          : 'bg-sky-50 text-slate-600 hover:bg-sky-100'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings List */}
              <div className="p-4">
                {filtered.length === 0 ? (
                  <div className="text-center py-14">
                    <Calendar className="h-14 w-14 text-slate-200 mx-auto mb-4" />
                    <h3 className="font-semibold text-slate-700 mb-2">No bookings found</h3>
                    <p className="text-slate-400 text-sm mb-5">
                      {activeTab === 'all' ? 'Start exploring and book your first Sri Lanka adventure!' : `No ${activeTab} bookings.`}
                    </p>
                    <Link href="/packages">
                      <Button className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl px-6 font-semibold">
                        Browse Packages
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filtered.slice(0, 5).map((booking: any, i: number) => {
                      const status = statusConfig[booking.status] || statusConfig.Pending;
                      const isPaid = booking.paymentStatus === 'Paid';
                      const waMsg = encodeURIComponent(
                        `Hi TravelEase LK! I have made my bank transfer payment for:\n` +
                        `📋 Booking ID: ${booking.bookingId}\n` +
                        `🏝️ Package: ${booking.packageName}\n` +
                        `💰 Amount: ${formatPrice(booking.totalPrice)}\n` +
                        `📅 Travel Date: ${formatDate(booking.travelDate)}\n\n` +
                        `Please find my payment receipt attached. Kindly confirm my booking.`
                      );
                      const waUrl = `https://wa.me/${waBusiness}?text=${waMsg}`;
                      return (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex flex-col gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50/50 transition-all"
                        >
                          {/* Top row */}
                          <div className="flex items-center gap-4">
                            <img
                              src={booking.packageImage || packageImages[i % packageImages.length]}
                              alt={booking.packageName}
                              className="w-16 h-16 rounded-xl object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-800 truncate">{booking.packageName}</p>
                              <p className="text-slate-400 text-xs font-mono">ID: <span className="text-sky-600 font-bold">{booking.bookingId}</span></p>
                              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500">
                                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(booking.travelDate)}</span>
                                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{booking.numberOfAdults} Adults</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${status.bg} ${status.color}`}>
                                <status.icon className="h-3 w-3" />
                                {status.label}
                              </div>
                              <p className="font-bold text-slate-800 text-sm mt-1.5">{formatPrice(booking.totalPrice)}</p>
                            </div>
                          </div>

                          {/* Payment Row */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                            {/* Payment status pill */}
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                              isPaid
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'bg-amber-50 border-amber-200 text-amber-700'
                            }`}>
                              <CreditCard className="h-3 w-3" />
                              {isPaid ? '✓ Payment Confirmed' : 'Payment Pending'}
                            </div>

                            {/* WhatsApp Pay button — only for unpaid bookings */}
                            {!isPaid && (
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25d366] hover:bg-[#1eb658] text-white text-xs font-bold shadow-md shadow-green-200 hover:shadow-green-300 transition-all hover:-translate-y-0.5"
                              >
                                <MessageCircle className="h-3.5 w-3.5" />
                                Send Receipt via WhatsApp
                              </a>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">

            {/* Profile Card */}
            <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-sky-500" /> My Profile
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Name</span>
                  <span className="font-semibold text-slate-800">{user?.firstName} {user?.lastName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Email</span>
                  <span className="font-medium text-slate-700 text-xs">{user?.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Member Since</span>
                  <span className="font-medium text-slate-700">2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Status</span>
                  <Badge className="bg-sky-100 text-sky-700 border-sky-200 text-xs">Premium</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 rounded-xl border-sky-200 text-sky-600 hover:bg-sky-50 text-sm font-semibold">
                Edit Profile
              </Button>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-2.5">
                {quickLinks.map(link => (
                  <Link key={link.href} href={link.href}>
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-sky-50 transition-all group cursor-pointer">
                      <div className={`w-10 h-10 bg-${link.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <link.icon className={`h-5 w-5 text-${link.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">{link.label}</p>
                        <p className="text-slate-500 text-xs">{link.desc}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trip Tip */}
            <div className="bg-gradient-to-br from-sky-500 to-cyan-500 rounded-3xl p-5 text-white">
              <p className="font-bold mb-1.5">🌴 Travel Tip</p>
              <p className="text-white/90 text-sm leading-relaxed">
                The best time to visit Sri Lanka's beaches is November–April.
                For wildlife safaris, May–September is prime leopard season at Yala!
              </p>
              <Link href="/packages">
                <button className="mt-4 bg-white/20 hover:bg-white/30 border border-white/30 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors">
                  Plan Your Trip →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}