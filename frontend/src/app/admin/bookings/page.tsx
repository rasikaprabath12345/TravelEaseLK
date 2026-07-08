'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Search, ChevronLeft, ChevronRight,
  CheckCircle, AlertCircle, XCircle, Filter, RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useBookings, useUpdateBookingStatus } from '@/hooks/useBookings';
import { formatPrice, formatDate } from '@/lib/utils';

const statusOptions = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

const statusConfig: Record<string, { color: string; icon: any; bg: string }> = {
  Confirmed: { color: 'text-green-700', icon: CheckCircle, bg: 'bg-green-50 border-green-200' },
  Pending: { color: 'text-amber-700', icon: AlertCircle, bg: 'bg-amber-50 border-amber-200' },
  Cancelled: { color: 'text-red-700', icon: XCircle, bg: 'bg-red-50 border-red-200' },
  Completed: { color: 'text-sky-700', icon: CheckCircle, bg: 'bg-sky-50 border-sky-200' },
};

export default function AdminBookingsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const { data: bookingsData, isLoading } = useBookings({
    search,
    status: status !== 'All' ? status : undefined,
    page,
    pageSize: 10,
  } as any);
  const updateStatus = useUpdateBookingStatus();

  const bookings = bookingsData?.data || [];
  const total = bookingsData?.total || 0;

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      await updateStatus.mutateAsync({ id, status: newStatus });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50" suppressHydrationWarning>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16" suppressHydrationWarning>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-600 text-sm">Admin</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 text-sm font-medium">Bookings</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="h-7 w-7 text-sky-500" /> Manage Bookings
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">{total} total bookings</p>
        </motion.div>

        {/* Status Tabs */}
        <div className="flex gap-2 flex-wrap mb-5">
          {statusOptions.map(s => (
            <button key={s} onClick={() => { setStatus(s); setPage(1); }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${status === s
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-sky-600'}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-5 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search by booking ID, name..." value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-10 rounded-xl border-slate-200 h-10 text-sm" />
          </div>
          <div className="flex items-center gap-2 ml-auto text-sm text-slate-500">
            <Filter className="h-4 w-4" /><span>{bookings.length} of {total} shown</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />)}</div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="h-14 w-14 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No bookings found</p>
            </div>
          ) : (
            <>
              <div className="hidden lg:grid grid-cols-[1fr_1.5fr_1fr_1fr_auto_auto_auto] gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Booking ID</span><span>Customer</span><span>Package</span><span>Travel Date</span>
                <span>Amount</span><span>Status</span><span>Update</span>
              </div>
              <div className="divide-y divide-slate-100">
                {bookings.map((booking: any, index: number) => {
                  const sc = statusConfig[booking.status] || statusConfig.Pending;
                  return (
                    <motion.div key={booking.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.04 }}
                      className="p-4 hover:bg-slate-50 transition-colors flex flex-col gap-3.5 lg:grid lg:grid-cols-[1fr_1.5fr_1fr_1fr_auto_auto_auto] lg:gap-4 lg:px-5 lg:py-4 lg:items-center">
                      
                      {/* Booking ID */}
                      <div className="flex justify-between items-center lg:block">
                        <span className="text-xs font-semibold text-slate-400 lg:hidden">Booking ID</span>
                        <div>
                          <p className="font-mono font-bold text-sky-600 text-sm">{booking.bookingId}</p>
                          <p className="text-slate-400 text-xs">{formatDate(booking.createdAt)}</p>
                        </div>
                      </div>

                      {/* Customer */}
                      <div className="flex justify-between items-start lg:block">
                        <span className="text-xs font-semibold text-slate-400 lg:hidden mt-2">Customer</span>
                        <div className="flex items-center gap-2.5 text-right lg:text-left">
                          <div className="w-9 h-9 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0">
                            {booking.fullName?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">{booking.fullName}</p>
                            <p className="text-slate-500 text-xs">{booking.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Package */}
                      <div className="flex justify-between items-center lg:block">
                        <span className="text-xs font-semibold text-slate-400 lg:hidden">Package</span>
                        <div className="text-right lg:text-left">
                          <p className="font-medium text-slate-700 text-sm line-clamp-1">{booking.packageName}</p>
                          <p className="text-slate-400 text-xs">{booking.numberOfAdults}A, {booking.numberOfChildren}C</p>
                        </div>
                      </div>

                      {/* Travel Date */}
                      <div className="flex justify-between items-center lg:block">
                        <span className="text-xs font-semibold text-slate-400 lg:hidden">Travel Date</span>
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <Calendar className="h-3.5 w-3.5 text-sky-500" />{formatDate(booking.travelDate)}
                        </div>
                      </div>

                      {/* Total Price */}
                      <div className="flex justify-between items-center lg:block">
                        <span className="text-xs font-semibold text-slate-400 lg:hidden">Amount</span>
                        <div className="text-right lg:text-left">
                          <p className="font-bold text-slate-800 text-sm">{formatPrice(booking.totalPrice)}</p>
                          <p className={`text-xs font-medium ${booking.paymentStatus === 'Paid' ? 'text-green-600' : 'text-amber-600'}`}>{booking.paymentStatus || 'Unpaid'}</p>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex justify-between items-center lg:block">
                        <span className="text-xs font-semibold text-slate-400 lg:hidden">Status</span>
                        <div>
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${sc.bg} ${sc.color}`}>
                            <sc.icon className="h-3 w-3" />{booking.status}
                          </div>
                        </div>
                      </div>

                      {/* Actions/Dropdown */}
                      <div className="flex justify-between items-center border-t border-slate-100 pt-3.5 lg:border-t-0 lg:pt-0 lg:block">
                        <span className="text-xs font-semibold text-slate-400 lg:hidden">Update Status</span>
                        <div className="flex items-center gap-1.5">
                          <select value={booking.status} onChange={e => handleStatusUpdate(booking.id, e.target.value)}
                            disabled={updatingId === booking.id}
                            className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-600 focus:outline-none focus:border-sky-400 disabled:opacity-60">
                            {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          {updatingId === booking.id && <RefreshCw className="h-3 w-3 text-sky-500 animate-spin" />}
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </div>
              {total > 10 && (
                <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500">Page {page} of {Math.ceil(total / 10)}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                      className="w-9 h-9 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 disabled:opacity-40">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button onClick={() => setPage(page + 1)} disabled={bookings.length < 10}
                      className="w-9 h-9 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 disabled:opacity-40">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}