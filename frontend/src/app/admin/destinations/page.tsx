'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight, Filter, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../../components/layout/Navbar';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useDestinations, useDeleteDestination } from '../../../hooks/useDestinations';

const destinationImages = [
  'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=200&q=80',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80',
  'https://images.unsplash.com/photo-1597659840994-8c9fb7b82e4a?w=200&q=80',
];

export default function AdminDestinationsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const { data: destinationsData, isLoading } = useDestinations({ search, page, pageSize: 12 });
  const deleteDestination = useDeleteDestination();

  const destinations = destinationsData?.data || [];
  const total = destinationsData?.total || 0;

  const handleDelete = async (id: number) => {
    await deleteDestination.mutateAsync(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-600 text-sm">Admin</Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 text-sm font-medium">Destinations</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="h-7 w-7 text-sky-500" /> Manage Destinations
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">{total} destinations total</p>
          </div>
          <Link href="/admin/destinations/create">
            <Button className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-xl px-5 py-2.5 font-semibold shadow-md hover:-translate-y-0.5 transition-all">
              <Plus className="h-4 w-4 mr-2" /> Add Destination
            </Button>
          </Link>
        </motion.div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-5 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search destinations..." value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-10 rounded-xl border-slate-200 h-10 text-sm" />
          </div>
          <div className="flex items-center gap-2 ml-auto text-sm text-slate-500">
            <Filter className="h-4 w-4" /><span>{destinations.length} of {total}</span>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <div key={i} className="h-56 bg-white rounded-2xl border border-slate-200 animate-pulse" />)}
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <MapPin className="h-14 w-14 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No destinations found</p>
            <p className="text-slate-400 text-sm">Add your first destination to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {destinations.map((dest: any, index: number) => (
              <motion.div key={dest.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-36">
                  <img src={dest.imageUrl || destinationImages[index % destinationImages.length]} alt={dest.name}
                    className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <h3 className="font-bold text-white text-base">{dest.name}</h3>
                      <p className="text-white/70 text-xs">{dest.country}</p>
                    </div>
                    <Badge className={`text-xs font-semibold border-0 ${dest.isActive ? 'bg-green-500 text-white' : 'bg-slate-500 text-white'}`}>
                      {dest.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">{dest.shortDescription || dest.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{dest.packageCount || 0} packages</span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/destinations/edit/${dest.id}`}>
                        <button className="w-8 h-8 bg-sky-50 hover:bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 transition-colors">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                      </Link>
                      {deleteConfirm === dest.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => handleDelete(dest.id)} className="px-2 py-1 bg-red-500 text-white rounded-lg text-xs font-semibold">Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(dest.id)} className="w-8 h-8 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center text-red-500 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {total > 12 && (
          <div className="flex items-center justify-between mt-8 bg-white rounded-2xl border border-slate-200 px-5 py-4">
            <p className="text-sm text-slate-500">Page {page} of {Math.ceil(total / 12)}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                className="w-9 h-9 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 disabled:opacity-40">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => setPage(page + 1)} disabled={destinations.length < 12}
                className="w-9 h-9 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 disabled:opacity-40">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}