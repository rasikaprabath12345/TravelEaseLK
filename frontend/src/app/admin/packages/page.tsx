'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package, Plus, Search, Edit, Trash2, Star, MapPin, Clock,
  ChevronLeft, ChevronRight, Filter, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePackages, useDeletePackage } from '@/hooks/usePackages';
import { useDestinations } from '@/hooks/useDestinations';
import { formatPrice } from '@/lib/utils';

const packageImages = [
  'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=200&q=80',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80',
  'https://images.unsplash.com/photo-1549366021-9f761d450615?w=200&q=80',
];

export default function AdminPackagesPage() {
  const [search, setSearch] = useState('');
  const [destinationId, setDestinationId] = useState<number | undefined>();
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const { data: packagesData, isLoading } = usePackages({ search, destinationId, page, pageSize: 10 });
  const { data: destinationsData } = useDestinations();
  const deletePackage = useDeletePackage();

  const packages = packagesData?.data || [];
  const total = packagesData?.total || 0;
  const destinations = destinationsData?.data || [];

  const handleDelete = async (id: number) => {
    await deletePackage.mutateAsync(id);
    setDeleteConfirm(null);
  };

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
            <div className="flex items-center gap-2 mb-1">
              <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-600 text-sm">Admin</Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 text-sm font-medium">Packages</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Package className="h-7 w-7 text-sky-500" />
              Manage Packages
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">{total} tour packages total</p>
          </div>
          <Link href="/admin/packages/new">
            <Button className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-xl px-5 py-2.5 font-semibold shadow-md hover:-translate-y-0.5 transition-all">
              <Plus className="h-4 w-4 mr-2" /> Add New Package
            </Button>
          </Link>
        </motion.div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-5 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search packages..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-10 rounded-xl border-slate-200 h-10 text-sm"
            />
          </div>
          <select
            value={destinationId || ''}
            onChange={e => { setDestinationId(e.target.value ? Number(e.target.value) : undefined); setPage(1); }}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 focus:outline-none focus:border-sky-400 min-w-[160px]"
          >
            <option value="">All Destinations</option>
            {destinations.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <div className="flex items-center gap-2 ml-auto text-sm text-slate-500">
            <Filter className="h-4 w-4" />
            <span>Showing {packages.length} of {total}</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-14 w-14 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No packages found</p>
              <p className="text-slate-400 text-sm">Add your first tour package to get started</p>
            </div>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Package</span>
                <span>Destination</span>
                <span>Price</span>
                <span>Duration</span>
                <span>Status</span>
                <span>Actions</span>
              </div>

              <div className="divide-y divide-slate-100">
                {packages.map((pkg: any, index: number) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-4 items-center hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={pkg.imageUrl || packageImages[index % packageImages.length]}
                        alt={pkg.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-slate-800 text-sm line-clamp-1">{pkg.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                          <span className="text-slate-500 text-xs">{pkg.averageRating?.toFixed(1) || '5.0'}</span>
                          {pkg.isFeatured && (
                            <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-[10px] font-bold py-0">
                              <Sparkles className="h-2.5 w-2.5 mr-0.5" />FEATURED
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <MapPin className="h-3.5 w-3.5 text-sky-500" />
                      <span className="truncate">{pkg.destinationName || '—'}</span>
                    </div>

                    <div className="text-sm font-bold text-slate-800">{formatPrice(pkg.price)}</div>

                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Clock className="h-3.5 w-3.5 text-sky-500" />
                      {pkg.duration} Days
                    </div>

                    <div>
                      <Badge className={`text-xs font-semibold ${pkg.isActive
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        {pkg.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/admin/packages/edit/${pkg.id}`}>
                        <button className="w-8 h-8 bg-sky-50 hover:bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 transition-colors">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                      </Link>
                      {deleteConfirm === pkg.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => handleDelete(pkg.id)} className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-semibold">Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(pkg.id)} className="w-8 h-8 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center text-red-500 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {total > 10 && (
                <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500">Page {page} of {Math.ceil(total / 10)}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                      className="w-9 h-9 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:border-sky-300 disabled:opacity-40">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button onClick={() => setPage(page + 1)} disabled={packages.length < 10}
                      className="w-9 h-9 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:border-sky-300 disabled:opacity-40">
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