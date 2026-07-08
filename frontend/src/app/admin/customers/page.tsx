'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, ChevronLeft, ChevronRight, Mail, Phone, Globe, Filter, Eye } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../../components/layout/Navbar';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { useAdminCustomers } from '../../../hooks/useUsers';
import { formatDate } from '../../../lib/utils';

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data: customersData, isLoading } = useAdminCustomers({ search, page, pageSize: 15 });
  const customers = customersData?.data || [];
  const total = customersData?.total || 0;

  const gradients = [
    'from-sky-400 to-cyan-500',
    'from-orange-400 to-amber-500',
    'from-purple-400 to-pink-500',
    'from-emerald-400 to-teal-500',
    'from-blue-400 to-indigo-500',
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-600 text-sm">Admin</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 text-sm font-medium">Customers</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="h-7 w-7 text-sky-500" /> Customer Management
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">{total} registered customers</p>
        </motion.div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-5 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search by name, email, or country..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-10 rounded-xl border-slate-200 h-10 text-sm" />
          </div>
          <div className="flex items-center gap-2 ml-auto text-sm text-slate-500">
            <Filter className="h-4 w-4" /><span>{customers.length} of {total} shown</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-slate-100 rounded-xl animate-pulse" />)}</div>
          ) : customers.length === 0 ? (
            <div className="text-center py-16">
              <Users className="h-14 w-14 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No customers found</p>
            </div>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Customer</span><span>Email & Phone</span><span>Country</span>
                <span>Joined</span><span>Status</span><span>Actions</span>
              </div>
              <div className="divide-y divide-slate-100">
                {customers.map((customer: any, index: number) => (
                  <motion.div key={customer.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.04 }}
                    className="p-4 hover:bg-slate-50 transition-colors flex flex-col gap-3.5 md:grid md:grid-cols-[2fr_2fr_1fr_1fr_1fr_auto] md:gap-4 md:px-5 md:py-4 md:items-center">
                    
                    {/* Customer */}
                    <div className="flex justify-between items-start md:block">
                      <span className="text-xs font-semibold text-slate-400 md:hidden mt-2">Customer</span>
                      <div className="flex items-center gap-3 text-right md:text-left">
                        <div className={`w-10 h-10 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                          {customer.firstName?.charAt(0)}{customer.lastName?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{customer.firstName} {customer.lastName}</p>
                          <p className="text-slate-400 text-xs">ID: {customer.id}</p>
                        </div>
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="flex justify-between items-center md:block">
                      <span className="text-xs font-semibold text-slate-400 md:hidden">Email & Phone</span>
                      <div className="space-y-1 text-right md:text-left">
                        <div className="flex items-center justify-end md:justify-start gap-1.5 text-sm text-slate-600">
                          <Mail className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                          <span className="truncate text-xs">{customer.email}</span>
                        </div>
                        {customer.phoneNumber && (
                          <div className="flex items-center justify-end md:justify-start gap-1.5 text-xs text-slate-500">
                            <Phone className="h-3.5 w-3.5 text-sky-500 shrink-0" />{customer.phoneNumber}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Country */}
                    <div className="flex justify-between items-center md:block">
                      <span className="text-xs font-semibold text-slate-400 md:hidden">Country</span>
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Globe className="h-3.5 w-3.5 text-sky-500" />
                        <span className="text-xs">{customer.country || '—'}</span>
                      </div>
                    </div>

                    {/* Joined */}
                    <div className="flex justify-between items-center md:block">
                      <span className="text-xs font-semibold text-slate-400 md:hidden">Joined</span>
                      <div className="text-xs text-slate-500">{formatDate(customer.createdAt)}</div>
                    </div>

                    {/* Status */}
                    <div className="flex justify-between items-center md:block">
                      <span className="text-xs font-semibold text-slate-400 md:hidden">Status</span>
                      <div>
                        <Badge className={`text-xs font-semibold ${customer.isActive
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : 'bg-red-100 text-red-600 border-red-200'}`}>
                          {customer.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex justify-between items-center border-t border-slate-100 pt-3.5 md:border-t-0 md:pt-0 md:block">
                      <span className="text-xs font-semibold text-slate-400 md:hidden">Action</span>
                      <div>
                        <button className="w-8 h-8 bg-sky-50 hover:bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </div>
              {total > 15 && (
                <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500">Page {page} of {Math.ceil(total / 15)}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                      className="w-9 h-9 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 disabled:opacity-40">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button onClick={() => setPage(page + 1)} disabled={customers.length < 15}
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